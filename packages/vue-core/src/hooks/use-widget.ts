import { getCurrentInstance, InjectionKey, onMounted, provide, reactive, Reactive, Ref, ref, shallowReactive, VNode, VNodeRef, watch } from "vue"

export const mapInjectionKey: InjectionKey<Map<string, Reactive<{}>>> = Symbol()

export function useWidget<T extends VNodeRef>(wid: string) {
  const props: Reactive<{}> = reactive({})
  const element: Ref<SVGElement> = ref()
  const range: Reactive<{
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    width: number
    height: number
  }> = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
    width: 0,
    height: 0
  }
  provide(wid, {
    props,
    element,
    range,
  })

  return {
    props,
    element,
    range,
  }
}