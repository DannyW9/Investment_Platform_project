<template lang="html">
<div class="">
<li>
  <p>{{ stock.companyName }}</p>
  <p>{{ stock.numberOfShares}}</p>
</li>
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
