// import Auth0Lock from 'auth0-lock'
import {router} from './router.js'
import auth0 from 'auth0-js'

export default {
  auth0: new auth0.WebAuth({
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    redirectUri: process.env.SITE_URL,
    audience: 'https://transportone.eu.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid profile app_metadata'
  }),
  isAuthenticated () {
    // Check whether the current time is past the
    // Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  },
  isAdmin () {
    const profile = localStorage.getItem('profile')
    if (profile && JSON.parse(profile)['https://transportone.ch/role'] &&
      JSON.parse(profile)['https://transportone.ch/role'].isAdmin) {
      return true
    }
    return false
  },
  getAuthHeader () {
    return {
      'Authorization': `Bearer ${localStorage.getItem('id_token')}`
    }
  },
  login () {
    this.auth0.authorize()
  },
  logout () {
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    localStorage.removeItem('profile')

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
  },
  handleAuthentication () {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        router.replace('home')
      } else if (err) {
        router.replace('home')
        console.log(err)
      }
    })
  },
  setSession (authResult) {
    // Set the time that the Access Token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    )
    localStorage.setItem('profile', JSON.stringify(authResult.idTokenPayload))
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
    router.app.refreshAuthStatus()
  }
}
