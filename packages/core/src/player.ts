import type { App, Ref } from 'vue'
import { inject, ref } from 'vue'
import { AnimationManager } from './animation'

export function createPlayer(options: {
  studio?: boolean
  fps?: number
}) {
  return {
    install(app: App) {
      app.provide('elapsed', ref(0))
      app.provide('studio', options.studio ?? false)
      app.provide('fps', options.fps ?? 60)
    },
  }
}

export function usePlayer() {
  const startAt = performance.now() / 1000
  const elapsed = inject('elapsed') as Ref<number>
  const studio = inject('studio') as boolean
  const fps = inject('fps') as number
  const playing = ref(false)

  if (studio) {
    document.addEventListener('click', () => {
      elapsed.value += 1 / fps
    })
  }

  function play() {
    if (studio)
    // eslint-disable-next-line no-console
      return console.log('You are in the studio mode, you are not supposed to call this function!')
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
    }, 1000)
  }

  return { play, elapsed, useAnimation, setElapsed, pause, renderOnce }
}

export type Player = ReturnType<typeof usePlayer>
