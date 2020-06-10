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
  background-image: url('assets/img/skate-park-right.jpg'), url('assets/img/skate-park-left.jpg');
  background-position: left, right;
  background-attachment: fixed;
  background-repeat: no-repeat, no-repeat;
  background-size: 35%, 35%;
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;

    h1, h2, h3, h4, h5 {
      font-family: 'Cardo', serif;
    }
    p, button, input, label {
      font-family: 'Josefin Sans', sans-serif;
    }
  }
}
</style>
