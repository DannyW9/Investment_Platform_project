<template lang="html">
<nav id="nav-bar" class="NavBar">
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
  <router-link :to="{ name: 'stocks'}"><h3 class="h">My Portfolio</h3></router-link>
  <br>
  <router-link :to="{ name: 'stockview'}"><h3 class="h">Buy Stocks</h3></router-link>
</nav>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>

.NavBar {
    margin: 0;
    padding: 0;
    width: 20%;
    background-color: #f1f1f1;
    position: fixed;
    height: 100%;
    overflow: auto;
}

.NavBar a {
    display: block;
    color: black;
    padding: 16px;
    text-decoration: none;
}

.NavBar a.active {
    background-color: #4CAF50;
    color: white;
}

.NavBar a:hover:not(.active) {
    background-color: #555;
    color: white;
}

.h {
     /* font-size: 340%; */
     text-align: center;
     font-family: 'Orbitron', sans-serif;
     color: #ff6a00;
   }

</style>
