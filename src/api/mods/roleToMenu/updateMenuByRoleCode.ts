import { request } from 'umi';
export interface RoleToPermissionUpdateMenuByRoleCodeParams {
  /** ids */
  ids?: string;
  /** roleCode */
  roleCode?: string;
}

/**
 * @desc 根据角色更新权限
 */
export async function postRoleToPermissionUpdateMenuByRoleCode<T>(
  params: RoleToPermissionUpdateMenuByRoleCodeParams,
  options?: any,
): Promise<T> {
  // @ts-ignore
  return request('/roleToPermission/updateMenuByRoleCode', {
    method: 'POST',
    data: params,

    requestType: 'form',
    ...options,
  });
}
