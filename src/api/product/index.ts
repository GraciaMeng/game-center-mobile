import { BASE_URL, METHOD, request } from '../request'
import type {
  AreaResponse,
  GameResponse,
  GetProductListParams,
  ProductInfoResponse,
  ProductListResponse,
} from '@/types'

const GET_GAME_LIST = `${BASE_URL}/api/game/getGameList`
export function getGameList(params?: any) {
  return request<GameResponse>(GET_GAME_LIST, METHOD.POST, params)
}

const GET_AREA_LIST = `${BASE_URL}/api/game/getAreaList`
export function getAreaList(params: { game_id: number }) {
  return request<AreaResponse>(GET_AREA_LIST, METHOD.POST, params)
}

const GET_PRODUCT_LIST = `${BASE_URL}/api/game/getProudctList`
export function getProductList(params: GetProductListParams) {
  return request<ProductListResponse>(GET_PRODUCT_LIST, METHOD.POST, params)
}

const GET_PRODUCT_INFO = `${BASE_URL}/api/game/getInfo`
export function getProductInfo(params: { id: string }) {
  return request<ProductInfoResponse>(GET_PRODUCT_INFO, METHOD.POST, params)
}

const GET_FILTER_MAP = `${BASE_URL}/api/game/getFilter`
export function getFilterMap(params: { game_id: number }) {
  return request<any>(GET_FILTER_MAP, METHOD.POST, params)
}
