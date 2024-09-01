import process from '@vue-motion/export'
import { resolve } from 'path'

process({
  outDir: './.vuemotion',
  input: resolve('../dist'),
  inputFile: resolve('../dist/index.html'),
  duration: 2,
  fps: 60
})