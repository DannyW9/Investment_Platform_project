<template lang="html">
<div class="item">
  <router-link :to="{ name: 'stockview', params: {stock} }">
<li id ='item'>
  <p>{{ stock.companyName }}</p>
  <p>No. of Shares: {{stock.numberOfShares}}</p>
  <p>Value: ${{ (stock.numberOfShares * this.latestPrice).toFixed(2)}}</p>
</li>
</router-link>
</div>
</template>

<script>
export default {
  name: 'ListItem',
  props: ['stock', 'portfolio'],
  data(){
    return{
      latestPrice: 0
    }
  },

methods:{
},

mounted(){
  fetch(`https://api.iextrading.com/1.0/stock/${this.stock.symbol}/batch?types=quote`)
  .then(res => res.json())
  .then(data => this.latestPrice = data.quote.latestPrice)
}


}
</script>

<style lang="css" scoped>

.item{
  border: solid;
  text-decoration: none;
}
</style>
