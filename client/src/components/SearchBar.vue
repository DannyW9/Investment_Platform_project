<template lang="html">
  <div class="">
    <input type="text" v-model='searchValue' placeholder="Search by company name" v-on:input='displaySearchData'>
    <ul>
      <li v-for="stock in objectsFound">{stock.companyName}</li>
    </ul>
  </div>
</template>

<script>
import StockService from '@/services/StockService.js'

export default {
  name: 'SearchBar',

  data(){
    return{
      objectsFound: [],
      searchValue: '',
      listOfCompanies: []
    }
  },

  methods:{
    displaySearchData(){
      fetch(`https://api.iextrading.com/1.0/stock/${this.searchValue}/batch?types=quote,news,chart&range=3m&last=10`)
      .then(res => res.json())
      .then(data => this.listOfCompanies = data)

      const found = this.listOfCompanies.filter((stock) => {
        return stock.companyName.includes(this.searchValue)
      })
      this.objectsFound = found;
      // event bus for displaying in stocks component
    }

  }
}
</script>

<style lang="css" scoped>
</style>
