<template>
  <div class="home">
    <el-container class="home-container">
      <!--头部区域-->
      <el-header>
        <div>
          <img src="~assets/heima.png" alt="">
          <span>电商后台管理系统</span>
        </div>
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
      <el-container>
        <!--左侧侧边栏-->
        <el-aside :width="isCollapse ? '64px':'200px'">
          <!--侧边栏折叠开关按钮-->
          <div class="toggleButton" @click="toggleCollapse">菜单</div>
          <!--侧边栏菜单区域-->
          <el-menu background-color="#333744" text-color="#fff"  active-text-color="#ffd04b" :unique-opened='false'
                   :collapse="isCollapse" :collapse-transition="false" router :default-active="$route.path">
            <!--一级菜单-->
            <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
              <!--一级菜单栏模板-->
              <template slot="title">
                <!--图标-->
                <i :class="iconLIst[item.id]"></i>
                <!--文本-->
                <span>{{item.authName}}</span>
              </template>
              <!--二级菜单-->
              <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id">
                <template slot="title">
                  <!--图标-->
                  <i class="el-icon-menu"></i>
                  <!--文本-->
                  <span>{{subItem.authName}}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!--右侧内容主区-->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import {getMenuList} from "network/home"

  export default {
    name: "Home",
    data(){
      return{
        menuList:[],
        iconLIst:{
          '125':'el-icon-user-solid',
          '103':'el-icon-s-help',
          '101':'el-icon-s-goods',
          '102':'el-icon-s-order',
          '145':'el-icon-s-data'
        },
        isCollapse:false
      }
    },
    created(){
      getMenuList()
        .then(res=>{
          if(res.meta.status !== 200)
            return this.$message.error(res.meta.msg)
          this.menuList = res.data
          console.log(this.menuList)
        })
    },
    methods:{
      //退出登录
      logout(){
        window.sessionStorage.clear()
        this.$router.replace('/login')
      },
      //侧边栏折叠开关点击事件
      toggleCollapse(){
        this.isCollapse = !this.isCollapse
      }
    }
  }
</script>

<style scoped>

  .home{
    height: 100%;
  }
  .home-container{
    height: 100%;
  }
  .el-header{
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    font-size:20px;
    color: #fff;
  }
  .el-header div{
    display: flex;
    align-items: center;
  }
  .el-header span{
    margin-left:20px
  }
  .el-aside{
    background-color: #333744;
  }
  .el-aside .el-menu{
    border-right: none;
  }
  .el-main{
    background-color: #EAEDF1;
  }
  .toggleButton{
    background-color:#5A7196;
    color: #fff;
    text-align: center;
    letter-spacing: 4px;
    cursor: pointer;
    height: 40px;
    line-height: 40px;
  }
</style>