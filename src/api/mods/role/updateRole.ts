import { request } from 'umi';
export interface RoleParams {
  /** menuCodes */
  menuCodes?: Array<string>;
  /** roleCode */
  roleCode?: string;
  /** roleName */
  roleName?: string;
}

/**
 * @desc updateRole
 */
export async function putRole<T>(
  params: RoleParams,
  options?: any,
): Promise<T> {
  // @ts-ignore
  return request('/role', {
    method: 'PUT',
    params: params,

    ...options,
  });
}
