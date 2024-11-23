import { defineAnimation } from '@vue-motion/core'

export interface Colorable {
  fillColor?: string
  borderColor?: string
  color?: string
}

export interface colorableMixin {
  discolorate: (on: 'fill' | 'border' | 'color', offset: string) => void
  discolorateTo: (on: 'fill' | 'border' | 'color', to: string) => void
}

export const discolorate = defineAnimation<Colorable, {
  from?: string
  offset?: string
  on: 'fill' | 'border' | 'color'
}>((target, context) => {
  function resolve(color: string) {
    // return the r, g, b, a?'s value, the format can be #rgb, #rgba, #rrggbb, #rrggbbaa, rgb(), rgba()
    const match = color.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i)
    if (match) {
      return match.slice(1).map((hex) => Number.parseInt(hex, 16))
    }
    return null
  }
  const parsedFrom = resolve(context.from ?? (
    context.on === 'fill'
      ? target.fillColor ?? '#000000'
      : context.on === 'border'
        ? target.borderColor ?? '#000000'
        : target.color ?? '#000000'
  ))
  if (!parsedFrom)
    return () => {}

  const parsedOffset = resolve(context.offset ?? (
    context.on === 'fill'
      ? target.fillColor ?? '#000000'
      : context.on === 'border'
        ? target.borderColor ?? '#000000'
        : target.color ?? '#000000'
  ))
  if (!parsedOffset)
    return () => {}

  return (progress) => {
    const offset = parsedOffset.map((value, _index) => value * progress)
    const result = parsedFrom.map((value, index) => value + offset[index])
    if (context.on === 'fill')
      target.fillColor = `rgba(${result.join(',')})`
    else if (context.on === 'border')
      target.borderColor = `rgba(${result.join(',')})`
    else
      target.color = `rgba(${result.join(',')})`
  }
})
