<template>
  <div class="home-container">
    <SearchBar />
    <GameBar @select="onSelectGame" />
    <SortCondition :condition-list="conditionList" @on-popup="onConditionPopup" />
    <RightPopup v-model:show="conditionPopupState.area_id"> </RightPopup>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import SearchBar from './components/SearchBar.vue'
import GameBar from './components/GameBar.vue'
import SortCondition from './components/SortCondition.vue'
import RightPopup from './components/RightPopup.vue'
import { defaultConditionList } from './config'

function onSelectGame(key: string) {}

const conditionPopupState = reactive<Record<string, boolean>>({
  area_id: false,
  order: false,
  filter: false,
})
const conditionList = reactive(defaultConditionList())
const onConditionPopup = (key: string) => {
  conditionPopupState[key] = true
}

const areaChecked = ref<string | undefined>()
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
