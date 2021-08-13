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
                <b-col v-for="role in roles" v-bind:key="role.name">{{role.displayname}}</b-col>
              </b-row>


              <b-row v-for="(permission, _key) in list_all_permissions" v-bind:key="_key" class="bodyRow">
                <b-col cols='3'>
                  <b-row class='headerRow' ref="model">
                    {{_key}}
                  </b-row>                
                  <b-row v-for="(item, key) in permission">{{item.name}}</b-row>
                </b-col>

                <b-col v-for="(role, index) in roles" v-bind:key="role.name">
                  <b-row class='headerRow' v-bind:style="heightStyle">
                    <!-- {{_key}} -->
                  </b-row>
                  <b-form-checkbox-group :id="role.name" :name="role.name + 'Permissions'"
                  v-for="(item, key) in permission" 
                  v-model="roles[index].permission[_key]"> 
                    <b-form-checkbox :value="item.id"/>
                  </b-form-checkbox-group>
                </b-col>
              </b-row>
            </div>
          </card>
          <div class="text-center">
            <div class="col-12">
              <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="handleClick" :disabled="loading">
                <template v-if="!loading">
                  Submit
                </template>
                <template v-else>
                  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Loading...
                </template>
              </button>
            </div>
          </div>
        </b-container>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import Card from '@/components/Cards/Card.vue'
import axios from 'axios'
import clearMessage from '@/mixins/clearMessage'
import { permissions as list_all_permissions } from '@/utils/constants'
export default {
  components:{
    Card
  },
  data() {
    return {
      list_all_permissions,
      heightStyle: {}
    }
  },
  computed: {
    ...mapState({
      // permissions: state => state.users.permissions,
      roles: state => state.users.roles,
      loading: state => state.users.loading,
    })
  },
  methods: {
    ...mapActions({
      getRoles: 'GET_ROLES',
      updateUserRole: 'UPDATE_USER_ROLE'
    }),
    matchHeight() {
        const heightString = this.$refs.model[0].offsetHeight + 'px';
        this.$set(this.heightStyle, 'height', heightString); 
    },
    handleClick() {
      this.$store.commit('SET_LOADING', true)
      axios.all(
        this.roles.map((role) => {
          const {id, displayname, permission} = role
          let convertPermission = JSON.stringify(permission)
          const payload = {
            id,
            displayname,
            permission: convertPermission
          }
          this.updateUserRole(payload)
        })
      
      )
      .catch(function(err) {
        console.warn('Error', err);
      })
      .finally(this.$store.commit('SET_LOADING', false))
      
    }
  },
  created() {
    this.getRoles()
  },
  mounted() {
    this.matchHeight();
  },
  
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