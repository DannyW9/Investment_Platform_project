<template lang="html">
  <div class="r">

    <router-link :to="{ name: 'stockview', params: {stock} }" >
    <li @click='reset' >{{stock.name}}</li>
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
      eventBus.$emit('reset-search', this.stock)
    }
  }

}
</script>

<style lang="css" scoped>

.r {
     font-family: sans-serif;
   }

</style>
