import { inject, defineProps, Reactive, watch, Ref, getCurrentInstance, onMounted } from "vue";

export interface WidgetInitParams {
  range?: {
    x1: number
    y1: number
    x2: number
    y2: number
    width: number
    height: number
  }
  root?: SVGElement
}

export function defineWidget<T>(props: ReturnType<typeof defineProps>, initParams: WidgetInitParams = {}) {
  let controller
  let element: Ref<SVGElement>
  let range
  
  if ((props as any).wid) {
    controller = (inject((props as any).wid) as any).props as Reactive<T>
    element = (inject((props as any).wid) as any).element as Ref<SVGElement>
    range = (inject((props as any).wid) as any).range as {
      x1: number
      y1: number
      x2: number
      y2: number
      width: number
      height: number
    }
    for (const key in props) {
      if ((props as Record<string, any>)[key] !== undefined) {
        (controller as Record<string, any>)[key] = (props as Record<string, any>)[key]
      }
    }
    onMounted(() => {
      element.value = initParams.root ?? getCurrentInstance().proxy.$el
      range = {
        x1: element.value.getBoundingClientRect().x,
        y1: element.value.getBoundingClientRect().y,
        x2: element.value.getBoundingClientRect().x + element.value.getBoundingClientRect().width,
        y2: element.value.getBoundingClientRect().y + element.value.getBoundingClientRect().height,
        width: element.value.getBoundingClientRect().width,
        height: element.value.getBoundingClientRect().height,
      }
    })
  } else {
    controller = props
  }

  return controller as T
}
