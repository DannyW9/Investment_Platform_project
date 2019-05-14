<template lang="html">
<div class="b">
     <h1 class="h">Investment Hub</h1>
</div>
</template>

<script>

export default {
    name: 'Banner'
}
</script>

<style lang="css" scoped>

.b {
  background-image: url("../img/financial-banner.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2;
  }

.input {
  font-size:22pt;
  }

.h {
     font-size: 340%;
     text-align: center;
     font-family: sans-serif;
     color: #ff6a00;
   }

   .search-container {
     width:50%;
     float:left;
     padding-top: 20px;
   }

</style>
