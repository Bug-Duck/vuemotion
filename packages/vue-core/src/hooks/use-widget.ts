import { getCurrentInstance, InjectionKey, onMounted, provide, reactive, Reactive, Ref, ref, shallowReactive, VNode, VNodeRef, watch } from "vue"

export  const mapInjectionKey: InjectionKey<Map<string, Reactive<{}>>> = Symbol()

export function useWidget<T extends VNodeRef>() {
  const widget = ref<T>(null)
  const props: Reactive<{}> = reactive({})
  const map = shallowReactive(new Map())
  provide(mapInjectionKey, map)
  onMounted(() => {
    map.set(widget.value.$.uid, props)
  })

return { widget, props }
}