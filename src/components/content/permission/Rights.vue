<template>
  <div>
    <!--面包屑导航区域-->
    <breadcrumb :breadPath="breadPath"></breadcrumb>

    <!--权限内容展示区域-->
    <el-card>
      <el-table :data="rightsInfo" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="authName" label="权限名称"></el-table-column>
        <el-table-column prop="path" label="访问路径"></el-table-column>
        <el-table-column label="权限层级">
          <template v-slot:default="scope">
            <el-tag v-if="scope.row.level === '0'">一级</el-tag>
            <el-tag v-if="scope.row.level === '1'" type="success" >二级</el-tag>
            <el-tag v-if="scope.row.level === '2'" type="warning">三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

  </div>
</template>

<script>
  import Breadcrumb from "components/common/Breadcrumb";
  import {getRights} from "network/permission";

  export default {
    name: "Rights",
    components: {Breadcrumb},
    data(){
      return{
        breadPath:['权限管理','权限列表'],
        rightsInfo:[],
      }
    },

    created() {
      //获取权限列表数据
      getRights('list')
        .then(res=>{
          if(res.meta.status !==200)
            return this.$message.error(res.meta.msg)
          this.rightsInfo = res.data
        })
    }
  }
</script>

<style scoped>

</style>