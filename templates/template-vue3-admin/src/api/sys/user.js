import { request } from '@/utils/http';

const Api = {
  Login: '/login',
  Logout: '/logout',
  GetUserInfo: '/getUserInfo',
};

/**
 * @description: user login api
 */
export function loginApi(params) {
  return request({
    method: 'post',
    url: Api.Login,
    params,
  });
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return request({ url: Api.GetUserInfo });
}

export function doLogout() {
  return request({ url: Api.Logout });
}
