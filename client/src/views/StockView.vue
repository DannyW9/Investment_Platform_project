<template lang="html">
  <div class="">
  <h1>{{stockInfo.companyName}} - ({{stockInfo.symbol}})</h1>
  <h2>Sector: {{stockInfo.sector}}</h2>
    </div>
</template>

<script>
export default {
  name: "stockView",
  props: ["stock"],
  data(){
    return {
      selectedStock: this.stock,
      stockInfo: {}
    }
  },
  mounted(){
    if(!this.stock) this.$router.push('/stocks');

    if (this.selectedStock) fetch(`https://api.iextrading.com/1.0/stock/${this.selectedStock.symbol}/batch?types=quote,news,chart&range=3m&last=10`)
    .then(response => response.json())
    .then((details) => {
      this.stockInfo = details.quote;
    })
  }
}
</script>

<style lang="css" scoped>
</style>
