import { request } from 'umi';
export interface MenuParams {
  /** code */
  code?: string;
  /** icon */
  icon?: string;
  /** menuCode */
  menuCode?: string;
  /** menuId */
  menuId?: number;
  /** menuType */
  menuType?: number;
  /** name */
  name?: string;
  /** num */
  num?: number;
  /** pageNum */
  pageNum?: number;
  /** pageSize */
  pageSize?: number;
  /** parentId */
  parentId?: number;
  /** selectedKey */
  selectedKey?: string;
  /** url */
  url?: string;
}

/**
 * @desc geMenListPage
 */
export async function getMenu<T>(
  params: MenuParams,
  options?: any,
): Promise<T> {
  // @ts-ignore
  return request('/menu', {
    method: 'GET',
    params: params,

    ...options,
  });
}
