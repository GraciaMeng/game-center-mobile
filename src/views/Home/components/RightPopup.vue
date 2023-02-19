<template>
  <Popup
    v-model:show="composeShow"
    round
    position="right"
    safe-area-inset-bottom
    :style="{ width: '85%', height: '100%' }"
    v-bind="$attrs"
  >
    <div class="right-popup-content">
      <slot name="default" />
    </div>
    <div class="right-popup-btn-group">
      <Sticky :offset-bottom="0" position="bottom">
        <div class="btn-group">
          <div
            class="operation-button"
            style="background-color: rgba(84, 104, 255, 0.1); color: rgb(84, 104, 255)"
            @click="onReset"
          >
            重置
          </div>
          <div style="width: 15px"></div>
          <div class="operation-button" style="background-color: rgb(84, 104, 255); color: white" @click="onOk">
            确定
          </div>
        </div>
      </Sticky>
    </div>
  </Popup>
</template>

<script setup lang="ts">
import { Popup, Sticky } from 'vant'
import { useVModel } from '@/hooks'
const props = defineProps<{
  show: boolean
}>()
const emits = defineEmits<{
  (e: 'update:show', show: boolean): void
  (e: 'reset'): void
  (e: 'ok'): void
}>()
const composeShow = useVModel(props, 'show', emits)
const onReset = () => {
  emits('reset')
}
const onOk = () => {
  composeShow.value = false
  emits('ok')
}
</script>

<style lang="less" scoped>
.right-popup {
  &-container {
    height: calc(100vh - 80px);
    overflow: auto;
  }
  &-content {
    margin: 15px 0px 0px;
    height: calc(100vh - 98px);
    overflow-y: auto;
    box-sizing: border-box;
  }
  &-btn-group {
    height: 78px;
    width: 100%;
  }
}
.btn-group {
  display: flex;
  padding: 15px;
  background-color: white;
  .operation-button {
    line-height: 48px;
    height: 48px;
    border-radius: 15px;
    flex: 1;
    text-align: center;
    font-size: 16px;
  }
}
</style>
