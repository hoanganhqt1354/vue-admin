<template>
  <Loading v-if="loading"/>
  <div v-else class="container-fluid">
    <div class="row">
      <div class="col-12">
        <card class="card-plain">
          <template slot="header">
            <h4 class="card-title">List</h4>
          </template>
          <Buttons title="Add user" url="/admin/user/create"/>
          <div class="table-responsive">
            <l-table class="table-hover"
                      type="user"
                      :columns="table.columns"
                      :data="users">
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
import { mapActions, mapState } from 'vuex'
import clearMessage from '@/mixins/clearMessage'
const tableColumns = ['Id', 'Name', 'Email','Status', 'Role']
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
      
    })
  },
  methods: {
    ...mapActions({
      getListUsers: 'GET_LIST_USERS'
    })
  },
  mixins:[clearMessage],
  created() {
    this.getListUsers()
  },    
}
</script>
<style>
</style>
