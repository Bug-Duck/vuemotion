#!/usr/bin/env node

import { Clerc } from 'clerc'
import { exec } from 'node:child_process';
import fs from 'node:fs'
import path, { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);

// 获取 `__dirname` 等价值
const __dirname = dirname(__filename);


function copyFolderSync(source: string, target: string) {
  // 确保目标文件夹存在
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  // 获取源文件夹中的所有文件和子文件夹
  const items = fs.readdirSync(source, { withFileTypes: true });

  items.forEach((item) => {
    const sourcePath = path.join(source, item.name);
    const targetPath = path.join(target, item.name);

    if (item.isDirectory()) {
      // 如果是文件夹，递归复制
      copyFolderSync(sourcePath, targetPath);
    } else {
      // 如果是文件，复制文件
      fs.copyFileSync(sourcePath, targetPath);
    }
  });
}

export const client = Clerc.create()
  .name('VueMotion-Cli')
  .scriptName('vuemotion')
  .description('VueMotion CLI')
  .version('0.0.1')
  .command('create', 'Create a new VueMotion project', {
    parameters: [
      '<project name>'
    ]
  })
  .on('create', (context) => {
    fs.mkdirSync(context.parameters.projectName)
    copyFolderSync(resolve(__dirname, '../template'), process.cwd() + '/' + context.parameters.projectName)
  })
  .command('start', 'Start the VueMotion project', {
    parameters: [
      '[entrypoint]'
    ]
  })
  .on('start', (context) => {
    exec('vite node_modules/@vue-motion/app/dist/index.html', (err, stdout, stderr) => {
      console.log(stdout, err, stderr);
    })
  })
  .parse() 