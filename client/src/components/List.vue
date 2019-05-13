<template lang="html">
<div class="">
<ul>
  <listItem v-for="stock in portfolio" :stock ='stock' :portfolio='portfolio'/>
</ul>
</div>
</template>

<script>
import ListItem from './ListItem.vue'
export default {
  name: 'List',
  components: {
    ListItem
  },
  props: ['portfolio']
}
</script>

<style lang="css" scoped>
</style>
