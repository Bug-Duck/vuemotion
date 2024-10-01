import type { Reactive, Ref } from 'vue'
import { getCurrentInstance, inject, nextTick, onMounted, provide, reactive, ref, useSlots } from 'vue'

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
  children?: Widget[]
}

export function defineWidget<T extends Widget>(props: T, root?: SVGElement): Reactive<T> {
  let widget = inject<T>(props.wid as string)
  const widgets = inject('child-widgets') as T[]
  
  // const children = reactive([])
  // provide('child-widgets', children)

  widget ??= {} as T
  Object.assign(widget, props)
  
  onMounted(() => {
    widget.element = root ?? getCurrentInstance()!.proxy!.$el.parentElement
    widget.range = widget.element!.getBoundingClientRect()
    const slots = useSlots()
    widget.slots = slots.default ? slots.default().map(v => v.children).join('') : ''
    if (widgets) {
      widgets.push(widget)
    }
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

export function useChildren<T extends Widget>() {
  const widgets = reactive([]) as T[]
  provide('child-widgets', widgets)
  return widgets
}
