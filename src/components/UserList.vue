<template>
  <Loading v-if="loading"/>
  <div v-else class="container-fluid">
    <div class="row">
      <div class="col-12">
        <card class="card-plain">
          <template slot="header">
            <h4 class="card-title">List</h4>
          </template>
          <Buttons title="Add user" url="/admin/user/create" :checkPermission="checkPermission('add')" />
          <div class="table-responsive">
            <l-table class="table-hover"
                      type="user"
                      :columns="table.columns"
                      :data="filterUser"
                     >
            </l-table>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import LTable from '@/components/Table.vue'
import Buttons from '@/components/Buttons.vue'
import Loading from '@/components/Loading.vue'
import Card from '@/components/Cards/Card.vue'
import { mapActions, mapGetters, mapState } from 'vuex'
import clearMessage from '@/mixins/clearMessage'
import { checkPermission } from '@/utils/permission'
import { ROLE_ADMIN, ROLE_DOCTOR, ROLE_PATIENT } from '@/utils/constants'
const tableColumns = ['Id', 'Name', 'Email','Status', 'Role_name']
export default {
  components: {
    LTable,
    Card,
    Buttons,
    Loading
  },
  data () {
    return {
      table: {
        columns: [...tableColumns],
      }
    }
  },
  computed: {
    ...mapState({
      users: state => state.users.users,
      loading: state => state.users.loading,
    }),
    ...mapGetters({
      getCurrentUser: 'GET_CURRENT_USER'
    }),
    filterUser() {
      if (this.getCurrentUser.role_name === ROLE_DOCTOR) {
        return this.users.filter((user) => user.role_name !== ROLE_ADMIN)
      }
      else if (this.getCurrentUser.role_name === ROLE_PATIENT) {
        return this.users.filter((user) => user.name !== ROLE_ADMIN && user.name !== ROLE_DOCTOR)
      }
      else {
        return this.users
      }
    }
  },
  methods: {
    ...mapActions({
      getListUsers: 'GET_LIST_USERS'
    }),
    checkPermission
  },
  
  created() {
    this.getListUsers()
  },    
}
</script>
<style>
</style>
