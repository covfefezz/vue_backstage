<template>
  <el-dialog title="添加用户" :visible.sync="dialogVisible" width="30%" @close="dialogClose">
    <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px" >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="addForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="addForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="addForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="addForm.mobile"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {addUser} from "network/users";
  import {checkEmail,checkMobile} from "common/utils";

  export default {
    name: "UserAddDialog",
    data(){
      return{
        //对话框是否可见属性
        dialogVisible:false,
        //表单内容
        addForm:{
          username:'woailuo3',
          password:'woailuo',
          email:'woailuo@163.com',
          mobile:'13800139226'
        },
        //表单内容验证规则
        addFormRules:{
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { validator:checkEmail, trigger: 'blur' }
          ],
          mobile: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { validator:checkMobile, trigger: 'blur' }
          ]
        },
      }
    },
    methods:{
      //监听对话框关闭事件,重置输入框
      dialogClose(){
        this.$refs.addFormRef.resetFields()
      },

      //添加用户
      addUserSubmit(){
        this.$refs.addFormRef.validate(valid=>{
          if(!valid)
            return this.$message.error('请检查提示错误的地方')
          addUser(this.addForm).then(res=>{
              if(res.meta.status !== 201)
                return this.$message.error('添加用户失败')
              this.$message.success('添加用户成功')
              this.$emit('addUserSuc')
              this.dialogVisible=false
            })
        })
      }
    }
  }
</script>

<style scoped>

</style>