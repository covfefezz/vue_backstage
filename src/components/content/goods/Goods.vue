<template>
  <div>
    <breadcrumb :breadPath="breadPath"></breadcrumb>
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="btnClick">添加商品</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  import Breadcrumb from "components/common/Breadcrumb";
  export default {
    name: "Goods",
    components: {Breadcrumb},
    data(){
      return{
        breadPath:['商品管理','商品列表']
      }
    },
    methods:{
      btnClick(){
        this.$router.push('/goods/goodsadd')
      }
    }
  }
</script>

<style scoped>

</style>