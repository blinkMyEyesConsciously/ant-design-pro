import { request } from 'umi';
export interface RegisterParams {
  /** avatar */
  avatar?: string;
  /** captcha */
  captcha?: string;
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
  /** rePassword */
  rePassword?: string;
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
