import { provide, ref } from 'vue'
import { AnimationManager } from './animation'

export function usePlayer() {
  const startAt = performance.now() / 1000
  const elapsed = ref(0)

  provide('elapsed', elapsed)

  function play() {
    elapsed.value = performance.now() / 1000 - startAt
    requestAnimationFrame(play)
  }

  function useAnimation<T extends object>(widget: T) {
    return new AnimationManager(widget, elapsed)
  }

  return { play, elapsed, useAnimation }
}

export type Player = ReturnType<typeof usePlayer>
