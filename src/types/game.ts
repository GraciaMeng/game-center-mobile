import type { BaseResponse } from './base'

export interface GameInterface {
  id: number
  images: string
  title: string
}

export type GameResponse = BaseResponse<GameInterface[]>

export interface AreaInterface {
  id: number
  title: string
}

export type AreaResponse = BaseResponse<AreaInterface[]>

export interface FilterDataInterface {
  id: number
  title: string
}

export interface PriceFilterDataInterface extends FilterDataInterface {
  max_price: number
  min_price: number
}

export interface FilterMapInterface {
  price: PriceFilterDataInterface[]
  role: FilterDataInterface[]
  skin: FilterDataInterface[]
}

export type FilterMapResponse = BaseResponse<FilterMapInterface>
