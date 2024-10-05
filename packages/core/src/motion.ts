import type { Ref } from 'vue'
import { inject } from 'vue'

export function useMotion() {
  return {
    width: inject('motion-width') as Ref<number>,
    height: inject('motion-height') as Ref<number>,
  }
}
