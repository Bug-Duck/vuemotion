/* eslint-disable no-new-func */
import { defineAnimation, usePlayer, useWidget } from '@vue-motion/core'
import * as lib from '@vue-motion/lib'
import { type Ref, ref } from 'vue'
import type { VueMotionJsonApp, Widget } from './formats'

export function createParser(data: string | VueMotionJsonApp, extensions?: Record<string, any>) {
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
  json.widgets.forEach((widget) => processRandomWID(widget))

  function parseTemplate() {
    function unwrap(widget: Widget<'common' | 'function' | 'widget' | 'ref'>): string {
      return `<${widget.type} ${Object.keys(widget.props ?? []).map((key) => {
        if (widget.props![key].type === 'ref')
          return `:${key}="${widget.props![key].value}"`
        else if (typeof widget.props![key].value === 'string')
          return `${key}="${widget.props![key].value}"`
        else if (Array.isArray(widget.props![key].value))
          return `:${key}="[${widget.props![key].value.toString()}]"`
        else
          return `:${key}="${widget.props![key].value}"`
      }).join(' ')
      }>
        ${widget.slot ?? ''}
          ${(widget.children ?? []).map((child) => unwrap(child)).join('\n')
          }
</${widget.type}>`
    }
    return json.widgets.map((widget) => unwrap(widget)).join('\n')
  }

  const components: Record<string, any> = {}
  for (const key in {
    ...lib,
    ...(extensions ?? {}),
  }) {
    if ((lib as Record<string, any>)[key].setup)
      components[key] = ((lib as Record<string, any>)[key])
  }

  function parseScript() {
    return {
      setup() {
        const { useAnimation } = usePlayer()
        const reflects: Record<string, Ref<unknown>> = {}
        Object.keys(json.reflects).forEach((key) => {
          reflects[key] = ref(json.reflects[key])
        })
        function process(json: Widget<any>) {
          const widget = useWidget((json.props as any).wid.value)
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
                break
              case 'change':
                manager.animate(
                  defineAnimation((_, progress) => {
                    reflects[animation.changeRef!].value = (animation.changeTo as any) * progress
                  }),
                )
            }
          }
        }
        json.widgets.forEach((widget) => process(widget))

        return reflects
      },
      components,
    }
  }

  return {
    parseTemplate,
    parseScript,
  }
}
