<template>
  <div class="search-container">
    <SearchBar
      v-model:game-id="activeGameId"
      :search-value="searchValue"
      @update:search-value="updateSearchValue"
      @search="onSearch"
    />
    <ProductList
      ref="ProductListRef"
      class="search-list"
      :load-fn="onLoad"
      :immediate="false"
      @on-product-click="onProductClick"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
export default defineComponent({
  name: 'Search',
})
</script>
<script setup lang="ts" name="Search">
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import SearchBar from './components/SearchBar.vue'
import ProductList from '@/components/product/ProductList.vue'
import { getProductList } from '@/api'
import type { ProductInterface } from '@/types'
import { useGameStore } from '@/store/game'
import { usePagePosition } from '@/hooks'
const router = useRouter()

usePagePosition('.search-container')

const gameStore = useGameStore()
const { searchValue } = storeToRefs(gameStore)
function updateSearchValue(value: string) {
  gameStore.$patch({
    searchValue: value,
  })
}

const ProductListRef = ref<InstanceType<typeof ProductList> | null>(null)

const activeGameId = ref(1)

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
      from: 'search',
    },
  })
}
</script>

<style lang="less" scoped>
.search-list {
  padding: 0 30px;
}
</style>
