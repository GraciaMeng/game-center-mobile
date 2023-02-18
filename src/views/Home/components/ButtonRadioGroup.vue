<template>
  <h3 class="input-title">{{ title }}</h3>
  <slot name="extra" />
  <div class="input-radio">
    <RadioGroup v-model="composeChecked">
      <Radio v-for="item in radioList" :key="item[fieldsName.value!]" :name="item[fieldsName.value!]">{{
        item[fieldsName.label!]
      }}</Radio>
    </RadioGroup>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { Radio, RadioGroup } from 'vant'
import { useVModel } from '@/hooks'
const props = withDefaults(
  defineProps<{
    title: string
    checked?: string | number
    radioList: any[]
    fieldsName?: { value?: string; label?: string }
  }>(),
  {
    fieldsName: () => ({ value: 'value', label: 'label' }),
  },
)
const emits = defineEmits<{
  (e: 'update:checked', checked: boolean): void
}>()
const composeChecked = useVModel(props, 'checked', emits)
watch(composeChecked, () => {
  console.log(composeChecked.value)
})
</script>

<style lang="less" scoped>
.input {
  &-radio {
    :deep(.van-radio-group) {
      display: flex;
      flex-wrap: wrap;
    }

    :deep(.van-radio) {
      width: 33%;
      box-sizing: border-box;
      padding: 10px 7.5px 0;
      height: 47px;
      display: block;

      &[aria-checked='true'] > .van-radio__label {
        border: 1px solid #5468ff;
        background-color: rgba(84, 104, 255, 0.1);
      }

      .van-radio__icon {
        display: none;
      }

      .van-radio__label {
        background: #f3f5f9;
        margin-left: 0;
        height: 32px;
        font-size: 12px;
        color: #344356;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 8px;
        line-height: 13px;
        text-align: center;
        border: 1px solid #f3f5f9;
      }
    }
  }

  &-title {
    font-size: 14px;
    margin: 0;
    font-weight: 700;
  }
}
</style>
