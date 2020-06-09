<template>
  <el-dialog title="编辑用户" :visible.sync="dialogVisible" width="30%" @close="dialogClose">
    <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px" >
      <el-form-item label="用户名">
        <el-input v-model="editForm.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="editForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="editForm.mobile"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {getUserById,editUser} from "network/users";
  import {checkEmail,checkMobile} from "common/utils";

  export default {
    name: "UserEditDialog",
    data(){
      return{
        dialogVisible:false,
        editForm:{},
        userId:0,
        //验证规则
        editFormRules:{
          email:[{ validator:checkEmail, trigger: 'blur' }],
          mobile:[{ validator:checkMobile, trigger: 'blur' }]
        }
      }
    },


    methods:{
      //获取用户信息
      getUserInfo(){
        //根据用户id获取用户信息
        getUserById(this.userId)
          .then(res=>{
            if(res.meta.status !==200)
              return this.$message.error(res.meta.msg)
            this.editForm = res.data
          })
      },

      //用户修改信息提交
      editUserSubmit(){
        this.$refs.editFormRef.validate(valid=>{
          if(!valid)
            return this.$message.error('请检查输入错误的地方')
          editUser(this.editForm)
            .then(res=>{
              if(res.meta.status !== 200)
                return this.$message.error(res.meta.msg)
              this.$message.success('用户信息编辑成功')
              this.$emit('editUserSuc')
              this.dialogVisible=false
            })
        })
      },
      //监听对话框关闭事件,重置输入框
      dialogClose(){
        // this.$refs.editFormRef.resetFields()
      }
    }
  }
</script>

<style scoped>

</style>