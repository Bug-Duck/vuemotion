import {createApp, createScene, createArc} from '@newcar-x/core'

const app = createApp({
  element: document.querySelector('#container')
})
const scene = createScene()
scene.add(
  createArc({
    radius: 100,
    from: 0,
    to: 200,
    x: 100,
    y: 100
  })
)
app.checkout(scene)