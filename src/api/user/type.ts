// 定义用户相关数据ts类型
// 用户登录接口携带参数的ts类型
export interface loginFormData {
  username: string;
  password: string;
}

// 定义全部接口返回数据都有的ts数据类型
export interface responseData {
  code: number;
  message: string;
  ok: boolean;
}

// 登录接口返回的数据类型
export interface loginResponseData extends responseData {
  data: string;
}

// 获取用户信息返回的数据类型
export interface userInfoResponseData extends responseData {
  data: {
    routes: string[];
    buttons: string[];
    roles: string[];
    name: string;
    avatar: string;
  };
}
