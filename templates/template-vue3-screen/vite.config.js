import { defineConfig, loadEnv } from 'vite';
import { createVitePlugins } from './build/vite/plugin';
import { convertEnv, getSrcPath, getRootPath } from './build/utils';
import { viteDefine } from './build/config';
import { createProxy } from './build/vite/proxy';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const srcPath = getSrcPath();
  const rootPath = getRootPath();

  const isBuild = command === 'build';
  const env = loadEnv(mode, process.cwd());
  const viteEnv = convertEnv(env);

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv;

  return {
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: {
        '@': srcPath,
        '~': rootPath,
      },
    },
    define: viteDefine,
    plugins: createVitePlugins(viteEnv, isBuild),
    server: {
      https: false,
      // Listening on all local IPs
      host: true,
      port: VITE_PORT,
      // Load proxy configuration from .env
      proxy: createProxy(VITE_PROXY),
    },
    build: {
      target: 'es2015',
      outDir: 'dist',
      reportCompressedSize: false, // 启用/禁用 gzip 压缩大小报告
      chunkSizeWarningLimit: 1024, // chunk 大小警告的限制（单位kb）
    },
    // 全局 css 注册
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: `
          @import "src/styles/common/var.scss";
          `,
        },
      },
    },
  };
});
