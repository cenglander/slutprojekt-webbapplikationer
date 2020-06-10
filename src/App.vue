<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>
<script>
export default {
  created() {
    this.$store.dispatch('loadProductList')
  }
}
</script>
<style lang="scss">
body {
  margin: 0;
  padding: 0;
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }
}
</style>
