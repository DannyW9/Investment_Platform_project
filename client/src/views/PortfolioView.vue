<template lang="html">
   <div class ="margin" v-if="portfolio.length > 1">
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
import SearchItem from '../components/SearchItem.vue';


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
    SearchItem
  },
  mounted(){
    StockService.getStocks()
      .then(portfolio => this.portfolio = portfolio)
      eventBus.$emit('search-stock', found)

  }

}
</script>

<style lang="css" scoped>

.margin {
     padding-top: 5%;
     padding-left: 25%;
}

</style>
