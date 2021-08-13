<template lang="">
  <div class="content">
    <div class="container-fluid">
      <router-link class="" to="/admin/user/roles">Back to List</router-link>
      <UserRolesForm />
    </div>
  </div>
</template>
<script>
import UserRolesForm from '@/components/UserRolesForm'

export default {
  components: {
    UserRolesForm
  }
}
</script>
<style lang="">
  
</style>