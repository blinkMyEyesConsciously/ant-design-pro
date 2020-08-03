type ObjectMap<Key extends string | number | symbol = any, Value = any> = {
  [key in Key]: Value;
};

declare namespace defs {
  export interface Laypage<T0 = any> {
    /** count */
    count?: number;

    /** data */
    data?: Array<T0>;

    /** limit */
    limit?: number;

    /** page */
    page?: number;

    /** pages */
    pages?: number;
  }

  export interface OrderItem {
    /** asc */
    asc?: boolean;

    /** column */
    column?: string;
  }

  export interface Page<T0 = any> {
    /** current */
    current?: number;

    /** hitCount */
    hitCount?: boolean;

    /** orders */
    orders?: Array<defs.OrderItem>;

    /** pages */
    pages?: number;

    /** records */
    records?: Array<T0>;

    /** searchCount */
    searchCount?: boolean;

    /** size */
    size?: number;

    /** total */
    total?: number;
  }

  export interface PageInfo<T0 = any> {
    /** endRow */
    endRow?: number;

    /** firstPage */
    firstPage?: number;

    /** hasNextPage */
    hasNextPage?: boolean;

    /** hasPreviousPage */
    hasPreviousPage?: boolean;

    /** isFirstPage */
    isFirstPage?: boolean;

    /** isLastPage */
    isLastPage?: boolean;

    /** lastPage */
    lastPage?: number;

    /** list */
    list?: Array<T0>;

    /** navigateFirstPage */
    navigateFirstPage?: number;

    /** navigateLastPage */
    navigateLastPage?: number;

    /** navigatePages */
    navigatePages?: number;

    /** navigatepageNums */
    navigatepageNums?: Array<number>;

    /** nextPage */
    nextPage?: number;

    /** pageNum */
    pageNum?: number;

    /** pageSize */
    pageSize?: number;

    /** pages */
    pages?: number;

    /** prePage */
    prePage?: number;

    /** size */
    size?: number;

    /** startRow */
    startRow?: number;

    /** total */
    total?: number;
  }

  export interface ResponseModel<T0 = any> {
    /** code */
    code?: string;

    /** message */
    message?: string;

    /** result */
    result?: T0;
  }

  export interface Role {
    /** roleCode */
    roleCode?: string;

    /** roleName */
    roleName?: string;
  }

  export interface SmsVerify {
    /** createTime */
    createTime?: number;

    /** mobile */
    mobile?: string;

    /** smsId */
    smsId?: string;

    /** smsType */
    smsType?: number;

    /** smsVerify */
    smsVerify?: string;

    /** smsVerifyId */
    smsVerifyId?: number;
  }

  export interface User {
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

    /** roleName */
    roleName?: string;

    /** status */
    status?: number;

    /** userNo */
    userNo?: string;

    /** username */
    username?: string;
  }
}

declare namespace API {
  /**
   * Login Controller
   */
  export namespace login {
    /**
        * 忘记密码
body体参数,不需要Authorization
        * /forget/password
        */
    export namespace resetPassWord {
      export class Params {}

      export type Response = defs.ResponseModel<defs.User>;
      export const init: Response;
      export function request(
        params: Params,
        bodyParams: String,
      ): Promise<defs.ResponseModel<defs.User>>;
    }

    /**
        * 手机用户名邮箱密码登录
body体参数,不需要Authorization
        * /login
        */
    export namespace login {
      export class Params {
        /** identity */
        identity?: string;
        /** password */
        password?: string;
      }

      export type Response = defs.ResponseModel<ObjectMap<string, ObjectMap>>;
      export const init: Response;
      export function request(
        params: Params,
      ): Promise<defs.ResponseModel<ObjectMap<string, ObjectMap>>>;
    }

    /**
        * 短信验证码登录
body体参数,不需要Authorization
        * /login/captcha
        */
    export namespace loginBycaptcha {
      export class Params {}

