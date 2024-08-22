import { getCurrentInstance, inject, Reactive, reactive, Ref, ref, watch } from "vue";

export function useOptions<T extends Record<string, any>>() {
  const props = defineProps<T>()
  const options: Partial<T> = reactive({})
  for (const key in props) {
    if (props[key] !== undefined) {
      ;(options[key] as Partial<any>) = props[key]
    }
  }
  const parentContorller = inject('controller') as Ref<Record<string, Ref>>
  parentContorller.value = options

  return options as Reactive<{
    [key in keyof T]: T[key]
  }>
}