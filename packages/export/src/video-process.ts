import path from "path"
import { exec } from "child_process";

export function createVideoFromImages(inputDir: string, outputVideoPath: string, frameRate = 1, imagePattern = 'image%d.png') {
  return new Promise((resolve, reject) => {
    const inputPath = path.join(inputDir, imagePattern);

    const ffmpegCommand = `ffmpeg -r ${frameRate} -i ${inputPath} -c:v libx264 -pix_fmt yuv420p ${outputVideoPath}`;

    exec(ffmpegCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Failed: ${error.message}`);
        reject(new Error(`Failed: ${error.message}`));
        return;
      }
      if (stderr) {
        console.error(`FFmpeg Error: ${stderr}`);
        reject(new Error(`FFmpeg Error: ${stderr}`));
        return;
      }
      console.log(`The video is at: ${outputVideoPath}`);
      resolve(null)
    });
  });
}