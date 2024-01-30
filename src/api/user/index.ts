// 用户相关接口
import request from '@/utils/request';
import { loginFormData, loginResponseData, userInfoResponseData } from './type';

// 用户相关接口
enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_UEL = '/admin/acl/index/logout',
}

// 登录
export const reqLogin = (data: loginFormData) => {
  return request.post<any, loginResponseData>(API.LOGIN_URL, data);
};
// 获取用户信息
export const reqUserInfo = () => {
  return request.get<any, userInfoResponseData>(API.USERINFO_URL);
};
// 退出登录
export const reqLogout = () => {
  return request.post<any, any>(API.LOGOUT_UEL);
};
