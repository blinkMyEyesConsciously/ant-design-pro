import { request } from 'umi';
export interface RolePageListParams {
  /** pageIndex */
  pageIndex?: number;
  /** pageSize */
  pageSize?: number;
}

/**
 * @desc getPageList
 */
export async function getRolePageList<T>(
  params: RolePageListParams,
  options?: any,
): Promise<T> {
  // @ts-ignore
  return request('/role/pageList', {
    method: 'GET',
    params: params,

    ...options,
  });
}
