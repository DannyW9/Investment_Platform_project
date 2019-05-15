<template lang="html">

  <ul>
    <h1>Recent News</h1>
    <NewsItem class="news" v-for="article in stockNews" :article="article" />
  </ul>

</template>

<script>
import NewsItem from './NewsItem.vue';
export default {
  props: ["stockNews"],
  components: {
    NewsItem
  }
}
</script>

<style lang="css" scoped>

.news {
  padding-left: 5%;
  width: 80%;
}

h1 {
  text-align: center;
  margin-left: -60px;
}
</style>
