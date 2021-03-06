
export const state = {
  debug: true,
  activeUser: 'Aucun',
  activeTab: 'HelloWorld'
}

export const mutations = {
  setActiveUser ( state, newValue ) {
    if (this.debug) { console.log('setActiveUserAction triggered with', newValue) }
    state.activeUser = newValue
  },
  clearActiveUser ( state ) {
    if (this.debug) { console.log('clearActiveUserAction triggered') }
    state.activeUser = 'Aucun'
  },
  setActiveTab (state, newValue) {
    if (this.debug) { console.log('setActiveTab triggered with', newValue) }
    state.activeTab = newValue
  }
}

export const getters = {
  getActiveUser () {
    return this.state.activeUser
  },
  getActiveTab () {
    return this.state.activeTab
  }
}

export const actions = {}
