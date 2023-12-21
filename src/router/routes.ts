// 对外暴露 路由配置
export const constantRoue = [
  // 登录
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login', //命名路由
    meta: {
      title: '登录',
      hidden:true, //路由标题在菜单中是否隐藏
      icon:'Promotion'
    },
  },
  // 登录后展示数据
  {
    path: '/',
    component: () => import('@/views/layout/index.vue'),
    name: 'layout',
    meta: {
      title: 'layout',
      hidden:false,
      icon:'Avatar'
    },
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          hidden:false,
          icon:'ChatSquare'
        },
      }
    ],
  },
  // 404
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      title: '404',
      hidden:true,
      icon:'Close'
    },
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404',
    name: 'any',
    meta: {
      title: 'any',
      hidden:true,
      icon:'More'
    },
  },
];
