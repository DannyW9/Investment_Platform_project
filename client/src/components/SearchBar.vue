<template lang="html">
  <div class="top">
    <div class="search-container">
    <input type="text" v-model='searchValue' placeholder="Search for Company" v-on:input='displaySearchData' class="input">
    <ul>
      <searchItem v-for="stock in stockFound" :stock ='stock' v-if='searchValue'/>
    </ul>
  </div>
   <h1 class="h">Investment Hub</h1>
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
        console.log(found);
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

.top {
  background-image: url("../img/greenstk.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2;
  font-family: "Lucida Sans Unicode"
  }

.input {
  font-size:22pt;
  }

.h {
     font-size: 340%;
     text-align: center;
     font-family: 'Orbitron', sans-serif;
     color: #ff6a00;
   }

   .search-container {
     width:50%;
     float:left;
     padding-top: 20px;
   }

</style>
