import { Plugin } from 'vite';
import path from 'node:path';

export default function virtualPlayerModulePlugin(file: string): Plugin {
  return {
    name: 'virtual-router-module-plugin',

    resolveId(id: string) {
      if (id === 'virtual:player') {
        return id
      }
      return null;
    },

    load(id: string) {
      if (id === 'virtual:player') {
        return {
          code: `export { default } from '${file.split(path.sep).join('/')}'`
        }
      }
      return null;
    }
  };
}
