import { Plugin } from 'vite';

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
        const userMainPath = file
        return {
          code: `export { default } from '${userMainPath}'`
        }
      }
      return null;
    }
  };
}
