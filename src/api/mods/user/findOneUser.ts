import { request } from 'umi';
export interface UserByUserNoParams {
  /** 用户ID */
  userNo: string;
}

/**
     * @desc 获取用户详细信息
根据url的id来获取用户详细信息
     */
export async function getUserByUserNo<T>(
  params: UserByUserNoParams,
  options?: any,
): Promise<T> {
  // @ts-ignore
  return request('/user/{userNo}', {
    method: 'GET',
    params: params,

    ...options,
  });
}
