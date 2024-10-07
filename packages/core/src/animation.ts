import type { WatchSource } from 'vue'
import { watch } from 'vue'

/**
 * Defines a timing function type that takes a number and returns a number.
 */
export type TimingFunction = (x: number) => number

/**
 * Linear timing function that returns the input value.
 */
export const linear: TimingFunction = x => x

/**
 * Defines an animation type that performs an animation step on a target object.
 * @template T The type of the target object.
 * @template A The type of the context object.
 * @param target The target object to animate.
 * @param context Additional context information for the animation.
 * @param progress The progress of the animation, ranging from 0 to 1.
 */
export type Animation<T extends object, A extends object = object> =
  (target: T, context: A, progress: number) => void

/**
 * Defines an animation instance type with specific configurations and states.
 * @template T The type of the target object.
 * @template A The type of the context object.
 */
type AnimationInstance<T extends object, A extends object> = {
  context: A
  animation: Animation<T, A>
  startAt?: number
  duration: number | 'once'
  by: TimingFunction
}

/**
 * AnimationManager class manages and executes an animation queue.
 * @template T The type of the target object.
 */
export class AnimationManager<T extends object> {
  animations: AnimationInstance<T, any>[] = []

  /**
   * Constructor initializes the AnimationManager with a target and an elapsed time watcher.
   * @param target The target object to be animated.
   * @param elapsed The source of elapsed time to watch for animation updates.
   */
  constructor(target: T, elapsed: WatchSource<number>) {
    watch(elapsed, <A extends object>(elapsed: number) => {
      if (this.animations.length === 0) {
        return
      }

      const {
        context,
        animation,
        duration,
        startAt,
        by
      }: AnimationInstance<T, A> = this.animations[0]

      if (startAt === undefined) {
        this.animations[0].startAt = elapsed
        animation(target, context, 0)
        if (duration === 'once') {
          this.animations.shift()
        }
      } else {
        const progress = (elapsed - startAt) / (duration as number)
        animation(target, context, by(Math.min(progress, 1)))
        if (progress >= 1) {
          this.animations.shift()
        }
      }
    })
  }

  /**
   * Adds an animation to the queue.
   * @param animation The animation function to execute.
   * @param context Additional context for the animation.
   * @returns The current AnimationManager instance for chaining.
   */
  animate<A extends object>(animation: Animation<T, A>, context: {
    duration?: AnimationInstance<T, A>['duration']
    by?: TimingFunction
  } & A) {
    context ??= {} as A
    const duration = context.duration ?? 1
    const by = context.by ?? linear
    this.animations.push({ context, animation, duration, by })
    return this
  }

  /**
   * Adds a one-time animation to the queue.
   * @param animation The animation function to execute once.
   * @returns The current AnimationManager instance for chaining.
   */
  once(animation: (target: T) => void) {
    this.animate(animation, { duration: 'once' })
    return this
  }

  /**
   * Adds a delay animation to the queue.
   * @param duration The duration of the delay in milliseconds.
   * @returns The current AnimationManager instance for chaining.
   */
  delay(duration: number) {
    this.animate(() => { /* empty animation */ }, { duration })
    return this
  }
}

/**
 * Function to define an animation.
 * @template T The type of the target object.
 * @template A The type of the context object.
 * @param animation The animation function.
 * @returns The defined animation function.
 */
export function defineAnimation<
  T extends object,
  A extends object = object,
>(animation: Animation<T, A>): Animation<T, A>

/**
 * Function to define an animation with setup and disposal functions.
 * @template T The type of the target object.
 * @template A The type of the context object.
 * @param setup The setup function to initialize the animation.
 * @param dispose The disposal function to clean up after the animation.
 * @returns The defined animation function.
 */
export function defineAnimation<
  T extends object,
  A extends object = object,
>(
  setup: (target: T, context: A) => (progress: number) => void,
  dispose?: (target: T, context: A) => void
): Animation<T, A>

/**
 * Overload function to define an animation based on the provided arguments.
 * @template T The type of the target object.
 * @template A The type of the context object.
 * @param args The arguments to define the animation.
 * @returns The defined animation function.
 */
export function defineAnimation<
  T extends object,
  A extends object = object,
>(...args: [Animation<T, A>] | Parameters<typeof defineAnimation>) {
  if (args[0].length === 3) {
    return args[0] as Animation<T, A>
  }
  const [setup, dispose] = args as Parameters<typeof defineAnimation>
  let animation: (progress: number) => void
  return function (target: T, context: A, progress: number) {
    if (progress === 0) {
      animation = setup(target, context)
    }
    animation(progress)
    if (dispose && progress === 1) {
      dispose(target, context)
    }
  }
}

/**
 * Function to create a parallel animation that runs multiple animations simultaneously.
 * @template T The type of the target object.
 * @template A The type of the context object.
 * @param animations An array of animations to run in parallel.
 * @returns The combined parallel animation function.
 */
export function parallel<
  T extends object,
  A extends object = object,
>(...animations: Animation<T, A>[]): Animation<T, A> {
  return function (target: T, context: A, progress: number) {
    for (const animation of animations) {
      animation(target, context, progress)
    }
  }
}
