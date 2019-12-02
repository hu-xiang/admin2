<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  /* background: #f0f2f5; */
  min-width: 1080px;
  font-family: 'PingFang SC, Microsoft Yahei';
  font-size: 12px;
  -webkit-tap-highlight-color: transparent;
  -webkit-font-smoothing: antialiased;
}
</style>
