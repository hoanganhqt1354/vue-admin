<template>
  <table class="table">
    <thead>
      <slot name="columns">
        <tr>
          <th v-for="column in columns" :key="column">{{column}}</th>
        </tr>
      </slot>
    </thead>
    <tbody>
    <tr v-for="(item, index) in data" :key="index">
      <slot :row="item">
        <td v-for="column in columns" :key="column" >
          <template v-if="hasValue(item, column)">        
            <template v-if="column === 'Status' && type==='user'">             
              {{ itemValue(item, column) === true ? 'Active' : 'Unactive' }}             
            </template>
            <template v-else>
              {{ itemValue(item, column) }}
            </template>
          </template>
        </td>
        <td><Operations :type="type" :id="itemValue(item, 'id')"/></td>      
      </slot>
    </tr>
    </tbody>
  </table>
</template>
<script>
import Operations from '@/components/Operations'
export default {
  name: 'l-table',
  components:{
    Operations
  },
  props: {
    columns: Array,
    data: Array,
    type: String
  },
  methods: {
    hasValue (item, column) {
      return item[column.toLowerCase()] !== 'undefined'
    },
    itemValue (item, column) {
      return item[column.toLowerCase()]
    }
  }
}
</script>
<style>
</style>
