<template>
  <div>
    <breadcrumb :breadPath="breadpath"></breadcrumb>

    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="addCate">添加分类</el-button>
        </el-col>
      </el-row>

      <el-table :data="cateList" row-key="cat_id" border stripe highlight-current-row  :tree-props="{children: 'children',hasChildren:'hasChildren'}">
        <el-table-column label="#" type="index">
        </el-table-column>
        <el-table-column prop="cat_name" label="分类名称"></el-table-column>
        <el-table-column label="是否有效">
          <template v-slot="scope">
            <i class="el-icon-success" v-if="scope.row.cat_deleted === false"></i>
            <i class="el-icon-error" v-else></i>
          </template>
        </el-table-column>
        <el-table-column label="排序">
          <template v-slot="scope">
            <el-tag v-if="scope.row.cat_level === 0">一级</el-tag>
            <el-tag type="success" v-else-if="scope.row.cat_level === 1">二级</el-tag>
            <el-tag type="warning" v-else>三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
  import Breadcrumb from "components/common/Breadcrumb";
  import {getCategory} from "network/goods";

  export default {
    name: "Cate",
    components: {Breadcrumb},
    data(){
      return{
        breadpath:['商品管理','商品分类'],
        paramInfo:{
          type:3
        },
        cateList:[]
      }
    },

    created(){
      //获取商品列表数据
      this.getCate(this.paramInfo)
    },

    mounted(){
    },

    methods:{
      //请求分类列表
      getCate(paramInfo){
        getCategory(paramInfo)
          .then(res=>{
            if(res.meta.status !==200)
              return this.$message.error(res.meta.msg)
            this.cateList = res.data
          })
      },

      //添加分类
      addCate(){

      },

      btnclick(dd){
        console.log(dd)
      }
    }
  }
</script>

<style scoped>

  .el-table{
    margin-top: 20px;
  }
  .el-icon-success{
    color:#20B2AA;
  }
  .el-icon-error{
    color:lightcoral;
  }

</style>