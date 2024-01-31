// 品牌管理模块接口
import request from '@/utils/request';
import type {
  trademarkData,
  trademark,
  addOrUpdateTrademarkResponseData,
} from './type';
// 品牌管理模块接口地址
enum API {
  // 获取已有品牌
  TRADEMARK_URL = '/admin/product/baseTrademark',
  // 新增品牌
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
  // 编辑品牌
  UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
  // 删除品牌
  DELETEtRADEMARK_URL = '/admin/product/baseTrademark/remove',
}

// 获取已有品牌
export const reqHasTrademark = (page: number, limit: number) => {
  return request.get<any, trademarkData>(
    `${API.TRADEMARK_URL}/${page}/${limit}`,
  );
};

// 新增品牌
export const reqAddOrUpdateTrademark = (data: trademark) => {
  if (data.id) {
    return request.put<any, addOrUpdateTrademarkResponseData>(
      API.UPDATETRADEMARK_URL,
      data,
    );
  } else {
    return request.post<any, addOrUpdateTrademarkResponseData>(
      API.ADDTRADEMARK_URL,
      data,
    );
  }
};

// 删除品牌
export const reqDeleteTrademark = (id: number) => {
  return request.delete<any, any>(`${API.DELETEtRADEMARK_URL}/${id}`);
};
