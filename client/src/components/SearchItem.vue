<template lang="html">
  <div class="">
    <router-link :to="{ name: 'stockview', params: {stock} }" v-on:click='reset'>
    <li>{{stock.name}}</li>
    </router-link>
  </div>
</template>

<script>
import {eventBus} from '../main.js';

export default {
  name: 'SearchItem',
  props:['stock'],

  methods:{
    reset(){
      eventBus.$emit('reset-search')
    }
  }
}
</script>

<style lang="css" scoped>
</style>
