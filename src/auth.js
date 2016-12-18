import Auth0Lock from 'auth0-lock'
import {router} from './router.js'

const options = {
  theme: {
    primaryColor: 'black',
    logo: ''
  },
  languageDictionary: {
    emailInputPlaceholder: 'name@email.com',
    title: 'Se connecter'
  },
  language: 'fr'
}

const lock = new Auth0Lock(process.env.AUTH0_CLIENT_ID, process.env.AUTH0_DOMAIN, options)
export default {
  init () {
    router.app.refreshAuthStatus()
    lock.on('authenticated', function (authResult) {
      localStorage.setItem('id_token', authResult.idToken)
      lock.getProfile(authResult.idToken, function (error, profile) {
        if (error) {
          alert("Erreur: votre profile n'a pas été trouvé.")
          return
        }
        localStorage.setItem('profile', JSON.stringify(profile))
        router.app.refreshAuthStatus()
        lock.hide()
      })
    })
    lock.on('authorizaton_error', (error) => {
      alert("Erreur: echec de l'authorisation.")
    })
  },
  isAuthenticated () {
    if (localStorage.getItem('id_token')) return true
    return false
  },
  isAdmin () {
    const profile = localStorage.getItem('profile')
    if (profile && JSON.parse(profile).app_metadata.isAdmin) return true
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
    router.app.refreshAuthStatus()
    router.push('/home')
  },
  getProfile () {
    return JSON.parse(localStorage.getItem('profile'))
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
  }
}
