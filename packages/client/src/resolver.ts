import { Plugin } from 'vite';
import path from 'node:path';

export default function virtualModulePlugin(file: string): Plugin {
  return {
    name: 'virtual-module-plugin',

    resolveId(id: string) {
      if (id === 'virtual:user-main') {
        return id
      }
      return null;
    },

    load(id: string) {
      if (id === 'virtual:user-main') {
        return {
          code: `export { default } from '${file.split(path.sep).join('/')}'`
        }
      }
      return null;
    }
  };
}