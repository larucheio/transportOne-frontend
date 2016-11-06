import {router} from './main'

export default {
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
  logout () {
    localStorage.removeItem('id_token')
    localStorage.removeItem('profile')
    router.go('/home')
  }
}
