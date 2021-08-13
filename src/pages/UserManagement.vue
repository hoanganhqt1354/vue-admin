<template>
  <div class="content">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <router-link class="nav-link" to="/admin/user/list">List</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/admin/user/roles">Roles</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/admin/user/permissions">Permissions</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>
<script>
import Notification from '@/components/Notification'
  export default {

  }
  
</script>
<style>

</style>
