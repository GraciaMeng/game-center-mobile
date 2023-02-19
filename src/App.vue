<template>
  <div class="game-app">
    <router-view />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.game-app {
  min-height: 100vh;
  width: 100%;
  background-color: #f3f5f9 !important;
}

@media screen and (min-width: 450px) {
  .game-app {
    width: 450px;
    height: 100vh;
  }
}
</style>
