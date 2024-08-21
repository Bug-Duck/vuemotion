import {BaseWidget, BaseWidgetOptions} from "../widgets/base-widget.ts";

export function defineWidget<
  K extends BaseWidgetOptions,
  A extends BaseWidget = BaseWidget,
  T extends typeof BaseWidget = typeof BaseWidget,
>(widget: any): (options: K) => A {
  return (options: K) => new Proxy(new (widget as T)(options), {
    set(target: Record<string, any>, p: string | symbol, newValue: any): boolean {
      target[p as string] = newValue
      target.watch(p)
      return true
    }
  }) as A
}