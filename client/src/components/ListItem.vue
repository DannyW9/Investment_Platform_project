<template lang="html">
<div class="item">
  <router-link :to="{ name: 'stockview', params: {stock} }">
<li id ='item' class="nodot">
  <p>{{ stock.companyName }}</p>
  <p>No. of Shares: {{stock.numberOfShares}}</p>
  <p>Value: ${{ (stock.numberOfShares * this.quote.latestPrice).toFixed(2)}}</p>
  <p>{{(this.change).toFixed(2)}}%</p>
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
      quote: [],
      change: 0
    }
  },

methods:{
},

mounted(){
  fetch(`https://api.iextrading.com/1.0/stock/${this.stock.symbol}/batch?types=quote`)
  .then(res => res.json())
  .then(data => this.quote = data.quote)


  .then(() => {
    this.portfolio.forEach((holding) => {
      if(holding.symbol === this.quote.symbol){
        this.change = ((this.quote.latestPrice - holding.AVGPrice)/holding.AVGPrice) * 100;
      }
    })
  })
}


}
</script>

<style lang="css" scoped>

.item{
  border: solid;
  text-decoration: none;
}
.nodot {
  list-style-type: none;
  list-style: none;
}
</style>
