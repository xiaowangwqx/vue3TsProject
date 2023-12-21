import { RouteRecordRaw } from 'vue-router';

// 定义小仓库 数据类型
export interface UserState {
  token: string | null;
  menuRoutes: RouteRecordRaw[];
}
