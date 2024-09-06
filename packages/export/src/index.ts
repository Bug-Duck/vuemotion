import puppeteer, { ElementFor, ElementHandle } from 'puppeteer'
import { transformToImage } from './image-process'
import { createVideoFromImages } from './video-process'
import express from 'express'
import cors from 'cors'
import { resolve } from 'path'
import fs from 'fs'

export interface ExportOptions {
  outDir: string
  input: string
  inputFile: string
  fps: number
  outputName?: string
  duration: number
}

export default async function (options: ExportOptions) {
  const app = express()
  app.use(cors())
  app.use(express.static(resolve(options.input)))
  app.get('/', (req, res) => {
    res.sendFile(resolve(process.cwd(), options.input))
  })
  app.listen(23333)
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  page.setViewport({
    width: 10000,
    height: 10000
  })
  await page.goto('http://localhost:23333', {
    waitUntil: 'networkidle2'
  })

  let index = 0

  for (let i = 0; i < options.duration; i += 1 / options.fps) {
    // await new Promise((resolve) => setTimeout(resolve, 1 / options.fps * 1000))
    await page.click('body')
    const element = await page.waitForSelector('#motion')
    await element?.click()
    if (!fs.existsSync(resolve('.vuemotion'))) {
      await new Promise((res) => fs.mkdir(resolve('.vuemotion'), res))
    }
    await transformToImage(resolve(process.cwd(), './.vuemotion', `image${index}.jpeg`), page, index)
    index += 1
    // cpd.send('Debugger.resume')
  }
  
  await browser.close()
  await createVideoFromImages(options.outDir, options.outputName ?? 'output.mp4', options.fps)
}