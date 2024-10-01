import { inject } from "vue";

export function useMotion() {
  return {
    width: inject('motion-width') as number,
    height: inject('motion-height') as number,
  }
}