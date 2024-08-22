import { inject, defineProps, Reactive } from "vue";

export function useOptions<T>(props: ReturnType<typeof defineProps>) {
  const controller = inject('controller') as Reactive<T>
  console.log(props)

  for (const key in props) {
    if ((props as Record<string, any>)[key] !== undefined) {
      (controller as Record<string, any>)[key] = (props as Record<string, any>)[key]
    }
  }

  return controller as T
}
