const app = {
  state: {
    tabbar: 'mine'
  },

  mutations: {
    TOGGLE_TABBAR: (state, name) => {
      state.tabbar = name
    }
  },

  actions: {}
}

export default app
