<template lang="">
  <Loading v-if="loading"/>
  <card v-else>
    <h4 slot="header" class="card-title">{{ editing ? 'Edit' : 'Add' }} role</h4>
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li class="text-danger" v-for="error in errors" :key="error.id">{{ error }}</li>
      </ul>
    </p> 
    <form @submit.prevent="">     
      <div class="row">
        <div class="col-12">
          <base-input type="text"
                    label="Display name"
                    placeholder="Display name"
                    v-model="role.displayname"
                    >
          </base-input>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <i>Machine name: {{role.name ? role.name : roleName  }}</i>
        </div>
      </div>
    
      <div class="text-center">
        <div class="col-12">
        <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="handleClick">
          {{ editing ? 'Edit' : 'Add' }} Role
        </button>
        </div>
      </div>
      <div class="clearfix"></div>
    </form>
  </card>
</template>
<script>
import Card from '@/components/Cards/Card.vue'
import { mapActions, mapState } from 'vuex'
import Loading from '@/components/Loading.vue'
import clearMessage from '@/mixins/clearMessage'
export default {
  components: {
    Card,
    Loading
  },
  data () {
    return {
      errors: [],
      editing: false,
    }
  },
  computed:{
    ...mapState({
      role: state => state.users.single_role,
      loading: state => state.users.loading,
    }),
    roleName() {
      if (this.role.displayname) {
        return this.role.displayname.trim().toLowerCase().replaceAll(" ", "_")

      }  
    }
  },
  methods: {
    ...mapActions({
      addRole: 'ADD_USER_ROLES',
      getSingleRole: 'GET_SINGLE_ROLE',
      updateUserRole: 'UPDATE_USER_ROLE'
    }),
    handleClick() {
      this.errors = []
      if (!this.role.displayname) {
        this.errors.push('Display name is required.'); 
      }
      else {
        const roleIdInt = parseInt(this.$route.params.id)
        if (this.editing) {
          const payload = {
            id: roleIdInt,
            displayname: this.role.displayname,
            permission: ''
          }
          this.updateUserRole(payload).then(this.$router.push({name:'UserRoles'}))
        }
        else {
          const payload = {...this.role, name: this.roleName, permission: ''}
          this.addRole(payload)
        }
        
      }
    }
  },
  mixins:['clearMessage'],

  created() {
    if ("id" in this.$route.params) {
      this.editing = true;
      this.getSingleRole(this.$route.params.id)
    }
  },
}
</script>
<style lang="">
  
</style>