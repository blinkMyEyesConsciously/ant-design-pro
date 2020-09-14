import {Settings as LayoutSettings} from '@ant-design/pro-layout';

export default {
    navTheme: 'light',
    // 拂晓蓝
    primaryColor: '#1890ff',
    layout: 'mix',
    splitMenu: true,
    contentWidth: 'Fluid',
    autoHideHeader: false,
    fixedHeader: false,
    fixSiderbar: false,
    colorWeak: false,
    splitMenus: true,
    baseUrl: process.env.NODE_ENV === "development" ? "http://paydebug.qicp.vip/api/v1" : "http://paydebug.qicp.vip/api/v1",

    menu: {
        locale: false,
    },
    name: "网络货运平台",
    locale: true,
    siderWidth: 208,
    title: '诚 驿 Pro',
    pwa: false,
    iconfontUrl: '',
} as LayoutSettings & {
    pwa: boolean;
    baseUrl: string;

};
