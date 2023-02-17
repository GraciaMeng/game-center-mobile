<template>
  <div class="sort-condition-container">
    <template v-for="(item, index) in composeList" :key="item.key">
      <div class="sort-box" :class="{ 'sort-selected': item.isSelect }" @click="onPopup(item.key)">
        <div class="title">{{ item.title }}</div>
        <Icon class="sort-icon" :name="item.icon" />
      </div>
      <div v-if="item.showLine" class="sort-line"></div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Icon } from 'vant'
import { computed } from 'vue'
export interface Condition {
  key: string
  title: string
  icon: string
  isSelect?: boolean
}
const props = defineProps<{
  conditionList: Condition[]
}>()
const emits = defineEmits<{
  (e: 'onPopup', key: string): void
}>()

const composeList = computed(() => {
  const lastIndex = props.conditionList.length - 1
  return props.conditionList.map((item, index) => ({ ...item, showLine: lastIndex !== index }))
})

const onPopup = (key: string) => {
  emits('onPopup', key)
}
</script>

<style lang="less" scoped>
.sort {
  &-condition-container {
    position: sticky;
    top: 0;
    height: 44px;
    background-color: #fff;
    border-radius: 15px;
    display: flex;
    z-index: 100;
    margin-top: 15px;
  }
  &-box {
    flex: 1;
    display: flex;
    padding: 0px 15px;
    justify-content: space-between;
    align-items: center;
  }
  &-icon {
    width: 12px;
    vertical-align: middle;
    border-style: none;
  }
  &-line {
    width: 1px;
    height: 100%;
    background-color: #f3f5f9;
  }
  &-selected {
    color: #5468ff;
  }
}
</style>
