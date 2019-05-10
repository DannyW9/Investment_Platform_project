<template lang="html">
   <div>
    <List />
   </div>
</template>

<script>
import List from './components/List.vue';
export default {
  name: portfolioView,
  data(){
     return {
       portfolio: []
     }
  },
    components: {
    List
  },
  mounted(){
    this.fetchData();

  },
  methods: {
    fetchData(){
      fetch('http://localhost:3000/api/stocks')
      .then(res => res.json())
      .then(portfolio => this.portfolio = portfolio)

    }
  }
}
</script>

<style lang="css" scoped>
</style>
