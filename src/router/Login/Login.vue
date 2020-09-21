<template>
  <div class="login">
    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" :rules='rules'
      ref="formLabelAlign" class="demo-ruleForm">
      <el-form-item label="用户名" required prop="username">
        <el-col :span="24">
          <el-input v-model="formLabelAlign.username"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="密码" required prop="password">
        <el-col :span="24">
          <el-input v-model="formLabelAlign.password"></el-input>
        </el-col>
      </el-form-item>
      <el-button type="primary" round @click="login">登录</el-button>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        labelPosition: 'right',
        formLabelAlign: {
          username: '',
          password: '',
        },
        rules: {
          username: [{
              required: true,
              message: '请输入用户名',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 10,
              message: '长度在 3 到 10 个字符',
              trigger: 'blur'
            }
          ],
          password: [{
              required: true,
              message: '请输入活动名称',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 15,
              message: '长度在 3 到 15 个字符',
              trigger: 'blur'
            }
          ],
        }
      };
    },
    methods: {
      login() {
        this.$http.post('/userlogin', this.formLabelAlign).then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: '登录成功!',
              type: 'success'
            });
            this.$store.commit('setUser',res.data.list);
            this.$router.push('/home');
          } else {
            this.$message.error(res.data.msg + ',错误代码：' + res.data.code);
          }
        })
      }
    },
  }

</script>

<style lang="stylus" scoped>
  .login {
    display flex
    flex-direction column
    align-items center
    text-align center
  }

  .el-form {
    width 30%
  }

</style>
