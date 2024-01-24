// 路由鉴权
import router from '@/router/index';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import pinia from '@/store/index';
// 获取用户相关小仓库 中的token 判断用户是否登录成功
import useUserStore from '@/store/modules/user';
import setting from './setting';
let userStore = useUserStore(pinia);

NProgress.configure({ showSpinner: false });

// 导航守卫：项目中任意路由切换都会触发的钩子
// 全局前置守卫
// 访问某一个路由之前会触发的钩子
router.beforeEach(async (to: any, from: any, next: any) => {
  // to: 要访问的路由对象
  // from：从那个路由而来
  // next: 路由的放行函数
  NProgress.start();
  // 获取token 判断用户是否登录
  let token = userStore.token;
  let username = userStore.username;
  let avatar = userStore.avatar;
  if (token) {
    // 登录
    if (to.path == '/login') {
      next({ path: '/' });
    } else {
      if (username) {
        next();
      } else {
        try {
          // 获取用户信息
          await userStore.userInfo();
          // 放行
          next();
        } catch (error) {
          // token过期/用户手动修改本地token
          // 退出登录 清空用户相关信息
          await userStore.userLogout();
          next({ path: '/login', query: { redirect: to.path } });
        }
      }
    }
  } else {
    // 未登录
    if (to.path == '/login') {
      next();
    } else {
      next({ path: '/login', query: { redirect: to.path } });
    }
  }
});

// 全局后置守卫
router.afterEach((to: any, from: any) => {
  document.title = setting.title + '-' + to.meta.title;

  NProgress.done();
});

// 第一个问题：任意路由切换实现进度条业务————nprogress
// 第二个问题：路由鉴权(路由组件访问权限设置)
// 全部路由组件：登录|404|任意路由|首页|数据大屏|权限管理|商品管理

// 用户未登录：可以访问login,其他路由不能访问，指向login
// 用户登录成功：不能访问login，访问login时指向首页，其余路由可以访问
