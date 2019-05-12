<template lang="html">
  <div class="">
    <router-link :to="{ name: 'stockview', params: {stock} }">
    <li >{{stock.name}}</li>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'SearchItem',
  props:['stock']
}
</script>

<style lang="css" scoped>
</style>
