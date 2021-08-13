<template lang="">
  <div v-if="notification.show" class="alert alert-success container-fluid" role="alert">
    {{notification.msg}}
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      notification: state => state.users.notification
    })
  }
}
</script>
<style>
    
</style>