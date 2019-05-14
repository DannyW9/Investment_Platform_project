<template lang="html">

  
   <div>
     <h1>Portfolio</h1>
     <portfolioChart :portfolio='portfolio'/>
     <h2>Your Investments</h2>

   <div class ="margin" v-if="portfolio.length > 1">
     <h1>Your Investments</h1>

    <List :portfolio= 'portfolio'/>
    <portfolioAnalysis :portfolio='portfolio'/>
   </div>
</template>

<script>
import List from '../components/List.vue';
import ListItem from '../components/ListItem.vue';
import PortfolioAnalysis from '../components/PortfolioAnalysis.vue';
import StockService from '@/services/StockService.js';

import PortfolioChart from '../components/PortfolioChart.vue';

import { eventBus } from '../main.js';


export default {
  name: 'portfolioView',
  data(){
     return {
       portfolio: []
     }
  },
    components: {
    List,
    ListItem,
    PortfolioAnalysis,
    PortfolioChart
  },
  mounted(){
    this.fetchData();
    eventBus.$on('refresh-data', this.fetchData);
  },
  methods: {
    fetchData(){
      StockService.getStocks()
      .then(portfolio => this.portfolio = portfolio);
    }
  }

}
</script>

<style lang="css" scoped>

.margin {
     padding-top: 5%;
     padding-left: 25%;
}

</style>
