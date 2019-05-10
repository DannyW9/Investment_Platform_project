<template lang="html">
<div class="">
<ul>
  <listItem v-for="stock in Portfolio" :stock ='stock'/>
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
  props: ['Portfolio']
}
</script>

<style lang="css" scoped>
</style>
