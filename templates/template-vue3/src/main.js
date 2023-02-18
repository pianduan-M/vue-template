import { createApp } from 'vue';
import App from './App.vue';
import { setupRouter, router } from '@/router';
import { setupRouterGuard } from '@/router/guard';
import { setupStore } from '@/store';

async function bootstrap() {
  const app = createApp(App);

  // 配置 store
  setupStore(app);

  // 配置理由
  setupRouter(app);
  // 添加路由守卫
  setupRouterGuard(router);

  app.mount('#app');
}

bootstrap();
