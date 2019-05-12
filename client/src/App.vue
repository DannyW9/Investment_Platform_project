<template lang="html">



 <div id='app'>
    <NavBar/>
   <h1 class="h">Investment Hub</h1>
   <SearchBar/>

   <router-view id='view'/>

 </div>
</template>

<script>
import NavBar from '@/components/NavBar';
import PortfolioView from './views/PortfolioView.vue';
import SearchBar from './components/SearchBar.vue';

export default {

  name: 'app',


  components: {
     PortfolioView,

     NavBar,

     SearchBar
  }

}

</script>

<style lang="css" scoped>
.h {
     padding-left: 25%;
}
</style>
