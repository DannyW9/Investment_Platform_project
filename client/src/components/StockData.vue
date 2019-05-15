<template lang="html">

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

</template>

<script>
export default {
  props: ["stockInfo"]
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

#stock-data {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
}

</style>
