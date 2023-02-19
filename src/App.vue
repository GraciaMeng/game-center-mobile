<template>
  <div class="game-app">
    <router-view v-slot="{ Component }">
      <keep-alive :include="['Home', 'Search']"><component :is="Component" /></keep-alive>
    </router-view>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.game-app {
  // min-height: 100vh;
  // width: 100%;
  // height: 100%;
}

// @media screen and (min-width: 450px) {
//   .game-app {
//     width: 450px;
//     height: 100vh;
//   }
// }
</style>
