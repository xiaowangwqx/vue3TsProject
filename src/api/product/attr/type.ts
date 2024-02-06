import { responseData } from '../tradeMark/type';

// 属性相关接口返回数据TS类型
export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

export interface CatagoryObj {
  id: number | string;
  name: string;
  createTime: string;
  updateTime: string;
  category1Id?: number | string;
  category2Id?: number | string;
}

export interface CatagoryResponseData extends responseData {
  data: CatagoryObj[];
}

export interface attrValueObj {
  attrId?: number | string;
  id?: number | string;
  valueName: string;
  flag?: boolean;
}

export interface attrObj {
  attrName: string;
  attrValueList: attrValueObj[];
  categoryId: number | string;
  categoryLevel: number | string;
  id?: number | string;
}

export interface attrListResponseData extends responseData {
  data: attrObj[];
}
