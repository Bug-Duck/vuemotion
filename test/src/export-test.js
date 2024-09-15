import { resolve } from 'node:path'
import process from '@vue-motion/export'

process({
  outDir: './.vuemotion',
  input: resolve('../dist'),
  inputFile: resolve('../dist/index.html'),
  duration: 2,
  fps: 60,
})
