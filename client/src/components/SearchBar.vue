<template lang="html">

    <div class="search-container">
      <input type="text" class="input" v-model='searchValue' placeholder="Search for Company" v-on:input='displaySearchData'>
      <ul class="nodot">
        <searchItem v-for="stock in stockFound" :stock ='stock' v-if='searchValue'/>
      </ul>

    </div>


</template>

<script>
import StockService from '@/services/StockService.js'
import SearchItem from './SearchItem.vue'
import {eventBus} from '../main.js'
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
      const found = this.listOfCompanies.filter((stock) => {
        return stock.name.toLowerCase().includes(this.searchValue.toLowerCase())
        // console.log(found);
      })
      this.stockFound = found;
    }
  },
  mounted(){
    fetch('https://api.iextrading.com/1.0/ref-data/symbols')
    .then(res => res.json())
    .then(data => this.listOfCompanies = data);
    eventBus.$on('reset-search', (stock) => {
      this.searchValue = ''
    })
  }
}
</script>

<style lang="css" scoped>

.input {
    font-size:17pt;
    padding-left: 2px;
    }

.search-container {
    padding-top: 6px;
    padding-left: 8px;
    resize: horizontal;

   }
   .nodot {
     list-style-type: none;
     list-style: none;
   }

</style>
