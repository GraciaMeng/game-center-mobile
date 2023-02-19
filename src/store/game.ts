import { defineStore } from 'pinia'
import type { GameInterface } from './../types/game'
import { getGameList } from '@/api'

export interface GameState {
  gameList: GameInterface[]
  searchValue: string
}
export const useGameStore = defineStore({
  id: 'game',
  state: (): GameState => {
    return {
      gameList: [],
      searchValue: '',
    }
  },
  actions: {
    getGameData() {
      return getGameList().then((res) => {
        const { data } = res
        this.$patch({
          gameList: data,
        })
        return res.data
      })
    },
  },
})
