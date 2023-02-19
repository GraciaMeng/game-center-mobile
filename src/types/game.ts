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
