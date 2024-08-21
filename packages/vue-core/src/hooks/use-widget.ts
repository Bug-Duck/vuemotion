import { ComponentPublicInstance, onMounted, Ref, ref, VNodeRef, watch } from "vue"

export function useWidget<T extends VNodeRef>() {
  const widget = ref<T>(null)
  const props: Record<string, Ref> = {}
  onMounted(() => {
    for (const key in widget.value.$props) {
      props[key] = ref(widget.value.$props[key])
      watch(props[key], (newValue) => {
        widget.value.$props[key] = newValue
      })
    }
  })

  return { widget, props }
}