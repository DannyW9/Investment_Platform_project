<template lang="html">
  <div class="stock-info">

    <h1>{{stockInfo.companyName}}</h1>
    <h2>{{stockInfo.symbol}}</h2>
    <p>Primary Exchange: {{stockInfo.primaryExchange}}</p>
    <canvas id="stock-price-chart"></canvas>

    <div id="stock-data">
      <div id="left-div">
        <h1>Hello Left</h1>
      </div>
      <div id="right-div">
        <h1>Hello Right</h1>
      </div>
    </div>

  </div>
</template>

<script>
import Chart from 'chart.js';
import ChartService from '@/services/ChartService.js'
export default {
  name: "stockView",
  props: ["stock"],
  data(){
    return {
      // planetChartData: chartTest,
      selectedStock: this.stock,
      stockInfo: {},
      stockData: [],
      closeValues: [],
      labels: []
    }
  },

  methods: {
    getCloseValues(){
      for (let data of this.stockData){
        this.closeValues.push(data.close);
      }
    },

    getLabels(){
      for(let data of this.stockData){
        this.labels.push(data.label);
      }
    }
  },

  mounted(){
    if(!this.stock) this.$router.push('/stocks');

    if (this.selectedStock) fetch(`https://api.iextrading.com/1.0/stock/${this.selectedStock.symbol}/batch?types=quote,news,chart&range=1m&last=10`)
    .then(response => response.json())
    .then((details) => {
      this.stockInfo = details.quote;
      this.stockData = details.chart;
      this.getCloseValues();
      this.getLabels();
      ChartService.createChart("stock-price-chart", this.closeValues, this.labels);
    });

  }
}
</script>

<style lang="css" scoped>

.stock-info {
  text-align: center;
}

canvas {
  width: 50%;
  margin: auto;
}

#stock-data {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
}

</style>
