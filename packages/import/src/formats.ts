export interface VueMotionJsonApp {
  version: string
  name: string
  description: string
  widgets: Widget<any>[]
  reflects: Record<string, unknown>
}

export interface Widget<T extends 'common' | 'function' | 'widget' | 'ref'> {
  type: string
  props?: Record<string, PropertyValue<T>>
  children?: Widget<any>[]
  slot?: string
  animations?: Animation[]
}

export interface Animation {
  type: 'preset' | 'exec' | 'delay' | 'change'
  duration?: number
  function?: string
  preset?: string
  props?: Record<string, unknown>
  changeRef?: string
  changeTo?: unknown
}

export interface PropertyValue<T extends ('common' | 'function' | 'widget' | 'ref')> {
  type: T
  value: T extends ('common' | 'ref')
    ? (string | boolean | number | any[] | object)
    : T extends 'function' ? (...args: any[]) => any : T extends 'widget' ? Widget<any> : never
}
