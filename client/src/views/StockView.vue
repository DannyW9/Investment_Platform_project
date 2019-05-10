<template lang="html">
  <h1>{{stockInfo[companyName]}}</h1>
</template>

<script>
export default {
  name: "stockView",
  // props: ["stock"],
  data(){
    return {
      //selectedStock: this.stock,
      stockInfo: {}
    }
  },
  mounted(){
    //if(!this.stock) this.$router.push('/stocks');

    if(this.selectedStock) fetch('https://api.iextrading.com/1.0/stock/msft/batch?types=quote,news,chart&range=3m&last=10')
    .then(response => response.json())
    .then((details) => {
      this.stockInfo = details;
    })
  }
}
</script>

<style lang="css" scoped>
</style>
