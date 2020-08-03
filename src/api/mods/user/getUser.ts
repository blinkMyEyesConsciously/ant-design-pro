import { request } from 'umi';
export interface UserCurrentUserParams {
  /** avatar */
  avatar?: string;
  /** createTime */
  createTime?: string;
  /** email */
  email?: string;
  /** job */
  job?: string;
  /** mobile */
  mobile?: string;
  /** password */
  password?: string;
  /** roleName */
  roleName?: string;
  /** status */
  status?: number;
  /** userNo */
  userNo?: string;
  /** username */
  username?: string;
}

/**
 * @desc 获取当前用户的信息
 */
export async function getUserCurrentUser<T>(
  params: UserCurrentUserParams,
  options?: any,
): Promise<T> {
  // @ts-ignore
  return request('/user/currentUser', {
    method: 'GET',
    params: params,

    ...options,
  });
}
