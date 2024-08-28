import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg"
import { usePlayer } from "./player"

export function useExporter(selector: string, player: ReturnType<typeof usePlayer>) {
  let motion: SVGElement | null = null
  async function exportToVideo(duration: number, fps: number) {
    motion = document.querySelector(selector) as SVGElement
    
    const urls = []
    for (let f = 0; f < duration; f += 1 / fps) {
      player.elapsed.value = f
      const svg = new XMLSerializer().serializeToString(motion as SVGElement);
      const blob = new Blob([svg], { type: 'image/svg+xml' })
      const canvas = document.createElement('canvas')
      canvas.width = motion.clientWidth
      canvas.height = motion.clientHeight
      const ctx = canvas.getContext('2d')
      const img = new Image()
      img.src = URL.createObjectURL(blob)
      await new Promise(res => img.onload = res)
      ctx?.drawImage(img, 0, 0)
      const url = canvas.toDataURL('image/png')
      urls.push(url)
    }

    const ffmpeg = createFFmpeg({ log: true })
    await ffmpeg.load()
    for (let i = 0; i < urls.length; i++) {
      ffmpeg.FS('writeFile', `image${i}.png`, await fetchFile(urls[i]))
    }

    await ffmpeg.run(
      '-framerate', fps.toString(),
      '-i', 'image%d.png',  // 图片名称模板
      '-c:v', 'libx264',
      '-pix_fmt', 'yuv420p',
      'output.mp4'
    )

    const data = ffmpeg.FS('readFile', 'output.mp4')
    const url = URL.createObjectURL(new Blob([data], { type: 'video/mp4' }))

    return url
  }

  return { exportToVideo }
}