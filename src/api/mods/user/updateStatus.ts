import { request } from 'umi';
export interface UserUpdateStatusParams {
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
     * @desc 更新用户的状态
需要header里加入Authorization
     */
export async function postUserUpdateStatus<T>(
  params: UserUpdateStatusParams,
  options?: any,
): Promise<T> {
  // @ts-ignore
  return request('/user/updateStatus', {
    method: 'POST',
    data: params,

    requestType: 'form',
    ...options,
  });
}
