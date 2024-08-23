import { getCurrentInstance, onMounted, provide, reactive, Reactive, Ref, ref, VNode, VNodeRef, watch } from "vue"

export function useWidget<T extends VNodeRef>() {
  const widget = ref<T>(null)
  const props: Reactive<{}> = reactive({})
  onMounted(() => {
    provide(widget.value.$.uid.toString(), props)
  })

  return { widget, props }
}