<template>
  <div>
    <breadcrumb :breadPath="breadPath"></breadcrumb>

    <el-card>
      <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning" show-icon></el-alert>

      <el-row class="selectCate">
        <el-col>
          <span>选择商品分类:</span>
          <el-cascader v-model="selectCateId" :options="cateList" :props="casaderProp" @change="handleChange"></el-cascader>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  import Breadcrumb from "components/common/Breadcrumb";
  import {getCategory} from "network/goods"

  export default {
    name: "CateParams",
    components: {Breadcrumb},
    data(){
      return{
        breadPath:['商品管理','分类参数'],
        selectCateId:'',
        cateList:[],
        casaderProp:{
          expandTrigger: 'hover',
          label:'cat_name',
          value:'cat_pid',
          children:'children'
        }
      }
    },

    created(){
      this.getCateList()
    },

    methods:{
      //获取分类数据
      getCateList(){
        getCategory({type:3})
          .then(res=>{
            if(res.meta.status !== 200)
              return this.$message.error(res.meta.msg)
            this.cateList = res.data
          })
      },

      handleChange(){
        console.log(this.selectCateId);
      }
    }
  }
</script>

<style scoped>

  .selectCate{
    margin-top: 15px;
  }
  .el-cascader{
    margin-left: 20px;
  }
</style>