      export type Response = defs.ResponseModel<ObjectMap<string, ObjectMap>>;
      export const init: Response;
      export function request(
        params: Params,
        bodyParams: String,
      ): Promise<defs.ResponseModel<ObjectMap<string, ObjectMap>>>;
    }

    /**
        * 手机验证码注册
body体参数,不需要Authorization
        * /register
        */
    export namespace register {
      export class Params {}

      export type Response = defs.ResponseModel<defs.User>;
      export const init: Response;
      export function request(
        params: Params,
        bodyParams: String,
      ): Promise<defs.ResponseModel<defs.User>>;
    }
  }

  /**
   * Role Controller
   */
  export namespace role {
    /**
     * addRole
     * /role
     */
    export namespace addRole {
      export class Params {
        /** menuCodes */
        menuCodes?: Array<string>;
        /** roleCode */
        roleCode?: string;
        /** roleName */
        roleName?: string;
      }

      export type Response = defs.ResponseModel<boolean>;
      export const init: Response;
      export function request(
        params: Params,
      ): Promise<defs.ResponseModel<boolean>>;
    }

    /**
     * updateRole
     * /role
     */
    export namespace updateRole {
      export class Params {
        /** menuCodes */
        menuCodes?: Array<string>;
        /** roleCode */
        roleCode?: string;
        /** roleName */
        roleName?: string;
      }

      export type Response = defs.ResponseModel<string>;
      export const init: Response;
      export function request(
        params: Params,
      ): Promise<defs.ResponseModel<string>>;
    }

    /**
     * getAllRole
     * /role/all
     */
    export namespace getAllRole {
      export class Params {}

      export type Response = defs.ResponseModel<Array<defs.Role>>;
      export const init: Response;
      export function request(
        params: Params,
      ): Promise<defs.ResponseModel<Array<defs.Role>>>;
    }

    /**
     * getPageList
     * /role/pageList
     */
    export namespace getPageList {
      export class Params {
        /** pageIndex */
        pageIndex?: number;
        /** pageSize */
        pageSize?: number;
      }

      export type Response = defs.ResponseModel<defs.PageInfo<defs.Role>>;
      export const init: Response;
      export function request(
        params: Params,
      ): Promise<defs.ResponseModel<defs.PageInfo<defs.Role>>>;
    }

    /**
     * getById
     * /role/{roleCode}
     */
    export namespace getById {
      export class Params {
        /** roleCode */
        roleCode: string;
      }

      export type Response = defs.ResponseModel<ObjectMap<string, ObjectMap>>;
      export const init: Response;
      export function request(
        params: Params,
      ): Promise<defs.ResponseModel<ObjectMap<string, ObjectMap>>>;
    }

    /**
     * deleteRole
     * /role/{roleCode}
     */
    export namespace deleteRole {
      export class Params {
        /** roleCode */
        roleCode: string;
      }

      export type Response = defs.ResponseModel<string>;
      export const init: Response;
      export function request(
        params: Params,
      ): Promise<defs.ResponseModel<string>>;
    }
  }

  /**
   * 短信模块
   */
  export namespace smsVerify {
    /**
        * 验证码验证接口
请求参数,不需要Authorization
        * /smsVerify/captcha/check
        */
    export namespace captchaCheck {
      export class Params {
        /** 验证码 */
        captcha: string;
        /** 手机号 */
        mobile: string;
        /** 验证码类型 */
        smsType: string;
      }

      export type Response = defs.ResponseModel;
      export const init: Response;
      export function request(params: Params): Promise<defs.ResponseModel>;
    }

    /**
        * 获取验证码接口
路径参数,不需要Authorization
        * /smsVerify/{smsType}/{mobile}
        */
    export namespace getCaptcha {
      export class Params {
        /** mobile */
        mobile: string;
        /** smsType */
        smsType: string;
      }

      export type Response = defs.ResponseModel<defs.SmsVerify>;
      export const init: Response;
      export function request(
        params: Params,
      ): Promise<defs.ResponseModel<defs.SmsVerify>>;
    }
  }

