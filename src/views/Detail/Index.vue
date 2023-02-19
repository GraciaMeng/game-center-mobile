<template>
  <div class="detail-container">
    <NavBar title="账号详情">
      <template #left>
        <Icon class="exit-icon" size="20" color="#1989fa" name="down" @click="onBackHome" />
      </template>
    </NavBar>
    <div class="detail-content">
      <ProductInfo :info="data" />
      <div class="content">
        <FunctionContent :tags="data.tags" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { Icon } from 'vant'
import { data } from './config'
import FunctionContent from './components/FunctionContent.vue'
import NavBar from '@/components/layout/NavBar.vue'
import ProductInfo from '@/components/product/ProductInfo.vue'

const router = useRouter()
const route = useRoute()
const { goods_id } = route.query

function onBackHome() {
  router.push({
    name: 'Home',
  })
}
</script>

<style lang="less" scoped>
.exit-icon {
  transform: rotate(90deg);
}
.detail-content {
  height: calc(100vh - 44px);
  overflow-y: auto;
  box-sizing: border-box;
}
.content {
  margin: 10px 30px 15px;
}
</style>
