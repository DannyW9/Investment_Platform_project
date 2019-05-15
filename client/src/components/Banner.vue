<template lang="html">
<div class="b">
         <a href="https://codeclan.com"><img class="logo" src="../img/logo.png" alt="CodeClan Homepage" title="Codeclan Homepage"></a>
         <h1>Investment Hub</h1>
</div>
</template>


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

h1 {
     font-size: 230%;
     text-align: center;
     font-family: sans-serif;
     color: #ff6a00;
   }

.logo {
     margin-top: 1%;
     margin-left: 1%;
     margin-bottom: 1%;

     float: left;
     width: 6%;
     height: 3%
      }

</style>
