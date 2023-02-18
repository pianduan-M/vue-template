import { defineStore } from 'pinia';
import { ROLES_KEY, TOKEN_KEY, USER_INFO_KEY } from '@/enums/cacheEnum';
import { getAuthCache, setAuthCache } from '@/utils/auth';
import { store } from '@/store';
import { useMessage } from '@/hooks/web/useMessage';
import { router } from '@/router';
import { doLogout, getUserInfo, loginApi } from '@/api/sys/user';
import { isArray } from '@/utils/is';
import { PageEnum } from '@/enums/pageEnum';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    userInfo: null,
    token: null,
    roleList: [],
  }),
  getters: {
    getUserInfo() {
      return this.userInfo || getAuthCache(USER_INFO_KEY);
    },
    getToken() {
      return this.token || getAuthCache(TOKEN_KEY);
    },
    getRoleList() {
      return this.roleList.length > 0 ? this.roleList : getAuthCache(ROLES_KEY);
    },
  },
  actions: {
    setToken(info) {
      this.token = info ? info : ''; // for null or undefined value
      setAuthCache(TOKEN_KEY, info);
    },
    setRoleList(roleList) {
      this.roleList = roleList;
      setAuthCache(ROLES_KEY, roleList);
    },
    setUserInfo(info) {
      this.userInfo = info;
      setAuthCache(USER_INFO_KEY, info);
    },
    resetState() {
      this.userInfo = null;
      this.token = '';
      this.roleList = [];
    },
    async login(params) {
      try {
        const { goHome = true, mode, ...loginParams } = params;
        const data = await loginApi(loginParams, mode);
        const { token } = data;

        // save token
        this.setToken(token);
        return this.afterLoginAction(goHome);
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async afterLoginAction(goHome) {
      if (!this.getToken) return null;
      // get user info
      const userInfo = await this.getUserInfoAction();

      goHome && (await router.replace(userInfo?.homePath || PageEnum.BASE_HOME));

      return userInfo;
    },

    async getUserInfoAction() {
      if (!this.getToken) return null;
      const userInfo = await getUserInfo();
      const { roles = [] } = userInfo;
      if (isArray(roles)) {
        const roleList = roles.map((item) => item.value);
        this.setRoleList(roleList);
      } else {
        userInfo.roles = [];
        this.setRoleList([]);
      }
      this.setUserInfo(userInfo);
      return userInfo;
    },

    async logout(goLogin = false) {
      if (this.getToken) {
        try {
          await doLogout();
        } catch {
          console.log('注销Token失败');
        }
      }
      this.setToken(undefined);
      this.setUserInfo(null);
      goLogin && router.push(PageEnum.BASE_LOGIN);
    },
  },
  confirmLoginOut() {
    const { createConfirm } = useMessage();
    createConfirm({
      title: '温馨提醒',
      content: '是否确认退出系统',
      callback: (action) => {
        if (action === 'confirm') {
          this.logout(true);
        }
      },
    });
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
