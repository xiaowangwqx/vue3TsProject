// 路由鉴权
import router from './src/router/index';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'

// 导航守卫：项目中任意路由切换都会触发的钩子
// 全局前置守卫
// 访问某一个路由之前会触发的钩子
router.beforeEach((to: any, from: any, next: any) => {
  // to: 要访问的路由对象
  // from：从那个路由而来
  // next: 路由的放行函数
  console.log(111)
  NProgress.start();
  next();
});

// 全局后置守卫
router.afterEach((to: any, from: any) => {
  console.log(222)
  NProgress.done();
});
