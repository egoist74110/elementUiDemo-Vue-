<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/role'}">角色列表</el-breadcrumb-item>
      <el-breadcrumb-item>{{addorEdit}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">

      <el-form-item label="角色名称" prop='rolename'>
        <el-col :span="12">
          <el-input v-model="form.rolename"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="角色权限">
        <el-tree :data="menuList" show-checkbox node-key="id" :default-expanded-keys="[0]"
          :default-checked-keys="form.menus" check-strictly ref="chekedArr" :props="defaultProps">
        </el-tree>
      </el-form-item>

      <el-form-item label="状态">
        <el-switch v-model="form.status"></el-switch>
      </el-form-item>
      <el-button type="primary" @click="submitForm('form')">添加</el-button>
    </el-form>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        defaultProps: {
          children: 'children',
          label: 'title'
        },
        menuList: [],
        addorEdit: '',
        form: {
          id:'',
          rolename: "", // 菜单名称
          status: true,
          menus: [],
        },
        rules: { // 每个表单元素的验证规则
          title: [{
            required: true,
            message: '请输入菜单名称',
            trigger: 'blur'
          }, ],
          pid: [{
            required: true,
            message: '请选择上级菜单',
            trigger: 'change'
          }],
          type: [{
            required: true,
            message: '请选择菜单类型',
            trigger: 'change'
          }],
        },
      }
    },
    methods: {
      submitForm(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.form.status = this.form.status ? 1 : 2;
            this.form.menus = this.$refs.chekedArr.getCheckedKeys();
            if (this.$route.query.id) {
              this.$http.post('/roleedit', {...this.form,id:this.$route.query.id}).then(res => {
                console.log(res);
                if (res.data.code == 200) {
                  this.$message({
                    message: '修改成功！',
                    type: 'success'
                  });
                  this.$router.push('/role');
                } else {
                  this.$message.error(res.data.msg + ',错误代码：' + res.data.code);
                }
              })
              return;
            }
            this.$http.post('/roleadd', this.form).then(res => {
              if (res.data.code == 200) {
                  this.$message({
                    message: '添加成功！',
                    type: 'success'
                  });
                this.$router.push('/role');
              } else {
                  this.$message.error(res.data.msg + '错误代码：' + res.data.code);
              }
            })
          } else {
            return false;
          }
        })
      }
    },
    mounted() {
      this.$http.get('/menulist', {
        istree: true
      }).then(res => {
        this.menuList = res.data.list;
      })
      if (this.$route.query.id) {
        this.addorEdit = '角色修改';
        this.$http.get('/roleinfo', {
          id: this.$route.query.id
        }).then(res => {
          this.form = res.data.list;
          this.form.menus = res.data.list.menus.split(',');``
          this.form.status = res.data.list.status == 1 ? true : false;
        })
      } else {
        this.addorEdit = '角色添加';
      }
    },
  }

</script>

<style lang="stylus" scoped>
  .el-form {
    margin 20px 0
  }

  .el-button--primary {
    margin-left 60px
  }

</style>
