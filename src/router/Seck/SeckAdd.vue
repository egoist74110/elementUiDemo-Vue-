<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/seck'}">活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>{{addorEdit}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">

      <el-form-item label="活动名称" prop='username'>
        <el-col :span="12">
          <el-input v-model="form.username"></el-input>
        </el-col>
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
        rolelist: [],
        addorEdit: '',
        form: {
          roleid: '',
          username: "",
          password: '',
          status: true,
        },
        rules: { // 每个表单元素的验证规则
          roleid: [{
            required: true,
            message: '请选择所属角色',
            trigger: 'change'
          }, ],
          username: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }],
        },
      }
    },
    methods: {
      submitForm(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.form.status = this.form.status ? 1 : 2;
            if (this.$route.query.uid) {
              this.$http.post('/useredit', {
                ...this.form,
                uid: this.$route.query.uid
              }).then(res => {
                if (res.data.code == 200) {
                  this.$message({
                    message: '修改成功！',
                    type: 'success'
                  });
                  this.$router.push('/user');
                } else {
                  this.$message.error(res.data.msg + ',错误代码：' + res.data.code);
                }
              })
              return;
            }
            this.$http.post('/useradd', this.form).then(res => {
              if (res.data.code == 200) {
                this.$message({
                  message: '添加成功！',
                  type: 'success'
                });
                this.$router.push('/user');
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
      this.$http.get('/rolelist', {
        istree: true
      }).then(res => {
        this.rolelist = res.data.list;
      })
      if (this.$route.query.uid) {
        this.addorEdit = '活动修改';
        this.$http.get('/userinfo', {
          uid: this.$route.query.uid
        }).then(res => {
          let status =res.data.list.status==1 ? true : false;
          this.form = {...res.data.list,password:'',status}
        })
      } else {
        this.addorEdit = '活动添加';
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
