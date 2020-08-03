import * as login from './login';
import * as role from './role';
import * as smsVerify from './smsVerify';
import * as user from './user';

(window as any).API = {
  login,
  role,
  smsVerify,
  user,
};
