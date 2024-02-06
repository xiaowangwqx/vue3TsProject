export interface responseData {
  code: number;
  message: string;
  ok: boolean;
}

export interface spuObj {
  category3Id: number | string;
  createTime: string;
  description: string;
  id?: number | string;
  spuImageList: any;
  spuName: string;
  spuPosterList: any;
  spuSaleAttrList: any;
  tmId: number | string;
  updateTime: string;
}

export interface responseSpuData extends responseData {
  data: {
    records: spuObj[];
    total: number;
    size: number;
    current: number;
    searchCount: boolean;
    pages: number;
  };
}
