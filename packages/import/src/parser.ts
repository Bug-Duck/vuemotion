import { usePlayer, useWidget } from '@vue-motion/core'
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
          useAnimation(widget)
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
