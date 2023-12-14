import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
// import App from './App.vue';
import App from '@/App.vue';

// 获取应用实例对象
const app = createApp(App);
app.use(ElementPlus);
app.use(ElementPlus, {
  locale: zhCn,
});

// 将应用挂载到挂载点上
app.mount('#app');
