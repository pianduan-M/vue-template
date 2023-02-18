import Home from '@/views/Home/index.vue';
import About from '@/views/About/index.vue';

// basic router
export const HOME_PAGE = {
  path: '/home',
  name: 'Home',
  component: Home,
};

export const ABOUT_PAGE = {
  path: '/about',
  name: 'About',
  component: About,
};
