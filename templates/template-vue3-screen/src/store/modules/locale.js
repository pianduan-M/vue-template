import { defineStore } from 'pinia';
import { store } from '/@/store';

import { LOCALE_KEY } from '/@/enums/cacheEnum';
import { lStorage } from '/@/utils/storage';
import { localeSetting } from '/@/settings/localeSetting';

const lsLocaleSetting = lStorage.get(LOCALE_KEY) || localeSetting;

export const useLocaleStore = defineStore({
  id: 'app-locale',
  state: () => ({
    localInfo: lsLocaleSetting,
  }),
  getters: {
    getShowPicker() {
      return !!this.localInfo?.showPicker;
    },
    getLocale() {
      return this.localInfo?.locale ?? 'zh_CN';
    },
  },
  actions: {
    /**
     * Set up multilingual information and cache
     * @param info multilingual info
     */
    setLocaleInfo(info) {
      this.localInfo = { ...this.localInfo, ...info };
      lStorage.set(LOCALE_KEY, this.localInfo);
    },
    /**
     * Initialize multilingual information and load the existing configuration from the local cache
     */
    initLocale() {
      this.setLocaleInfo({
        ...localeSetting,
        ...this.localInfo,
      });
    },
  },
});

// Need to be used outside the setup
export function useLocaleStoreWithOut() {
  return useLocaleStore(store);
}
