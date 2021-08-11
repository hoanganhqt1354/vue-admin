export default ({
  state: {
    users:[
      {
        id: 1,
        username: 'Dakota Rice',
        email: 'test123@gmail.abc',
        status: 'active',
        role: 'admin'
      },
      {
        id: 2,
        username: 'test',
        email: 'test456@gmail.abc',
        status: 'active',
        role: 'doctor'
      },
    ],
    roles:[
      {
        name: "admin",
        permissions: ["a1", "a2", "a3"]
      },
      {
        name: "doctor",
        permissions: ["a1"]
      },
    ],
    permissions: [
      {
        id: "a1",
        name: "View Assets"
      },
      {
        id: "a2",
        name: "Add Asset"
      },
      {
        id: "a3",
        name: "Modifiy Assets"
      }
    ],
    single_user: {},
  },
  mutations: {
    SET_SINGLE_USER: (state, payload) => {
      const user = state.users.find((user) => user.id === payload)
      console.log(user)
      if (user) {
        state.single_user = user
      }
      else {
        state.single_user = {}
      }
    },
    DELETE_USER: (state, payload) => {
      state.users = state.users.filter((user) => user.id !== payload)
    }
  },
  actions: {
  },
  modules: {
  }
})