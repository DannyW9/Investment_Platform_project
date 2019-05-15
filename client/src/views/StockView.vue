<template lang="html">
  <div class="stock-info">

    <h1>{{stockInfo.companyName}} ({{stockInfo.symbol}})</h1>
    <h2>{{stockInfo.latestPrice}}</h2>
    <h3 :class="stockInfo.change < 0 ? 'red' : 'green'">{{stockInfo.change}} ({{stockInfo.changePercent}})</h3>
    <p>Primary Exchange: {{stockInfo.primaryExchange}}</p>
    <canvas id="stock-price-chart"></canvas>

    <div class="purchase-form">
      <form v-if="this.numberOfShares > 0" class="purchase" v-on:submit="updateStock" method="put">
        <input type="number" class="quantity" v-model="quantity" placeholder="Enter quantity:" min="1" required>
        <input type="submit" class="purchaseButton" value="Purchase More Shares">
      </form>

      <form v-else class="purchase" v-on:submit="purchaseStock" method="post">
        <input type="number" class="quantity" v-model="quantity" placeholder="Enter quantity:" min="1" required>
        <input type="submit" class="purchaseButton" value="Purchase Shares">
      </form>
    </div>

    <p v-if="numberOfShares">You currently own {{numberOfShares}} shares in {{stockInfo.companyName}}</p>

    <form v-if="numberOfShares" class="sell" v-on:submit="sellStock" method="post">
      <input type="number" class="quantity" v-model="sellAmount" placeholder="Enter quantity:" min="1" :max="numberOfShares" required>
      <input type="submit" class="sellButton" value="Sell Shares">
    </form>

    <p v-if="sellAmount">Selling {{sellAmount}} shares in {{stockInfo.companyName}} will result in a net <span :class="AVGPrice < latestPrice ? 'green' : 'red'">{{profitLoss()}}</span> of <span :class="AVGPrice < latestPrice ? 'green' : 'red'">{{checkAmount()}}</span> </p>


    <stockData :stockInfo="stockInfo"/>

    <hr class="split">

    <newsFeed :stockNews="stockNews"/>

  </div>

</template>

