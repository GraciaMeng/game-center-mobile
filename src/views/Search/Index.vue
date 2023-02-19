<template>
  <div class="search-container">
    <SearchBar v-model:game-id="activeGameId" v-model:search-value="searchValue" @search="onSearch" />
    <ProductList
      ref="ProductListRef"
      class="search-list"
      :load-fn="onLoad"
      :immediate="false"
      @on-product-click="onProductClick"
    />
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import SearchBar from './components/SearchBar.vue'
import ProductList from '@/components/product/ProductList.vue'
import { getProductList } from '@/api'
import type { ProductInterface } from '@/types'

const router = useRouter()
const route = useRoute()
const { gameId } = route.query

const ProductListRef = ref<InstanceType<typeof ProductList> | null>(null)

const activeGameId = ref(+(gameId as string))

const searchValue = ref('')
const onSearch = () => {
  ProductListRef.value?.onRefresh()
}
const onLoad = (pagination: { page: number; size: number }) => {
  return getProductList({
    page: pagination.page,
    limit: pagination.size,
    game_id: activeGameId.value,
    key: searchValue.value,
  }).then((res) => {
    return res.data
  })
}
const onProductClick = (product: ProductInterface) => {
  router.push({
    name: 'Detail',
    query: {
      goods_id: product.id,
    },
  })
}
</script>

<style lang="less" scoped>
.search-list {
  padding: 0 30px;
}
</style>
