// 创建 用户 相关仓库
import { defineStore } from 'pinia';
// 引入登录接口
import { reqLogin, reqUserInfo } from '@/api/user/index';
import { setToken, getToken } from '@/utils/storage';
// 引入数据类型
import { loginForm, loginResponseData } from '@/api/user/type';
import { UserState } from './types/type';
// 引入常量路由
import { constantRoue } from '@/router/routes';

// 创建用户小仓库
let useUserStore = defineStore('User', {
  // 存储数据
  state: (): UserState => {
    return {
      token: getToken(),
      menuRoutes: constantRoue, //仓库存储生成菜单需要的数组
      username:'',
      avatar:'', 
    };
  },
  // 处理异步
  actions: {
    // 用户登录的方法
    async userLogin(data: loginForm) {
      let res: loginResponseData = await reqLogin(data);
      console.log(res, '登录');
      //   登录成功 存储token
      if (res.code == 200) {
        this.token = res.data.token as string;
        // 数据持久化 存储到本地存储中
        setToken(res.data.token as string);
        console.log(this.token, 'this.token');
        // 保证当前async 返回成功的promise
        return 'ok';
      } else {
        // 登录失败 展示登录失败的错误信息
        return Promise.reject(new Error(res.data.message));
      }
    },
    // 获取用户信息
    async userInfo() {
      // 获取用户信息 存储当前用户信息
      let res = await reqUserInfo();
      console.log(res,'userInfo');
      if(res.code==200){
        // 存储用户信息
        this.username=res.data.checkUser.username;
        this.avatar=res.data.checkUser.avatar;
      }else{
        
      }
    },
  },
  // 计算属性
  getters: {},
});

export default useUserStore;
