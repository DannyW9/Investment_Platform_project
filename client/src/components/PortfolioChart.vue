<template lang="html">
  <div class="">
  <p>Total Value: ${{(this.totalValue).toFixed(2)}}</p>
  <div class="">
  <canvas id="stock-price-chart"></canvas>
  </div>
  </div>
</template>

<script>
export default {
  name: 'Portfolio-chart',
  props:['portfolio'],
  data(){
    return{
      quotes:[],
      values:[],
      totalValue:0
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

    .then(() => {

      this.quotes.map((stock) => {
        this.values.push(stock['latestPrice'])
      })
    })
    .then(() => {
      this.totalValue = this.values.reduce((total, price) => {
        return total + price
    })
  })
}
}
</script>

<style lang="css" scoped>
</style>
