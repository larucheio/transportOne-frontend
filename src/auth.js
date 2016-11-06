import Auth0Lock from 'auth0-lock'
import {router} from './main'

const auth = {
  init () {
    lock.on('authenticated', function (authResult) {
      localStorage.setItem('id_token', authResult.idToken)
      lock.getProfile(authResult.idToken, function (error, profile) {
        if (error) {
          alert("Erreur: votre profile n'a pas été retrouvé.")
          return
        }
        localStorage.setItem('profile', JSON.stringify(profile))
        lock.hide()
        router.push('/home')
      })
    })
    lock.on('authorizaton_error', (error) => {
      alert("Erreur: echec de l'authorisation.")
    })
  },
  isAuthenticated () {
    if (localStorage.getItem('id_token'))
      return true
    return false
  },
  isAdmin () {
    const profile = localStorage.getItem('profile')
    if (profile && JSON.parse(profile).isAdmin)
      return true
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
    router.go('/home')
  }
}

const options = {
  theme: {
    primaryColor: 'black',
    logo: ''
  },
  languageDictionary: {
    emailInputPlaceholder: 'name@email.com',
    title: 'Se connecter'
  }
}

const lock = new Auth0Lock(process.env.AUTH0_CLIENT_ID, process.env.AUTH0_DOMAIN, options)

export {auth, lock}
