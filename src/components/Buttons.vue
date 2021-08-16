<template>
  <div v-if="checkPermission">
    <router-link class="btn btn-dark btn-fill" :to="url">
      {{ title }}
    </router-link>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  props: {
    title: {
      type: String,
      default: 'Button'
    },
    url: {
      type: String,
      default: ''
    },
    checkPermission: Boolean
  },
  computed: {
    ...mapGetters({
      getCurrentUser: 'GET_CURRENT_USER'
    }),
  }
}
</script>
<style scoped>
</style>