<script>
import Chart from 'chart.js';
import StockData from '@/components/StockData.vue'
import NewsFeed from '@/components/NewsFeed.vue'
import numeral from 'numeral-es6';
import ChartService from '@/services/ChartService.js';
import StockService from '@/services/StockService.js';
import { eventBus } from '@/main.js';
export default {
  name: "stockView",
  props: ["stock"],
  data(){
    return {
      selectedStock: this.stock,
      stockInfo: {},
      stockData: [],
      stockNews: [],
      volume: [],
      change: [],
      closeValues: [],
      labels: [],
      quantity: '',
      sellAmount: '',
      portfolio: [],
      numberOfShares: 0,
      AVGPrice: 0,
      id: '',
      latestPrice: 0
    }
  },

  components: {
    StockData,
    NewsFeed
  },

  methods: {
    getCloseValues(){
      for (let data of this.stockData){
        this.closeValues.push(data.close);
      }
    },

    getVolume(){
      for (let data of this.stockData){
        this.volume.push(data.volume)
      }
    },

    getChange(){
      for (let data of this.stockData){
        this.change.push(data.change)
      }
    },

    getLabels(){
      for(let data of this.stockData){
        this.labels.push(data.label);
      }
    },

    profitLoss(){
      if(this.AVGPrice < this.latestPrice){
        return 'PROFIT';
      } else {
        return 'LOSS';
      }
    },

    checkAmount(){
      const amount = (this.latestPrice * parseInt(this.sellAmount, 10)) - (this.AVGPrice * parseInt(this.sellAmount, 10));
      return this.currency(amount);
    },

    numberChange(x){
      return x.toLocaleString('en');
    },

    currency(x){
      return numeral(x).format('$0.00a');
    },

    percentage(x){
      return numeral(x).format('0.00%');
    },

    updateStock(e){
      e.preventDefault()
      const purchase = {
        symbol: this.stockInfo.symbol,
        companyName: this.stockInfo.companyName,
        numberOfShares: parseInt(this.quantity, 10) + this.numberOfShares,
        AVGPrice: ((this.numberOfShares * this.AVGPrice) + ((parseInt(this.quantity, 10)) * this.latestPrice)) / (this.numberOfShares + parseInt(this.quantity, 10))
      }
      StockService.putStock(purchase, this.id)
      .then(data => eventBus.$emit('refresh-data'))
      .then(this.$router.push('/stocks'))
    },

    purchaseStock(e){
      e.preventDefault()
      const purchase = {
        symbol: this.stockInfo.symbol,
        companyName: this.stockInfo.companyName,
        numberOfShares: parseInt(this.quantity, 10),
        AVGPrice: this.latestPrice
      }
      StockService.postStock(purchase)
      .then(data => eventBus.$emit('refresh-data'))
      .then(this.$router.push('/stocks'))
    },

    sellStock(e){
      e.preventDefault()
      if(parseInt(this.sellAmount, 10) === this.numberOfShares){
        StockService.deleteStock(this.id);
      }
      const sell = {
        symbol: this.stockInfo.symbol,
        companyName: this.stockInfo.companyName,
        numberOfShares: this.numberOfShares - parseInt(this.sellAmount, 10),
        AVGPrice: this.AVGPrice
      }
      StockService.putStock(sell, this.id)
      .then(data => eventBus.$emit('refresh-data'))
      .then(this.$router.push('/stocks'))
    }


  },

  mounted(){
    if(!this.stock) this.$router.push('/stocks');

    if (this.selectedStock) fetch(`https://api.iextrading.com/1.0/stock/${this.selectedStock.symbol}/batch?types=quote,news,chart&range=1m&last=10`)
    .then(response => response.json())
    .then((details) => {
      this.stockInfo = details.quote;
      this.stockData = details.chart;
      this.stockNews = details.news;
      this.getCloseValues();
      this.getLabels();
      this.getVolume();
      this.getChange();

      const info = this.stockInfo;
      this.latestPrice = info.latestPrice;
      ChartService.createChart("stock-price-chart", this.closeValues, this.labels, this.volume, this.change);

      info.marketCap = this.currency(info.marketCap);
      info.week52High = this.currency(info.week52High);
      info.week52Low = this.currency(info.week52Low);
      info.latestPrice = this.currency(info.latestPrice);
      info.open = this.currency(info.open);
      info.previousClose = this.currency(info.previousClose);

      info.latestVolume = this.numberChange(info.latestVolume);
      info.avgTotalVolume = this.numberChange(info.avgTotalVolume);

      info.changePercent = this.percentage(info.changePercent);
      info.ytdChange = this.percentage(info.ytdChange);

      StockService.getStocks()
      .then(portfolio => this.portfolio = portfolio)
      .then(() => {
        this.portfolio.forEach((stock) => {
          if(stock.symbol === info.symbol){
            this.numberOfShares = stock.numberOfShares;
            this.AVGPrice = stock.AVGPrice;
            this.id = stock._id;
          };
        });
      });
    });


  }

}
</script>

<style lang="css" scoped>

.stock-info {
  padding-top: 5%;
  padding-left: 15%;
  text-align: center;
}

canvas {
  width: 50%;
  margin: auto;
}

.green {
  color: green;
}

.red {
  color: red;
}

.purchaseButton{
  background-color: #D7D9D8;
  text-transform: uppercase;
  color: green;
  padding: 5px;
  border: 4px solid #D7D9D8;
  border-radius: 6px;
  width: 20%;
}

.purchaseButton:hover {
  color: white;
  background-color: limegreen;
  border-color: limegreen;
  transition: all 0.4s ease 0s;
}

.sellButton {
  background-color: #D7D9D8;
  text-transform: uppercase;
  color: red;
  padding: 5px;
  border: 4px solid #D7D9D8;
  border-radius: 6px;
  width: 20%;
}

.sellButton:hover {
  color: white;
  background-color: red;
  border-color: red;
  transition: all 0.4s ease 0s;
}

input[type=number]{
  width: 12%;
  padding: 7px;
  margin: 10px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

h1, h2 {
       font-family: sans-serif;
    }


.split {
  border-top: 4px solid #FF6A00;
}

</style>
