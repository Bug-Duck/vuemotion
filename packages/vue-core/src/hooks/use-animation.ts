import {Animation} from '../animation'
import {Ref, watch} from 'vue'
import {Player} from './use-player'

export class AnimationManager {
  animations: Array<Animation<any>> = []

  constructor(public props: Record<string, Ref>, public player: Player) {
    const elapsed = player.getElapsed()
    watch(elapsed, (value) => {
      if (this.animations.length === 0) {
        return
      }
      if (this.animations[0].progress === 1) {
        this.animations.shift()
      }
      if (this.animations.length === 0) {
        return
      }
      if (this.animations[0].begin === undefined) {
        this.animations[0].begin = value
        this.animations[0].progress = 0
        this.animations[0].init({props: this.props})
      } else {
        this.animations[0].progress = Math.min((value - this.animations[0].begin) / this.animations[0].duration, 1)
        this.animations[0].update({props: this.props})
      }
    })
  }

  animate(animation: Animation<any>) {
    this.animations.push(animation)

    return this
  }
}

export function useAnimation(props: Record<string, Ref>, player: Player) {
  return new AnimationManager(props, player)
}