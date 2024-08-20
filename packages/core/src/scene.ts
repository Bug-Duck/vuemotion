import {BaseWidget} from "./widgets/base-widget.ts";

export function createScene() {
  const widgets: BaseWidget[] = []  
  
  return {
    add(widget: BaseWidget) {
      this.widgets.push(widget)
    },
    widgets,
  }
}