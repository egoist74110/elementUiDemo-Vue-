<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/banner'}">商品列表</el-breadcrumb-item>
      <el-breadcrumb-item>{{addorEdit}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">

      <el-form-item label="商品名称" prop='title'>
        <el-col :span="12">
          <el-input v-model="form.title"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="图片">
        <el-upload action="#" list-type="picture-card" :auto-upload='false' :on-change="handlePictureCardPreview"
          :on-remove="handleRemove" :file-list="arr">
          <i class="el-icon-plus"></i>
        </el-upload>
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
        arr: [],
        specsinfo:[],
        addorEdit: '',
        form: {
          img:'',
          status:true
        },
        rules: { // 每个表单元素的验证规则
          first_cateid: [{
            required: true,
            message: '请选择一级分类',
            trigger: 'change'
          }, ],
          second_cateid: [{
            required: true,
            message: '请选择二级分类',
            trigger: 'change'
          }],
          goodsname:[{
            required:true,
            message:'请输入商品名称',
            trigger:'blur'
          }]
        }
      }
    },
    methods: {
      submitForm(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            let newform = new FormData();
            this.form.status = this.form.status ? 1 : 2;
            for(let key in this.form){
              if(this.form[key]){
                newform.append(key,this.form[key]);
              }
            }
            if (this.$route.query.id) {
              this.$http.post('/banneredit', newform).then(res => {
                if (res.data.code == 200) {
                  this.$message({
                    message: '修改成功！',
                    type: 'success'
                  });
                  this.$router.push('/banner');
                } else {
                  this.$message.error(res.data.msg + ',错误代码：' + res.data.code);
                }
              })
              return;
            }
            this.$http.post('/banneradd', newform).then(res => {
              if (res.data.code == 200) {
                console.log(res);
                this.$message({
                  message: '添加成功！',
                  type: 'success'
                });
                this.$router.push('/banner');
              } else {
                this.$message.error(res.data.msg + '错误代码：' + res.data.code);
              }
            })
          } else {
            return false;
          }
        })
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.form.img = file.raw
        // this.dialogImageUrl = file.url;
        // this.dialogVisible = true;
      }
    },
    mounted() {
      if (this.$route.query.id) {
        this.addorEdit = '轮播图修改';
        this.$http.get('/bannerlist', {
          id: this.$route.query.id
        }).then(res => {
           this.arr.push({
            url: 'http://localhost:3000' + res.data.list[0].img
          })
          let status = res.data.list[0].status == 1 ? true : false;
          this.form = res.data.list[0];
          this.form.id = this.$route.query.id;
          this.form.status = status;
        })
      } else {
        this.addorEdit = '轮播图添加';
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
