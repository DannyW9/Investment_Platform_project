<template lang="html">
  <div class="">
    <input type="text" v-model='searchValue' placeholder="Search for Company" v-on:input='displaySearchData'>
    <ul>
      <searchItem v-for="stock in stockFound" :stock ='stock'/>
    </ul>

  </div>
</template>

<script>
import StockService from '@/services/StockService.js'
import SearchItem from './SearchItem.vue'

export default {
  name: 'SearchBar',

  data(){
    return{
      stockFound: [],
      searchValue: '',
      listOfCompanies: [],
    }
  },
  components:{
    SearchItem
  },

  methods:{
    displaySearchData(){
      let found = this.listOfCompanies.filter((stock) => {
        return stock.name.includes(this.searchValue)
        console.log(found);
      })
      this.stockFound = found;
    }

  },
  mounted(){
    fetch('https://api.iextrading.com/1.0/ref-data/symbols')
    .then(res => res.json())
    .then(data => this.listOfCompanies = data);
  }
}


</script>

<style lang="css" scoped>
</style>
