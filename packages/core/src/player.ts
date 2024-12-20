import type { App, Ref } from "vue";
import { inject, ref, watch } from "vue";
import { AnimationManager } from "./animation";
// import { GLOBAL_PLAYER } from "./symbols";

const studioListenerAdded = { value: false };

export function createPlayer(options: {
  studio?: boolean;
  fps?: number;
  addition?: (() => void)[];
}) {
  return {
    install(app: App) {
      app.provide("elapsed", ref(0));
      app.provide("studio", options.studio ?? false);
      app.provide("fps", options.fps ?? 60);
      app.provide("ADDITION_ANIMATIONS", options.addition ?? []);
    },
  };
}

export function usePlayer() {
  const elapsed = inject("elapsed") as Ref<number>;
  const studio = inject("studio") as boolean;
  const fps = inject("fps") as number;
  const playing = ref(false);
  const renderEvents: ((elapsed: number) => void)[] = [];

  if (studio && !studioListenerAdded.value) {
    studioListenerAdded.value = true;
    document.addEventListener("click", (e) => {
      console.log(elapsed.value);
      e.stopImmediatePropagation();
      elapsed.value += 1 / fps;
    });
  }

  function play(to?: number) {
    if (to) elapsed.value = to;
    if (studio)
      return console.log(
        "You are in the studio mode, you are not supposed to call this function!",
      );
    renderEvents.forEach((fn) => fn(elapsed.value));
    playing.value = true;
    // console.log(1 / fps)
    elapsed.value += 1 / fps;
    // console.log(elapsed.value)
    if (playing.value) requestAnimationFrame(() => play());
  }

  function useAnimation<T extends object>(widget: T) {
    return new AnimationManager(widget, elapsed);
  }

  function seek(value: number) {
    elapsed.value = value;
  }

  function pause(to?: number) {
    playing.value = false;
    if (to) elapsed.value = to;
  }

  function renderOnce(ela: number) {
    setTimeout(() => {
      elapsed.value = ela;
    }, 1000);
  }

  function whenRender(fn: (elapsed: number) => void) {
    renderEvents.push(fn);
  }

  function useTimeline(start: number = 0) {
    const relativeElapsed = ref<number>(0);
    const isPlaying = ref(false);
    const localStart = ref(start);

    watch(
      elapsed,
      () => {
        if (isPlaying.value) {
          relativeElapsed.value = Math.max(0, elapsed.value - localStart.value);
          // console.log(relativeElapsed.value)
        }
      },
      { immediate: true },
    );

    function play() {
      isPlaying.value = true;
    }

    function pause() {
      isPlaying.value = false;
    }

    function seek(time: number) {
      relativeElapsed.value = time;
      localStart.value = elapsed.value - time;
    }

    function reset() {
      seek(0);
    }

    function useAnimation<T extends object>(widget: T) {
      return new AnimationManager(widget, relativeElapsed);
    }

    return {
      useAnimation,
      elapsed: relativeElapsed,
      isPlaying,
      play,
      pause,
      seek,
      reset,
    };
  }

  return {
    play,
    elapsed,
    useAnimation,
    useTimeline,
    seek,
    pause,
    renderOnce,
    whenRender,
  };
}

export type Player = ReturnType<typeof usePlayer>;
export type Timeline = ReturnType<Player["useTimeline"]>;
