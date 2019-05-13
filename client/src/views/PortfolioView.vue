<template lang="html">
   <div v-if="portfolio.length > 1">
     <h1>Your Investments</h1>
    <List :portfolio= 'portfolio'/>
    <portfolioAnalysis :portfolio='portfolio'/>
   </div>
</template>

<script>
import List from '../components/List.vue';
import ListItem from '../components/ListItem.vue';
import PortfolioAnalysis from '../components/PortfolioAnalysis.vue'
import StockService from '@/services/StockService.js';

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
    PortfolioAnalysis
  },
  mounted(){
    StockService.getStocks()
      .then(portfolio => this.portfolio = portfolio)
  }

}
</script>

<style lang="css" scoped>
</style>
