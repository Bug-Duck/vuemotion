import { inject, defineProps, Reactive, watch, getCurrentInstance, onMounted, nextTick, computed } from "vue";
import { mapInjectionKey } from "./use-widget";

export function useOptions<T>(props: ReturnType<typeof defineProps>) {
  let controller

  const map = inject(mapInjectionKey);
  controller = computed(() => map?.get(getCurrentInstance().uid.toString()))
  for (const key in props) {
    if ((props as Record<string, any>)[key] !== undefined) {
      (controller as Record<string, any>)[key] = (props as Record<string, any>)[key]
    }
  }


  return controller.value
}
