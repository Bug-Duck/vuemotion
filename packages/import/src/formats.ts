export interface VueMotionJsonApp {
  version: string
  name: string
  description: string
  widgets: Widget<any>[]
}

export interface Widget<T extends 'common' | 'function' | 'widget'> {
  type: string
  props?: Record<string, PropertyValue<T>>
  children?: Widget<any>[]
  slot?: string
  animations?: Animation
}

export interface Animation {
  type: 'preset' | 'custom' | 'exec' | 'delay'
  duration?: number
}

export interface PropertyValue<T extends ('common' | 'function' | 'widget')> {
  type: T
  value: T extends 'common'
    ? (string | boolean | number | Array<any> | object)
    : T extends 'function' ? (...args: any[]) => any : T extends 'widget' ? Widget<any> : never
}
