<template lang="html">
  <div class="stock-info">

<p>{{this.selectedStock}}</p>
    <h1>{{stockInfo.companyName}} ({{stockInfo.symbol}})</h1>
    <h2>{{stockInfo.latestPrice}}</h2>
    <h3 :class="stockInfo.change < 0 ? 'red' : 'green'">{{stockInfo.change}} ({{stockInfo.changePercent}})</h3>
    <p>Primary Exchange: {{stockInfo.primaryExchange}}</p>
    <canvas id="stock-price-chart"></canvas>

    <div class="purchase-form">
      <form class="purchase" v-on:submit="purchaseStock" method="post">
        <label for="quantity"></label>
        <input type="number" id="quantity" v-model="quantity" placeholder="Enter quantity:" required>
        <input type="submit" id="purchase" value="Purchase Shares">
      </form>
    </div>

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
export default {
  name: "stockView",
  props: ["stock"],
  data(){
    return {
      selectedStock: this.stock,
      stockInfo: {},
      stockData: [],
      closeValues: [],
      labels: [],
      quantity: 0,
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
        numberOfShares: this.quantity + this.numberOfShares,
        AVGPrice: ((this.numberOfShares * this.AVGPrice) + (this.quantity * this.stockInfo.latestPrice) / (this.numberOfShares + this.quantity))
      }
      StockService.putStock(purchase, this.id)
      .then(res => res.json())
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
      .then(data => console.log('stuff we got back', data))
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
      this.latestPrice = this.stockInfo.latestPrice;
      ChartService.createChart("stock-price-chart", this.closeValues, this.labels);
      this.stockInfo.marketCap = this.currency(this.stockInfo.marketCap);
      this.stockInfo.week52High = this.currency(this.stockInfo.week52High);
      this.stockInfo.week52Low = this.currency(this.stockInfo.week52Low);
      this.stockInfo.latestPrice = this.currency(this.stockInfo.latestPrice);
      this.stockInfo.open = this.currency(this.stockInfo.open);
      this.stockInfo.previousClose = this.currency(this.stockInfo.previousClose);
      this.stockInfo.latestVolume = this.numberChange(this.stockInfo.latestVolume);
      this.stockInfo.avgTotalVolume = this.numberChange(this.stockInfo.avgTotalVolume);
      this.stockInfo.changePercent = this.percentage(this.stockInfo.changePercent);
      this.stockInfo.ytdChange = this.percentage(this.stockInfo.ytdChange);
      StockService.getStocks()
      .then(portfolio => this.portfolio = portfolio)
      .then(() => {
        this.portfolio.forEach((stock) => {
          if(stock.symbol === this.stockInfo.symbol){
            this.numberOfShares = stock.numberOfShares;
            this.AVGPrice = stock.AVGPrice;
            this.id = stock._id;
          }
        });
      })
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

</style>
