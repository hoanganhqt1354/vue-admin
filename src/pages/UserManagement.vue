<template>
  <div class="content">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <router-link class="nav-link" to="/admin/user/list">List</router-link>
      </li>
      <li v-if="checkOnlyAdmin" class="nav-item">
        <router-link class="nav-link" to="/admin/user/roles">Roles</router-link>
      </li>
      <li v-if="checkOnlyAdmin" class="nav-item">
        <router-link class="nav-link" to="/admin/user/permissions">Permissions</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { ROLE_ADMIN } from '@/utils/constants'
export default {
  computed:{
    ...mapGetters({
      getCurrentUser: 'GET_CURRENT_USER'
    }),
    checkOnlyAdmin() {
      if (this.getCurrentUser.role_name === ROLE_ADMIN) return true
    }
  }
}
  
</script>
<style>

</style>
