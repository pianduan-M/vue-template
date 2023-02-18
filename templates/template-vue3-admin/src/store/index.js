import { createPinia } from 'pinia';

export const store = createPinia();

export function setupStore(app) {
  app.use(store);
}

export * from './modules';
