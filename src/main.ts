import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
// import App from './App.vue';
import App from '@/App.vue';
import 'virtual:svg-icons-register';

// 引入自定义插件对象 注册整个项目的全局组件
import globalCompenent from '@/components/index';

// 获取应用实例对象
const app = createApp(App);
app.use(ElementPlus);
app.use(ElementPlus, {
  locale: zhCn,
});

// 注册全局组件
app.use(globalCompenent);

// 将应用挂载到挂载点上
app.mount('#app');
