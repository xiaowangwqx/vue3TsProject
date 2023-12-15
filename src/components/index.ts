// 引入需要全局注册的组件
import SvgIcon from './SvgIcon/index.vue';

// 全局对象
const allGlobalComponent = { SvgIcon };

// 对外暴露插件对象
export default {
  // 插件对象 一定要叫做 install 方法
  install(app) {
    Object.keys(allGlobalComponent).forEach((key) => {
      app.component(key, allGlobalComponent[key]);
    });
  },
};
