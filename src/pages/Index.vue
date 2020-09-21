<template>
  <div id="apptow">
    <el-container>
      <el-aside width="200px">
        <Layout></Layout>
      </el-aside>
      <el-container>
        <el-header>{{user.username}}</el-header>
        <el-main>
        <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
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
  #apptow {
    height: 100%;
    width: 100%;
  }

</style>
