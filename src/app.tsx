import {RequestConfig} from 'umi';
import {RequestInterceptor, ResponseInterceptor} from 'umi-request';
import defaultSettings from '../config/defaultSettings';
import {errorHandler, pathParamsEdit, reqInterceptAddToken, resInterceptParseData} from './core/httpRequest';
import {antProLayout, getInitialData} from './core/layout';

/**
 * 获取初始化的数据;每次刷新页面根据页面曲线选择性请求数据
 * @type {() => Promise<{currentUser?: any, settings?: ProSettings}>}
 */
export const getInitialState = getInitialData

/**
 * antPor的layout设置
 * @type {({initialState}: {initialState: {settings?: ProSettings}}) => BasicLayoutProps}
 */
export const layout = antProLayout;

/**
 * 请求拦截器
 * @type {(((url: string, options: RequestOptionsInit) => {options: RequestOptionsInit, url: string}) | ((url: string, options: RequestOptionsInit) => {optionsParams: any, url: string}))[]}
 */
const requestInterceptors: RequestInterceptor[] = [
    pathParamsEdit,
    reqInterceptAddToken,
];
/**
 * 响应拦截器
 * @type {((response: Response) => Promise<any>)[]}
 */
const responseInterceptors: ResponseInterceptor[] = [
    resInterceptParseData
];

/**
 * 请求配置
 * @type {{responseInterceptors: ResponseInterceptor[], prefix: string, errorHandler: (error: {response: Response, code: string, message: string}) => void, requestInterceptors: RequestInterceptor[]}}
 */
export const request: RequestConfig = {
    // @ts-ignore
    errorHandler,
    prefix: defaultSettings.baseUrl,
    requestInterceptors,
    responseInterceptors,
};
