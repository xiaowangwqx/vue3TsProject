import request from '@/utils/request';
import type { responseSpuData } from './type';

enum API {
  SPULIST_URL = '/admin/product',
}

export const reqSpuList = (
  page: number,
  limit: number,
  c3Id: number | string,
) => {
  return request.get<any, responseSpuData>(
    `${API.SPULIST_URL}/${page}/${limit}?category3Id=${c3Id}`,
  );
};
