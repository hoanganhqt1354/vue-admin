<template lang="">
  <div class="content">
    <div class="container-fluid">
      <h1>Welcome, {{ getCurrentUser.name }}</h1>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      getCurrentUser: 'GET_CURRENT_USER'
    }),
  },
}
</script>
<style lang="">
  
</style>