import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { resolve } from 'path';
import { getSrcPath } from '../../utils';
import Unocss from 'unocss/vite';
import { presetUno } from 'unocss';

import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import';

const customIconPath = resolve(getSrcPath(), 'assets/icons');

export default [
  // 自动引入组件
  Components({
    resolvers: [ElementPlusResolver()],
  }),
  // 自动引入 hook
  AutoImport({
    imports: ['vue', 'vue-router'],
  }),
  // 自动引入组件样式
  createStyleImportPlugin({
    resolves: [ElementPlusResolve()],
    // 自定义规则
    libs: [
      // {
      //   libraryName: "ant-design-vue",
      //   esModule: true,
      //   resolveStyle: (name) => {
      //     return `ant-design-vue/es/${name}/style/index`;
      //   },
      // },
    ],
  }),
  // // 自动引入 svg icon
  // createSvgIconsPlugin({
  //   // 指定需要缓存的图标文件夹
  //   iconDirs: [customIconPath],
  //   // 指定symbolId格式
  //   symbolId: "icon-[dir]-[name]",
  // }),
  createSvgIconsPlugin({
    // 指定需要缓存的图标文件夹
    iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
    // 指定symbolId格式
    symbolId: 'icon-[dir]-[name]',
  }),
  // unocss
  Unocss({
    presets: [presetUno()],
  }),
];
