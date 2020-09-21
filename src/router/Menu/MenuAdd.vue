<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/menu'}">菜单列表</el-breadcrumb-item>
      <el-breadcrumb-item>{{addorEdit}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">

      <el-form-item label="菜单名称" prop='title'>
        <el-col :span="12">
          <el-input v-model="form.title"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="上级菜单" prop='pid'>
        <el-select v-model="form.pid" placeholder="请选择">
          <el-option label="顶级菜单" :value="0"></el-option>
          <el-option :label="item.title" :value="item.id" v-for="(item,index) in menuList" :key="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="菜单类型" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">目录</el-radio>
          <el-radio :label="2">菜单</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="菜单图标" v-show="form.type==1">
        <el-col :span="12">
          <el-input v-model="form.icon"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="菜单地址" v-show="form.type==2">
        <el-col :span="12">
          <el-input v-model="form.url"></el-input>
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
        menuList: [],
        addorEdit: '',
        form: {
          title: "", // 菜单名称
          pid: "", //上级菜单的编号
          icon: "",
          type: "",
          url: "",
          status: true,
          id: ''
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
        }
      }
    },
    methods: {
      submitForm(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.form.status = this.form.status ? 1 : 2;
            if (this.$route.query.id) {
              this.$http.post('/menuedit', this.form).then(res => {
                if (res.data.code == 200) {
                  this.$message({
                    message: '修改成功！',
                    type: 'success'
                  });
                  this.$router.push('/menu');
                } else {
                  this.$message.error(res.data.msg + ',错误代码：' + res.data.code);
                }
              })
              return;
            }

            this.$http.post('/menuadd', this.form).then(res => {
              if (res.data.code == 200) {
                  this.$message({
                    message: '添加成功！',
                    type: 'success'
                  });
                this.$router.push('/menu');
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
        this.addorEdit = '菜单修改';
        this.$http.get('/menuinfo', {
          id: this.$route.query.id
        }).then(res => {
          let status = res.data.list.status == 1 ? true : false;
          this.form = res.data.list;
          this.form.id = this.$route.query.id;
          this.form.status = status;
        })
      } else {
        this.addorEdit = '菜单添加';
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
