import {BaseWidget} from "./widgets/base-widget.ts";

export function createScene() {
  const widgets: BaseWidget[] = []  
  
  return {
    add<T extends BaseWidget>(widget: T) {
      this.widgets.push(widget)
    },
    widgets,
  }
}
