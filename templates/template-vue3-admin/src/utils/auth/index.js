import Cookies from 'js-cookie';
import { Persistent } from '@/utils/storage/index';
import projectSetting from '@/settings/projectSetting';
import { CacheTypeEnum } from '@/enums/cacheEnum';
import { TOKEN_KEY } from '@/enums/cacheEnum';

const { permissionCacheType } = projectSetting;
const isLocal = permissionCacheType === CacheTypeEnum.LOCAL;

export function getToken() {
  return Cookies.get(TOKEN_KEY);
}

export function setToken(token) {
  Cookies.set(TOKEN_KEY, token);
}

export function removeToken() {
  Cookies.remove(TOKEN_KEY);
}

export function getAuthCache(key) {
  if (key === TOKEN_KEY) {
    return getToken();
  }

  const fn = isLocal ? Persistent.getLocal : Persistent.getSession;
  return fn(key);
}

export function setAuthCache(key, value) {
  if (key === TOKEN_KEY) {
    return setToken(value);
  }

  const fn = isLocal ? Persistent.setLocal : Persistent.setSession;
  return fn(key, value, true);
}

export function clearAuthCache(immediate = true) {
  removeToken();

  const fn = isLocal ? Persistent.clearLocal : Persistent.clearSession;
  return fn(immediate);
}
