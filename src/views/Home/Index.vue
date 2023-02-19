<template>
  <div class="home-container">
    <SearchBar :game-id="activeGameKey" />
    <GameBar v-model:active-key="activeGameKey" :game-list="gameList" @select="onSelectGame" />
    <SortCondition :condition-list="conditionList" @on-popup="onConditionPopup" />
    <ProductList ref="ProductListRef" :load-fn="onLoad" @on-product-click="onProductClick" />
    <!-- 王者 -->
    <RightPopup
      v-model:show="conditionPopupState.area_id"
      @ok="onAreaOk"
      @click-overlay="onAreaReset"
      @reset="onAreaReset"
    >
      <ButtonRadioGroup
        v-model:checked="areaChecked"
        title="大区"
        :radio-list="areaList"
        :fields-name="{ label: 'title', value: 'id' }"
      />
    </RightPopup>
    <ActionSheet
      v-model:show="conditionPopupState.order"
      safe-area-inset-bottom
      :actions="orderSortMap"
      @select="onSelectOrder"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ActionSheet } from 'vant'
import { useRouter } from 'vue-router'
import SearchBar from './components/SearchBar.vue'
import GameBar from './components/GameBar.vue'
import SortCondition from './components/SortCondition.vue'
import RightPopup from './components/RightPopup.vue'
import ButtonRadioGroup from './components/ButtonRadioGroup.vue'
import { defaultConditionList, orderSortMap } from './config'
import type { OrderSort, SortType } from './types'
import { useRadioSelect } from './hooks/useRadioSelect'
import ProductList from '@/components/product/ProductList.vue'
import type { AreaInterface, ProductInterface, SortEnum } from '@/types'
import { getAreaList, getProductList } from '@/api'
import { useGameList } from '@/hooks'

const router = useRouter()

const ProductListRef = ref<InstanceType<typeof ProductList> | null>(null)

const conditionPopupState = reactive<Record<SortType, boolean>>({
  area_id: false,
  order: false,
  filter: false,
})
const conditionList = reactive(defaultConditionList())
const onConditionPopup = (key: string) => {
  const map: Record<string, Function> = {
    area_id: handleArea,
  }
  if (map[key]) {
    map[key]()
  }
  conditionPopupState[key as SortType] = true
}

const [areaChecked, cacheArea, onAreaReset] = useRadioSelect<number | undefined>(undefined)
function handleArea() {
  cacheArea()
}
const onAreaOk = () => {
  if (areaChecked.value) {
    conditionList[0].isSelect = true
  }
}
const areaList = ref<AreaInterface[]>([])
const getAreaData = (gameId: number) => {
  return getAreaList({ game_id: gameId }).then((res) => {
    areaList.value = res.data
  })
}

const order = ref<undefined | SortEnum>(undefined)
const onSelectOrder = (action: OrderSort) => {
  conditionPopupState.order = false
  order.value = action.id as any
  conditionList[1].title = action.name
  conditionList[1].isSelect = action.id !== undefined
  ProductListRef.value?.onRefresh()
}

const activeGameKey = ref(1)
const { gameList, getGameData } = useGameList()
function loadGame() {
  getGameData().then((res) => {
    if (res.length) {
      getAreaData(res[0].id)
    }
  })
}
loadGame()
function onSelectGame(key: number) {
  order.value = undefined
  areaChecked.value = undefined
  getAreaData(key).then(() => {
    ProductListRef.value?.onRefresh()
  })
}

const onLoad = (pagination: { page: number; size: number }) => {
  return getProductList({
    page: pagination.page,
    limit: pagination.size,
    game_id: 3,
    sort: order.value,
    area_id: areaChecked.value,
  }).then((res) => {
    return res.data
  })
}
const onProductClick = (product: ProductInterface) => {
  router.push({
    name: 'Detail',
    query: {
      goods_id: product.id,
    },
  })
}
</script>

<style lang="less" scoped>
.home-container {
  padding-left: 30px;
  padding-right: 30px;
}
</style>
