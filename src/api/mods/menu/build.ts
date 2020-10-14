import { request } from 'umi';
export interface MenuBuildParams {}

/**
 * @desc 生成后台权限菜单
 */
export async function postMenuBuild<T>(
  params: MenuBuildParams,
  options?: any,
): Promise<T> {
  // @ts-ignore
  return request('/menu/build', {
    method: 'POST',
    data: params,

    requestType: 'form',
    ...options,
  });
}
