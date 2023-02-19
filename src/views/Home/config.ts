import type { Condition, GameItemInterface, OrderSort } from './types'
import { SortEnum } from '@/types'

export const gameList: GameItemInterface[] = [
  {
    key: 'wzry',
    title: '王者荣耀',
    imgUrl: 'https://file.kejinshou.com/default/202110/15/11/040036EFQAyh.png?x-oss-process=image/resize,l_150',
  },
  {
    key: 'hpjy',
    title: '和平精英',
    imgUrl: 'https://file.kejinshou.com/default/202110/15/10/5355Eq9SNJkS.png?x-oss-process=image/resize,l_150',
  },
  {
    key: 'ys',
    title: '原神',
    imgUrl: 'https://file.kejinshou.com/default/202110/15/10/5419LJwmv00k.png?x-oss-process=image/resize,l_150',
  },
  {
    key: 'smzhsy',
    title: '使命召唤手游',
    imgUrl: 'https://file.kejinshou.com/default/202212/02/21/0833utstXICZ.png?x-oss-process=image/resize,l_150',
  },
]

export const defaultConditionList = (): Condition[] => [
  {
    key: 'area_id',
    title: '区服',
    icon: 'arrow-down',
  },
  {
    key: 'order',
    title: '默认排序',
    icon: 'arrow-down',
  },
  {
    key: 'filter',
    title: '筛选',
    icon: 'wap-nav',
  },
]

export const orderSortMap: OrderSort[] = [
  { id: SortEnum.NEW, name: '默认排序' },
  { id: SortEnum.NEW, name: '最新发布' },
  { id: SortEnum.MIN_PRICE, name: '价格最低' },
  { id: SortEnum.MAX_PRICE, name: '价格最高' },
]

interface Filter {
  id: number
  title: string
  min: number
  max?: number
}
export const priceFilterMap: Filter[] = [
  { id: 1, title: '500以下', min: 0, max: 500 },
  { id: 2, title: '500-1000', min: 500, max: 1000 },
  { id: 3, title: '1000-3000', min: 1000, max: 3000 },
  { id: 4, title: '3000-10000', min: 3000, max: 10000 },
  { id: 5, title: '10000-30000', min: 10000, max: 30000 },
  { id: 6, title: '30000以上', min: 30000, max: undefined },
]
