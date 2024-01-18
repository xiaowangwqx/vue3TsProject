// 对axios进行二次封装 使用请求拦截器 和 响应拦截器
import axios from 'axios';
import { ElMessage } from 'element-plus';
import useUserStore from '@/store/modules/user';

// 1、利用axios对象的create方法 创建axios实例(其他配置：基础路径、超时时间等)
let request = axios.create({
  // 基础路径
  baseURL: import.meta.env.VITE_APP_BASE_API, //基础路径上会携带 /api
  timeout: 5000, //请求超时时间的设置
});

// 2、给axios 实例 添加请求拦截器
request.interceptors.request.use((config) => {
  let userStore = useUserStore();
  if (userStore.token) {
    config.headers.token = userStore.token;
  }
  // config配置对象  headers：请求头 经常给服务器携带公共参数
  // 返回配置对象
  return config;
});

// 3、给axios 实例 响应拦截器
request.interceptors.response.use(
  // 成功的回调
  (response) => {
    return response.data;
  },
  // 失败的回调
  (error) => {
    // 处理http响应失败错误
    // 定义一个变量 用于存储网络错误信息
    let message = '';
    // http状态码
    let status = error.response.status;
    switch (status) {
      case 401:
        message = 'TOKEN失效';
        break;
      case 403:
        message = '无权访问';
        break;
      case 404:
        message = '请求地址错误';
        break;
      case 500:
        message = '服务器异常';
        break;
      default:
        message = '网络异常';
        break;
    }
    // 提示的错误信息
    ElMessage({
      type: error,
      message: message,
    });
    return Promise.reject(error);
  },
);

export default request;
