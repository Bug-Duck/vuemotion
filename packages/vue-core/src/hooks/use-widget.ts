import { getCurrentInstance, InjectionKey, onMounted, provide, reactive, Reactive, Ref, ref, shallowReactive, VNode, VNodeRef, watch } from "vue"

export const mapInjectionKey: InjectionKey<Map<string, Reactive<{}>>> = Symbol()

export function useWidget<T extends VNodeRef>(wid: string) {
  const props: Reactive<{}> = reactive({})
  const element: Ref<SVGElement> = ref()
  provide(wid, {
    props,
    element,
  })

  return {
    props,
    element
  }
}