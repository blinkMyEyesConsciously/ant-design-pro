import { request } from 'umi';
export interface LoginCaptchaParams {}

/**
     * @desc 短信验证码登录
body体参数,不需要Authorization
     */
export async function postLoginCaptcha<T>(
  params: LoginCaptchaParams,
  options?: any,
): Promise<T> {
  // @ts-ignore
  return request('/login/captcha', {
    method: 'POST',
    data: params,

    requestType: 'form',
    ...options,
  });
}
