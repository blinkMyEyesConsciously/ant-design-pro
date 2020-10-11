export default [
    {
        //登录 注册找回密码页面
        path: '/registerAndLogin',
        layout: false,
        component: '@/layouts/UserLayout',
        routes: [
            {
                path: '/registerAndLogin/login',
                component: '@/layouts/LoginLayout',
                routes: [
                    {
                        name: '账号登录',
                        path: '/registerAndLogin/login/LoginAccountAndPassword',
                        component: './registerAndLogin/LoginAccountAndPassword',
                    },
                    {
                        name: '手机号登录',

                        path: '/registerAndLogin/login/LoginPhoneAndVerification',
                        component: './registerAndLogin/LoginPhoneAndVerification',
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
                component: './admin/userList',
            },
              {
                path: '/admin/roleList',
                name: '角色管理',
                icon: 'smile',
                component: './admin/roleList',
            },
            {
                path: '/admin/menu',
                name: '菜单管理',
                icon: 'smile',
                component: './admin/menu',
            },

            {
                "redirect": "/admin/userList"
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
