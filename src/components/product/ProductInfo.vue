<template>
  <div class="product-info-container">
    <div class="product-info">
      <p class="product-status">
        <!-- <img class="product-img" :src="info.images" alt="类别icon" /> -->
        {{ info.title }}
      </p>
      <p class="product-title">
        <span>¥{{ info.price }}</span>
      </p>
      <p class="product-sub">
        {{ info.sub_title }}
      </p>
      <p class="product-desc">
        <em
          >商品编号：{{ info.id }}
          <img src="@/assets/icons/copy.svg" class="copy" alt="copy" @click="onCopy" />
        </em>
        <span class="product-time">上架时间：{{ info.addtime }}</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { showToast } from 'vant'
import { useCopy } from '@/hooks'
import type { ProductInfoInterface } from '@/types'
const props = defineProps<{
  info: ProductInfoInterface
}>()

const { copyToClipboard } = useCopy()
const onCopy = () => {
  copyToClipboard(String(props.info.id))
    .then(() => {
      showToast('复制成功')
    })
    .catch(() => {
      showToast('复制失败')
    })
}
</script>

<style lang="less" scoped>
.product {
  &-info {
    &-container {
      margin: 10px 30px 15px;
      padding: 15px;
      border-radius: 15px;
      background-color: #fff;
    }
    p {
      color: #344356;
    }
  }
  &-status {
    display: flex;
    margin: 0;
    line-height: 20px;
    font-size: 14px;
    align-items: center;
    img {
      margin-right: 8px;
      height: 18px;
      width: 18px;
      vertical-align: middle;
    }
    span {
      flex: 1;
      display: block;
      text-align: right;
    }
  }
  &-title {
    display: flex;
    justify-content: space-between;
    margin: 0;
    padding: 15px 0;
    font-size: 16px;
    font-weight: 700;
    word-break: break-all;
    span {
      flex: auto;
      display: block;
      text-align: right;
      font-size: 18px;
      line-height: 22px;
      color: #ff4646;
    }
  }
  &-sub {
    margin: 10px 0 0;
    line-height: 20px;
    font-size: 14px;
  }
  &-desc {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    margin: 10px 0 0;
    color: #c4c9cf !important;
    font-size: 12px;
    em {
      display: inline-flex;
      align-items: center;
      flex: none;
      font-style: normal;
    }
    .copy {
      width: 16px;
      height: 16px;
    }
  }
  &-time {
    flex: auto;
    display: inline-block;
    padding-left: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: keep-all;
  }
}
</style>
