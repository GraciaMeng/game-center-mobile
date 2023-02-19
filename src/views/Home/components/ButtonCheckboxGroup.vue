<template>
  <div class="input-block">
    <h3 class="input-title">
      {{ title }} <em @click="onCheck">{{ isAll ? '取消全选' : '全选' }}</em>
    </h3>
    <slot name="extra" />
    <div class="input-checkbox">
      <CheckboxGroup ref="checkboxGroup" v-model="composeChecked">
        <Checkbox v-for="item in list" :key="item[fieldsName.value!]" :name="item[fieldsName.value!]">{{
          item[fieldsName.label!]
        }}</Checkbox>
      </CheckboxGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Checkbox, CheckboxGroup } from 'vant'
import { computed, ref } from 'vue'
import { useVModel } from '@/hooks'
const props = withDefaults(
  defineProps<{
    title: string
    checked?: (string | number)[]
    list: any[]
    fieldsName?: { value?: string; label?: string }
  }>(),
  {
    fieldsName: () => ({ value: 'value', label: 'label' }),
  },
)
const emits = defineEmits<{
  (e: 'update:checked', checked: (string | number)[]): void
}>()
const composeChecked = useVModel(props, 'checked', emits)
const isAll = computed(() => composeChecked.value?.length === props.list.length)

const checkboxGroup = ref<any>(null)
const onCheck = () => {
  if (isAll.value) {
    checkboxGroup.value?.toggleAll()
  } else {
    checkboxGroup.value?.toggleAll(true)
  }
}
</script>

<style lang="less" scoped>
.input {
  &-block {
    margin: 0;
    padding: 15px;
    background-color: #fff;
  }
  &-checkbox {
    :deep(.van-checkbox-group) {
      display: flex;
      flex-wrap: wrap;
    }

    :deep(.van-checkbox) {
      width: 33%;
      box-sizing: border-box;
      padding: 10px 7.5px 0;
      height: 47px;
      display: block;

      &[aria-checked='true'] > .van-checkbox__label {
        border: 1px solid #5468ff;
        background-color: rgba(84, 104, 255, 0.1);
      }

      .van-checkbox__icon {
        display: none;
      }

      .van-checkbox__label {
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
    em {
      float: right;
      padding-left: 1rem;
      color: #5468ff;
      font-style: normal;
      font-size: 12px;
    }
  }
}
</style>
