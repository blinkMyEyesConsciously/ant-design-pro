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
    baseUrl: process.env.NODE_ENV === "development" ? "http://localhost:8088/api/v1/" : "http://10.0.0.236:7001/freight",

    menu: {
    locale: false,
  },

  title: 'Ant Design Pro',
  pwa: false,
  iconfontUrl: '',
} as LayoutSettings & {
  pwa: boolean;
    baseUrl: string;

};
