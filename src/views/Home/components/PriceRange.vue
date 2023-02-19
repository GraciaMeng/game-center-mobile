<template>
  <div class="input-price">
    <CellGroup inset>
      <Field v-model="composeMin" center type="number" placeholder="最低价" @focus="onFocus" />
    </CellGroup>
    <span style="color: rgb(196, 201, 207)">-</span>
    <CellGroup inset>
      <Field v-model="composeMax" center type="number" placeholder="最高价" @focus="onFocus" />
    </CellGroup>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { CellGroup, Field } from 'vant'
import { useVModel } from '@/hooks'
const props = defineProps<{
  min?: number
  max?: number
}>()
const emits = defineEmits<{
  (e: 'update:min', value?: number): void
  (e: 'update:max', value?: number): void
  (e: 'focus'): void
}>()
const composeMin = useVModel(props, 'min', emits)
const composeMax = useVModel(props, 'max', emits)

const onFocus = () => {
  emits('focus')
}
</script>

<style lang="less" scoped>
.input-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  :deep(.van-cell-group--inset) {
    margin: 0;
    width: 130px;
    height: 40px;
    border-style: solid;
    border-width: 1px;
    border-color: #c4c9cf;
  }
  :deep(.van-cell) {
    padding: 0 15px;
    height: 100%;
  }
  :deep(.van-field__control) {
    text-align: center;
    color: #344356;
  }
}
</style>
