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

      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="many">
          <el-row>
            <el-col>
              <el-button type="primary" size="mini" :disabled="isBtndisable">添加参数</el-button>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <el-row>
            <el-col>
              <el-button type="primary" size="mini" :disabled="isBtndisable">添加属性</el-button>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>

      <el-table :data="tableData" >
        <el-table-column type="expand">
          <template v-slot="scope">
            <el-tag v-for="(item,index) in scope.row.attr_vals" :key="index" closable>{{item}}</el-tag>
            <el-input
              class="input-new-tag"
              v-if="scope.row.inputVisible"
              v-model="scope.row.inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm(scope.row)"
              @blur="handleInputConfirm(scope.row)">
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>

          </template>
        </el-table-column>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="attr_name" :label="labelName" ></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
  import Breadcrumb from "components/common/Breadcrumb";
  import {getCategory,getCategoryParams,editCategoryParams} from "network/goods"

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
          value:'cat_id',
          children:'children'
        },
        activeName:'many',
        tableData:[]
      }
    },

    created(){
      this.getCateList()
    },

    computed:{
      isBtndisable(){
        return !(this.selectCateId.length === 3 )
      },
      labelName(){
        if(this.activeName === 'many')
          return '参数名称'
        return '属性名称'
      }
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

      //获取分类参数
      getCateParams(){
        if(this.selectCateId.length !==3)
          return this.tableData=[]
        const cateId = this.selectCateId[2]
        getCategoryParams(cateId,this.activeName)
          .then(res=>{
            if(res.meta.status !== 200)
              return this.$message.error(res.meta.msg)
            res.data.forEach(item=>{
              item.attr_vals = item.attr_vals ? item.attr_vals.split(' '):[]
              item.inputVisible = false
              item.inputValue=''
            })
            this.tableData=res.data
          })
      },

      //编辑分类参数
      editCateParams(cateId,attrId,paramInfo){
        editCategoryParams(cateId,attrId,paramInfo)
          .then(res=>{
            if(res.meta.status !== 200)
              return this.$message.error(res.meta.msg)
            this.$message.success(res.meta.msg)
          })
      },

      handleChange(){
        this.getCateParams()
      },

      handleClick(){
        this.getCateParams()
      },

      handleInputConfirm(row){
        if(row.inputValue.trim() === '')
          return row.inputVisible = false
        row.attr_vals.push(row.inputValue.trim())
        row.inputValue = ''
        const attrVal = row.attr_vals.join(' ')
        const paramInfo = {
          attr_name:row.attr_name,
          attr_sel:row.attr_sel,
          attr_vals:attrVal
        }
        this.editCateParams(row.cat_id,row.attr_id,paramInfo)
      },

      showInput(row){
        row.inputVisible = true
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
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
  .el-tag{
    margin: 0 10px;
  }
  .input-new-tag{
    width: 120px;
  }
</style>