import vue from '@vitejs/plugin-vue';

import unplugin from './unplugin';
import { configHtmlPlugin } from './html';
import { configMockPlugin } from './mock';
import { configImageminPlugin } from './imagemin';
import { configCompressPlugin } from './compress';

export function createVitePlugins(viteEnv, isBuild) {
  const {
    VITE_USE_MOCK,
    VITE_USE_IMAGEMIN,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
  } = viteEnv;

  const plugins = [vue(), ...unplugin, configHtmlPlugin(viteEnv, isBuild)];

  VITE_USE_MOCK && plugins.push(configMockPlugin(isBuild));

  if (isBuild) {
    // vite-plugin-imagemin
    VITE_USE_IMAGEMIN && vitePlugins.push(configImageminPlugin());

    // rollup-plugin-gzip
    vitePlugins.push(
      configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE),
    );

    // vite-plugin-pwa
    vitePlugins.push(configPwaConfig(viteEnv));
  }

  return plugins;
}
