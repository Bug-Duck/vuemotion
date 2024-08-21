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

  function getElapsed() {
    return (inject('elapsed') as Ref<number>).value
  }

  return {
    play,
    getElapsed,
  }
}