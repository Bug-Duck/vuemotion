export async function exportToVideo(selector: string, player: any, duration: number, fps: number) {
  const motion = document.querySelector(selector) as SVGElement

  await fetch('/api/clear')
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
    // ffmpeg.FS('writeFile', `image${index}.png`, await fetchFile(url))
    console.log(url)
    await fetch('/api/export/', {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        img: url
      }),
      method: 'POST'
    })
    console.log(`The ${f}th frame is exported.`)
    url = void 0
    index += 1
    // urls.push(url)
  }
  await fetch('/api/start/' + fps)
}