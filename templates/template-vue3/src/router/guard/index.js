export const setupRouterGuard = (router) => {
  createPageGuard(router);
  createProgressGuard(router);
};

function createPageGuard(router) {
  router.beforeEach(async (to) => {
    return true;
  });

  router.afterEach((to) => {});
}

export function createProgressGuard(router) {
  // const { getOpenNProgress } = useTransitionSetting();
  // router.beforeEach(async (to) => {
  //   if (to.meta.loaded) {
  //     return true;
  //   }
  //   unref(getOpenNProgress) && nProgress.start();
  //   return true;
  // });
  // router.afterEach(async () => {
  //   unref(getOpenNProgress) && nProgress.done();
  //   return true;
  // });
}
