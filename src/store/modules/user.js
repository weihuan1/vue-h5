import { getToken, setToken, removeToken } from '@/utils/auth'
// import { login, getInfo } from '@/api/user'
import { login, getInfo } from '@/mock/user'
const user = {
  state: {
    token: getToken(),
    userinfo: ''
  },

  mutations: {
    SET_USEINFO: (state, userinfo) => {
      state.userinfo = userinfo
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    }
  },

  actions: {
    // 登录
    Login ({ commit }, params) {
      return new Promise((resolve, reject) => {
        login(params).then(response => {
          const data = response.result
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(async response => {
          const data = response.result
          commit('SET_USEINFO', data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
