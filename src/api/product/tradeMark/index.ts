// 品牌管理模块接口
import request from '@/utils/request';
import type { trademarkData } from './type';
// 品牌管理模块接口地址
enum API {
  // 获取已有品牌
  TRADEMARK_URL = '/admin/product/baseTrademark',
}

// 获取已有品牌
export const reqHasTrademark = (page: number, limit: number) => {
  return request.get<any, trademarkData>(
    `${API.TRADEMARK_URL}/${page}/${limit}`,
  );
};
