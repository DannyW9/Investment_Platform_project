<template lang="html">
   <div>
    <List />
   </div>
</template>

<script>
import List from '../components/List.vue';
import StockService from '@/services/StockService.js'

export default {
  name: 'portfolioView',
  data(){
     return {
       portfolio: []
     }
  },
    components: {
    List
  },
  mounted(){
    StockService.getStocks()
      .then(portfolio => this.portfolio = portfolio)
  }

}
</script>

<style lang="css" scoped>
</style>
