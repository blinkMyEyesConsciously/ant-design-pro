import { request } from 'umi';
export interface UserMobileParams {
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
 * @desc resetMobile
 */
export async function postUserMobile<T>(
  params: UserMobileParams,
  options?: any,
): Promise<T> {
  // @ts-ignore
  return request('/user/mobile', {
    method: 'POST',
    data: params,

    requestType: 'form',
    ...options,
  });
}
