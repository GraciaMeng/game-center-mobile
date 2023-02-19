<template>
  <div class="product-card-container" @click="onClick">
    <div v-if="product.images" class="product-img-wrapper">
      <img class="product-img" :src="BASE_URL + product.images" alt="大图展示" />
    </div>
    <div class="product-info-wrapper">
      <div class="product-info-title">
        <div class="title">{{ product.title }}</div>
        <div class="price">￥{{ product.price }}</div>
      </div>
      <div class="product-info-content">
        {{ product.sub_title }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductInterface } from '@/types'
import { BASE_URL } from '@/api/request'
const props = defineProps<{
  product: ProductInterface
}>()
const emits = defineEmits<{
  (e: 'click'): void
}>()
const onClick = () => {
  emits('click')
}
</script>

<style lang="less" scoped>
.product {
  &-card-container {
    background-color: white;
    border-radius: 15px;
    margin-top: 15px;
  }
  &-img {
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    width: calc(100vw - 60px);
    max-height: calc((100vw - 60px) * 0.55);
    object-fit: cover;
    vertical-align: middle;
    border-style: none;
  }
  &-info {
    &-wrapper {
      padding: 10px 15px;
      font-size: 14px;
    }
    &-title {
      font-weight: bold;
      display: flex;
      justify-content: space-between;
      .price {
        color: rgb(255, 70, 70);
      }
    }
    &-content {
      color: rgb(119, 142, 162);
      margin-top: 6px;
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 10;
      line-clamp: 10;
    }
  }
}
</style>
