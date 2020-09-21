import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: () => import('@/router/Login/Login'),
    },
    {
      path: '/index',
      component: () => import('@/pages/Index.vue'),
      children: [
        {
          path: '/home',
          component: () => import('@/router/Home/Home')
        },
        {
          path: '/menu',
          component: () => import('@/router/Menu/Menu')
        },
        {
          path: '/menu/add',
          component: () => import('@/router/Menu/MenuAdd')
        },
        {
          path: '/menu/edit',
          component: () => import('@/router/Menu/MenuAdd')
        },
        {
          path: '/role',
          component: () => import('@/router/Role/Role')
        },
        {
          path: '/role/add',
          component: () => import('@/router/Role/RoleAdd')
        },
        {
          path: '/role/edit',
          component: () => import('@/router/Role/RoleAdd')
        },
        {
          path: '/user',
          component: () => import('@/router/User/User')
        },
        {
          path: '/user/add',
          component: () => import('@/router/User/UserAdd')
        },
        {
          path: '/user/edit',
          component: () => import('@/router/User/UserAdd')
        },
        {
          path: '/cate',
          component: () => import('@/router/Category/Category')
        },
        {
          path: '/cate/add',
          component: () => import('@/router/Category/CategoryAdd')
        },
        {
          path: '/cate/edit',
          component: () => import('@/router/Category/CategoryAdd')
        },
        {
          path: '/specs',
          component: () => import('@/router/specss/specs')
        },
        {
          path: '/specs/add',
          component: () => import('@/router/specss/specsAdd')
        },
        {
          path: '/specs/edit',
          component: () => import('@/router/specss/specsAdd')
        },
        {
          path: '/goods',
          component: () => import('@/router/Goods/Goods')
        },
        {
          path: '/goods/add',
          component: () => import('@/router/Goods/GoodsAdd')
        },
        {
          path: '/goods/edit',
          component: () => import('@/router/Goods/GoodsAdd')
        },
        {
          path: '/member',
          component: () => import('@/router/Member/Member')
        },
        {
          path: '/member/add',
          component: () => import('@/router/Member/MemberAdd')
        },
        {
          path: '/member/edit',
          component: () => import('@/router/Member/MemberAdd')
        },
        {
          path: '/seck',
          component: () => import('@/router/Seck/Seck')
        },
        {
          path: '/seck/add',
          component: () => import('@/router/Seck/SeckAdd')
        },
        {
          path: '/seck/edit',
          component: () => import('@/router/Seck/SeckAdd')
        },
        {
          path: '/banner',
          component: () => import('@/router/Banner/Banner')
        },
        {
          path: '/banner/add',
          component: () => import('@/router/Banner/BannerAdd')
        },
        {
          path: '/banner/edit',
          component: () => import('@/router/Banner/BannerAdd')
        },
      ]
    },
  ]
})
