export default [
  {
    //登录 注册找回密码页面
    path: '/user',
    layout: false,
    component: '@/layouts/UserLayout',
    routes: [
      {
        path: '/user/login',
        component: '@/layouts/LoginLayout',
        routes: [
          {
            name: '账号登录',
            path: '/user/login/LoginAccountAndPassword',
            component: './user/LoginAccountAndPassword',
          },
          {
            name: '手机号登录',

            path: '/user/login/LoginPhoneAndVerification',
            component: './user/LoginPhoneAndVerification',
          },
        ],
      },


    ],
  },
  // 后台基础信息管理页面
  {
    path: '/admin',
    name: '管理页面',
    icon: 'crown',
    routes: [
      {
        path: '/admin/userList',
        name: '用户管理',
        icon: 'smile',
        component: './userList',
      },
    ],
  },



  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './ListTableList',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
