<template>
  <div class="search-nav-bar">
    <div class="left">
      <Icon class="exit-icon" size="20" color="#5468FF" name="down" @click="onBackHome" />
    </div>
    <div class="content">
      <CellGroup inset style="width: 100%">
        <Field v-model="composeSearchValue" center placeholder="搜索商品编号/商品描述">
          <template #label>
            <div class="search-game-btn" @click="onSelectGame">
              <img v-if="activeGame?.images" :src="BASE_URL + activeGame.images" alt="" />
              <div style="display: flex; align-items: center">
                <Icon name="arrow-down" style="width: 12px; height: 12px; margin-right: 10px" />
                <div style="background-color: rgb(119, 142, 162); width: 1px; height: 20px"></div>
              </div>
            </div>
            <ActionSheet v-model:show="moreShow" :closeable="false" safe-area-inset-bottom>
              <div style="height: 375px; margin-bottom: 20px">
                <NavBar title="更多游戏">
                  <template #left>
                    <Icon class="exit-icon" size="20" color="#1989fa" name="down" @click="moreShow = false" />
                  </template>
                </NavBar>
                <div style="min-height: 291px">
                  <div>
                    <div
                      style="
                        padding: 15px 15px 0px 20px;
                        color: var(--k-color-text-black);
                        font-weight: bold;
                        font-size: 18px;
                      "
                    >
                      游戏
                    </div>
                  </div>
                  <GameBar v-model:active-key="composeGameId" :game-list="gameList" @select="moreShow = false" />
                </div>
              </div>
            </ActionSheet>
          </template>
          <template #button>
            <Icon name="search" size="20" color="#5468FF" @click="onSearch" />
          </template>
        </Field>
      </CellGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ActionSheet, CellGroup, Field, Icon } from 'vant'
import { computed, ref } from 'vue'
import { useGameList, useVModel } from '@/hooks'
import { BASE_URL } from '@/api/request'
import NavBar from '@/components/layout/NavBar.vue'
import GameBar from '@/views/Home/components/GameBar.vue'

const props = defineProps<{
  gameId: number
  searchValue: string
}>()
const emits = defineEmits<{
  (e: 'update:gameId', value: number): void
  (e: 'update:searchValue', value: number): void
  (e: 'search'): void
}>()
const router = useRouter()

const composeGameId = useVModel(props, 'gameId', emits)
const composeSearchValue = useVModel(props, 'searchValue', emits)
const { gameList, getGameData } = useGameList()
const activeGame = computed(() => {
  const target = gameList.value.find((item) => item.id === composeGameId.value)
  return target || gameList.value[0]
})

const moreShow = ref(false)
function onSelectGame() {
  moreShow.value = true
}
function loadGame() {
  getGameData()
}
loadGame()

function onSearch() {
  emits('search')
}
function onBackHome() {
  router.push({
    name: 'Home',
  })
}
</script>

<style lang="less" scoped>
.search-nav-bar {
  width: 100%;
  box-sizing: border-box;
  padding: 20px 30px 0 20px;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: #f3f5f9;

  .left {
    width: 40px;
    font-size: 20px;
  }

  .content {
    flex: 1;
    display: flex;
    justify-content: center;

    .van-cell {
      display: flex;
      align-items: center;
      padding: 5px 15px;
      height: 40px;
    }

    .search-game-btn {
      display: flex;
      justify-content: space-around;
      justify-items: center;
      align-items: center;
      font-size: 14px;
      font-weight: 400;
      color: #778ea2;
      width: 60px;

      img {
        width: 28px;
        height: 28px;
      }
    }
  }

  :deep(.content) {
    .van-cell-group--inset {
      margin: 0;
      border-radius: 8px;
    }

    .van-field__label {
      width: 60px;
      margin-right: 0;
    }

    .van-field__body {
      height: 100%;
      margin-left: 6px;
    }

    .van-field__value {
      height: 100%;
    }

    .van-field__button {
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
}

.exit-icon {
  transform: rotate(90deg);
}

:deep(.nav-bar) {
  background-color: #fff;
}
</style>
