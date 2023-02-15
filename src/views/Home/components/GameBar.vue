<template>
  <div class="game-container">
    <div
      v-for="item in gameList"
      :key="item.key"
      :title="item.title"
      :img-url="item.imgUrl"
      class="game-item"
      :class="{ 'game-selected': activeGameKey === item.key }"
      @click="onSelectGame(item.key)"
    >
      <VanImage width="44" height="44" :src="item.imgUrl" />
      <div class="game-title">
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Image as VanImage } from 'vant'
import { gameList } from '../config'

const emits = defineEmits<{
  (e: 'select', key: string): void
}>()
const activeGameKey = ref('wzry')
function onSelectGame(key: string) {
  activeGameKey.value = key
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
