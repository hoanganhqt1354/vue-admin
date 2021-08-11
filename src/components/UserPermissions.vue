<template lang="">
  <div>
    <b-row>
      <b-col>
        <b-container>
          <card class="card-plain">
            <template slot="header">
              <h4 class="card-title">Permissions</h4>
            </template>
            <div id='permissionsTable'>
              <b-row class='headerRow'>
                <b-col cols='3'>Permissions</b-col>
                <b-col v-for="role in roles" v-bind:key="role.name">{{role.name}}</b-col>
              </b-row>
              <b-row v-for="permission in permissions" v-bind:key="permission.name" class="bodyRow">
                <b-col cols='3'>{{permission.name}}</b-col>
                <b-col v-for="(role, index) in roles" v-bind:key="role.name">
                  <b-form-checkbox-group 
                  :id="role.name" 
                  :name="role.name + 'Permissions'" 
                  v-model="roles[index].permissions" >  
                    <b-form-checkbox :value="permission.id"/>
                  </b-form-checkbox-group>
                </b-col>
              </b-row>
            </div>
          </card>
          <div class="text-center">
            <div class="col-12">
            <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="">
              Submit
            </button>
            </div>
          </div>
        </b-container>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Card from '@/components/Cards/Card.vue'
export default {
  components:{
    Card
  },
  computed: {
    ...mapState({
      permissions: state => state.users.permissions,
      roles: state => state.users.roles
    })
  }
}
</script>
<style>
.headerRow {
  padding: .75rem;
  background-color: #00000099;
  color: #ffffff;
  font-weight: bold;
  vertical-align: bottom;
  border-bottom: 2px solid #dee2e6;
}

.bodyRow {
  padding: .75rem;
  border-top: 1px solid #dee2e6;
}  
</style>