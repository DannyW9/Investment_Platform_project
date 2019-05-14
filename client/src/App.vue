<template lang="html">
 <div id='app'>

    <NavBar/>
    <Banner/>

   <h1>Investment Hub</h1>
   <SearchBar/>
   <router-view id='view'/>
 </div>
</template>

<script>
import PortfolioView from './views/PortfolioView.vue';
import SearchBar from './components/SearchBar.vue';
import NavBar from './components/NavBar.vue';
import Banner from './components/Banner.vue';

export default {

  name: 'app',


  components: {
     PortfolioView,
     SearchBar,
     NavBar,
     Banner
  }

}

</script>

<style lang="css" scoped>
</style>
