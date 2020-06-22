<template>
  <div>
    <breadcrumb :breadPath="breadpath"></breadcrumb>

    <el-card>
      <!--添加商品分类区-->
      <el-row>
        <el-col>
          <el-button type="primary" @click="addCateDialog">添加分类</el-button>
        </el-col>
      </el-row>

      <!--商品分类展示区-->
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
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="primary" icon="el-icon-edit" @click="editCate(scope.row)">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--分页器-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="paramInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="paramInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        v-if="paramInfo.pagenum && paramInfo.pagesize">
      </el-pagination>

      <!--添加分类的弹窗-->
      <el-dialog title="添加分类" :visible.sync="addCateDialogVisible" width="25%" @close="addCateDialogClose">
        <el-form :model="newCate" ref="addCateFormRef" label-width="80px" :rules="addCateFormRule">
          <el-form-item label="分类名称" prop="cat_name">
            <el-input v-model="newCate.cat_name"></el-input>
          </el-form-item>
          <el-form-item label="父级分类">
            <el-cascader v-model="selectId" :options="parentCateList" :props="cascaderProps" clearable></el-cascader>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCateSubmit">确 定</el-button>
      </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
  import Breadcrumb from "components/common/Breadcrumb";
  import {getCategory,addCategory} from "network/goods";

  export default {
    name: "Cate",
    components: {Breadcrumb},
    data(){
      return{
        breadpath:['商品管理','商品分类'],
        paramInfo:{
          type:3,
          pagenum:1,
          pagesize:5
        },
        cateList:[],
        total:0,
        addCateDialogVisible:false,
        newCate:{
          cat_name:'',
          cat_pid:0,
          cat_level:0
        },
        selectId:[],
        parentCateList:[],
        cascaderProps:{
          expandTrigger:'hover',
          value:'cat_id',
          label:'cat_name',
          children: 'children',
          checkStrictly:true
        },
        addCateFormRule:{
          cat_name:[
            {required: true, message: '请输入分类名称', trigger: 'blur'},
            { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
            ]
        }
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
            if(this.paramInfo.pagenum && this.paramInfo.pagesize){
              this.cateList = res.data.result
              this.total = res.data.total
            }else {
              this.cateList = res.data
            }
          })
      },

      //每页展示条数更新事件
      handleSizeChange(val) {
        this.paramInfo.pagesize = val
        //请求用户数据
        console.log(this.paramInfo);
        this.getCate(this.paramInfo)
      },
      //换页更新事件
      handleCurrentChange(val) {
        this.paramInfo.pagenum = val
        //请求用户数据
        console.log(this.paramInfo);
        this.getCate(this.paramInfo)
      },

      //添加分类
      addCateDialog(){
        const queryInfo = {type:2}
        getCategory(queryInfo)
          .then(res=>{
            if(res.meta.status !== 200)
              return this.$message.error(res.meta.msg)
            this.parentCateList = res.data
          })
        this.addCateDialogVisible = true
      },

      //关闭添加分类的弹窗
      addCateDialogClose(){
        this.$refs.addCateFormRef.resetFields()
        this.selectId=[]
        this.newCate.cat_pid = 0
        this.newCate.cat_level = 0

      },

      //添加分类提交
      addCateSubmit(){
        if(this.selectId.length !==0){
          this.newCate.cat_pid = this.selectId[this.selectId.length - 1]
          this.newCate.cat_level = this.selectId.length
        }
        addCategory(this.newCate)
          .then(res=>{
            if(res.meta.status !== 201)
              return this.$message.error(res.meta.msg)
            this.getCate(this.paramInfo)
            this.$message.success(res.meta.msg)
            this.addCateDialogVisible = false
          })
      },

      //编辑分类名称
      editCate(cate){

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
  .el-cascader{
    width: 100%;
  }
</style>