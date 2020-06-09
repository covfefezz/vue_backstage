<template>
  <div>
    <!--面包屑导航区域-->
    <breadcrumb :breadPath="breadPath"></breadcrumb>

    <!--卡片视图区域-->
    <el-card>
      <!--卡片头部搜索区域-->
      <el-row :gutter="40" type="flex" justify="center">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="userParam.query" clearable>
            <el-button slot="append" icon="el-icon-search" @click="getUserInfo" ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="userAddDialog">添加用户</el-button>
        </el-col>
      </el-row>

      <!--用户数据展示区-->
      <el-table :data="userInfo" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="手机"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column label="状态">
          <template v-slot:default="scope">
            <el-switch v-model="scope.row.mg_state" @change="userStatusChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot:default="scope">
            <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" @click="userEditDialog(scope.row.id)"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" @click="removeUser(scope.row.id)"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="改变用户角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!--分页器-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="userParam.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="userParam.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>

    <!--添加用户的对话框-->
    <user-add-dialog ref="userAddDialogRef" @addUserSuc="addUserSuc"></user-add-dialog>

    <!--编辑用户信息的对话框-->
    <user-edit-dialog ref="userEditDialogRef" @editUserSuc="editUserSuc"></user-edit-dialog>
  </div>
</template>

<script>
  import {getUsers,userStatus,removeUserById} from "network/users";
  import UserAddDialog from "./UserAddDialog";
  import UserEditDialog from "./UserEditDialog";
  import Breadcrumb from "components/common/Breadcrumb";

  export default {
    name: "Users",
    components: {Breadcrumb, UserEditDialog, UserAddDialog},
    data(){
      return{
        userParam:{
          query:'',
          pagenum:1,
          pagesize:5
        },
        userInfo:[],
        total:0,
        dialogVisible:false,
        currentUserId:0,
        breadPath:['用户管理','用户列表']
      }
    },
    created() {
      //请求用户数据
      this.getUserInfo()
    },
    methods:{
      //每页展示条数更新事件
      handleSizeChange(val) {
        this.userParam.pagesize = val
        //请求用户数据
        this.getUserInfo()
      },
      //换页更新事件
      handleCurrentChange(val) {
        this.userParam.pagenum = val
        //请求用户数据
        this.getUserInfo()
      },
      //用户状态更新事件
      userStatusChange(userInfo){
        userStatus(userInfo)
          .then(res=>{
            if(res.meta.status !==200){
              userInfo.mg_state = !userInfo.mg_state
               return this.$message.error('更改用户状态失败')
            }
            return this.$message.success('更改用户状态成功')
          })
      },

      //再次封装请求用户数据
      getUserInfo(){
        getUsers(this.userParam)
          .then(res=>{
            if(res.meta.status !== 200)
              return this.$message.error('请求用户数据失败')
            this.userInfo = res.data.users
            this.total=res.data.total
          })
      },

      //弹出添加用户对话框
      userAddDialog(){
        this.$refs.userAddDialogRef.dialogVisible = true
      },

      //用户添加成功，重新请求用户数据
      addUserSuc(){
        this.getUserInfo()
      },

      //弹出编辑用户对话框
      userEditDialog(userId){
        this.$refs.userEditDialogRef.userId = userId
        this.$refs.userEditDialogRef.getUserInfo()
        this.$refs.userEditDialogRef.dialogVisible = true
      },

      //用户信息编辑成功，重新请求用户数据
      editUserSuc(){
        this.getUserInfo()
      },

      //删除用户
      removeUser(userId){
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            removeUserById(userId)
              .then(res=>{
                if(res.meta.status !== 200)
                  return this.$message.error('删除用户失败')
                this.$message.success('用户删除成功')
                this.getUserInfo()
              })
          })
          .catch(() => {
            this.$message.info('已取消删除')
          });
      }
    }
  }
</script>

<style scoped>

  .el-table{
    margin-top:15px;
    font-size:12px;
  }
</style>