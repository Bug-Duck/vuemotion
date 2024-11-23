import { provide } from 'vue'

export function add(...animations: (() => void)[]) {
  provide('ADDITION_ANIMATIONS', animations)
}