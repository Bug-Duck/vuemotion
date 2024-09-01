import express, { json } from 'express'
import cors from 'cors'
import path from 'node:path'
import fs from 'node:fs'
import { exec } from 'node:child_process'
import { get_uid, saveToTemp } from './server-utils'

const app = express()
app.use(cors())
app.use(json({
  limit: '50mb',
}))
const port = 12387

app.post('/export', async (req, res) => {
  const { img, pid, uuid } = req.body
  console.log(img, uuid, pid)
  saveToTemp(img, uuid, pid)

  res.status(200).send('Success!')
})

const getUid = get_uid();

app.get('/uid', (req, res) => {
  const uid = getUid()
  res.status(200).send(uid)
})

app.get('/start/:uuid/:fps', async (req, res) => {
  const tempDir = path.join(process.cwd(), '.vuemotion');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  /**
   * 将图片数组合成为视频
   * @param {string[]} imageUrls - 图片 URL 数组
   * @param {string} outputVideoPath - 输出视频文件路径
   */
  async function createVideoFromImages(outputVideoPath: string) {
    console.log(req.params.uuid, req.params.fps)
    // 构建 ffmpeg 命令，将图片合成为视频
    // `-framerate 1` 指定帧率为每秒 1 帧，可根据需要调整
    // const inputFilePattern = path.join(tempDir, 'image_%d.jpg');
    const ffmpegCommand = `ffmpeg -i ${path.join(
      tempDir,
      `image_${req.params.uuid}_%d.png`
    )} -r ${req.params.fps} -c:v libx264 ${outputVideoPath}`;

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

  createVideoFromImages(path.join(tempDir, 'output.mp4'))
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