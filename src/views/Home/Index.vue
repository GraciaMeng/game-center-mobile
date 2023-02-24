<template>
  <div class="home-container">
    <SearchBar :game-id="activeGameKey" />
    <GameBar v-model:active-key="activeGameKey" :game-list="gameList" @select="onSelectGame" />
    <SortCondition :condition-list="conditionList" @on-popup="onConditionPopup" />
    <ProductList ref="ProductListRef" :load-fn="onLoad" :immediate="false" @on-product-click="onProductClick" />
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
    <RightPopup
      v-model:show="conditionPopupState.filter"
      @ok="onFilterOk"
      @click-overlay="onFilterReset"
      @reset="onFilterReset"
    >
      <ButtonRadioGroup
        v-if="filterMap && filterChecked"
        v-model:checked="filterChecked!.price"
        title="价格区间"
        :radio-list="filterMap?.price"
        :fields-name="{ label: 'title', value: 'id' }"
      >
        <template #extra>
          <PriceRange v-model:max="priceRange.max" v-model:min="priceRange.min" @focus="onPriceRangeFocus" />
        </template>
      </ButtonRadioGroup>
      <ButtonRadioGroup
        v-if="filterMap && filterChecked"
        v-model:checked="filterChecked!.role"
        title="特效"
        :radio-list="filterMap?.role"
        :fields-name="{ label: 'title', value: 'id' }"
      />
      <ButtonRadioGroup
        v-if="filterMap && filterChecked"
        v-model:checked="filterChecked!.skin"
        title="皮肤"
        :radio-list="filterMap?.skin"
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

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
export default defineComponent({
  name: 'Home',
})
</script>
<script setup lang="ts" name="Home">
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
import PriceRange from './components/PriceRange.vue'
import ProductList from '@/components/product/ProductList.vue'
import type { AreaInterface, FilterMapInterface, ProductInterface } from '@/types'
import { SortEnum } from '@/types'
import { getAreaList, getFilterMap, getProductList } from '@/api'
import { useGameList, usePagePosition } from '@/hooks'

const router = useRouter()

usePagePosition('.home-container')

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
    filter: handleFilter,
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
  ProductListRef.value?.onRefresh()
}
const areaList = ref<AreaInterface[]>([])
const getAreaData = (gameId: number) => {
  return getAreaList({ game_id: gameId }).then((res) => {
    areaList.value = res.data
  })
}

const order = ref<SortEnum>(SortEnum.NEW)
const onSelectOrder = (action: OrderSort) => {
  conditionPopupState.order = false
  order.value = action.id as any
  conditionList[1].title = action.name
  conditionList[1].isSelect = action.id !== SortEnum.NEW
  ProductListRef.value?.onRefresh()
}

const [priceChecked, cachePrice, resetPriceChecked] = useRadioSelect<number | undefined>(undefined)
const [filterChecked, cacheFilter, resetFilterChecked] = useRadioSelect<
  Record<keyof FilterMapInterface, number | undefined> | undefined
>(undefined)
const priceRange = reactive({
  min: undefined as undefined | number,
  max: undefined as undefined | number,
})
const priceRangeCache = reactive({
  min: undefined as undefined | number,
  max: undefined as undefined | number,
})
function handleFilter() {
  cacheFilter()
  Object.assign(priceRangeCache, priceRange)
}
function onFilterOk() {
  if (priceChecked.value) {
    conditionList[2].isSelect = true
  }
  ProductListRef.value?.onRefresh()
}
function resetPriceRange() {
  Object.assign(priceRange, priceRangeCache)
}
function onPriceRangeFocus() {
  priceChecked.value = undefined
}
function onFilterReset() {
  resetPriceRange()
  resetFilterChecked()
}

const filterMap = ref<FilterMapInterface | null>(null)
function getFilter(gameId: number) {
  getFilterMap({ game_id: gameId }).then((res) => {
    filterMap.value = res.data
    filterChecked.value = Object.keys(res.data).reduce((prev, key) => {
      prev[key] = undefined
      return prev
    }, {} as any)
    console.log(filterChecked.value)
  })
}

const activeGameKey = ref(1)
const { gameList, getGameData } = useGameList()
function loadGame() {
  getGameData().then((res) => {
    if (res.length) {
      activeGameKey.value = res[0].id
      getAreaData(res[0].id)
      getFilter(res[0].id)
      ProductListRef.value?.onRefresh()
    }
  })
}
loadGame()
function onSelectGame(key: number) {
  order.value = SortEnum.NEW
  areaChecked.value = undefined
  getAreaData(key).then(() => {
    ProductListRef.value?.onRefresh()
  })
}

const getPriceRange = () => {
  let price_start = priceRange.min
  let price_end = priceRange.max
  if (priceChecked) {
    const item = filterMap.value?.price.find((item) => item.id === priceChecked.value!) || ({} as any)
    price_start = item?.min_price
    price_end = item?.max_price
  }
  return { price_start, price_end }
}
const onLoad = (pagination: { page: number; size: number }) => {
  return getProductList({
    page: pagination.page,
    limit: pagination.size,
    game_id: activeGameKey.value,
    sort: order.value,
    area_id: areaChecked.value,
    skin: filterChecked.value?.skin,
    role: filterChecked.value?.role,
    ...getPriceRange(),
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
