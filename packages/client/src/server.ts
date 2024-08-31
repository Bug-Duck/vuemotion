import express, { json } from 'express'
import cors from 'cors'
import path from 'node:path'
import fs from 'node:fs'
import { exec } from 'node:child_process'

const app = express()
app.use(cors())
app.use(json({
  limit: '50mb',
}))
const port = 12387
let urls: string[] = []

app.post('/export', async (req, res) => {
  console.log(req.body)
  urls.push(req.body.img)
  res.status(200).send('Hello world!')
})

app.get('/clear', (req, res) => {
  urls = []
  res.status(200).send('Success!')
})

app.get('/start/:fps', async (req, res) => {
  const tempDir = path.join(process.cwd(), '.vuemotion');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  function dataUrlToBuffer(dataUrl: string) {
    // 匹配 data URL 格式
    const matches = dataUrl.match(/^data:(.*?);base64,(.*)$/);
    if (!matches) {
      throw new Error('Invalid data URL format');
    }
  
    // 提取 Base64 数据部分
    const base64Data = matches[2];
  
    // 转换 Base64 数据为 Buffer
    return Buffer.from(base64Data, 'base64');
  }
  
  /**
   * 将 Buffer 保存为文件
   * @param {Buffer} buffer - Buffer 数据
   * @param {string} outputPath - 文件保存路径
   */
  function saveBufferToFile(buffer: Buffer, outputPath: string) {
    fs.writeFileSync(outputPath, buffer);
    console.log(`File saved at: ${outputPath}`);
  }

  /**
   * 将图片数组合成为视频
   * @param {string[]} imageUrls - 图片 URL 数组
   * @param {string} outputVideoPath - 输出视频文件路径
   */
  async function createVideoFromImages(imageUrls: string[], outputVideoPath: string) {
    // 下载图片并保存到 .vuemotion 目录中
    const imagePaths = [];
    for (let i = 0; i < imageUrls.length; i++) {
      const imagePath = path.join(tempDir, `image_${i}.jpg`);
      saveBufferToFile(dataUrlToBuffer(imageUrls[i]), imagePath);
      imagePaths.push(imagePath);
    }

    // 构建 ffmpeg 命令，将图片合成为视频
    // `-framerate 1` 指定帧率为每秒 1 帧，可根据需要调整
    // const inputFilePattern = path.join(tempDir, 'image_%d.jpg');
    const ffmpegCommand = `ffmpeg -framerate ${req.params.fps} -i ${path.join(
      tempDir,
      'image_%d.jpg'
    )} -c:v libx264 -pix_fmt yuv420p ${outputVideoPath}`;

    // 调用系统中的 ffmpeg
    exec(ffmpegCommand, (error, stdout, stderr) => {
      if (error) {
        console.error('Error creating video:', error);
        return;
      }
      console.log(`Video created at: ${outputVideoPath}`);
      console.log(stdout);
      console.error(stderr);
    });
  }

  createVideoFromImages(urls, path.join(tempDir, 'output.mp4'))
    .then(() => console.log('Video creation complete!'))
    .catch((err) => console.error('Error creating video:', err));
})

export function listen() {
  try {
    app.listen(port)
  } catch (e) {
    console.log(e)
  }
  console.log('listen!')
}