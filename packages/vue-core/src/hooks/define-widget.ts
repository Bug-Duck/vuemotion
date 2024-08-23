import { inject, defineProps, Reactive, watch } from "vue";

export function defineWidget<T>(props: ReturnType<typeof defineProps>) {
  let controller
  
  if ((props as any).wid) {
    controller = inject((props as any).wid) as Reactive<T>
    for (const key in props) {
      if ((props as Record<string, any>)[key] !== undefined) {
        (controller as Record<string, any>)[key] = (props as Record<string, any>)[key]
      }
    }
    console.log('www');
    
  } else {
    controller = props
  }

  return controller as T
}
