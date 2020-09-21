<template>
  <el-col :span="24">
    <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#202229" text-color="#fff"
      active-text-color="#ffd04b" router >

      <el-menu-item index="/home">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>

      <el-submenu :index="item.id.toString()" v-for="(item,index) in user.menus" :key="item.id">
        <template slot="title">
        <i :class="item.icon"></i>
          <span>{{item.title}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item v-for="items in user.menus[index].children" :index="items.url" :key='items.id'>{{items.title}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-col>
</template>

<script>
import {mapState} from 'vuex'
  export default {
    data() {
      return {
      }
    },
    computed:{
      ...mapState(['user'])
    },
  }

</script>

<style lang="stylus" scoped>

</style>
