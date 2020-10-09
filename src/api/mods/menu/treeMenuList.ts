import { request } from 'umi';
export interface MenuTreeMenuListParams {}

/**
 * @desc treeMenuList
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
