<template lang="">
  <card>
    <h4 slot="header" class="card-title">{{ editing ? 'Edit' : 'Add' }} user</h4>
    <form @submit.prevent="">
      <div class="row">
        <div class="col-12">
          <base-input type="text"
                    label="Name"
                    placeholder="Name"
                    :value="user.username"
                    >
          </base-input>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <base-input type="email"
                    label="Email"
                    placeholder="Email"
                    :value="user.email"
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
          <div v-for="(role, key) in roles" ::key="key" class="form-check">
            <input type="radio" :value="role.name" :id="role.name" name="role" v-model="user.role">

            <label class="form-check-label" :for="role.name">
              {{role.name}}
            </label>

          </div>
        </div>
      </div>
      <div class="text-center">
        <div class="col-12">
        <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="">
          Submit
        </button>
        </div>
      </div>
      <div class="clearfix"></div>
    </form>
  </card>
</template>
<script>
import Card from '@/components/Cards/Card.vue'
import { mapMutations, mapState } from 'vuex'
export default {
  components: {
    Card
  },
  data () {
    return{
      editing: false
    }
  },
  computed:{
    ...mapState({
      roles: state => state.users.roles,
      user: state => state.users.single_user
    })
  },
  methods: {
    ...mapMutations({
      setSingleUser: 'SET_SINGLE_USER'
    })
  },
  created() {
    if ("id" in this.$route.params) {
      this.editing = true;
      this.setSingleUser(this.$route.params.id)
    }
  },
  destroyed() {
    this.$store.commit('SET_SINGLE_USER', {})
  },
}
</script>
<style lang="">
  
</style>