  /**
   * User Controller
   */
  export namespace user {
    /**
        * 获取用户列表
需要header里加入Authorization
        * /user/admin/infoList
        */
    export namespace findInfoList {
      export class Params {
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

      export type Response = defs.ResponseModel<defs.Page<defs.User>>;
      export const init: Response;
      export function request(
        params: Params,
      ): Promise<defs.ResponseModel<defs.Page<defs.User>>>;
    }

    /**
     * resetPassWord
     * /user/admin/password
     */
    export namespace resetPassWord {
      export class Params {}

      export type Response = defs.ResponseModel<string>;
      export const init: Response;
      export function request(
        params: Params,
        bodyParams: ObjectMap<any, object>,
      ): Promise<defs.ResponseModel<string>>;
    }

    /**
     * 获取当前用户的信息
     * /user/currentUser
     */
    export namespace getUser {
      export class Params {
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
        /** roleName */
        roleName?: string;
        /** status */
        status?: number;
        /** userNo */
        userNo?: string;
        /** username */
        username?: string;
      }

      export type Response = defs.ResponseModel<ObjectMap<string, ObjectMap>>;
      export const init: Response;
      export function request(
        params: Params,
      ): Promise<defs.ResponseModel<ObjectMap<string, ObjectMap>>>;
    }

    /**
     * resetUserInfo
     * /user/info
     */
    export namespace resetUserInfo {
      export class Params {
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
        /** roleName */
        roleName?: string;
        /** status */
        status?: number;
        /** userNo */
        userNo?: string;
        /** username */
        username?: string;
      }

      export type Response = defs.ResponseModel<defs.User>;
      export const init: Response;
      export function request(
        params: Params,
        bodyParams: ObjectMap<any, object>,
      ): Promise<defs.ResponseModel<defs.User>>;
    }

    /**
     * resetMobile
     * /user/mobile
     */
    export namespace resetMobile {
      export class Params {
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
        /** roleName */
        roleName?: string;
        /** status */
        status?: number;
        /** userNo */
        userNo?: string;
        /** username */
        username?: string;
      }

      export type Response = defs.ResponseModel<string>;
      export const init: Response;
      export function request(
        params: Params,
        bodyParams: ObjectMap<any, object>,
      ): Promise<defs.ResponseModel<string>>;
    }

    /**
     * findList
     * /user/pageList
     */
    export namespace findList {
      export class Params {
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

      export type Response = defs.ResponseModel<defs.Laypage<defs.User>>;
      export const init: Response;
      export function request(
        params: Params,
      ): Promise<defs.ResponseModel<defs.Laypage<defs.User>>>;
    }

    /**
     * resetPassWord
     * /user/password
     */
    export namespace postPassword {
      export class Params {
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
        /** roleName */
        roleName?: string;
        /** status */
        status?: number;
        /** userNo */
        userNo?: string;
        /** username */
        username?: string;
      }

      export type Response = defs.ResponseModel<string>;
      export const init: Response;
      export function request(
        params: Params,
        bodyParams: ObjectMap<any, object>,
      ): Promise<defs.ResponseModel<string>>;
    }

    /**
        * 获取用户详细信息
根据url的id来获取用户详细信息
        * /user/{userNo}
        */
    export namespace findOneUser {
      export class Params {
        /** 用户ID */
        userNo: string;
      }

      export type Response = defs.ResponseModel<defs.User>;
      export const init: Response;
      export function request(
        params: Params,
      ): Promise<defs.ResponseModel<defs.User>>;
    }

    /**
        * 删除用户
根据url的id来删除用户
        * /user/{userNo}
        */
    export namespace deleteUser {
      export class Params {
        /** 用户ID */
        userNo: string;
      }

      export type Response = defs.ResponseModel;
      export const init: Response;
      export function request(params: Params): Promise<defs.ResponseModel>;
    }
  }
}
