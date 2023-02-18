// Interface data format used to return a unified format
import { ResultEnum } from '../src/enums/httpEnum.js';

export function resultSuccess(result, { message = 'ok' } = {}) {
  return {
    code: ResultEnum.SUCCESS,
    data: result,
    message,
    type: 'success',
  };
}

export function resultPageSuccess(page, pageSize, list, message = {}) {
  const pageData = pagination(page, pageSize, list);

  return {
    ...resultSuccess({
      items: pageData,
      total: list.length,
    }),
    message,
  };
}

export function resultError(
  message = 'Request failed',
  { code = ResultEnum.ERROR, result = null },
) {
  return {
    code,
    data: result,
    message,
    type: 'error',
  };
}

export function pagination(pageNo, pageSize, array) {
  const offset = (pageNo - 1) * Number(pageSize);
  return offset + Number(pageSize) >= array.length
    ? array.slice(offset, array.length)
    : array.slice(offset, offset + Number(pageSize));
}

/**
 * @description 本函数用于从request数据中获取token，请根据项目的实际情况修改
 *
 */
export function getRequestToken({ headers }) {
  return headers?.authorization;
}
