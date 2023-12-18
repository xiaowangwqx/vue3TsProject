// 通过vue-router 实现模板路由配置
import { createRouter, createWebHashHistory } from 'vue-router';
import { constantRoue } from './routes';

let router = createRouter({
  // 哈希路由模式
  history: createWebHashHistory(),
  routes: constantRoue,
  // 滚动行为
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    };
  },
});

export default router;
