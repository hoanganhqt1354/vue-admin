<template lang="">
  <div class="content">
    <div class="container-fluid">
      <UserForm />
    </div>
  </div>
</template>
<script>
import UserForm from '@/components/UserForm'

export default {
  components: {
    UserForm
  },
  destroyed() {
  console.log('destroy')
  }
}
</script>
<style lang="">
  
</style>