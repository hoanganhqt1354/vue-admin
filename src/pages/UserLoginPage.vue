<template lang="">
  <div class="login-form">
    <h1>Login</h1>
    <form @submit.prevent="" autocomplete="off">
      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li class="danger" v-for="error in errors" :key="error.id">{{ error }}</li>
        </ul>
      </p>    
      <label>Username:</label>
      <input type="text" name="username" autocomplete="off" id="username" v-model="name">
      <label>Password:</label>
      <input type="password" name="password" autocomplete="off" id="password" v-model="password">
      <div class="danger" v-if="error.show">{{ error.msg }}</div>

      <!-- <div class="" v-if="load_checking">Checking...</div> -->
      <button type="submit" class="btn btn-info btn-fill" @click="handleSubmit" :disabled="loading">
        <template v-if="!loading">
          Login
        </template>
        <template v-else>
          <div>
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Checking...
          </div>       
        </template>
      </button>
      
    </form>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      name: '',
      password: '',
      errors: [],
    };
  },
  computed: {
    ...mapState({
      loading: state => state.users.loading,
      error: state => state.account.error
    })
  },
  methods: {
    ...mapActions({
      handleLogin: 'LOG_IN'
    }),
    handleSubmit() {
      this.errors = []
      if (!this.name) {
        this.errors.push('Username required.');
      }
      if (!this.password) {
        this.errors.push('Password required.');
      }
      if (this.name && this.password) {
        const userInfo = {
          name: this.name,
          password: this.password
        }
        console.log(userInfo)
      this.handleLogin(userInfo)
      }
    }
  },
};
</script>

<style lang="css" scoped>
body{
  min-height: unset!important;
}
.login-form {
  margin-top: 150px;
  
}
.login-form h1 {
  text-align: center;
}
form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: auto;
  background: white;
  padding: 30px 20px;
}
.login-form input {
  padding: 5px;
}
.login-form button {
  margin-top: 20px;
  padding: 5px;
  align-self: center;
  min-width: 100px;
}
.danger {
  color: red;
}
</style>
  
</style>