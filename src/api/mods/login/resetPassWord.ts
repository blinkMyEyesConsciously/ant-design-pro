import { request } from 'umi';
export interface ForgetPasswordParams {}

/**
     * @desc 忘记密码
body体参数,不需要Authorization
     */
export async function postForgetPassword<T>(
  params: ForgetPasswordParams,
  options?: any,
): Promise<T> {
  // @ts-ignore
  return request('/forget/password', {
    method: 'POST',
    data: params,

    requestType: 'form',
    ...options,
  });
}
