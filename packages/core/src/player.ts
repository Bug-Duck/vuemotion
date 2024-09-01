import { ref, inject, Ref, App } from 'vue'
import { AnimationManager } from './animation'

export function createPlayer(options: {}) {
  return {
    install(app: App) {
      app.provide('elapsed', ref(0))
    }
  }
}

export function usePlayer() {
  const startAt = performance.now() / 1000
  const elapsed = inject('elapsed') as Ref<number>
  const playing = ref(false)

  // provide('elapsed', elapsed)

  function play() {
    playing.value = true
    elapsed.value = performance.now() / 1000 - startAt
    if (playing.value)
      requestAnimationFrame(play)
  }

  function useAnimation<T extends object>(widget: T) {
    return new AnimationManager(widget, elapsed)
  }

  function setElapsed(value: number) {
    elapsed.value = value
  }

  function pause() {
    playing.value = false
  }

  function renderOnce(ela: number) {
    setTimeout(() => {
      elapsed.value = ela
    },1000)
  }

  return { play, elapsed, useAnimation, setElapsed, pause, renderOnce }
}

export type Player = ReturnType<typeof usePlayer>
