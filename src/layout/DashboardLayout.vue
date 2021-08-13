<template>
  <div class="wrapper">
    <side-bar title="VUE Admin">
      <!-- <mobile-menu slot="content"></mobile-menu> -->
      <sidebar-link v-for="(item, key) in links" :key="key" :to="item.url">
        <i :class="['nc-icon', item.icon]"></i>
        <p>{{ item.text }}</p>
      </sidebar-link>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>
      <Notification/>
      <Error/>
      <dashboard-content @click="toggleSidebar">
      </dashboard-content>
      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">

</style>
<script>
  import TopNavbar from './TopNavbar.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  import MobileMenu from './MobileMenu.vue'
  import Notification from '@/components/Notification'
  import Error from '@/components/Error'
  import { links } from '@/utils/constants'
  export default {
    data() {
      return {
        links
      }
    },
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent,
      MobileMenu,
      Notification,
      Error
    },
    methods: {
      toggleSidebar () {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      }
    },
  }

</script>
