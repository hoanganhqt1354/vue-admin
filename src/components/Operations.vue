<template lang="">
  <div v-if="type === 'user'">
    <router-link class="btn btn-primary btn-sm btn-fill mr-2" :to="{name: 'UserEditPage', params: {id}}"> 
      Edit 
    </router-link>
    <button class="btn btn-danger btn-fill btn-sm" @click="handleDeleteUser(id)"> 
      Delete 
    </button>
  </div>
  <div v-else-if="type === 'role'">
    <router-link class="btn btn-primary btn-sm btn-fill mr-2" :to="{name: 'UserRolesEdit', params: {id}}"> 
      Edit 
    </router-link>
    <button class="btn btn-danger btn-fill btn-sm" @click="handleDeleteRole(id)"> 
      Delete 
    </button>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  props: {
    id: Number,
    type: String
  },
  computed:{
    ...mapState({
      users: state => state.users.users,
    })
  },
  methods: {
    ...mapActions({
      deleteUser: 'DELETE_USER',
      deleteRole: 'DELETE_ROLE'
    }),
    handleDeleteUser(id) {
      if(confirm("Do you really want to delete?")){
        this.deleteUser(id)
      }
    },
    handleDeleteRole(id) {
      if(confirm("Do you really want to delete?")){
        this.deleteRole(id)
      }
    }
  }
}
</script>
<style lang="">
  
</style>