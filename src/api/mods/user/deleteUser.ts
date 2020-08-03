import { request } from 'umi';
export interface UserByUserNoParams {
  /** 用户ID */
  userNo: string;
}

/**
     * @desc 删除用户
根据url的id来删除用户
     */
export async function deleteUserByUserNo<T>(
  params: UserByUserNoParams,
  options?: any,
): Promise<T> {
  // @ts-ignore
  return request('/user/{userNo}', {
    method: 'DELETE',
    params: params,

    ...options,
  });
}
