<template lang="html">
   <div class ="margin">
    <List :portfolio= 'portfolio'/>
   </div>
</template>

<script>

import List from '../components/List.vue';
import ListItem from '../components/ListItem.vue';
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
    ListItem
  },
  mounted(){
    StockService.getStocks()
      .then(portfolio => this.portfolio = portfolio)
  }

}
</script>

<style lang="css" scoped>
  .margin {
       padding-left: 20%;
  }


</style>
