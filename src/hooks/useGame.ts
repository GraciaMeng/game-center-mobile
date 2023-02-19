import { computed } from 'vue'
import { useGameStore } from '@/store/game'

export function useGameList() {
  const gameStore = useGameStore()
  const gameList = computed(() => gameStore.gameList)

  const getGameData = () => {
    if (gameList.value.length) {
      return Promise.resolve(gameList.value)
    } else {
      return gameStore.getGameData()
    }
  }

  return {
    gameList,
    getGameData,
  }
}
