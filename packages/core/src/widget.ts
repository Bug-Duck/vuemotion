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
  children?: Widget[]
}

export type ReturnWidget<T extends Widget> = ReturnType<typeof defineWidget<T>>

export function defineWidget<T extends Widget>(props: Reactive<T>, methods?: Record<string, () => any>, root?: SVGElement): Reactive<T> {
  let widget = inject<T>(props.wid as string)
  const widgets = inject('child-widgets') as T[]

  // const children = reactive([])
  // provide('child-widgets', children)

  widget ??= {} as T
  Object.assign(props, {
    ...widget,
    ...methods
  })

  onMounted(() => {
    props.element = root ?? getCurrentInstance()!.proxy!.$el.parentElement
    props.range = widget.element!.getBoundingClientRect()
    const slots = useSlots()
    props.slots = slots.default ? slots.default().map(v => v.children).join('') : ''
    if (widgets) {
      widgets.push(widget)
    }
  })

  return props
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
  return widgets as Reactive<T[]>
}
