import { HOME_PAGE, ABOUT_PAGE } from './basic';
import { PageEnum } from '@/enums/pageEnum';

const modules = import.meta.globEager('./modules/**/*.js');
const routeModuleList = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

export const asyncRoutes = [...routeModuleList];

// 根路由
export const RootRoute = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
};

export const basicRoutes = [RootRoute, HOME_PAGE, ABOUT_PAGE];
