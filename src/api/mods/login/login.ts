import { request } from 'umi';
export interface LoginParams {
  /** identity */
  identity?: string;
  /** password */
  password?: string;
}

/**
     * @desc 手机用户名邮箱密码登录
body体参数,不需要Authorization
     */
export async function postLogin<T>(
  params: LoginParams,
  options?: any,
): Promise<T> {
  // @ts-ignore
  return request('/login', {
    method: 'POST',
    data: params,

    requestType: 'form',
    ...options,
  });
}
