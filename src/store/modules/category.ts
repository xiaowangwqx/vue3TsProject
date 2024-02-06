// 商品分类全局组件小仓库
import { defineStore } from 'pinia';
import { reqC1, reqC2, reqC3 } from '@/api/product/attr';
import type {
  CatagoryResponseData,
  attrListResponseData,
} from '@/api/product/attr/type';
import { CatagoryState } from './types/type';

let useCatagoryStore = defineStore('Catagory', {
  state: (): CatagoryState => {
    return {
      c1Option: [],
      c1Id: '',
      c2Option: [],
      c2Id: '',
      c3Option: [],
      c3Id: '',
    };
  },
  actions: {
    async getC1() {
      let res: CatagoryResponseData = await reqC1();
      console.log(res, '一级分类');
      if (res.code == 200) {
        this.c1Option = res.data;
      }
    },
    async getC2() {
      let res: CatagoryResponseData = await reqC2(this.c1Id);
      console.log(res, '二级分类');
      if (res.code == 200) {
        this.c2Option = res.data;
      }
    },
    async getC3() {
      let res: CatagoryResponseData = await reqC3(this.c2Id);
      console.log(res, '三级分类');
      if (res.code == 200) {
        this.c3Option = res.data;
      }
    },
  },
});

export default useCatagoryStore;
