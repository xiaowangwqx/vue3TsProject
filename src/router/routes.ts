// 对外暴露 路由配置
export const constantRoue = [
  // 登录
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login', //命名路由
  },
  // 登录后展示数据
  {
    path: '/',
    component: () => import('@/views/layout/index.vue'),
    name: 'layout',
  },
  // 404
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404',
    name: 'any',
  },
];
