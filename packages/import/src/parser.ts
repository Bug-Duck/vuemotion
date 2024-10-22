/* eslint-disable no-new-func */
import { usePlayer, useWidget } from '@vue-motion/core'
import * as lib from '@vue-motion/lib'
import type { VueMotionJsonApp, Widget } from './formats'

export function createParser(data: string | VueMotionJsonApp) {
  let json: VueMotionJsonApp
  if (typeof data === 'string')
    json = JSON.parse(data)
  else
    json = data as VueMotionJsonApp
  function processRandomWID(widget: Widget<any>) {
    widget.props ??= {};
    (widget.props as any).wid = { type: 'common', value: Math.random().toString(36).substring(2, 9) }
    for (const child of widget.children ?? [])
      processRandomWID(child)
  }
  json.widgets.forEach(widget => processRandomWID(widget))

  function parseTemplate() {
    function unwrap(widget: Widget<'common' | 'function' | 'widget'>): string {
      return `<${widget.type} ${Object.keys(widget.props ?? []).map((key) => {
        if (typeof widget.props![key].value === 'string')
          return `${key}="${widget.props![key].value}"`
        else
          return `:${key}="${widget.props![key].value}"`
      }).join(' ')
      }>
        ${widget.slot ?? ''}
          ${
            (widget.children ?? []).map(child => unwrap(child)).join('\n')
          }
</${widget.type}>`
    }
    return json.widgets.map(widget => unwrap(widget)).join('\n')
  }

  function parseScript() {
    return {
      setup() {
        const { useAnimation } = usePlayer()
        function process(json: Widget<any>) {
          const widget = useWidget((json.props as any).wid)
          const manager = useAnimation(widget)
          for (const animation of json.animations ?? []) {
            switch (animation.type) {
              case 'delay':
                manager.delay(animation.duration!)
                break
              case 'exec':
                manager.exec(new Function(`return ${animation.function!}`)())
                break
              case 'preset':
                manager.animate((lib as Record<string, any>)[animation.preset!], animation.props)
            }
          }
        }
        json.widgets.forEach(widget => process(widget))
      },
    }
  }

  return {
    parseTemplate,
    parseScript,
  }
}
