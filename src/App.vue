<template>
  <div id="app">
    <!--<img alt="Vue logo" src="./assets/logo.png" />-->
    <!--<HelloWorld msg="Welcome to Your Vue.js App" />-->
    
    <Flags />
    

  </div>
</template>

<script>
import Flags from "./components/flags.vue";



export default {
  name: "App",
  components: {
    Flags,
    
  }, 
};


</script>

<style>
@*#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}


</style>
