import type { InjectionKey, Reactive, Ref, Slots } from 'vue'
import { getCurrentInstance, inject, onMounted, provide, reactive, ref, useSlots, watchEffect } from 'vue'

const childWidgets: InjectionKey<Ref<Widget[]>> = Symbol('child-widgets')

export interface Widget<T extends Widget = any> {
  ref?: string | InjectionKey<Reactive<T>>
  element?: SVGElement
  range?: DOMRect
  slots?: Slots
  children?: Widget[]
}

export function useWidget<T extends Widget>(ref: string | InjectionKey<T>): T {
  const widget = reactive({})
  provide(ref, widget)
  return widget as T
}

export function useChildren(): Ref<Widget[]> {
  const children = ref([])
  provide(childWidgets, children)
  return children
}

export function defineWidget<T extends Widget>(props: T, root?: SVGElement): T {
  if (props.ref) {
    const widget = inject<Reactive<T>>(props.ref)
    if (widget) {
      watchEffect(() => Object.assign(widget, props))
      onMounted(() => {
        widget.element = root ?? getCurrentInstance()?.proxy?.$el.parentElement
        widget.range = widget.element?.getBoundingClientRect()
        widget.slots = useSlots()
        inject(childWidgets)?.value.push(widget)
      })
      return widget
    }
  }
  return props as Reactive<T>
}
