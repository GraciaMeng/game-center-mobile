import type { BaseResponse, PageInterface } from './base'
export interface ProductInterface {
  id: number
  area_id: number
  area: {
    id: number
    title: string
  }
  image_type: string
  images: string
  price: string
  sub_title: string
  title: string
}

export type ProductListResponse = BaseResponse<PageInterface<ProductInterface>>

export enum SortEnum {
  NEW = 1,
  MIN_PRICE = 2,
  MAX_PRICE = 3,
}
export interface GetProductListParams {
  page: number
  limit: number
  game_id: number
  area_id?: number
  sort?: SortEnum
  price_start?: number
  price_end?: number
  key?: string
}

export interface SkinInfo {
  id: number
  images: number
  title: string
}
export interface ProductInfoInterface {
  addtime: string
  area: string
  base_info: string
  id: number
  price: string
  screen_shot: string[]
  skin_info: SkinInfo[]
  sn: string
  sub_title: string
  title: string
}

export type ProductInfoResponse = BaseResponse<ProductInfoInterface>
