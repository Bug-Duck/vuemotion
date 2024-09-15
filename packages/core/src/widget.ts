import type { Reactive } from 'vue'
import { getCurrentInstance, inject, onMounted, provide, reactive, ref, useSlots } from 'vue'

export interface Range {
  x: number
  y: number
  width: number
  height: number
}

export interface Widget {
  wid?: string
  element?: SVGElement
  range?: Range
  slots?: string
}

export function defineWidget<T extends Widget>(props: T, root?: SVGElement): Reactive<T> {
  const widget = inject<T>(props.wid as string)
  if (widget === undefined) {
    return reactive(props)
  }
  Object.assign(widget, props)
  onMounted(() => {
    widget.element = root ?? getCurrentInstance()!.proxy!.$el.parentElement
    widget.range = widget.element!.getBoundingClientRect()
    const slots = useSlots()
    widget.slots = slots.default ? slots.default().map(v => v.children).join('') : ''
  })
  return reactive(widget)
}

export function useWidget<T extends Widget>(wid: string) {
  const element = ref<SVGElement>()
  const range: Reactive<Range> = reactive({ x: 0, y: 0, width: 0, height: 0 })
  const slots = ref<string>()
  const widget = reactive({
    element,
    range,
    slots,
  })
  provide(wid, widget)
  return widget as T
}
