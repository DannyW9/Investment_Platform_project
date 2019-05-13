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

  methods:{

    calculateInvestmentValue(){
      this.portfolio.forEach((stock) => {
        if(stock.symbol === this.quotes.forEach((quote) => {
          quote.symbol
        })){
          return stock.numberOfShares * quote.latestPrice
        }
      })
    }
  },

  mounted(){
    const promises = this.portfolio.map((stock) => {
    return fetch(`https://api.iextrading.com/1.0/stock/${stock.symbol}/batch?types=quote`)
    .then(res => res.json())
  })
    Promise.all(promises)
    .then(data => data.forEach((stock) => {
      this.quotes.push(stock['quote'])
    }))
  }
}
</script>

<style lang="css" scoped>
</style>
