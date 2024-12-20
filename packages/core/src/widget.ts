import type { InjectionKey, Reactive, Ref, Slots } from "vue";
import {
  getCurrentInstance,
  onMounted,
  provide,
  reactive,
  ref,
  useSlots,
  watch,
} from "vue";
import type { AnimationManager } from "./animation";
import { Timeline } from "./player";

const childWidgets: InjectionKey<Ref<Widget[]>> = Symbol("child-widgets");

export interface Widget<T = any> {
  widget?: Reactive<any>;
  element?: SVGElement;
  range?: DOMRect;
  slots?: Slots;
  children?: Widget<T>[];
  manager?: AnimationManager<T>;
  elapsed?: number;
}

export function useWidget<T extends Widget>(timeline?: Timeline): Reactive<T> {
  const widget = reactive({});
  if (timeline) {
    watch(timeline.elapsed, (v) => {
      (widget as T).elapsed = v;
    });
  }
  return widget as Reactive<T>;
}

export function useChildren(): Ref<Widget[]> {
  const children = ref([]);
  provide(childWidgets, children);
  return children;
}

export function defineWidget<T extends Widget>(props: T, root?: SVGElement) {
  const { widget } = props;
  if (widget) {
    Object.assign(widget, props);
    onMounted(() => {
      widget.element = root ?? getCurrentInstance()?.proxy?.$el.parentElement;
      widget.range = widget.element?.getBoundingClientRect();
      widget.slots = useSlots();
      // inject(childWidgets)?.value?.push(widget as T)
    });
    return widget as T;
  }
  return props as T;
}

export type ReturnWidget<T extends Widget> = ReturnType<typeof defineWidget<T>>;
