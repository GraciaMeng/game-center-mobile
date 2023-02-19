<template>
  <PullRefresh v-model="refreshing" @refresh="onRefresh">
    <List v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <ProductCard v-for="item in productList" :key="item.id" :product="item" @click="onProductClick(item)" />
    </List>
  </PullRefresh>
</template>

<script setup lang="ts">
import { List, PullRefresh } from 'vant'
import { defineExpose, reactive, ref } from 'vue'
import ProductCard from './ProductCard.vue'
import type { PageInterface, ProductInterface } from '@/types'

const props = defineProps<{
  loadFn: (pagination: { page: number; size: number }) => Promise<PageInterface<ProductInterface>>
}>()
const emits = defineEmits<{
  (e: 'onProductClick', product: ProductInterface): void
}>()
const productList = ref<ProductInterface[]>([])
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)

const paginationState = reactive({
  page: 1,
  pages: 1,
  total: 0,
  size: 15,
})
const onLoad = () => {
  if (refreshing.value) {
    productList.value = []
    refreshing.value = false
  }
  props
    .loadFn({ page: paginationState.page, size: paginationState.size })
    .then((res) => {
      const { data, current_page, total, last_page } = res
      productList.value.push(...data, ...data, ...data)
      Object.assign(paginationState, {
        page: current_page,
        pages: last_page,
        total,
      })
      if (last_page === current_page) {
        finished.value = true
      }
    })
    .finally(() => {
      loading.value = false
    })
  // props
  //   .loadFn({ page: paginationState.page, size: paginationState.size })
  //   .then((res) => {
  //     const { data, current_page, total, last_page } = res
  //     productList.value.push(...data)
  //     Object.assign(paginationState, {
  //       page: current_page,
  //       pages: last_page,
  //       total,
  //     })
  //     if (last_page === current_page) {
  //       finished.value = true
  //     }
  //   })
  //   .finally(() => {
  //     loading.value = false
  //   })
}
const onRefresh = () => {
  // 清空列表数据
  finished.value = false

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
