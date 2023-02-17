import type { WritableComputedRef } from 'vue'
import { computed } from 'vue'

/**
 * 子组件v-model的封装
 * @param props 组件的props
 * @param key 组件props的参数
 * @param emits 组件的emits方法
 * @returns 返回一个computed
 * 例子：const modalShow = useVModel(props, 'show', emits)
 */
export function useVModel<P extends object, K extends keyof P>(
  props: P,
  key: K,
  emits: any,
): WritableComputedRef<P[K]> {
  return computed({
    get() {
      return props[key]
    },
    set(value) {
      emits(`update:${key as string}`, value)
    },
  })
}
