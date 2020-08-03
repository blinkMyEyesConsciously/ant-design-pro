import { request } from 'umi';
export interface UserAdminInfoListParams {
  /** 结束时间 */
  endTime?: number;
  /** 会员名称或者电话 */
  info?: string;
  /** 第几页 */
  pageIndex?: string;
  /** 每页多少条 */
  pageSize?: string;
  /** 开始时间 */
  startTime?: number;
}

/**
     * @desc 获取用户列表
需要header里加入Authorization
     */
export async function getUserAdminInfoList<T>(
  params: UserAdminInfoListParams,
  options?: any,
): Promise<T> {
  // @ts-ignore
  return request('/user/admin/infoList', {
    method: 'GET',
    params: params,

    ...options,
  });
}
