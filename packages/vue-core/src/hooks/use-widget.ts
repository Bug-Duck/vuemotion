import { onMounted, provide, reactive, Reactive, Ref, ref, VNodeRef, watch } from "vue"

export function useWidget<T extends VNodeRef>() {
  const widget = ref<T>(null)
  const props: Reactive<typeof widget.value.$props> = reactive({})
  provide('controller', props)

  return { widget, props }
}