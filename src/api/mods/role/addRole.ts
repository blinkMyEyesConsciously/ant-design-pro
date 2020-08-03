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
 * @desc addRole
 */
export async function postRole<T>(
  params: RoleParams,
  options?: any,
): Promise<T> {
  // @ts-ignore
  return request('/role', {
    method: 'POST',
    data: params,

    requestType: 'form',
    ...options,
  });
}
