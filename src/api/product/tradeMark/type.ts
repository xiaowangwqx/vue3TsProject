// 品牌管理模块数据ts类型

export interface responseData {
  code: number;
  message: string;
  ok: boolean;
}

// 已有品牌数据类型
export interface trademark {
  id?: number;
  tmName: string;
  logoUrl: string;
  createTime?: string;
  updateTime?: string;
}

// 包含全部品牌的数据类型
export type Records = trademark[];

// 已有全部品牌的数据类型
export interface trademarkData extends responseData {
  data: {
    records: Records;
    total: number;
    size: number;
    current: number;
    searchCount: boolean;
    pages: number;
  };
}

// 新增或编辑品牌接口返回数据类型
export interface addOrUpdateTrademarkResponseData extends responseData {
  data: any;
}
