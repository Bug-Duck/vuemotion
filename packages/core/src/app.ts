import { createScene } from './scene'

export interface AppInitOptions {
  element: SVGElement
}

export function createApp(options: AppInitOptions) {
  const element = options.element
  element.style.backgroundColor = 'black'
  let scene

  function checkout(scene: ReturnType<typeof createScene>) {
    scene = scene
    for (const widget of scene.widgets) {
      element.appendChild(widget.render() as SVGElement)
    }
  }
  
  return {
    scene,
    element,
    checkout,
  }
}