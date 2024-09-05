#!/usr/bin/env node

import { Clerc } from 'clerc'
import fs from 'node:fs'
import path, { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer, build } from 'vite'
import exportOut from '@vue-motion/export'
import vue from '@vitejs/plugin-vue'
import virtualModulePlugin from './resolver';
import virtualRouterModulePlugin from './router-resolver';
// import { listen } from './server';
import virtualPlayerModulePlugin from './player-resolver';

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
  .name('vuemotion')
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
    flags: {
      entry: {
        description: 'Specify the entrypoint for the project',
        type: String,
        default: 'src/App.vue'
      },
      router: {
        description: 'Specify the router for the project',
        type: String,
        default: 'src/router.ts'
      },
      player: {
        description: 'Specify the player for the project',
        type: String,
        default: 'src/player.ts'
      }
    }
  })
  .on('start', async (context) => {
    const server = await createServer({
      root: resolve(process.cwd() + '/node_modules/@vue-motion/app'),
      publicDir: process.cwd() + '/public',
      server: {
        open: true,
        fs: {
          allow: ['..']
        },
        proxy: {
          '/api': {
            target: 'http://localhost:12387',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, '')
          }
        }
      },
      plugins: [
        vue({
          include: ['**/*.vue'],
        }),
        virtualModulePlugin(resolve(process.cwd(), context.flags.entry)),
        virtualRouterModulePlugin(resolve(process.cwd(), context.flags.router)),
        virtualPlayerModulePlugin(resolve(process.cwd(), context.flags.player)),
      ],
      build: {
        outDir: resolve(process.cwd() + '/dist'),
      }
    })
    await server.listen()
  })
  .command('export', 'Export the VueMotion project as video', {
    flags: {
      entry: {
        description: 'Specify the entrypoint for the project',
        type: String,
        default: '/src/App.vue'
      },
      router: {
        description: 'Specify the router for the project',
        type: String,
        default: '/src/router.ts'
      },
      player: {
        description: 'Specify the player for the project',
        type: String,
        default: '/src/player.ts'
      },
      fps: {
        description: 'Specify the FPS for the project',
        type: Number,
        default: 60
      }
    },
    parameters: [
      '<duration>'
    ]
  })
  .on('export', async (context) => {
    await build({
      root: resolve(__dirname, '../app'),
      publicDir: resolve(process.cwd() + '/public'),
      plugins: [
        vue({
          include: ['**/*.vue'],
        }),
        virtualModulePlugin(resolve(process.cwd() + context.flags.entry)),
        virtualRouterModulePlugin(resolve(process.cwd() + context.flags.router)),
        virtualPlayerModulePlugin(resolve(process.cwd() + context.flags.player)),
      ],
      build: {
        outDir: resolve(process.cwd() + '/dist'),
      },
    })
    await exportOut({
      outDir: resolve('./.vuemotion'),
      input: resolve(process.cwd() + '/dist'),
      inputFile: resolve(process.cwd() + '/dist/index.html'),
      duration: Number(context.parameters.duration),
      fps: context.flags.fps,
    })
    process.exit()
  })
  .parse() 