import { request } from 'umi';
export interface SmsVerifyBySmsTypeAndByMobileParams {
  /** mobile */
  mobile: string;
  /** smsType */
  smsType: string;
}

/**
     * @desc 获取验证码接口
路径参数,不需要Authorization
     */
export async function getSmsVerifyBySmsTypeAndByMobile<T>(
  params: SmsVerifyBySmsTypeAndByMobileParams,
  options?: any,
): Promise<T> {
  // @ts-ignore
  return request('/smsVerify/{smsType}/{mobile}', {
    method: 'GET',
    params: params,

    ...options,
  });
}
