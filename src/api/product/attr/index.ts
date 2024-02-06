// 属性相关接口
import request from '@/utils/request';
import type {
  CatagoryResponseData,
  attrListResponseData,
  attrObj,
} from './type';

enum API {
  C1_URL = '/admin/product/getCategory1',
  C2_URL = '/admin/product/getCategory2',
  C3_URL = '/admin/product/getCategory3',
  CATEGORYlIST_URL = '/admin/product/attrInfoList',
  ADDOREDITATTR_URL = '/admin/product/saveAttrInfo',
  DELETEATTR_URL = '/admin/product/deleteAttr',
}

// 获取一级分类
export const reqC1 = () => {
  return request.get<any, CatagoryResponseData>(API.C1_URL);
};

// 获取二级分类
export const reqC2 = (c1Id: number | string) => {
  return request.get<any, CatagoryResponseData>(`${API.C2_URL}/${c1Id}`);
};

// 获取三级分类
export const reqC3 = (c2Id: number | string) => {
  return request.get<any, CatagoryResponseData>(`${API.C3_URL}/${c2Id}`);
};

// 根据分类id列表获取分类数据
export const reqAttrList = (
  c1Id: number | string,
  c2Id: number | string,
  c3Id: number | string,
) => {
  return request.get<any, attrListResponseData>(
    `${API.CATEGORYlIST_URL}/${c1Id}/${c2Id}/${c3Id}`,
  );
};

// 新增或编辑属性
export const reqAddOrEditAttr = (data: attrObj) => {
  return request.post<any, any>(API.ADDOREDITATTR_URL, data);
};

// 删除属性
export const reqDeleteAttr = (id: number | string | undefined) => {
  return request.delete<any, any>(`${API.DELETEATTR_URL}/${id}`);
};
