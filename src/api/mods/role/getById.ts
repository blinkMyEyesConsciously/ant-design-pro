import { request } from 'umi';
export interface RoleByRoleCodeParams {
  /** roleCode */
  roleCode: string;
}

/**
 * @desc getById
 */
export async function getRoleByRoleCode<T>(
  params: RoleByRoleCodeParams,
  options?: any,
): Promise<T> {
  // @ts-ignore
  return request('/role/{roleCode}', {
    method: 'GET',
    params: params,

    ...options,
  });
}
