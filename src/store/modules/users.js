import axios from "axios"
import router from "../../router"
const api_url = process.env.VUE_APP_API_URL
export default ({
  state: {
    loading: false,
    users:[],
    roles:[],
    permissions: [],
    single_user: {
      name: '',
      email: '',
      firstname: '',
      lastname: '',
      password: '',
      role_id: null,
      status: 0,
    },
    notification: {
      show: false,
      msg: ''
    },
    error: {
      show: false,
      msg: ''
    },
    single_role: {
      name: '',
      displayname: ''
    }
  },
  mutations: {
    SET_LOADING: (state, payload) => {
      state.loading = payload
    },
    SET_NOTIFICATION: (state, payload) => {
      state.notification = payload
    },

    SET_ERROR: (state, payload) => {
      state.error = payload
    },

    // USER.
    SET_LIST_USERS: (state, payload) => {
      state.users = payload
    },
    SET_SINGLE_USER: (state, payload) => {
      console.log({...payload})
      state.single_user = payload
    },
    DELETE_USER: (state, payload) => {
      state.users = state.users.filter((user) => user.id !== payload)
    },


    // ROLE.
    SET_ROLES: (state, payload) => {
      state.roles = payload
    },

    SET_SINGLE_ROLE:(state, payload) => {
      state.single_role = payload
    },

    DELETE_ROLE: (state, payload) => {
      state.roles = state.roles.filter((role) => role.id !== payload)
    },

  },
  actions: {
    // Get list all users.
    GET_LIST_USERS: ({commit}) => {
      commit('SET_LOADING', true)
      axios
        .get(`${api_url}api/Users`)
        .then((res) => {
          const list_users = res.data
          commit('SET_LIST_USERS', list_users)         
        })
        .catch((error) => {
          console.log(error)
          commit('SET_ERROR', {show: true, msg: error.response.data.message}) 
        })
        .finally(() => (commit('SET_LOADING', false)))
      
    },

    // Get single users.
    GET_SINGLE_USER: ({commit}, id) => {
      commit('SET_LOADING', true)
      axios
        .get(`${api_url}api/Users/${id}`)
        .then((res) => {
          const single_user = res.data
          console.log(single_user)
          const { name, email, password, firstname, lastname, role_id, status} = single_user
          const payload = {
            name,
            email,
            firstname,
            lastname,
            role_id,
            status,
          }
          commit('SET_SINGLE_USER', payload)         
        })
        .catch((error) => {
          console.log(error)
          commit('SET_ERROR', {show: true, msg: error.response.data.message}) 
        })
        .finally(() => (commit('SET_LOADING', false)))
    },

    // Add user.
    ADD_USER: ({commit}, payload) => {
      axios({
        method: 'post',
        url: `${api_url}api/Users/register`,
        data: payload,
        headers: {
          'Content-Type': 'application/json',
        }
      }).then((res) => { 
        router.push({name: 'UserList'})
        commit('SET_NOTIFICATION', {show: true, msg:res.data.message})
      })
      .catch((error) => {
        console.log("Error", error)
        commit('SET_ERROR', {show: true, msg: error.response.data.message}) 
      });
    },
    
    // Delete user.
    DELETE_USER: ({commit}, id) => {
      commit('SET_LOADING', true)
      commit('DELETE_USER', id)
      axios({
        method: 'delete',
        url: `${api_url}api/Users/${id}`,
        headers: {
          'Content-Type': 'application/json',
        }
      }).then((res) => {
        commit('SET_NOTIFICATION', {show: true, msg:res.data.message})

      })
      .catch((error) => {
        console.log("Error", error)
        commit('SET_ERROR', {show: true, msg: error.response.data.message}) 
      })
      .finally(() => (commit('SET_LOADING', false)))
    },

    // Update user.
    UPDATE_USER:({commit}, payload) => {
      axios({
        method: 'put',
        url: `${api_url}api/Users/${payload.id}`,
        data: payload,
        headers: {
          'Content-Type': 'application/json',
        }
      }).then((res) => {
        router.push({name: 'UserManagement'})
        commit('SET_NOTIFICATION', {show: true, msg:res.data.message})
      })
      .catch((error) => {
        console.log("Error", error.response)
        commit('SET_ERROR', {show: true, msg: error.response.data.message}) 
      });
    },


    // Get all roles.
    GET_ROLES: ({commit}) => {
      commit('SET_LOADING', true)
      axios
        .get(`${api_url}api/UserRoles`)
        .then((res) => {
          const list_roles = res.data
          const obj = list_roles.map((role) => {
            if (role.permission) {
              let permission = JSON.parse(role.permission)
              return {...role, permission}
            }
            else {
              return {...role}
            }
            
          })
          commit('SET_ROLES', obj)         
        })
        .catch((error) => {
          console.log(error)
          commit('SET_ERROR', {show: true, msg: error.response.data.message}) 
        })
        .finally(() => (commit('SET_LOADING', false)))
    },

    // Add roles.
    ADD_USER_ROLES: ({commit}, payload) => {
      console.log(payload)
      axios({
        method: 'post',
        url: `${api_url}api/UserRoles/register`,
        data: payload,
        headers: {
          'Content-Type': 'application/json',
        }
      }).then((res) => { 
        router.push({name: 'UserRoles'})
        commit('SET_NOTIFICATION', {show: true, msg:res.data.message})
      })
      .catch((error) => {
        console.log("Error", error)
        commit('SET_ERROR', {show: true, msg: error.response.data.message}) 
      });
    },

    // Get single role.
    GET_SINGLE_ROLE: ({commit}, id) => {
      commit('SET_LOADING', true)
      axios
        .get(`${api_url}api/UserRoles/${id}`)
        .then((res) => {
          const single = res.data
          const { name, displayname} = single
          const payload = {
            name,
            displayname
          }
          commit('SET_SINGLE_ROLE', payload)         
        })
        .catch((error) => {
          console.log(error)
          commit('SET_ERROR', {show: true, msg: error.response.data.message}) 
        })
        .finally(() => (commit('SET_LOADING', false)))
    },

    // Update role.
    UPDATE_USER_ROLE:({commit}, payload) => {
      axios({
        method: 'put',
        url: `${api_url}api/UserRoles/${payload.id}`,
        data: payload,
        headers: {
          'Content-Type': 'application/json',
        }
      }).then((res) => {
        console.log(res)
        commit('SET_NOTIFICATION', {show: true, msg:res.data.message})
        
      })
      .catch((error) => {
        console.log("Error", error)
        commit('SET_ERROR', {show: true, msg: error.response.data.message}) 
      });
    },

    // Delete role.
    DELETE_ROLE: ({commit}, id) => {
      commit('SET_LOADING', true)
      commit('DELETE_ROLE', id)
      axios({
        method: 'delete',
        url: `${api_url}api/UserRoles/${id}`,
        headers: {
          'Content-Type': 'application/json',
        }
      }).then((res) => {
        commit('SET_NOTIFICATION', {show: true, msg:res.data.message})
      })
      .catch((error) => {
        console.log("Error", error)
        commit('SET_ERROR', {show: true, msg: error.response.data.message}) 
      })
      .finally(() => (commit('SET_LOADING', false)))
    },

  },
  modules: {
  }
})