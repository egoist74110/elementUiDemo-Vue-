<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/goods'}">商品列表</el-breadcrumb-item>
      <el-breadcrumb-item>{{addorEdit}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">

      <el-form-item label="一级分类" prop='first_cateid'>
        <el-select v-model="form.first_cateid" placeholder="请选择" @change="reclassify">
          <el-option :label="item.catename" :value="item.id" v-for="(item,index) in menuList" :key="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="二级分类" prop='second_cateid'>
        <el-select v-model="form.second_cateid" placeholder="请选择">
          <el-option :label="item.catename" :value="item.id" v-for="(item,index) in catelist" :key="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="商品名称" prop='goodsname'>
        <el-col :span="12">
          <el-input v-model="form.goodsname"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="价格" prop='price'>
        <el-col :span="12">
          <el-input v-model="form.price"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="市场价格" prop='market_price'>
        <el-col :span="12">
          <el-input v-model="form.market_price"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="图片">
        <el-upload action="#" list-type="picture-card" :auto-upload='false' :on-change="handlePictureCardPreview"
          :on-remove="handleRemove" :file-list="arr">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="商品规格" prop='specsid'>
        <el-select v-model="form.specsid" placeholder="请选择" @change="reclassifytow">
          <el-option :label="item.specsname" :value="item.id" v-for="(item,index) in specslist" :key="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="规格属性" prop='specsattr'>
        <el-select v-model="form.specsattr" placeholder="请选择">
          <el-option :label="item" :value="item" v-for="(item,index) in specsinfo" :key="index">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="是否新品">
        <el-radio v-model="form.isnew" :label='1'>是</el-radio>
        <el-radio v-model="form.isnew" :label='2'>否</el-radio>
      </el-form-item>
      <el-form-item label="是否热卖">
        <el-radio v-model="form.ishot" :label='1'>是</el-radio>
        <el-radio v-model="form.ishot" :label='2'>否</el-radio>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="form.status"></el-switch>
      </el-form-item>
      <el-form-item label="商品描述" style="width:65%">
        <div id="editor" ></div>
      </el-form-item>
      <el-button type="primary" @click="submitForm('form')">添加</el-button>
    </el-form>

  </div>

</template>

<script>
  import E from 'wangeditor'
  export default {
    data() {
      return {
        arr: [],
        menuList: [],
        catelist: [],
        specslist: [],
        specsinfo:[],
        addorEdit: '',
        form: {
          first_cateid:'',
          second_cateid:'',
          goodsname:'',
          price:'',
          market_price:'',
          img:'',
          description:'',
          specsid:'',
          specsattr:'',
          isnew:1,
          ishot:1,
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
      reclassify() {
        this.form.second_cateid = '';
        this.$http.get('/catelist', {
          istree: true
        }).then(res => {
          let from = res.data.list.filter((item) => {
            return item.id == this.form.first_cateid
          })
          this.catelist = from[0].children
        });
      },
      reclassifytow() {
        this.form.specsattr = '';
        this.$http.get('/specsinfo', {
          id:this.form.specsid
        }).then(res => {
          this.specsinfo = res.data.list[0].attrs;
        });
      },
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
              this.$http.post('/goodsedit', newform).then(res => {
                if (res.data.code == 200) {
                  this.$message({
                    message: '修改成功！',
                    type: 'success'
                  });
                  this.$router.push('/goods');
                } else {
                  this.$message.error(res.data.msg + ',错误代码：' + res.data.code);
                }
              })
              return;
            }
            this.$http.post('/goodsadd', newform).then(res => {
              if (res.data.code == 200) {
                console.log(res);
                this.$message({
                  message: '添加成功！',
                  type: 'success'
                });
                this.$router.push('/goods');
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
      let editor = new E('#editor');
      editor.customConfig.onchange = (html) => {
        this.form.description = html;
      }
      editor.create();
      this.$http.get('/specslist', {
        size: 10,
        page: 1
      }).then(res => {
        this.specslist = res.data.list;
      })
      this.$http.get('/catelist', {
        istree: true,
      }).then(res => {
        this.menuList = res.data.list;
      })
      if (this.$route.query.id) {
        this.addorEdit = '商品修改';
        this.$http.get('/goodsinfo', {
          id: this.$route.query.id
        }).then(res => {
           this.arr.push({
            url: 'http://localhost:3000' + res.data.list.img
          })
          let status = res.data.list.status == 1 ? true : false;
          this.form = res.data.list;
          this.form.id = this.$route.query.id;
          this.form.status = status;
          this.form.img = '';
          editor.txt.html(this.form.description);
          this.$http.get('/specsinfo', {
          id:this.form.specsid
          }).then(res => {
            this.specsinfo = res.data.list[0].attrs;
          });
        })
        this.reclassify()
      } else {
        this.addorEdit = '商品添加';
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
