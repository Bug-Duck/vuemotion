import { Plugin } from 'vite';
import path from 'node:path';

export default function virtualRouterModulePlugin(file: string): Plugin {
  return {
    name: 'virtual-router-module-plugin',

    resolveId(id: string) {
      if (id === 'virtual:router') {
        return id
      }
      return null;
    },

    load(id: string) {
      if (id === 'virtual:router') {
        return {
          code: `export { default } from '${file.split(path.sep).join('/')}'`
        }
      }
      return null;
    }
  };
}
