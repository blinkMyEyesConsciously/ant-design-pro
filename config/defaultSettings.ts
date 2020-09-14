import { Settings as LayoutSettings } from '@ant-design/pro-layout';

export default {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
    autoHideHeader: false,
    fixedHeader: false,
    fixSiderbar: false,
  colorWeak: false,
    baseUrl: process.env.NODE_ENV === "development" ? "http://paydebug.qicp.vip/api/v1" : "http://paydebug.qicp.vip/api/v1",

    menu: {
    locale: false,
  },

  title: '诚 驿 Pro',
  pwa: false,
  iconfontUrl: '',
} as LayoutSettings & {
  pwa: boolean;
    baseUrl: string;

};
