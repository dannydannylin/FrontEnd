<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
  import TabBar from './components/tabbar/TabBar.vue'
  export default {
      name: "App",
      components: {
          TabBar
      },
  }
</script>

<style>
  @import "./assets/css/my.css";

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }

  [v-cloak] {
    display: none;
  }
</style>
