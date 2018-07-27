
export const state = {
  debug: true,
  userToPresent: 'null',
  activeTab: 'HelloWorld'
}

export const mutations = {
  setUserToPresentAction ( state, newValue ) {
    if (this.debug) { console.log('setUserToPresentAction triggered with', newValue) }
    state.userToPresent = newValue
  },
  clearUserToPresentAction ( state ) {
    if (this.debug) { console.log('clearUserToPresentAction triggered') }
    state.userToPresent = 'null'
  },
  setActiveTab (state, newValue) {
    if (this.debug) { console.log('setActiveTab triggered with', newValue) }
    state.activeTab = newValue
  }
}

export const getters = {
  getUserToPresent ( state ) {
    return state.userToPresent
  },
  getActiveTab ( state ) {
    return state.activeTab
  }
}

export const actions = {}
