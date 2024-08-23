import { getCurrentInstance, InjectionKey, onMounted, provide, reactive, Reactive, Ref, ref, shallowReactive, VNode, VNodeRef, watch } from "vue"

export  const mapInjectionKey: InjectionKey<Map<string, Reactive<{}>>> = Symbol()

export function useWidget<T extends VNodeRef>(wid: string) {
  const props: Reactive<{}> = reactive({})
  provide(wid, props)

  return props
}