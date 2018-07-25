
export const state = {
  debug: true,
  state: {
    userToPresent: 'null'
  },
  setUserToPresentAction (newValue) {
    if (this.debug) { console.log('setUserToPresentAction triggered with', newValue) }
    this.state.message = newValue
  },
  clearUserToPresentAction () {
    if (this.debug) { console.log('clearUserToPresentAction triggered') }
    this.state.message = 'null'
  }
}

export const mutations = {}

export const getters = {}

export const actions = {}
