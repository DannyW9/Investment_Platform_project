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

    <p v-if="this.numberOfShares">You currently own {{this.numberOfShares}} shares in {{this.stockInfo.companyName}}</p>

    <form v-if="this.numberOfShares" class="sell" v-on:submit="sellStock" method="post">
      <input type="number" class="quantity" v-model="sellAmount" placeholder="Enter quantity:" min="1" :max="this.numberOfShares" required>
      <input type="submit" class="sellButton" value="Sell Shares">
    </form>

    <div id="stock-data">

      <div>
        <h3 class="title">At a Glance</h3>
        <div id="left-div">
          <div>
            <p class="heading">Open</p>
            <p>{{stockInfo.open}}</p>
            <hr>
            <p class="heading">Previous Close</p>
            <p>{{stockInfo.previousClose}}</p>
            <hr>
          </div>
          <div class="inner-div">
            <p class="heading">Volume</p>
            <p>{{stockInfo.latestVolume}}</p>
            <hr>
            <p class="heading">Market Cap</p>
            <p>{{stockInfo.marketCap}}</p>
            <hr>
          </div>
        </div>
      </div>

      <div class="vertical"></div>

      <div>
        <h3>Key Statistics</h3>
        <div id="right-div">
          <div>
            <p class="heading">P/E Ratio</p>
            <p>{{stockInfo.peRatio}}</p>
            <hr>
            <p class="heading">Average Volume</p>
            <p>{{stockInfo.avgTotalVolume}}</p>
            <hr>
          </div>
          <div class="inner-div">
            <p class="heading">52 Week Range</p>
            <p>{{stockInfo.week52Low}} - {{stockInfo.week52High}}</p>
            <hr>
            <p class="heading">YTD Change</p>
            <p>{{ (stockInfo.ytdChange) }}</p>
            <hr>
          </div>
        </div>
      </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import Chart from 'chart.js';
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

.vertical {
  border-left: 4px solid #FF6A00;
  height: 200px;
  padding: 10px;
  margin-left: 50px;
  margin-right: 50px;
}

.heading{
  font-size: 12px;
  text-transform: uppercase;
}

.inner-div {
  margin-left: 30px;
}

#left-div, #right-div {
  text-align: left;
  line-height: 0.3;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.stock-info {
  padding-top: 5%;
  padding-left: 15%;
  text-align: center;
}

canvas {
  width: 50%;
  margin: auto;
}

#stock-data {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
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

</style>
