<template lang="html">
<div class="item">
  <router-link :to="{ name: 'stockview', params: {stock} }">
<li id ='item'>
  <h3>{{ stock.companyName }}</h3><br>
  <p>No. of Shares: {{stock.numberOfShares}}</p><br>
  <p>Value: ${{ (stock.numberOfShares * this.quote.latestPrice).toFixed(2)}}</p><br>
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
  margin-left: 20%;
    margin-bottom: 5px;
    display: flex;
    flex-direction: row;
      width: 50%;
      border-radius: 5%;
      border-color: #FF6A00;
}
h3 {
   width: 100%;
   text-align: center;
   font-family: sans-serif;
}
li {
  list-style-type: none;
  list-style: none;
  font-family: sans-serif;
}
a {
  text-decoration:  none;
  color: black;
  margin-left: 20px;
}
#item{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}

</style>
