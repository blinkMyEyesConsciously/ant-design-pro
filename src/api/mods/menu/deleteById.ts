import { request } from 'umi';
export interface MenuByIdParams {
  /** id */
  id: string;
}

/**
 * @desc 根据id删除菜单
 */
export async function deleteMenuById<T>(
  params: MenuByIdParams,
  options?: any,
): Promise<T> {
  // @ts-ignore
  return request('/menu/{id}', {
    method: 'DELETE',
    params: params,

    ...options,
  });
}
