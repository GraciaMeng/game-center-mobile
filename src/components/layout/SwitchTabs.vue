<template>
  <Tabs v-model:active="composeActive" class="switch-tabs" v-bind="$attrs" :swipe-threshold="2" type="card">
    <Tab v-for="(tab, index) in tabList" :key="index" :title="tab.title">
      <slot v-bind="{ tab }" />
    </Tab>
  </Tabs>
</template>

<script setup lang="ts">
import { Tab, Tabs } from 'vant'
import { useVModel } from '@/hooks'
interface Props {
  tabList: { title: string; [key: string]: any }[]
  active: number | string
}
const props = defineProps<Props>()
const emits = defineEmits<{
  (e: 'update:active', active: number | string): void
}>()

const composeActive = useVModel(props, 'active', emits)
</script>

<style lang="less" scoped>
.switch-tabs {
  position: relative;

  :deep(.van-tabs__wrap) {
    height: 44px !important;
    overflow: hidden;

    .van-tabs__nav--card {
      color: #c4c9cf;
      border-radius: 2px;

      .van-tab {
        position: relative;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        cursor: pointer;
        border: none;
        flex: none;
        background-color: #fff;
        margin: 0 8px;
        border-radius: 15px;
        line-height: 44px;
        height: 44px;
        font-size: 14px;
        padding: 0 30px;
        font-weight: 500;

        &:first-child {
          margin-left: 0;
        }

        &__text {
          color: #c4c9cf;
        }
      }

      .van-tab--active {
        .van-tab__text {
          background: #fff;
          color: #344356;
          font-weight: 700;
        }
      }
    }

    .van-tabs__nav {
      position: relative;
      display: flex;
      user-select: none;
      border: none;
      margin: 0;
      background: transparent;
      height: 44px;
      padding-right: 0;
      padding-left: 0;
      // overflow-x: auto;
      // overflow-y: hidden;
      // -webkit-overflow-scrolling: touch;
    }
  }
}
</style>
