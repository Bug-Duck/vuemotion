import type { InjectionKey, Ref, Slots } from 'vue'
import { getCurrentInstance, inject, onMounted, provide, ref, useSlots, watchEffect } from 'vue'

const childWidgets: InjectionKey<Ref<Widget[]>> = Symbol('child-widgets')

export interface Widget<T = any> {
  ref?: string | InjectionKey<T>
  element?: SVGElement
  range?: DOMRect
  slots?: Slots
  children?: Widget<T>[]
}

export function useWidget<T extends Widget>(ref: string | InjectionKey<T>): T {
  const widget = {}
  provide(ref, widget)
  return widget as T
}

export function useChildren(): Ref<Widget[]> {
  const children = ref([])
  provide(childWidgets, children)
  return children
}

export function defineWidget<T extends Widget>(
  props: T,
  root?: SVGElement,
): T  {
  if (props.ref) {
    const widget = inject<T>(props.ref)
    if (widget) {
      watchEffect(() => Object.assign(
        widget,
        props,
      ))
      onMounted(() => {
        widget.element = root ?? getCurrentInstance()?.proxy?.$el.parentElement
        widget.range = widget.element?.getBoundingClientRect()
        widget.slots = useSlots()
        inject(childWidgets)!.value?.push(widget as T)
      })
      return widget 
    }
  }
  return props as T
}
