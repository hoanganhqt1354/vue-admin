<template lang="">
  <div v-if="error.show" class="alert alert-danger container-fluid" role="alert">
    {{error.msg}}
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      error: state => state.users.error
    })
  }
}
</script>
<style>
    
</style>