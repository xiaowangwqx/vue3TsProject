import type { CatagoryObj } from '@/api/product/attr/type';
import { RouteRecordRaw } from 'vue-router';

// 定义小仓库 数据类型
export interface UserState {
  token: string | null;
  menuRoutes: RouteRecordRaw[];
  username: string;
  avatar: string;
}

// 定义分类仓库 数据类型
export interface CatagoryState {
  c1Option: CatagoryObj[];
  c1Id: number | string;
  c2Option: CatagoryObj[];
  c2Id: number | string;
  c3Option: CatagoryObj[];
  c3Id: number | string;
}
