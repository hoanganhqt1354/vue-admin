<template lang="">
  <card>
    <h4 slot="header" class="card-title">Add user</h4>
    <form @submit.prevent="">
      <div class="row">
        <div class="col-12">
          <base-input type="text"
                    label="Name"
                    placeholder="Name"
                    >
          </base-input>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <base-input type="email"
                    label="Email"
                    placeholder="Email"
                    >
          </base-input>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <base-input type="password"
                    label="Password"
                    placeholder="Password"
                    >
          </base-input>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <label>Role</label>
          <div class="form-check">
            <input type="checkbox" value="" id="role-admin">
            <label class="form-check-label" for="role-admin">
              Admin
            </label>
          </div>

          <div class="form-check">
            <input type="checkbox" value="" id="role-test">
            <label class="form-check-label" for="role-test">
              Test
            </label>
          </div>

        </div>
      </div>
      <div class="text-center">
        <div class="col-12">
        <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="">
          Add User
        </button>
        </div>
      </div>
      <div class="clearfix"></div>
    </form>
  </card>
</template>
<script>
import Card from '@/components/Cards/Card.vue'

  export default {
    components: {
      Card
    },
    data () {
      return {
        user: {
        
        }
      }
    },
    methods: {
      updateProfile () {
        alert('Your data: ' + JSON.stringify(this.user))
      }
    }
  }
</script>
<style lang="">
  
</style>