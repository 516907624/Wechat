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

<style lang="less">
@import "./../static/css/reset";
  html,body,#app{
    width: 100%;
    height: 100%;
    background: #eee;
  }
</style>
