export default [
    {
        path: '/user',
        layout: false,
        component: '@/layouts/UserLayout',
        routes: [
            {
                path: '/user/login',
                layout: false,
                component: '@/layouts/LoginLayout',
                routes:[
                    {
                        name: '账号登录',
                        layout: false,

                        path: '/user/login/LoginAccountAndPassword',
                        component: './user/LoginAccountAndPassword',
                    },
                    {
                        name: '手机号登录',
                        layout: false,

                        path: '/user/login/LoginPhoneAndVerification',
                        component: './user/LoginPhoneAndVerification',
                    },
                ]            },


        ],
    },

    {
        path: '/welcome',
        name: 'welcome',
        icon: 'smile',
        component: './Welcome',
    },
    {
        path: '/admin',
        name: 'admin',
        icon: 'crown',
        access: 'canAdmin',
        component: './Admin',
        routes: [
            {
                path: '/admin/sub-page',
                name: 'sub-page',
                icon: 'smile',
                component: './Welcome',
            },
        ],
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
]
