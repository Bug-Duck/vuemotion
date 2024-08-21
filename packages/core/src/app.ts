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
    const root = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    root.setAttribute('transform', `translate(${element.clientWidth / 2}, ${element.clientHeight / 2}) scale(1, -1)`)
    for (const widget of scene.widgets) {
      const ele = widget.render() as SVGElement
      root.appendChild(ele)
      setTimeout(async () => {
        for (const animation of widget.animations) {
          await animation({
            tag: ele,
            widget,
          })
        }
      })
    }
    element.appendChild(root)
  }
  
  return {
    scene,
    element,
    checkout,
  }
}