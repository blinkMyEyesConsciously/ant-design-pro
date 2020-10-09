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
  /** parentId */
  parentId?: number;
  /** url */
  url?: string;
}

/**
 * @desc saveOrUpdateMenu
 */
export async function postMenu<T>(
  params: MenuParams,
  options?: any,
): Promise<T> {
  // @ts-ignore
  return request('/menu', {
    method: 'POST',
    data: params,

    requestType: 'form',
    ...options,
  });
}
