import { request } from 'umi';
export interface UserAdminPasswordParams {}

/**
 * @desc resetPassWord
 */
export async function postUserAdminPassword<T>(
  params: UserAdminPasswordParams,
  options?: any,
): Promise<T> {
  // @ts-ignore
  return request('/user/admin/password', {
    method: 'POST',
    data: params,

    requestType: 'form',
    ...options,
  });
}
