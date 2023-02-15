<template>
  <div class="home-container">
    <SearchBar />
    <GameBar @select="onSelectGame" />
  </div>
</template>

<script setup lang="ts">
import SearchBar from './components/SearchBar.vue'
import GameBar from './components/GameBar.vue'

function onSelectGame(key: string) {}
</script>

<style lang="less" scoped>
.home-container {
  padding-left: 30px;
  padding-right: 30px;
}

.game-container {
  display: flex;
  flex-wrap: wrap;
}
</style>
