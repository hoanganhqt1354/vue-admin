<template>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="card-plain">
            <template slot="header">
              <h4 class="card-title">Roles</h4>
            </template>
            <Buttons title="Add role" url="/admin/user/roles/create"/>
            <div class="table-responsive">
              <l-table class="table-hover"
                       :columns="table.columns"
                       :data="table.data">
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
  import Card from '@/components/Cards/Card.vue'
  const tableColumns = ['Name', 'Operations']
  const tableData = [
    {
      name: 'Administrator',
      operations: 'edit'
    },
  ]
  export default {
    components: {
      LTable,
      Card,
      Buttons
    },
    data () {
      return {
        table: {
          columns: [...tableColumns],
          data: [...tableData]
        }
      }
    }
  }
</script>
<style>
</style>
