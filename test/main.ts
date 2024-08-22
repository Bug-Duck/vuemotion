import {createApp, createScene, createArc, stroke, delay, create, createRect, strokeFill, transform } from '@vuemotion/core'

const app = createApp({
  element: document.querySelector('#container')!
})
const scene = createScene()
scene.add(
  createRect({
    width: 300,
    height: 100,
    x: 100,
    y: 100,
    border: true,
  }).animate(
    transform({
      duration: 2,
      to: createArc({
        radius: 100,
        from: 0,
        to: 359,
      })
    })
  )
)
app.checkout(scene)