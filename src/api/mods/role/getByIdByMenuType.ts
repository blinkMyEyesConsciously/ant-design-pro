import { request } from 'umi';
export interface RoleByMenuTypeByRoleCodeParams {
  /** menuType */
  menuType?: string;
  /** roleCode */
  roleCode: string;
}

/**
 * @desc getByIdByMenuType
 */
export async function getRoleByMenuTypeByRoleCode<T>(
  params: RoleByMenuTypeByRoleCodeParams,
  options?: any,
): Promise<T> {
  // @ts-ignore
  return request('/role/byMenuType/{roleCode}', {
    method: 'GET',
    params: params,

    ...options,
  });
}
