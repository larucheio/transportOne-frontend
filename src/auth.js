import Auth0Lock from 'auth0-lock'
import {router} from './router.js'

const options = {
  theme: {
    primaryColor: '#f39c12',
    logo: 'https://transportone.ch/static/logo.svg'
  },
  languageDictionary: {
    emailInputPlaceholder: 'name@email.com',
    title: 'Se connecter'
  },
  language: 'fr',
  auth: {
    redirectUrl: 'https://transportone.ch',
    responseType: 'token',
    params: {
      scope: 'openid app_metadata'
    },
    sso: true
  }
}

const lock = new Auth0Lock(process.env.AUTH0_CLIENT_ID, process.env.AUTH0_DOMAIN, options)
export default {
  init () {
    router.app.refreshAuthStatus()
    lock.on('authenticated', function (authResult) {
      localStorage.setItem('id_token', authResult.idToken)
      localStorage.setItem('id_token_expiration', Date.now() + 35000000)
      localStorage.setItem('refresh_token', authResult.refreshToken)
      lock.getProfile(authResult.idToken, function (error, profile) {
        if (error) {
          alert("Erreur: votre profil n'a pas été trouvé.")
          return
        }
        localStorage.setItem('profile', JSON.stringify(profile))
        router.app.refreshAuthStatus()
        lock.hide()
      })
    })
    lock.on('authorization_error', () => {
      alert("Erreur: échec de l'autorisation.")
    })
  },
  isAuthenticated () {
    if (localStorage.getItem('id_token')) return true
    return false
  },
  isAdmin () {
    const profile = localStorage.getItem('profile')
    if (profile && JSON.parse(profile).app_metadata && JSON.parse(profile).app_metadata.isAdmin) return true
    return false
  },
  getAuthHeader () {
    return {
      'Authorization': `Bearer ${localStorage.getItem('id_token')}`
    }
  },
  login () {
    lock.show()
  },
  logout () {
    localStorage.removeItem('id_token')
    localStorage.removeItem('profile')
    localStorage.removeItem('id_token_expiration')
    localStorage.removeItem('refreshToken')
    router.app.refreshAuthStatus()
    router.push('/')
  },
  getProfile () {
    return JSON.parse(localStorage.getItem('profile'))
  },
  getToken () {
    return localStorage.getItem('id_token')
  },
  setProfileAttribute (attribute) {
    if (this.isAuthenticated()) {
      // exemple to set an attribute  setProfileAttribute({isAdmin: true})
      router.app.$http.patch(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${this.getProfile().user_id}`,
        {user_metadata: attribute},
        {headers: {Authorization: `Bearer ${localStorage.getItem('id_token')}`}}
      ).then((response) => {
        localStorage.setItem('profile', JSON.stringify(response.data))
      }, (response) => {})
    }
  },
  refreshToken () {
    if (localStorage.getItem('id_token_expiration') && localStorage.getItem('id_token_expiration') < Date.now()) {
      router.app.$http.post(`https://${process.env.AUTH0_DOMAIN}/delegation`,
        {
          'client_id': process.env.AUTH0_CLIENT_ID,
          'grant_type': 'urn:ietf:params:oauth:grant-type:jwt-bearer',
          'refresh_token': localStorage.getItem('refresh_token'),
          'api_type': 'app'
        },
        {headers: {'Content-Type': 'application/json'}}
      ).then((response) => {
        localStorage.setItem('id_token', response.body.id_token)
        localStorage.setItem('id_token_life', Date.now() + (response.body.expire_in - 1000) * 1000)
      }, (response) => {
        this.logout()
      })
    }
  }
}
