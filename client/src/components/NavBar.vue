<template lang="html">
<nav id="nav-bar" name="NavBar" class="NavBar">
  <br>
<br>
<br>
<br>
<br>
<br>
  <router-link :to="{ name: 'stocks'}"><h1 class="h">My Portfolio</h1></router-link>
    <SearchBar/>
</nav>
</template>

<script>
import {eventBus} from '../main.js'
import SearchBar from './SearchBar.vue'
import SearchItem from './SearchItem.vue'

export default {
  name: 'navbar',
  components: {
    SearchBar
  }
  // props: ['portfolio']
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
     font-family: sans-serif;
   }

</style>
