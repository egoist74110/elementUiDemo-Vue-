<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="primary" round @click="menuAdd">添加</el-button>
    <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;" row-key="id" border default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column prop="id" label="商品编号" width="120">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="120">
      </el-table-column>
      <el-table-column prop="price" label="商品价格" width="120">
      </el-table-column>
      <el-table-column prop="market_price" label="市场价格" width="120">
      </el-table-column>
      <el-table-column prop="img" label="图片" width="180">
        <template slot-scope="scope">
          <img :src="'http://localhost:3000'+scope.row.img" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="status" label="是否新品" width="120">
        <template slot-scope="scope">
          <el-button type="danger" round disabled v-if="scope.row.ishot==2">{{ scope.row.isnew | yesorno}}</el-button>
          <el-button type="success" round disabled v-if="scope.row.ishot==1">{{ scope.row.isnew | yesorno}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="是否热卖" width="120">
        <template slot-scope="scope">
          <el-button type="danger" round disabled v-if="scope.row.ishot==2">{{ scope.row.ishot | yesorno}}</el-button>
          <el-button type="success" round disabled v-if="scope.row.ishot==1">{{ scope.row.ishot | yesorno}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="120">
        <template slot-scope="scope">
          <el-button type="success" round disabled>{{ scope.row.status | statusFormat}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" round @click="edit(scope.row.id)">编辑</el-button>
          <el-popconfirm confirmButtonText='好的' cancelButtonText='不用了' icon="el-icon-info" iconColor="red"
            title="此操作不可逆，确认删除？" @onConfirm='del(scope.row.id)'>
            <el-button slot="reference" type="danger" round>删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="total" :current-page='current' :page-size='2' @current-change='currentChange'></el-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        total:0,
        current:1,
      }
    },
    methods: {
      currentChange(page){
        this.current = page;
        this.getlist();
      },
      getlist() {
        this.$http.get('/goodslist', {
          size: 2,
          page: this.current,
        }).then(res => {
          this.tableData = res.data.list;
        })
      },
      menuAdd() {
        this.$router.push('/goods/add')
      },
      edit(i) {
        this.$router.push('/goods/edit?' + 'id=' + i);
      },
      del(i) {
        this.$http.post('/goodsdelete', {
          id: i
        }).then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: res.data.msg,
              type: 'success'
            });
            this.getlist();
          } else {
            this.$message.error(res.data.msg + ',错误代码' + res.data.code);
          }
        })
      }
    },
    mounted() {
      this.getlist();
      this.$http.get('/goodscount').then(res=>{
        this.total = res.data.list[0].total;
        console.log(this.total);
      })
    },
  }

</script>

<style lang="stylus" scoped>
  .el-button--primary {
    margin 10px 0
  }

  img {
    width 180px
  }

  .el-pagination{
    width 50%
    margin auto
    text-align center
  }
</style>
