import { createStorage } from './storage';

const prefixKey = import.meta.env.VITE_STORAGE_PREFIX;

export const createLocalStorage = function (option = {}) {
  return createStorage({
    prefixKey: option.prefixKey || '',
    storage: localStorage,
  });
};

export const createSessionStorage = function (option = {}) {
  return createStorage({
    prefixKey: option.prefixKey || '',
    storage: sessionStorage,
  });
};

export const lStorage = createLocalStorage({ prefixKey });

export const sStorage = createSessionStorage({ prefixKey });

export class Persistent {
  static getLocal(key) {
    return lStorage.get(key);
  }
  static setLocal(key, value) {
    lStorage.set(key, value);
  }
  static removeLocal(key) {
    lStorage.remove(key);
  }
  static clearLocal() {
    lStorage.clear();
  }

  static getSession(key) {
    return sStorage.get(key);
  }
  static setSession(key, value) {
    sStorage.set(key, value);
  }
  static removeSession(key) {
    sStorage.remove(key);
  }
  static clearSession() {
    sStorage.clear();
  }
}
