<template>
  <div>
    <breadcrumb :breadPath="breadPath"></breadcrumb>

    <el-card>
      <el-alert title="添加商品信息" type="info" center show-icon></el-alert>

      <el-steps  :active="activeIndex" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <el-tabs tab-position="left" style="height: 200px;">
        <el-tab-pane label="基本信息">基本信息</el-tab-pane>
        <el-tab-pane label="商品参数">商品参数</el-tab-pane>
        <el-tab-pane label="商品属性">商品属性</el-tab-pane>
        <el-tab-pane label="商品图片">商品图片</el-tab-pane>
        <el-tab-pane label="商品内容">商品内容</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
  import Breadcrumb from "components/common/Breadcrumb";
  export default {
    name: "GoodsAdd",
    components: {Breadcrumb},
    data(){
      return{
        breadPath:['商品管理','商品列表','添加商品'],
        activeIndex:0
      }
    }
  }
</script>

<style scoped>
  .el-steps{
    margin: 15px 0;
  }

</style>