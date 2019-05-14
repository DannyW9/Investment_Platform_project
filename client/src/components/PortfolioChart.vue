<template lang="html">
  <div class="">
    <div class="value">
      <p>Total Value: ${{(this.totalValue).toFixed(2)}}</p>
    </div>
  <div class="">
  <canvas id="portfolio-chart"></canvas>
  </div>
  </div>
</template>

<script>
import Chart from 'chart.js';
import ChartService from '@/services/ChartService.js';
export default {
  name: 'Portfolio-chart',
  props:['portfolio'],
  data(){
    return{
      quotes:[],
      values:[],
      totalValue:0,
      chartData:[],
      chartValues:[],
      chartLabels:[],
      charts:[],
      holdingValues:[]
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
    }))

    .then(() => {

      this.quotes.map((stock) => {
        this.portfolio.forEach((share) => {
          if(share.symbol === stock.symbol){
            this.values.push((stock['latestPrice'] * share.numberOfShares))
          }
        })

      })
    })
    .then(() => {
      this.totalValue = this.values.reduce((total, price) => {
        return total + price
    })
  })

  .then(() => {


  this.charts.forEach((stock) => {
    stock.forEach((day) => {
      this.chartData[day.label] = this.chartData[day.label] ? this.chartData[day.label] + day.close: day.close;
    })
  })
  this.chartValues = Object.values(this.chartData)
  this.chartLabels = Object.keys(this.chartData)
  })

.then(() => {
  ChartService.portfolioChart("portfolio-chart", this.chartValues, this.chartLabels);
})

}
}
</script>

<style lang="css" scoped>
canvas {
  width: 50%;
  margin: auto;
}

.value{
  text-align: center;
}
</style>
