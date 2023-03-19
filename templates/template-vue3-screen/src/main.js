import { createApp } from 'vue';
import App from './App.vue';
import { setupRouter, router } from '@/router';
import { setupRouterGuard } from '@/router/guard';
import { setupStore } from '@/store';
import { setupI18n } from '/@/locales/setupI18n';

async function bootstrap() {
  const app = createApp(App);

  // 配置 store
  setupStore(app);

  // Multilingual configuration
  // 多语言配置
  // Asynchronous case: language files may be obtained from the server side
  // 异步案例：语言文件可能从服务器端获取
  await setupI18n(app);

  // 配置理由
  setupRouter(app);
  // 添加路由守卫
  setupRouterGuard(router);

  app.mount('#app');
}

bootstrap();
