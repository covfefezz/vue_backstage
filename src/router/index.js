import Vue from 'vue'
import VueRouter from 'vue-router'

const Login=()=> import('views/Login')
const Home=()=> import('views/home/Home')
const Welcome=()=> import('components/content/Welcome')
const Users=()=> import('components/content/user/Users')
const Rights=()=> import('components/content/permission/Rights')
const Roles=()=> import('components/content/permission/Roles')
const Cate=()=> import('components/content/goods/Cate')
const CateParams=()=> import('components/content/goods/CateParams')

Vue.use(VueRouter)

  const routes = [
    {
      path:'',
      redirect:'/login'
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/home',
      component:Home,
      redirect:'/welcome',
      children:[
        {
          path:'/welcome',
          component:Welcome
        },
        {
          path:'/users',
          component:Users
        },
        {
          path:'/rights',
          component:Rights
        },
        {
          path:'/roles',
          component:Roles
        },
        {
          path:'/categories',
          component:Cate
        },
        {
          path:'/params',
          component:CateParams
        }
      ]
    }
]

const router = new VueRouter({
  routes
})

//挂载路由导航守卫
router.beforeEach((to,from,next)=>{
  if(to.path === "/login")
    return next()
  const tokenStr = window.sessionStorage.getItem("token")
  if(!tokenStr)
    return next('/login')
  next()
})

export default router
