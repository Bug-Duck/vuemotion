import {BaseWidget, BaseWidgetOptions} from "../widgets/base-widget.ts";

export function defineWidget<
  K extends BaseWidgetOptions,
  T extends typeof BaseWidget = typeof BaseWidget,
  A extends BaseWidget = BaseWidget
>(widget: T): (options: K) => A {
  return (options: K) => new Proxy(new widget(options), {
    set(target: Record<string, any>, p: string | symbol, newValue: any): boolean {
      target[p as string] = newValue
      target.watch(p)
      return true
    }
  }) as A
}