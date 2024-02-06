// 引入需要全局注册的组件
import SvgIcon from './SvgIcon/index.vue';
import Category from '@/components/category/index.vue';

// 引入全部的图标 全局注册
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

// 全局对象
const allGlobalComponent = { SvgIcon, Category };

// 对外暴露插件对象
export default {
  // 插件对象 一定要叫做 install 方法
  install(app) {
    Object.keys(allGlobalComponent).forEach((key) => {
      app.component(key, allGlobalComponent[key]);
    });
    // 将element-plus 提供的组件 注册为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  },
};
