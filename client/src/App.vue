<template lang="html">
 <div>
   <NavBar/>
   <h1>Hello</h1>
   <PortfolioView />
 </div>
</template>

<script>
import NavBar from '@/components/NavBar';
import PortfolioView from './views/PortfolioView.vue';
export default {

  name: 'app',


  components: {
     PortfolioView,
     NavBar
  }

}

</script>

<style lang="css" scoped>
</style>
