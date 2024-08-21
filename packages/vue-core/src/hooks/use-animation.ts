import { Animation } from '../animation'
import { reactive, Reactive, Ref, ref, watch } from 'vue'

export class AnimationManager {
  animations: Array<Animation<any>> = []

  constructor(public props: Record<string, Ref>) {}

  animate(animation: Animation<any>) {
    this.animations.push(animation)
  }
}

export function useAnimation(props: Record<string, Ref>) {
  const manager = new AnimationManager(props)
  return manager
}