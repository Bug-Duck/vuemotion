import type { Reactive } from 'vue'
import { getCurrentInstance, inject, onMounted, provide, reactive } from 'vue'

export interface Range {
  x: number
  y: number
  width: number
  height: number
}

export interface Widget {
  wid?: Reactive<any>
  element?: SVGElement
  range?: Range
  // slots?: string
  children?: Widget[]
}

export type ReturnWidget<T extends Widget> = ReturnType<typeof defineWidget<T>>

export function defineWidget<T extends Widget>(props: T, methods?: Record<string, () => any>, root?: SVGElement): Reactive<T> {

  onMounted(() => {
    const widgets = inject('child-widgets') as T[]

    // const children = reactive([])
    // provide('child-widgets', children)
    if (typeof props.wid !== typeof void 0) {
      for (const key in props) {
        props.wid![key] = props[key]
      }
      for (const method in methods) {
        props.wid![method] = methods[method]
      }
    }
    props.wid!.element = root ?? getCurrentInstance()!.proxy!.$el.parentElement
    props.wid!.range = props.wid!.element!.getBoundingClientRect()
    if (widgets && props.wid) {
      widgets.push(props)
    }
  })

  return props.wid as Reactive<typeof props>
}

export function useWidget<T extends abstract new (...args: any) => any>() {
  const wid = reactive<InstanceType<T>>({} as any)
  return wid
}

export function useChildren<T extends Widget>() {
  const widgets = reactive([]) as T[]
  provide('child-widgets', widgets)
  return widgets as Reactive<T[]>
}
