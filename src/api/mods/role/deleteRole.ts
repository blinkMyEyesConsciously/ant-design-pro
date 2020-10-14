import { request } from 'umi';
export interface RoleByRoleCodeParams {
  /** roleCode */
  roleCode: string;
}

/**
 * @desc deleteRole
 */
export async function deleteRoleByRoleCode<T>(
  params: RoleByRoleCodeParams,
  options?: any,
): Promise<T> {
  // @ts-ignore
  return request('/role/{roleCode}', {
    method: 'DELETE',
    params: params,

    ...options,
  });
}
