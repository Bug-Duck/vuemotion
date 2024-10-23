import fs from 'node:fs'
import { createParser } from '../dist/index.js'

const json = fs.readFileSync('./test.json', 'utf-8')
console.log(json)

const parser = createParser(json)
console.log(parser.parseTemplate())
console.log(parser.parseScript().setup.toString())
