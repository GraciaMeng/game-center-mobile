<template>
  <PullRefresh v-model="refreshing" class="product-list" v-bind="$attrs" @refresh="onRefresh">
    <List
      v-model:loading="loading"
      :finished="finished"
      :immediate-check="false"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <ProductCard v-for="item in productList" :key="item.id" :product="item" @click="onProductClick(item)" />
    </List>
    <Empty
      v-show="!productList.length"
      style="padding-bottom: 100px"
      image="https://file.kejinshou.com/static/images/xuan/empty.png"
    />
  </PullRefresh>
</template>

<script setup lang="ts">
import { Empty, List, PullRefresh } from 'vant'
import { onMounted, reactive, ref } from 'vue'
import ProductCard from './ProductCard.vue'
import type { PageInterface, ProductInterface } from '@/types'

const props = withDefaults(
  defineProps<{
    loadFn: (pagination: { page: number; size: number }) => Promise<PageInterface<ProductInterface>>
    immediate?: boolean
  }>(),
  {
    immediate: true,
  },
)
const emits = defineEmits<{
  (e: 'onProductClick', product: ProductInterface): void
}>()
const productList = ref<ProductInterface[]>([])
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)

const defaultPagination = () => ({
  page: 0,
  pages: 0,
  total: 0,
})
const paginationState = reactive(defaultPagination())
const onLoad = () => {
  if (refreshing.value) {
    productList.value = []
    refreshing.value = false
  }
  paginationState.page += 1
  if (paginationState.page === 2) return
  props
    .loadFn({ page: paginationState.page, size: 15 })
    .then((res) => {
      const { data, current_page, total, last_page } = res
      productList.value.push(...data)
      Object.assign(paginationState, {
        pages: last_page,
        total,
      })
      if (last_page <= current_page) {
        finished.value = true
      }
    })
    .finally(() => {
      loading.value = false
    })
}
onMounted(() => {
  if (props.immediate) {
    onLoad()
  }
})
const onRefresh = () => {
  Object.assign(paginationState, defaultPagination())
  // 清空列表数据
  finished.value = false
  productList.value = []
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true
  onLoad()
}
const onProductClick = (product: ProductInterface) => {
  emits('onProductClick', product)
}
defineExpose({
  onRefresh,
})
</script>

<style lang="less" scoped></style>
