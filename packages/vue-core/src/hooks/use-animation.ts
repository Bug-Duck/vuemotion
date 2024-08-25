import {Animation} from '../animation'
import { Ref, watch} from 'vue'
import {Player} from './use-player'
import { useWidget } from './use-widget'

export class AnimationManager {
  animations: Array<Animation<any>> = []

  constructor(public widget: ReturnType<typeof useWidget>, public player: Player) {
    const elapsed = player.elapsed
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
        this.animations[0].init({props: this.widget.props, element: this.widget.element, range: this.widget.range})
      } else {
        this.animations[0].progress = Math.min((value - this.animations[0].begin) / this.animations[0].duration, 1)
        this.animations[0].update({props: this.widget.props, element: this.widget.element, range: this.widget.range})
      }
    })
  }

  animate(animation: Animation<any>) {
    this.animations.push(animation)

    return this
  }
}

export function useAnimation(widget: ReturnType<typeof useWidget>, player: Player) {
  return new AnimationManager(widget, player)
}