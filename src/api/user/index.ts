// 用户相关接口
import request from '@/utils/request';

// 用户相关接口
enum API{
  LOGIN_URL='/admin/acl/index/login',
  USERINFO_URL='/admin/acl/index/info',
  LOGOUT_UEL='/admin/acl/index/logout'
}

// 登录
export const reqLogin=(data:any)=>request.post<any,any>(API.LOGIN_URL,data);
// 获取用户信息
export const reqUserInfo=()=>request.get<any,any>(API.USERINFO_URL);
// 退出登录
export const reqLogout=()=>request.post<any,any>(API.LOGOUT_UEL);