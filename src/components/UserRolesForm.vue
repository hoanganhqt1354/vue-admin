<template lang="">
  <card>
    <h4 slot="header" class="card-title">Add role</h4>
    <form @submit.prevent="">     
      <div class="row">
        <div class="col-12">
          <base-input type="text"
                    label="Role"
                    placeholder="Role"
                    >
          </base-input>
        </div>
      </div>
        
      <div class="text-center">
        <div class="col-12">
        <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="">
          Add Role
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
      }
    },
  }
</script>
<style lang="">
  
</style>