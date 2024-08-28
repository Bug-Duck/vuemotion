import type { Reactive } from 'vue'
import { getCurrentInstance, inject, onMounted, provide, reactive, ref } from 'vue'

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
}

export function defineWidget<T extends Widget>(props: T, root?: SVGElement) {
  if (props.wid === undefined) {
    return props
  }
  const widget = inject(props.wid) as T
  Object.assign(widget, props)
  onMounted(() => {
    widget.element = root ?? getCurrentInstance()!.proxy!.$el
    widget.range = widget.element!.getBoundingClientRect()
  })
  return widget
}

export function useWidget<T extends Widget>(wid: string) {
  const element = ref<SVGElement>()
  const range: Reactive<Range> = reactive({ x: 0, y: 0, width: 0, height: 0 })
  const widget = reactive({
    element,
    range
  })
  provide(wid, widget)
  return widget as T
}