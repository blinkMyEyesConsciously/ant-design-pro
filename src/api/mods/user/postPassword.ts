import { request } from 'umi';
export interface UserPasswordParams {
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
 * @desc resetPassWord
 */
export async function postUserPassword<T>(
  params: UserPasswordParams,
  options?: any,
): Promise<T> {
  // @ts-ignore
  return request('/user/password', {
    method: 'POST',
    data: params,

    requestType: 'form',
    ...options,
  });
}
