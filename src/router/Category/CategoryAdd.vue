<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/cate'}">商品分类列表</el-breadcrumb-item>
      <el-breadcrumb-item>{{addorEdit}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">

      <el-form-item label="上级分类" prop='pid'>
        <el-select v-model="form.pid" placeholder="请选择">
          <el-option label="顶级分类" :value="0"></el-option>
          <el-option :label="item.catename" :value="item.id" v-for="(item,index) in menuList" :key="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="分类名称" prop='catename'>
        <el-col :span="12">
          <el-input v-model="form.catename"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="图片" v-show="form.pid==0?false:true">
        <el-upload action="#"
        list-type="picture-card"
        :auto-upload='false'
        :on-change="handlePictureCardPreview"
        :on-remove="handleRemove"
        :file-list="arr"
        >
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
        arr:[],
        menuList: [],
        addorEdit: '',
        form: {
          pid: '',
          catename: '',
          img: '',
          status: true,
        },
        rules: { // 每个表单元素的验证规则
          catename: [{
            required: true,
            message: '请输入分类名称',
            trigger: 'blur'
          }, ],
          pid: [{
            required: true,
            message: '请选择上级分类',
            trigger: 'change'
          }],
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
              newform.append(key,this.form[key]);
            }
            if (this.$route.query.id) {
              this.$http.post('/cateedit', newform).then(res => {
                if (res.data.code == 200) {
                  this.$message({
                    message: '修改成功！',
                    type: 'success'
                  });
                  this.$router.push('/cate');
                } else {
                  this.$message.error(res.data.msg + ',错误代码：' + res.data.code);
                }
              })
              return;
            }

            this.$http.post('/cateadd', newform).then(res => {
              if (res.data.code == 200) {
                console.log(res);
                this.$message({
                  message: '添加成功！',
                  type: 'success'
                });
                this.$router.push('/cate');
              } else {
                this.$message.error(res.data.msg + '错误代码：' + res.data.code);
              }
            })
            console.log(newform);
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
      this.$http.get('/catelist', {
        istree: true,
        pid:0
      }).then(res => {
        this.menuList = res.data.list;
      })
      if (this.$route.query.id) {
        this.addorEdit = '商品分类修改';
        this.$http.get('/cateinfo', {
          id: this.$route.query.id
        }).then(res => {
          let status = res.data.list.status == 1 ? true : false;
          this.form = res.data.list;
          this.form.id = this.$route.query.id;
          this.form.status = status;
          this.arr.push({url:'http://localhost:3000'+this.form.img})
        })
      } else {
        this.addorEdit = '商品分类添加';
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
