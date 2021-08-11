<template lang="">
  <div v-if="type">
    <router-link class="btn btn-primary btn-sm mr-2" :to="{name: 'UserEditPage', params: {id}}"> 
      Edit 
    </router-link>
    <button class="btn btn-danger btn-sm" @click="handleDeleteUser(id)"> 
      Delete 
    </button>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  props: {
    id: Number,
    type: String
  },
  methods: {
    ...mapMutations({
      deleteUser: 'DELETE_USER'
    }),
    handleDeleteUser(id) {
      if(confirm("Do you really want to delete?")){
        this.deleteUser(id)
      }
    }
  }
}
</script>
<style lang="">
  
</style>