import type { Ref, UnwrapRef } from 'vue'
import { ref } from 'vue'

type UseRadioSelectReturn<T> = [Ref<UnwrapRef<T>>, () => void, () => void]
export function useRadioSelect<T extends number | string | undefined>(defaultValue: T): UseRadioSelectReturn<T> {
  const checked = ref<T>(defaultValue)
  const checkedCache = ref<T>(defaultValue)
  const onCache = () => {
    checkedCache.value = checked.value
  }
  const onReset = () => {
    checked.value = checkedCache.value
  }
  return [checked, onCache, onReset]
}
