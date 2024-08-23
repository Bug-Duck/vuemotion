import { inject, defineProps, Reactive, watch, Ref, getCurrentInstance, onMounted } from "vue";

export function defineWidget<T>(props: ReturnType<typeof defineProps>, root?: SVGElement) {
  let controller
  let element: Ref<SVGElement>
  
  if ((props as any).wid) {
    controller = (inject((props as any).wid) as any).props as Reactive<T>
    element = (inject((props as any).wid) as any).element as Ref<SVGElement>
    for (const key in props) {
      if ((props as Record<string, any>)[key] !== undefined) {
        (controller as Record<string, any>)[key] = (props as Record<string, any>)[key]
      }
    }
    onMounted(() => {
      element.value = root ?? getCurrentInstance().proxy.$el
    })
  } else {
    controller = props
  }

  return controller as T
}
