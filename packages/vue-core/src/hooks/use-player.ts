import { inject, provide, Ref, ref } from "vue"

export function usePlayer() {
  let now = ref(0)

  provide('elapsed', now)

  function play() {
    now.value = performance.now() / 1000
    requestAnimationFrame(() => {
      play()
    })
  }

  return {
    play,
    elapsed: now
  }
}

export type Player = ReturnType<typeof usePlayer>