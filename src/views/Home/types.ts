export type SortType = 'area_id' | 'order' | 'filter'

export interface GameItemInterface {
  key: string
  title: string
  imgUrl: string
}

export interface OrderSort {
  id?: number
  name: string
}

export interface Condition {
  key: string
  title: string
  icon: string
  isSelect?: boolean
}
