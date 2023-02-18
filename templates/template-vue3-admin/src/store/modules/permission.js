import { defineStore } from 'pinia';
import { asyncRoutes } from '@/router/routes';

export const usePermissionStore = defineStore({
  id: 'permission',
  state: () => ({
    routes: asyncRoutes,
  }),
  actions: {
    setRoutes(routes) {
      // this.addRoutes = routes;
      // this.routes = constantRoutes.concat(routes);
    },
    generateRoutes(roles) {
      // return new Promise((resolve, reject) => {
      //   listRoutes()
      //     .then((response) => {
      //       const asyncRoutes = response.data;
      //       const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
      //       this.setRoutes(accessedRoutes);
      //       resolve(accessedRoutes);
      //     })
      //     .catch((error) => {
      //       reject(error);
      //     });
      // });
    },
  },
});
