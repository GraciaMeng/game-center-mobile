import type { Condition } from './components/SortCondition.vue'

interface GameItemInterface {
  key: string
  title: string
  imgUrl: string
}

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
    title: '区服',
    icon: 'arrow-down',
  },
  {
    key: 'filter',
    title: '筛选',
    icon: 'wap-nav',
  },
]
