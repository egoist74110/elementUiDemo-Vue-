<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/specs'}">规格列表</el-breadcrumb-item>
      <el-breadcrumb-item>{{addorEdit}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">

      <el-form-item label="规格名称" prop='specsname'>
        <el-col :span="12">
          <el-input v-model="form.specsname"></el-input>
        </el-col>
      </el-form-item>
      <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="80px" class="demo-dynamic">
        <el-form-item v-for="(domain, index) in dynamicValidateForm.domains" :label="'规格属性'" :key="domain.key"
          :prop="'domains.' + index + '.value'">
          <el-col :span="12">
            <el-input v-model="domain.value"></el-input>
          </el-col>
          <el-button @click="addDomain" type="primary" v-if="index==0">新增规格属性</el-button>
          <el-button @click.prevent="removeDomain(domain)" type="danger" v-if="index!==0">删除</el-button>
        </el-form-item>
        <el-form-item>
        </el-form-item>
      </el-form>

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
          specsname: '',
          attrs: [],
          status: true,
        },
        rules: { // 每个表单元素的验证规则
          title: [{
            required: true,
            message: '请输入菜单名称',
            trigger: 'blur'
          }, ],
        },
        dynamicValidateForm: {
          domains: [{
            value: ''
          }],
        }
      }
    },
    methods: {
      submitForm(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.form.attrs = this.dynamicValidateForm.domains.map(item => {
              return item.value;
            }).join(',');
            this.form.status = this.form.status ? 1 : 2;
            if (this.$route.query.id) {
              this.$http.post('/specsedit', this.form).then(res => {
                if (res.data.code == 200) {
                  this.$message({
                    message: '修改成功！',
                    type: 'success'
                  });
                  this.$router.push('/specs');
                } else {
                  this.$message.error(res.data.msg + ',错误代码：' + res.data.code);
                }
              })
              return;
            } else {
              this.$http.post('/specsadd', this.form).then(res => {
                if (res.data.code == 200) {
                  this.$message({
                    message: '添加成功！',
                    type: 'success'
                  });
                  this.$router.push('/specs');
                } else {
                  this.$message.error(res.data.msg + '错误代码：' + res.data.code);
                }
              })
            }
          } else {
            return false;
          }
        })
      },
      removeDomain(item) {
        var index = this.dynamicValidateForm.domains.indexOf(item)
        if (index !== -1) {
          this.dynamicValidateForm.domains.splice(index, 1)
        }
      },
      addDomain() {
        this.dynamicValidateForm.domains.push({
          value: '',
          key: Date.now()
        });
      }
    },
    mounted() {
      if (this.$route.query.id) {
        this.addorEdit = '规格修改';
        this.$http.get('/specsinfo', {
          id: this.$route.query.id
        }).then(res => {
          let status = res.data.list[0].status == 1 ? true : false;
          this.form = res.data.list[0];
          this.form.status = status;
          this.dynamicValidateForm.domains = this.form.attrs.map(key => {
            return {
              value: key
            }
          })
        })
      } else {
        this.addorEdit = '规格添加';
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

  .el-button--primary {
    margin-left 10px
  }

</style>
