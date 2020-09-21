<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
  import Layout from '@/components/Layout'
  import {mapState} from 'vuex';
  export default {

    components: {
      Layout
    },
    computed:{
      ...mapState(["user"])
    }
  }

</script>

<style lang="stylus">
  html,
  body,
  #app {
    height: 100%;
    width: 100%;
  }

  * {
    margin: 0;
    padding: 0;
  }
  .el-container{
    height 100%
  }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #202229;
    color: #333;
    text-align: center;
  }

  .el-main {
    background-color: #FFFFFF;
    color: #333;
    height 100%
  }

</style>
