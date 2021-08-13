export default {
  destroyed() {
    this.$store.commit('SET_NOTIFICATION', {})
  }
}