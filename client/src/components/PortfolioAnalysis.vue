<template lang="html">
  <div class="">
  <h2>Portfolio Analysis</h2>
  <div class="doughnut">
  <canvas id="diversification"></canvas>
  <p>Portfolio performance: {{(this.performance).toFixed(2)}}%</p>
  </div>

  </div>
</template>

<script>
var Lodash = require('lodash');
  import ChartService from '../services/ChartService.js'

export default {
  name: 'portfolioAnalysis',
  props: ['portfolio'],
  data(){
    return{
      quotes:[],
      sectors:[],
      valueOfInvestment:[],
      obj:{},
      newArray: [],
      array:[],
      unique:[],
      AvgTotal: [],
      currentTotal:[],
      start:0,
      current: 0,
      performance: 0
    }
  },

  methods:{


  },

  mounted(){
    const promises = this.portfolio.map((stock) => {
    return fetch(`https://api.iextrading.com/1.0/stock/${stock.symbol}/batch?types=quote`)
    .then(res => res.json())
  })
    Promise.all(promises)
    .then((data) => {
      const stocks = data;
      stocks.forEach((stock) => {
      this.quotes.push(stock['quote'])
    })})
      .then(() => {

      this.portfolio.forEach((stock) => {
        this.quotes.forEach((quote) => {
          if(stock.symbol === quote.symbol){
            this.obj = new Object()
            this.obj.sector = quote.sector
            this.obj.value = (stock.numberOfShares * quote.latestPrice)
            this.array.push(this.obj)
          }

        })
      })})

      .then(() => {
      this.array.forEach(element => {
        const reducedObj = this.array.filter(pair => pair.sector === element.sector)

        .reduce((result, el) => {
          result.value += el.value
          return result
        }, {value:0, sector: element.sector})
        this.newArray.push(reducedObj)
        this.unique = _.uniqBy(this.newArray, 'sector')
      })})

      .then(() => {

      this.unique.forEach((pair) => {
        this.sectors.push(pair.sector)
        this.valueOfInvestment.push(pair.value)
      })})


      .then(() => {
        ChartService.DivChart("diversification", this.valueOfInvestment, this.sectors);
      })

      .then(() => {
        this.portfolio.forEach((holding) => {
          this.quotes.forEach((quote) => {
            if(holding.symbol === quote.symbol){
            this.AvgTotal.push(holding.AVGPrice * holding.numberOfShares)
            this.currentTotal.push(quote.latestPrice * holding.numberOfShares)
          }
          })

        })


      })
      .then(() => {
        this.start = this.AvgTotal.reduce((total, num) => {
          return total + num
        })
        this.current = this.currentTotal.reduce((total, num) => {
          return total + num
        })
        this.performance = (this.current - this.start)/this.start * 100;
      })
  }
}
</script>

<style lang="css" scoped>
.doughnut{
  border: solid;
  padding-left: 5px;
  padding-bottom: 0px;
  width: 70%;
  height: 80%;
  margin-left: 14%;
}

h1, h2 {
       font-family: sans-serif;
    }


</style>
