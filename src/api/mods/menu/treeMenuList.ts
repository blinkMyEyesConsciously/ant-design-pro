import { request } from 'umi';
export interface MenuTreeMenuListParams {}

/**
 * @desc 配置用户左侧的菜单栏
 */
export async function getMenuTreeMenuList<T>(
  params: MenuTreeMenuListParams,
  options?: any,
): Promise<T> {
  // @ts-ignore
  return request('/menu/treeMenuList', {
    method: 'GET',
    params: params,

    ...options,
  });
}
