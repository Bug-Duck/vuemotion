#!/usr/bin/env node

import { Clerc } from 'clerc'
import fs from 'node:fs'
import path, { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite'
import vue from '@vitejs/plugin-vue'
import virtualModulePlugin from './resolver';
import virtualRouterModulePlugin from './router-resolver';

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);


function copyFolderSync(source: string, target: string) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  const items = fs.readdirSync(source, { withFileTypes: true });

  items.forEach((item) => {
    const sourcePath = path.join(source, item.name);
    const targetPath = path.join(target, item.name);

    if (item.isDirectory()) {
      copyFolderSync(sourcePath, targetPath);
    } else {
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
      '[entrypoint]',
      '[router]',
    ]
  })
  .on('start', async (context) => {
    
    const server = await createServer({
      root: resolve(__dirname, '../app'),
      server: {
        open: true,
        fs: {
          allow: ['..']
        },
      },
      plugins: [
        vue({
          include: ['**/*.vue'],
        }),
        virtualModulePlugin(resolve(process.cwd(), context.parameters.entrypoint ?? 'src/App.vue')),
        virtualRouterModulePlugin(resolve(process.cwd(), context.parameters.router ?? 'src/router.ts')),
      ]
    })
    await server.listen()
  })
  .parse() 