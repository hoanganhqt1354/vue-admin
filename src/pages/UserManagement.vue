<template>
  <div class="content">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <button :class="['nav-link', components === 'UserList' ? 'active' : '']" @click="components = 'UserList'">List</button>
      </li>
      <li class="nav-item">
        <button :class="['nav-link', components === 'UserRoles' ? 'active' : '']" @click="components = 'UserRoles'">Roles</button>
      </li>
    </ul>
    <component :is="components"/>
  </div>
</template>
<script>
  import UserList from '@/components/UserList.vue'
  import UserRoles from '@/components/UserRoles.vue'
  export default {
    components: {
      UserList,
      UserRoles
    },
    data () {
      return {
        components: "UserList"
      }
    }
  }
</script>
<style>

</style>
