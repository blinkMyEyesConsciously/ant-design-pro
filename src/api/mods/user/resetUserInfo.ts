import { request } from 'umi';
export interface UserInfoParams {
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
  /** roleCode */
  roleCode?: string;
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
 * @desc resetUserInfo
 */
export async function postUserInfo<T>(
  params: UserInfoParams,
  options?: any,
): Promise<T> {
  // @ts-ignore
  return request('/user/info', {
    method: 'POST',
    data: params,

    requestType: 'form',
    ...options,
  });
}
