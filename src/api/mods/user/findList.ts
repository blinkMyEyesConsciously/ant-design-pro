import { request } from 'umi';
export interface UserPageListParams {
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
  /** pageNum */
  pageNum?: number;
  /** pageSize */
  pageSize?: number;
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
 * @desc findList
 */
export async function getUserPageList<T>(
  params: UserPageListParams,
  options?: any,
): Promise<T> {
  // @ts-ignore
  return request('/user/pageList', {
    method: 'GET',
    params: params,

    ...options,
  });
}
