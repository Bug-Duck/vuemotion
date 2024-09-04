import path, { resolve } from "path"
import ffmpeg from "fluent-ffmpeg"

export async function createVideoFromImages(inputDir: string, outputVideoPath: string, frameRate = 60) {
  const inputPath = path.join(resolve(inputDir + '/image%d.jpeg'));
  await new Promise((resolve, reject) => {
    ffmpeg()
      .input(inputPath)
      .inputOptions([`-r ${frameRate}`])
      .on('start', (commandLine) => {
        console.log('Spawned FFmpeg with command:', commandLine);
      })
      .on('progress', (progress) => {
        console.log(`Processing: ${progress.frames} frames done`);
      })
      .on('error', (err) => {
        console.error('Error:', err.message)
        reject(err)
      })
      .on('end', () => {
        console.log('Video creation completed successfully!')
        resolve(null)
      })
      .output(outputVideoPath)
      .run()
  })
}