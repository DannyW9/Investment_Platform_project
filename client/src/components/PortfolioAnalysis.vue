<template lang="html">
  <div class="">
  <h2>Portfolio Analysis</h2>
  </div>
</template>

<script>
export default {
  name: 'portfolioAnalysis',
  props: ['portfolio'],
  data(){
    return{
      quotes:[]
    }
  },



  mounted(){
    const promises = this.portfolio.map((stock) => {
    return fetch(`https://api.iextrading.com/1.0/stock/${stock.symbol}/batch?types=quote`)
    .then(res => res.json())
  })
    Promise.all(promises)
    .then(data => this.quotes = data)
  }
}
</script>

<style lang="css" scoped>
</style>
