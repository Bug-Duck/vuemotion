import { inject, defineProps, Reactive, watch, getCurrentInstance, onMounted, nextTick } from "vue";

export function useOptions<T>(props: ReturnType<typeof defineProps>) {
  let controller

  nextTick(() => {
    controller = inject(getCurrentInstance().uid.toString()) as Reactive<T>
    console.log(controller, 'www');

    for (const key in props) {
      if ((props as Record<string, any>)[key] !== undefined) {
        (controller as Record<string, any>)[key] = (props as Record<string, any>)[key]
      }
    }
  })

  return controller as T
}
