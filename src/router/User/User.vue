<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="primary" round @click="menuAdd">添加</el-button>
    <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;" row-key="id" border default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">

      <el-table-column prop="id" label="用户编号" width="120">
      </el-table-column>

      <el-table-column prop="username" label="用户名" width="350">
      </el-table-column>

      <el-table-column prop="rolename" label="所属角色" width="300">
      </el-table-column>

      <el-table-column prop="status" label="状态" width="220">
        <template slot-scope="scope">
          <el-button type="success" round disabled v-if="scope.row.status==1">{{ scope.row.status | statusFormat}}</el-button>
          <el-button type="danger" round disabled v-if="scope.row.status==2">{{ scope.row.status | statusFormat}}</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="id" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" round @click="edit(scope.row.uid)">编辑</el-button>
          <el-popconfirm confirmButtonText='好的' cancelButtonText='不用了' icon="el-icon-info" iconColor="red"
            title="此操作不可逆，确认删除？" @onConfirm='del(scope.row.id)'>
            <el-button slot="reference" type="danger" round>删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
      }
    },
    methods: {
      getlist() {
        this.$http.get('/rolelist', {
          istree: true
        }).then(res => {
        })
      },
      menuAdd() {
        this.$router.push('/user/add')
      },
      edit(i) {
        this.$router.push('/user/edit?' + 'uid=' + i);
      },
      del(i) {
        this.$http.post('/roledelete', {
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
      this.$http.get("/userlist",{size:10,page:1}).then(res=>{
          this.tableData = res.data.list;
      })
    },
  }

</script>

<style lang="stylus" scoped>
  .el-button--primary {
    margin 10px 0
  }

</style>
