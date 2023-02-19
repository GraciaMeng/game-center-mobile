<template>
  <div class="nav-bar">
    <div class="nav-left">
      <slot name="left" />
    </div>
    <div class="nav-content">
      <template v-if="title">{{ title }}</template>
      <template v-else>
        <slot />
      </template>
    </div>
    <div class="nav-right">
      <slot name="right" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string
}>()
</script>

<style lang="less" scoped>
.nav {
  &-bar {
    width: 100%;
    box-sizing: border-box;
    background: #f3f5f9;
    padding: 0 15px 0 20px;
    height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 100;
  }
  &-left {
    flex: 2;
  }
  &-content {
    flex: 6;
    display: flex;
    justify-content: center;
    margin: 0 auto;
    color: #344356;
    font-weight: 700;
    font-size: 20px;
  }
  &-right {
    flex: 2;
    text-align: end;
    color: var(--xh-color-primary);
  }
}
</style>
