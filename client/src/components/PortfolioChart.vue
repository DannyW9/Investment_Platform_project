<template lang="html">
  <div class="">
  <p>Total Value: ${{(this.totalValue).toFixed(2)}}</p>
  <div class="">
  <canvas id="portfolio-chart"></canvas>
  </div>
  </div>
</template>

<script>
import Chart from 'chart.js';
import ChartService from '../services/ChartService.js';
export default {
  name: 'Portfolio-chart',
  props:['portfolio'],
  data(){
    return{
      quotes:[],
      values:[],
      totalValue:0,
      chartData:[],
      chartLabels:[],
      charts:[]
    }
  },

  mounted(){
    const promises = this.portfolio.map((stock) => {
    return fetch(`https://api.iextrading.com/1.0/stock/${stock.symbol}/batch?types=quote,chart`)
    .then(res => res.json())
  })
    Promise.all(promises)
    .then(data => data.forEach((stock) => {
      this.quotes.push(stock['quote'])
      this.charts.push(stock['chart'])
      console.log(this.charts)
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


  ChartService.createChart("portfolio-chart", this.chartData, this.chartLabels);
}
}
</script>

<style lang="css" scoped>
</style>
