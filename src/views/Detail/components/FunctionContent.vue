<template>
  <SwitchTabs v-model:active="active" :tab-list="tags" class="function-tabs">
    <template #default="{ tab }">
      <div class="function-content">
        <div
          v-for="(item, index) in tab.tag"
          :key="index"
          class="props"
          :class="{ image: item.type !== 'text', content: item.type === 'text' }"
        >
          <template v-if="item.num !== 0 || item.type === 'text'">
            <h4 class="func-title"><span>&nbsp;</span>{{ item.title }}</h4>
            <template v-if="item.type === 'text'">
              <!-- <p v-for="(valueItem, valueIndex) in item.values" :key="valueIndex">{{ valueItem }}</p> -->
              <div class="text-box" v-html="item.values"></div>
            </template>
            <template v-else-if="item.type === 'l'">
              <Row>
                <Col
                  v-for="(valueItem, valueIndex) in item.values"
                  :key="valueIndex"
                  :span="6"
                  style="padding-left: 3px; padding-right: 3px"
                >
                  <div class="small">
                    <div class="small-ph"></div>
                    <div class="img-ctr" :style="{ backgroundImage: `url(${valueItem.image})` }"></div>
                  </div>
                  <span class="title">{{ valueItem.title }}</span>
                </Col>
              </Row>
            </template>
            <template v-else-if="item.type === 'xl'">
              <Row>
                <Col
                  v-for="(valueItem, valueIndex) in item.values"
                  :key="valueIndex"
                  :span="6"
                  style="padding-left: 3px; padding-right: 3px"
                >
                  <div class="medium">
                    <div class="medium-ph"></div>
                    <div class="img-ctr" :style="{ backgroundImage: `url(${valueItem.image})` }"></div>
                  </div>
                  <span class="title">{{ valueItem.title }}</span>
                </Col>
              </Row>
            </template>
            <template v-else-if="item.type === 'xxl'">
              <Row v-for="(valueItem, valueIndex) in item.values" :key="valueIndex">
                <Col :span="24">
                  <div class="large">
                    <img :src="valueItem" alt="大图" />
                  </div>
                </Col>
              </Row>
            </template>
          </template>
        </div>
      </div>
    </template>
  </SwitchTabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Col, Row } from 'vant'
import SwitchTabs from '@/components/layout/SwitchTabs.vue'

const props = defineProps<{
  tags: any[]
}>()
const active = ref('')
</script>

<style lang="less" scoped>
.function-tabs {
  margin: 10px 0 15px;
  padding-bottom: 100px;
}

.props {
  margin: 10px 0 0;

  .func-title {
    line-height: 18px;
    height: 18px;
    color: #344356;
    font-size: 16px;
    font-weight: 700;
    margin: 5px 0 10px;

    span {
      display: inline-block;
      height: 18px;
      background: #5468ff;
      width: 4px;
      border-radius: 2px;
      margin-right: 10px;
    }
  }
}

.image {
  :deep(.van-row) {
    padding-bottom: 10px;
  }
  :deep(.van-col) {
    overflow: hidden;
  }
  .large {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    background: #fff;
    border-radius: 15px;
    overflow: hidden;
    position: relative;
    img {
      border-radius: 15px;
      width: 100%;
      height: 100%;
    }
  }

  .medium {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    background: #fff;
    border-radius: 10px;
    max-height: calc((100vw - 80px) / 4 * 1.5);
    overflow: hidden;
    position: relative;
  }
  .medium-ph {
    content: '';
    display: inline-block;
    width: 0.1px;
    padding-top: 150%;
  }

  .small {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    background: #fff;
    border-radius: 5px;
    max-height: calc((100vw - 80px) / 4 * 1);
    overflow: hidden;
    position: relative;
  }

  .small-ph {
    content: '';
    display: inline-block;
    width: 0.1px;
    padding-top: 100%;
  }

  .img-ctr {
    width: 100%;
    height: auto;
    background-size: cover;
  }
  .title {
    text-align: center;
    display: block;
    color: #344356;
    line-height: 1.6;
    font-size: 14px;
  }
}

.content {
  .text-box {
    display: flex;
    flex-wrap: wrap;
    p {
      min-width: 50%;
      min-height: 30px;
      font-size: 14px;
      color: #344356;
      margin: 0;
    }
  }
}
</style>
