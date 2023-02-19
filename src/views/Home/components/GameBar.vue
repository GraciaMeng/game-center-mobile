<template>
  <div class="game-container">
    <div
      v-for="item in gameList"
      :key="item.id"
      :title="item.title"
      class="game-item"
      :class="{ 'game-selected': composeActiveKey === item.id }"
      @click="onSelectGame(item.id)"
    >
      <VanImage width="44" height="44" :src="BASE_URL + item.images" />
      <div class="game-title">
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Image as VanImage } from 'vant'
import type { GameInterface } from '@/types'
import { BASE_URL } from '@/api/request'
import { useVModel } from '@/hooks'

const props = defineProps<{
  activeKey: number
  gameList: GameInterface[]
}>()
const emits = defineEmits<{
  (e: 'update:activeKey', activeKey: number): void
  (e: 'select', key: number): void
}>()
const composeActiveKey = useVModel(props, 'activeKey', emits)

function onSelectGame(key: number) {
  composeActiveKey.value = key
  emits('select', key)
}
</script>

<style lang="less" scoped>
.game {
  &-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 20%;
    margin-top: 15px;
  }

  &-title {
    margin-top: 9px;
    text-align: center;
    font-size: 12px;
    font-weight: 400;
    color: #c4c9cf;
  }

  &-selected > &-title {
    font-weight: 700;
    color: #344356;
  }
}
</style>
