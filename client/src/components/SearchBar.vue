<template lang="html">
  <div class="">
    <input type="text" v-model='searchValue' placeholder="Search by company name" v-on:input='displaySearchData'>
    <ul>
      <li v-for="stock in stockFound">{{stock.name}}</li>
    </ul>
  </div>
</template>

<script>
import StockService from '@/services/StockService.js'

export default {
  name: 'SearchBar',

  data(){
    return{
      stockFound: [],
      searchValue: '',
      listOfCompanies: [],
      stockToDisplay: {}
    }
  },

  methods:{
    displaySearchData(){
      let found = this.listOfCompanies.filter((stock) => {
        return stock.name.includes(this.searchValue)
        console.log(found);
      })
      this.stockFound = found;

      fetch(`https://api.iextrading.com/1.0/stock/${this.stockFound.symbol}/batch?types=quote`)
      .then(res => res.json())
      .then(data => this.stockToDisplay = data);
    }
  },
  mounted(){
    fetch('https://api.iextrading.com/1.0/ref-data/symbols')
    .then(res => res.json())
    .then(data => this.listOfCompanies = data);

    if (this.stockFound.count() === 1 ){
      this.stockToDisplay = this.stockFound
    }
    }

}
</script>

<style lang="css" scoped>
</style>
