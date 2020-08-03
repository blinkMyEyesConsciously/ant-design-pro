import { request } from 'umi';
export interface SmsVerifyCaptchaCheckParams {
  /** 验证码 */
  captcha: string;
  /** 手机号 */
  mobile: string;
  /** 验证码类型 */
  smsType: string;
}

/**
     * @desc 验证码验证接口
请求参数,不需要Authorization
     */
export async function getSmsVerifyCaptchaCheck<T>(
  params: SmsVerifyCaptchaCheckParams,
  options?: any,
): Promise<T> {
  // @ts-ignore
  return request('/smsVerify/captcha/check', {
    method: 'GET',
    params: params,

    ...options,
  });
}
