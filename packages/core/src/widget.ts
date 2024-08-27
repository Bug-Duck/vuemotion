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
}

export function defineWidget<T extends Widget>(props: T, root?: SVGElement) {
  if (props.wid === undefined) {
    return props
  }
  const widget = inject(props.wid) as WidgetRef<T>
  Object.assign(widget.props, props)
  onMounted(() => {
    widget.element.value = root ?? getCurrentInstance()!.proxy!.$el
    Object.assign(widget.range, widget.element.value!.getBoundingClientRect())
  })
  return widget.props
}

export type WidgetRef<T extends Widget> = ReturnType<typeof useWidget<T>>

export function useWidget<T extends Widget>(wid: string) {
  const props: Reactive<T> = reactive({} as T)
  const element = ref<SVGElement>()
  const range: Reactive<Range> = reactive({ x: 0, y: 0, width: 0, height: 0 })
  const widget = { props, element, range }
  provide(wid, widget)
  return widget
}
