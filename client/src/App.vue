<template lang="html">
 <div id='app' class="app">

    <NavBar/>
    <Banner/>
   <h1 class="h">Investment Hub</h1>
   <SearchBar/>
   <router-view id='view'/>
 </div>
</template>

<script>
import PortfolioView from './views/PortfolioView.vue';
import SearchBar from './components/SearchBar.vue';
import NavBar from './components/NavBar.vue';
// import Banner from './components/Banner.vue';

export default {

  name: 'app',


  components: {
     PortfolioView,
     SearchBar,
     NavBar,
     // Banner
  }

}

</script>

<style lang="css" scoped>

.h {
     padding-left: 25%;
     text-align: center;
     font-family: 'Bookman';
     color: gold;
   }

/* .app {
  background-image: url("./img/greenstk.jpeg");
  position: fixed;
  width: 100%;
  z-index: 2;
  font-family: "Lucida Sans Unicode"
} */

</style>
