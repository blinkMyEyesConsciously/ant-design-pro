import * as login from './login';
import * as menu from './menu';
import * as role from './role';
import * as roleToMenu from './roleToMenu';
import * as smsVerify from './smsVerify';
import * as user from './user';

(window as any).API = {
  login,
  menu,
  role,
  roleToMenu,
  smsVerify,
  user,
};
