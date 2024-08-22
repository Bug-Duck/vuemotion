import { inject, provide, Ref, ref } from "vue"

export function usePlayer() {
  let now = ref(0)

  const elapsed = Symbol('elapsed')

  provide(elapsed, now)

  function play() {
    now.value = performance.now() / 1000
    requestAnimationFrame(() => {
      play()
    })
  }

  function getElapsed() {
    return (inject(elapsed) ?? now) as Ref<number>
  }

  return {
    play,
    getElapsed,
  }
}

export type Player = ReturnType<typeof usePlayer>