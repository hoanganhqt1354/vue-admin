import axios from "axios"
import router from "../../router"
import users from "./users"
const api_url = process.env.VUE_APP_API_URL
const currentUser = JSON.parse(localStorage.getItem('currentUser')) || null
export default {
  state: {
    status: currentUser ? { loggedIn: true } : {},
    user: currentUser || null,
    error: { show:false, msg:'' },
    loading: false,
  },
  mutations: {
    LOGIN_SUCCESS: (state, user) => {
      state.status = { loggedIn: true }
      state.user = user
    },
  
    LOGIN_FAIL: (state, msg) => {
      state.status = {}
      state.user = null
      state.error = {
        show: true,
        msg: msg
      }
    },
  
    LOGOUT: (state, user) => {
      state.status = {}
      state.user = null
    },
  
    SET_LOADING: (state, payload) => {
      state.loading = payload
    },
  },
  actions: {
    LOG_IN: ({commit}, userInfo) => {
      commit('SET_LOADING', true)
      axios.
        post(`${api_url}api/Users/authenticate`, userInfo)
        .then((res) => {
          const currentUser = res.data
          localStorage.setItem('currentUser', JSON.stringify(currentUser))
          commit('LOGIN_SUCCESS', currentUser)
          router.push({name:'Overview'})
        })
        .catch((error) => {
          console.log(error)
          commit('LOGIN_FAIL', 'Username or password is wrong')
        })
        .finally(() => commit('SET_LOADING', false))
  
    },
    LOG_OUT:({commit}) => {
      commit('LOGOUT')
      localStorage.removeItem('currentUser')
      router.push({name:'UserLogin'})
    },
  },
  getters: {
    GET_CURRENT_USER: (state) => {
      const infoUser = state.user
      return infoUser
    }
  }
}