<template lang="">
  <div class="content">
    <div class="container-fluid">
      <router-link class="" to="/admin/user/list">Back to List</router-link>
      <UserForm />
    </div>
  </div>
</template>
<script>
import UserForm from '@/components/UserForm'

export default {
  components: {
    UserForm
  }
}
</script>
<style lang="">
  
</style>