import React from 'react';
import { BasicLayoutProps, Settings as LayoutSettings } from '@ant-design/pro-layout';
import { notification } from 'antd';
import { history, RequestConfig } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { RequestInterceptor, RequestOptionsInit, ResponseInterceptor } from 'umi-request';
import omit from 'omit.js'
import { getUserCurrentUser } from '@/api/mods/user/getUser';
import defaultSettings from '../config/defaultSettings';

export async function getInitialState (): Promise<{
  currentUser?: any;
  settings?: LayoutSettings;
}> {
  // 如果是登录页面，不执行
  if (history.location.pathname.indexOf("/user/login")<0) {
    try {
      const currentUser = await getUserCurrentUser<any>() ;
      return {
        currentUser,
        settings: defaultSettings,
      };
    } catch (error) {
      history.push ('/user/login/LoginAccountAndPassword');
    }
  }
  return {
    settings: defaultSettings,
  };
}

export const layout = ({
                         initialState,
                       }: {
  initialState: { settings?: LayoutSettings };
}): BasicLayoutProps => {
  return {
    rightContentRender: () => <RightContent/>,
    disableContentMargin: false,
    footerRender: () => <Footer/>,
    menuHeaderRender: undefined,
    ...initialState?.settings,
  };
};

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */

const errorHandler = (error: { response: Response }) => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error ({
      message: `请求错误 ${ status }: ${ url }`,
      description: errorText,
    });
  }

  if (!response) {
    notification.error ({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-throw-literal
  throw error;
};
// 请求拦截器
const requestInterceptors: RequestInterceptor[] = [
  // 路径参数url的修改
  (url: string, options: RequestOptionsInit) => {
    console.log (url, options);
    const regex = /\{(.+?)\}/g;
    const strList: any[] = [];
    let result;
    // eslint-disable-next-line no-cond-assign
    while ((result = regex.exec (url)) != null) {
      strList.push (result);
    }
    strList.forEach ((item) => {
      // eslint-disable-next-line no-param-reassign
      url = url.replace (item?.[0], options.data[item?.[1]]);
      // eslint-disable-next-line no-param-reassign
      options.data =omit(options.data,[item?.[1]])
    });

    return { url, options };
  },
  // 添加验证信息
  (url: string, options: RequestOptionsInit) => {
    const optionsParams: any = { ...options };
    if (localStorage.getItem ('Authorization')) {
      optionsParams.headers.Authorization = localStorage.getItem ('Authorization') ?? '';
    }
    return { url, optionsParams };
  },


];

// 响应拦截器
const responseInterceptors: ResponseInterceptor[] = [
  async (response: Response) => {
    const json :defs.ResponseModel= await response?.json ();
    if (json && json.code === "20001" ) {
      history.push ('/user/login/LoginAccountAndPassword');
    }
    return json.result;
  },
];

export const request: RequestConfig = {
  errorHandler,
  prefix: defaultSettings.baseUrl,
  requestInterceptors,
  responseInterceptors,
};
