<template>
  <div class="search-container">
    <div class="search-body">请输入商品内容或编号</div>
    <div class="search-home">
      <Icon name="search" color="#5468FF" size="24" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from 'vant'
</script>

<style lang="less" scoped>
.search-container {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 44px;
  border-radius: 15px;
  background-color: #fff;
}

.search-body {
  font-size: 14px;
  color: #c4c9cf;
  margin-left: 15px;
}

.search-home {
  font-size: 20px;
  padding-right: 15px;
}
</style>
