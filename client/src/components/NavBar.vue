<template lang="html">
<nav id="nav-bar" name="NavBar">
  <router-link :to="{ name: 'portfolio'}">My Portfolio</router-link>
  <br>
  <router-link :to="{ name: 'stockView'}">Buy Stocks</router-link>
</nav>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
</style>
