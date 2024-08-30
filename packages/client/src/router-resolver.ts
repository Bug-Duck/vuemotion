import { Plugin } from 'vite';

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
          code: `export { default } from '${file}'`
        }
      }
      return null;
    }
  };
}
