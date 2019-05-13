<template lang="html">
 <div id='app'>

    <NavBar/>

   <h1>Investment Hub</h1>
   <SearchBar/>
   <router-view id='view'/>
 </div>
</template>

<script>
import PortfolioView from './views/PortfolioView.vue';
import SearchBar from './components/SearchBar.vue';
import NavBar from './components/NavBar.vue';

export default {

  name: 'app',


  components: {
     PortfolioView,
     SearchBar,
     NavBar
  }

}

</script>

<style lang="css" scoped>
</style>
