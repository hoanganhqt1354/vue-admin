<template>
  <div>
    <router-link class="btn btn-primary" :to="url">
      {{ title }}
    </router-link>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Button'
    },
    url: {
      type: String,
      default: ''
    }
  }
}
</script>
<style>
  
</style>