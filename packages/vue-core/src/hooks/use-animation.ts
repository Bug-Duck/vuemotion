import { Animation } from '../animation'
import { reactive, Reactive, Ref, ref, watch } from 'vue'
import { usePlayer } from './use-player'

export class AnimationManager {
  animations: Array<Animation<any>> = []
  player: ReturnType<typeof usePlayer>

  constructor(public props: Record<string, Ref>) {
    this.player = usePlayer()
    const elapsed = this.player.getElapsed()
    watch(elapsed, (value) => {
      
    })
  }

  animate(animation: Animation<any>) {
    this.animations.push(animation)

    return this
  }
}

export function useAnimation(props: Record<string, Ref>) {
  const manager = new AnimationManager(props)
  return manager
}