<template>
  <div class="home-container">
    <SearchBar />
    <GameBar @select="onSelectGame" />
    <SortCondition :condition-list="conditionList" @on-popup="onConditionPopup" />
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
