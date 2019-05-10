<template lang="html">
<div class="">
  <router-link :to="{ name: 'stockview', params: {stock} }">
<li>
  <p>{{ stock.companyName }}</p>
  <p>{{ stock.numberOfShares}}</p>
</li>
</router-link>
</div>
</template>

<script>
export default {
  name: 'ListItem',
  props: ['stock']
}
</script>

<style lang="css" scoped>
</style>
