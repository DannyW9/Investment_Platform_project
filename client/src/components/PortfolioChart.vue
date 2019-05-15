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
      closingValues:[],
      all:[],
      dates:[]
    }
  },

  mounted(){
    const promises = this.portfolio.map((stock) => {
      return fetch(`https://api.iextrading.com/1.0/stock/${stock.symbol}/batch?types=quote,chart`)
      .then(res => res.json())
    })
    Promise.all(promises)
    .then(data => {
      data.forEach((stock) => {
        this.quotes.push(stock['quote'])
        this.charts.push(stock['chart'])
        this.all.push(stock)
      })
    })
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
      // I want an array with 20 elements, each element should be the sum of each days holding value for an indivual stock
      // [1000, 2000, 3000, 1000, 2000, 3000, 4000, 5000, 6000]

      this.portfolio.forEach((stock) => {
        this.all.forEach((share) => {
          if(stock.symbol === share.quote.symbol){
            share.chart.forEach( (day) => {
            this.closingValues.push([day.label, (day.close * stock.numberOfShares)])

            })
          }
        })
      })
    })

    .then(() => {
      this.closingValues.forEach((pair) => {
        this.chartData[pair[0]] = this.chartData[pair[0]] ? this.chartData[pair[0]] + pair[1]: pair[1];
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
