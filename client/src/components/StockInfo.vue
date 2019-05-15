<template lang="html">
  <div class="stockInfo">

  <h1>{{stockInfo.companyName}} ({{stockInfo.symbol}})</h1>
  <h2>{{stockInfo.latestPrice}}</h2>
  <h3 :class="stockInfo.change < 0 ? 'red' : 'green'">{{stockInfo.change}} ({{stockInfo.changePercent}})</h3>
  <p>Primary Exchange: {{stockInfo.primaryExchange}}</p>
  </div>
</template>

<script>
export default {
  props: ["stockInfo"]
}
</script>

<style lang="css" scoped>

.green {
  color: green;
}

.red {
  color: red;
}

</style>
