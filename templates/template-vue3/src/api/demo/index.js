import { request } from '@/utils/http';

export function fetchAccountInfo() {
  return request({
    url: '/basic-api/account/getAccountInfo',
  });
}
