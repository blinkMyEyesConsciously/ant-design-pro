export class AdminMenu {
  /** childMenu */
  childMenu = [];

  /** code */
  code = '';

  /** icon */
  icon = '';

  /** menuCode */
  menuCode = '';

  /** menuId */
  menuId = undefined;

  /** menuType */
  menuType = undefined;

  /** name */
  name = '';

  /** num */
  num = undefined;

  /** parentId */
  parentId = undefined;

  /** parentName */
  parentName = '';

  /** url */
  url = '';
}

export class Laypage {
  /** count */
  count = undefined;

  /** data */
  data = [];

  /** limit */
  limit = undefined;

  /** page */
  page = undefined;

  /** pages */
  pages = undefined;
}

export class Menu {
  /** childMenu */
  childMenu = [];

  /** code */
  code = '';

  /** icon */
  icon = '';

  /** menuCode */
  menuCode = '';

  /** menuId */
  menuId = undefined;

  /** menuType */
  menuType = undefined;

  /** name */
  name = '';

  /** num */
  num = undefined;

  /** parentId */
  parentId = undefined;

  /** url */
  url = '';
}

export class ResponseModel {
  /** code */
  code = '';

  /** message */
  message = '';

  /** result */
  result = new Laypage();
}

export class Role {
  /** roleCode */
  roleCode = '';

  /** roleName */
  roleName = '';
}

export class SmsVerify {
  /** createTime */
  createTime = undefined;

  /** mobile */
  mobile = '';

  /** smsId */
  smsId = '';

  /** smsType */
  smsType = undefined;

  /** smsVerify */
  smsVerify = '';

  /** smsVerifyId */
  smsVerifyId = undefined;
}

export class User {
  /** avatar */
  avatar = '';

  /** createTime */
  createTime = '';

  /** email */
  email = '';

  /** job */
  job = '';

  /** mobile */
  mobile = '';

  /** password */
  password = '';

  /** roleName */
  roleName = '';

  /** status */
  status = undefined;

  /** userNo */
  userNo = '';

  /** username */
  username = '';
}
