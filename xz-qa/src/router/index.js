import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index.vue'
import detail from '../views/detail.vue'
import me from '../views/me.vue'
import user_set from '../views/user_set.vue'
import user_article from '../views/user_article.vue'
import register from '../views/register.vue'
import login from '../views/login.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: index
  },
  {
    path: '/detail/:id',
    name:'Article',
    component: detail
  },
  {
    path: '/register',
    component: register
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/user_article',
    component: user_article,
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/user_set',
    component: user_set,
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/me',
    component: me,
    meta:{
      requiresAuth:true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

// 没有登录情况下，进行跳转
router.beforeEach((to, from, next)=>{
  if(to.matched.some(r=>r.meta.requiresAuth)){
    if(store.state.islogined){
      next();
    }else{
      router.push({path:'/login', query:{path:to.fullPath}});
    }
  }else{
    next();
  }
});

const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

export default router
