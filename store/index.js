export const state = {
  user: null
}

export const mutations = {
  SET_USER (state, user) {
    state.user = user || null
  }
}

export const getters = {
  isAuthenticated (state) {
    return !!state.user
  },
  isAdmin (state) {
    return !!(state.user && state.user.app_metadata && state.user.app_metadata.isAdmin)
  },
  loggedUser (state) {
    return state.user
  }
}
