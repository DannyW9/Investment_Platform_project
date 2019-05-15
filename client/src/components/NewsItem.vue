<template lang="html">

  <div class="article">
    <a :href="article.url">
      <p id="date">{{(article.datetime).replace("T", ", ")}} | {{article.source}}</p>
      <p id="headline">{{article.headline}}</p>
      <p id="summary">{{article.summary}}</p>
    </a>

    <hr>

  </div>

</template>

<script>
export default {
  data(){
    return{
      formatDate: ''
    }
  },
  props: ["article"],
  methods:{
  }
}
</script>

<style lang="css" scoped>

#date{
  font-size: 12px;
}

#headline {
  font-weight: bold;
  font-size: 26px;
}

p {
  color: black;
}

a {
  text-decoration: none;
}

.article {
  margin-left: 20px;
}

.article:hover {
  background-color: #D7D9D8;
  color: #FF6A00;
}

.article:hover p {
  color: #FF6A00;
}

</style>
