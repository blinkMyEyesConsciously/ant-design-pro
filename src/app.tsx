import React from 'react';
import { BasicLayoutProps, Settings as LayoutSettings } from '@ant-design/pro-layout';
import { message} from 'antd';
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
  if (history.location.pathname.indexOf("/user/login")<150) {
    try {
      const currentUser = await getUserCurrentUser<any>({}) ;
      return {
        currentUser,
        settings: defaultSettings,
      };
    } catch (error) {
      console.log('错误')
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
    // 后台请求路由
    // menuDataRender:()=>{return [] },
    ...initialState?.settings,
  };
};



/**
 * 异常处理程序
 */

const errorHandler = (error: { response: Response ,code:string,message:string}) => {
  console.log (error,'error');

  const { code,message:msg} = error;
  // 如果是token过期、跳转到登录也
  if (code==='20000') {
    history.push ('/user/login/LoginAccountAndPassword');
  }else if (code==='20002') {
    message.warn(msg)
    console.log("手动抛出的业务异常",error)
  };
  // eslint-disable-next-line @typescript-eslint/no-throw-literal
  throw error;
};
// 请求拦截器
const requestInterceptors: RequestInterceptor[] = [
  // 路径参数url的修改
  (url: string, options: RequestOptionsInit) => {
    const regex = /\{(.+?)\}/g;
    const strList: any[] = [];
    let result;
    // eslint-disable-next-line no-cond-assign
    while ((result = regex.exec (url)) != null) {
      strList.push (result);
    }

    // 如果是路径参数  则在在请求对象中去除路径参数
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
    // 判断本地储存里面有没有token；没有token直接跳转登录页面
    if (localStorage.getItem ('Authorization')) {
      optionsParams.headers.Authorization = localStorage.getItem ('Authorization') ?? '';
    }else {
      history.push ('/user/login/LoginAccountAndPassword');
    }
    return { url, optionsParams };
  },


];


// 响应拦截器
const responseInterceptors: ResponseInterceptor[] = [
  async (response: Response) => {

  return   new Promise<any>(
    // eslint-disable-next-line no-async-promise-executor
    async(resolve,reject)=>{
      const json :defs.ResponseModel= await response?.json ();

      if (json && json.code === "10000" ) {
        resolve(json.result);
      }else {
        reject(json)
      }
    }
  )
    // 如果token 过去直接跳转到首页

  },
];

export const request: RequestConfig = {
  // @ts-ignore
  errorHandler,
  prefix: defaultSettings.baseUrl,
  requestInterceptors,
  responseInterceptors,
};
