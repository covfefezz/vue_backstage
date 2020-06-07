<template>
  <div class="login">
    <div class="login_box">

      <!--头像区域-->
      <div class="avatar_box">
        <img src="~assets/logo.png" alt="">
      </div>

      <!--登录表单区域-->
      <el-form class="login_form" :model="loginForm" :rules="loginFormRules" ref="loginFormRef">
        <el-form-item  prop="username">
          <el-input placeholder="请输入账号" prefix-icon="el-icon-user" v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item  prop="password">
          <el-input placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="loginForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item class="form_btns">
          <el-button type="primary" @click="loginSubmit">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {login} from "network/login"

  export default {
    name: "Login",
    data(){
      return{
        //登录表单内容
        loginForm:{
          username:'admin',
          password:'123456'
        },
        //表单内容认证规则
        loginFormRules:{
          username:[
            {required:true, message:"请输入账号", trigger:'blur'},
            {min:3, max:15, message:"长度在6到15个字符", trigger:'blur'}
          ],
          password:[
            {required:true, message:"请输入密码", trigger:'blur'},
            {min:6, max:15, message:"长度在6到15个字符", trigger:'blur'}
          ]
        }
      }
    },
    methods:{
      //表单内容重置
      reset(){
        this.$refs.loginFormRef.resetFields()
      },
      //登录请求
      loginSubmit(){
        this.$refs.loginFormRef.validate(valid=>{
          if(!valid)
            return
          console.log(this.loginForm)
          login(this.loginForm)
            .then(res=>{
              if(res.meta.status===200){
                this.$message({
                  message:res.meta.msg,
                  type:'success'
                })
                window.sessionStorage.setItem("token",res.data.token)
                this.$router.push('/home')
              }
              else {
                this.$message.error(res.meta.msg)
              }
            })
        })
      }
    }
  }
</script>

<style scoped>

  .login{
    height: 100%;
    background-color: #2b4b6b;
  }
  .login_box{
    width: 450px;
    height: 300px;
    background-color: #fff;
    position:absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .avatar_box{
    width: 130px;
    height:130px;
    border:1px solid #eee;
    border-radius: 50%;
    position: absolute;
    left:50%;
    transform: translate(-50%,-50%);
    padding: 10px;
    background-color: #fff;
    box-shadow: 0 0 10px #ddd;
  }
  .avatar_box img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
  .login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .form_btns{
    display: flex;
    justify-content: center;
  }
</style>