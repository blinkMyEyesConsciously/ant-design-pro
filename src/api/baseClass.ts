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

export class PageInfo {
  /** endRow */
  endRow = undefined;

  /** firstPage */
  firstPage = undefined;

  /** hasNextPage */
  hasNextPage = false;

  /** hasPreviousPage */
  hasPreviousPage = false;

  /** isFirstPage */
  isFirstPage = false;

  /** isLastPage */
  isLastPage = false;

  /** lastPage */
  lastPage = undefined;

  /** list */
  list = [];

  /** navigateFirstPage */
  navigateFirstPage = undefined;

  /** navigateLastPage */
  navigateLastPage = undefined;

  /** navigatePages */
  navigatePages = undefined;

  /** navigatepageNums */
  navigatepageNums = [];

  /** nextPage */
  nextPage = undefined;

  /** pageNum */
  pageNum = undefined;

  /** pageSize */
  pageSize = undefined;

  /** pages */
  pages = undefined;

  /** prePage */
  prePage = undefined;

  /** size */
  size = undefined;

  /** startRow */
  startRow = undefined;

  /** total */
  total = undefined;
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
