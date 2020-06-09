<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{path:'/welcome'}">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-for="item in breadPath">{{item}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
  export default {
    name: "Breadcrumb",
    props:{
      breadPath:Array
    }
  }
</script>

<style scoped>

</style>