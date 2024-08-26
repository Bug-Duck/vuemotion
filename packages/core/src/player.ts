import { provide, ref } from 'vue'

export function usePlayer() {
  const startAt = performance.now() / 1000
  const elapsed = ref(0)

  provide('elapsed', elapsed)

  function play() {
    elapsed.value = performance.now() / 1000 - startAt
    requestAnimationFrame(play)
  }

  return { play, elapsed }
}

export type Player = ReturnType<typeof usePlayer>
