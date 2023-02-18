<template>
  <div class="home-container">
    <SearchBar />
    <GameBar @select="onSelectGame" />
    <SortCondition :condition-list="conditionList" @on-popup="onConditionPopup" />
    <ProductList :load-fn="onLoad" @on-product-click="onProductClick" />
    <RightPopup v-model:show="conditionPopupState.area_id">
      <ButtonRadioGroup
        v-model:checked="areaChecked"
        title="大区"
        :radio-list="wzryArea"
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
import SearchBar from './components/SearchBar.vue'
import GameBar from './components/GameBar.vue'
import SortCondition from './components/SortCondition.vue'
import RightPopup from './components/RightPopup.vue'
import ButtonRadioGroup from './components/ButtonRadioGroup.vue'
import { defaultConditionList, orderSortMap } from './config'
import { wzryArea } from './wzry-config'
import type { OrderSort, SortType } from './types'
import ProductList from '@/components/product/ProductList.vue'
import type { ProductInterface } from '@/types'

function onSelectGame(key: string) {}

const conditionPopupState = reactive<Record<SortType, boolean>>({
  area_id: false,
  order: false,
  filter: false,
})
const conditionList = reactive(defaultConditionList())
const onConditionPopup = (key: string) => {
  conditionPopupState[key as SortType] = true
}

const areaChecked = ref<number>(0)

const order = ref<string>('')
const onSelectOrder = (action: OrderSort) => {
  conditionPopupState.order = false
  order.value = action.id
  conditionList[1].title = action.name
  conditionList[1].isSelect = action.id !== ''
}

const onLoad = (pagination: { page: number; size: number }) => {
  return Promise.resolve().then(() => {
    return {
      list: [
        {
          id: 292169,
          image: '',
          image_type: 'xxl',
          images: ['https://file.kejinlianmeng.com/official/202302/18/16/51358TOiktlR.jpg'],
          price: '1804',
          sub_title:
            '冒险等级58级42黄神里绫人1命钟离魈珊瑚宫心海阿贝多枫原万叶温迪申鹤3命优菈甘雨雷电将军夜兰1命胡桃可莉迪卢克3命琴1命莫娜七七埃洛伊冬极白星终末嗟叹之诗阿莫斯之弓天空之翼四风原典和璞鸢贯虹之槊护摩之杖无工之剑松籁响起之时精2狼的末路拨乱月白经津斫峰之刃',
          title: '官服 天空岛',
        },
      ],
      pagination: {
        page: 1,
        size: 15,
        pages: 1,
        total: 1,
      },
    }
  })
}
}
</script>

<style lang="less" scoped>
.home-container {
  padding-left: 30px;
  padding-right: 30px;
}

.game-container {
  display: flex;
  flex-wrap: wrap;
}
</style>
