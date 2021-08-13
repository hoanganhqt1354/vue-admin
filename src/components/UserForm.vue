<template lang="">
  <Loading v-if="loading"/>
  <card v-else>
    <h4 slot="header" class="card-title">{{ editing ? 'Edit' : 'Add' }} user</h4>
    <form @submit.prevent="">
      <div class="row">
        <div class="col-12">
          <base-input type="text"
                    label="Name"
                    placeholder="Name"
                    v-model="user.name"
                    >
          </base-input>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <base-input type="text"
                    label="First name"
                    placeholder="First name"
                    v-model="user.firstname"
                    >
          </base-input>
        </div>
        <div class="col-6">
          <base-input type="text"
                    label="Last name"
                    placeholder="Last name"
                    v-model="user.lastname"
                    >
          </base-input>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <base-input type="email"
                    label="Email"
                    placeholder="Email"
                    v-model="user.email"
                    >
          </base-input>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <base-input type="password"
                    label="Password"
                    placeholder="****************"
                    v-model="user.password"
                    >
          </base-input>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <label>Role</label>
          <div v-for="(role, key) in roles" ::key="key" class="form-check">
            <input type="radio" :value="role.id" :id="role.name" name="role" v-model="user.role_id">

            <label class="form-check-label" :for="role.name">
              {{role.displayname}}
            </label>

          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="checkbox-active">
            <input class="form-check-input" 
            type="checkbox"
            id="activeCheckbox" 
            v-model="user.status"
            true-value=true
            false-value=false
            >
            <label class="form-check-label" for="activeCheckbox">
              Active
            </label>
          </div>
          </div>
        </div>
      </div>
      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li class="text-danger" v-for="error in errors" :key="error.id">{{ error }}</li>
        </ul>
      </p> 

      <div class="text-center">
        <div class="col-12">
        <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="handleClick" :disabled="loading"> 
          <template v-if="!loading">Submit</template>
          <template v-else>
            <div>
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Loading...
            </div>
          </template>
        </button>
        </div>
      </div>
      <div class="clearfix"></div>
    </form>
  </card>
</template>
<script>
import Card from '@/components/Cards/Card.vue'
import Loading from '@/components/Loading.vue'
import { mapActions, mapState } from 'vuex'
export default {
  components: {
    Card,
    Loading
  },
  data () {
    return{
      editing: false,
      errors: [],
    }
  },
  computed:{
    ...mapState({
      roles: state => state.users.roles,
      user: state => state.users.single_user,
      loading: state => state.users.loading,
    })
  },
  methods: {
    ...mapActions({
      getSingleUser: 'GET_SINGLE_USER',
      getRoles: 'GET_ROLES',
      addUser: 'ADD_USER',
      updateUser: 'UPDATE_USER',
    }),
    handleClick() {
      this.errors = []
      if (!this.user.role_id) {
        this.errors.push('Role is required.');   
      }
      if (!this.user.name) {
        this.errors.push('Name is required.');       
      }
      if (!this.user.password && !this.editing) {
        this.errors.push('Password is required.');       
      }    
      // const statusInt = parseInt(this.user.status)
      const roleIdInt = parseInt(this.user.role_id)
      if (this.editing === true) {
        const idInt = parseInt(this.$route.params.id)
        let payload = {...this.user, role_id: roleIdInt, id: idInt}
        this.updateUser(payload)
      }
      else {          
        const payload = {...this.user, role_id: roleIdInt}
        this.addUser(payload)
      }
      
    }

  },
  created() {
    if ("id" in this.$route.params) {
      this.editing = true;
      this.getSingleUser(this.$route.params.id)
    }
    this.getRoles()
  },
  destroyed() {
    this.$store.commit('SET_SINGLE_USER', {})
  },
}
</script>
<style>
.checkbox-active {
  margin-left: 20px;
}  
</style>