import { request } from 'umi';
export interface RegisterParams {}

/**
     * @desc 手机验证码注册
body体参数,不需要Authorization
     */
export async function postRegister<T>(
  params: RegisterParams,
  options?: any,
): Promise<T> {
  // @ts-ignore
  return request('/register', {
    method: 'POST',
    data: params,

    requestType: 'form',
    ...options,
  });
}
