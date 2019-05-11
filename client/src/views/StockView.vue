<template lang="html">
  <div class="">
    <canvas id="planet-chart"></canvas>
    <h1>{{stockInfo.companyName}} - ({{stockInfo.symbol}})</h1>
    <h2>Sector: {{stockInfo.sector}}</h2>
  </div>
</template>

<script>
import Chart from 'chart.js';
import chartTest from '@/services/ChartService.js'
export default {
  name: "stockView",
  props: ["stock"],
  data(){
    return {
      planetChartData: chartTest,
      selectedStock: this.stock,
      stockInfo: {}
    }
  },

  methods: {
    createChart(chartId, chartData) {
      const ctx = chartId;
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      });
    }
  },

  mounted(){
    if(!this.stock) this.$router.push('/stocks');

    if (this.selectedStock) fetch(`https://api.iextrading.com/1.0/stock/${this.selectedStock.symbol}/batch?types=quote,news,chart&range=3m&last=10`)
    .then(response => response.json())
    .then((details) => {
      this.stockInfo = details.quote;
    });

    this.createChart('planet-chart', this.planetChartData);
  }
}
</script>

<style lang="css" scoped>
</style>
