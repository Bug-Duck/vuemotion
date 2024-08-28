import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg"
import { usePlayer } from "./player"

export function useExporter(selector: string, player: ReturnType<typeof usePlayer>) {
  let motion: SVGElement | null = null
  async function exportToVideo(duration: number, fps: number) {
    motion = document.querySelector(selector) as SVGElement
    
    const ffmpeg = createFFmpeg({ log: true })
    await ffmpeg.load()
    // const urls = []
    let index = 0
    for (let f = 0; f < duration; f += 1 / fps) {
      player.elapsed.value = f
      const svg = new XMLSerializer().serializeToString(motion as SVGElement);
      const blob = new Blob([svg], { type: 'image/svg+xml' })
      const canvas = document.createElement('canvas')
      canvas.width = motion.clientWidth * 3
      canvas.height = motion.clientHeight * 3
      const ctx = canvas.getContext('2d')
      ctx?.scale(3, 3)
      const img = new Image()
      img.src = URL.createObjectURL(blob)
      await new Promise(res => img.onload = res)
      ctx?.drawImage(img, 0, 0)
      let url: string | undefined = canvas.toDataURL('image/png')
      ffmpeg.FS('writeFile', `image${index}.png`, await fetchFile(url))
      url = void 0
      index += 1
      // urls.push(url)
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