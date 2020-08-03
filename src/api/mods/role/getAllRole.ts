import { request } from 'umi';
export interface RoleAllParams {}

/**
 * @desc getAllRole
 */
export async function getRoleAll<T>(
  params: RoleAllParams,
  options?: any,
): Promise<T> {
  // @ts-ignore
  return request('/role/all', {
    method: 'GET',
    params: params,

    ...options,
  });
}
