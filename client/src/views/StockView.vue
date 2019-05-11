<template lang="html">
  <div class="">
    <canvas id="planet-chart"></canvas>
    <h1>{{stockInfo.companyName}} - ({{stockInfo.symbol}})</h1>
    <h2>Sector: {{stockInfo.sector}}</h2>
    <p>{{stockData[0]}}</p>
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
    // createChart(chartId, chartData) {
    //   const ctx = chartId;
    //   const myChart = new Chart(ctx, {
    //     type: chartData.type,
    //     data: chartData.data,
    //     options: chartData.options
    //   })
    // createChart(){


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

    if (this.selectedStock) fetch(`https://api.iextrading.com/1.0/stock/${this.selectedStock.symbol}/batch?types=quote,news,chart&range=3m&last=10`)
    .then(response => response.json())
    .then((details) => {
      this.stockInfo = details.quote;
      this.stockData = details.chart;
      this.getCloseValues();
      this.getLabels();
      // this.createChart();
      ChartService.createChart("planet-chart", this.closeValues, this.labels);
    });
    // this.createChart('planet-chart', this.planetChartData);

  }
}
</script>

<style lang="css" scoped>
</style>
