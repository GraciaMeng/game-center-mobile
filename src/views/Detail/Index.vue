<template>
  <div class="detail-container">
    <NavBar title="账号详情">
      <template #left>
        <Icon class="exit-icon" size="20" color="#1989fa" name="down" @click="onBackHome" />
      </template>
    </NavBar>
    <div class="detail-content">
      <ProductInfo v-if="detail" :info="detail" />
      <div class="content">
        <FunctionContent :tags="functionList" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Detail">
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { Icon } from 'vant'
import FunctionContent from './components/FunctionContent.vue'
import NavBar from '@/components/layout/NavBar.vue'
import ProductInfo from '@/components/product/ProductInfo.vue'
import { getProductInfo } from '@/api'
import { BASE_URL } from '@/api/request'
import type { ProductInfoInterface } from '@/types'

const router = useRouter()
const route = useRoute()
const { goods_id, from } = route.query

const detail = ref<ProductInfoInterface | null>(null)
const functionList = ref<any[]>([])
function getDetail() {
  getProductInfo({ id: goods_id as string }).then((res) => {
    detail.value = res.data
    const { screen_shot, skin_info, base_info } = res.data
    functionList.value = [
      {
        title: '游戏截图',
        tag: [
          {
            title: '游戏截图',
            type: 'xxl',
            num: screen_shot.length,
            values: screen_shot.map((item) => BASE_URL + item),
          },
        ],
      },
      {
        title: '特效皮肤',
        tag: [
          {
            title: '特效皮肤',
            type: 'xl',
            num: skin_info.length,
            values: skin_info.map((item) => {
              return {
                title: item.title,
                image: BASE_URL + item.images,
              }
            }),
          },
        ],
      },
      {
        title: '基本信息',
        tag: [
          {
            title: '基本信息',
            type: 'text',
            values: base_info,
          },
        ],
      },
    ]
  })
}
getDetail()
function onBackHome() {
  router.push({
    name: from === 'search' ? 'Search' : 'Home',
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
