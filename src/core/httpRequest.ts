import {history} from "@@/core/history";
import {message} from "antd";
import {RequestOptionsInit} from "umi-request";
import omit from "omit.js";

/**
 * 请求异常处理
 * @param {{response: Response, code: string, message: string}} error
 */
export const errorHandler = (error: { response: Response, code: string, message: string }) => {
    const {code, message: msg} = error;
    // 如果是token过期、跳转到登录也
    if (code === '20001') {
        history.push ('/user/login/LoginAccountAndPassword');
    } else if (code === '20002') {
        message.warn (msg)
    }
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw error;
};


/**
 * 路径参数编辑;如果有路径参数则将参数改为路径参数
 * @param {string} url
 * @param {RequestOptionsInit} options
 * @returns {{options: RequestOptionsInit, url: string}}
 */
export const pathParamsEdit = (url: string, options: RequestOptionsInit) => {
    const regex = /\{(.+?)\}/g;
    const strList: any[] = [];
    let result;
    // eslint-disable-next-line no-cond-assign
    while ((result = regex.exec (url)) != null) {
        strList.push (result);
    }
    console.log(strList,'strList')
    // 如果是路径参数  则在在请求对象中去除路径参数
    strList.forEach ((item) => {
        // eslint-disable-next-line no-param-reassign
        url = url.replace (item?.[0], options.params?.[item?.[1]]);
        // eslint-disable-next-line no-param-reassign
        options.data = omit (options.data, [item?.[1]])
    });

    return {url, options};
}

/**
 * 请求数据添加token功能
 * @param {string} url
 * @param {RequestOptionsInit} options
 * @returns {{optionsParams: any, url: string}}
 */
export const reqInterceptAddToken = (url: string, options: RequestOptionsInit) => {
    const optionsParams: any = {...options};
    // 判断本地储存里面有没有token；没有token直接跳转登录页面
    if (localStorage.getItem ('Authorization')) {
        optionsParams.headers.Authorization = localStorage.getItem ('Authorization') ?? '';
    } else {
        // history.push ('/user/login/LoginAccountAndPassword');
    }
    return {url, optionsParams};
}

/**
 * 返回数据进行解析全局拦截判断
 * @param {Response} response
 * @returns {Promise<any>}
 */
export const resInterceptParseData = async (response: Response) => {
    // 状态码判断
    return new Promise<any> ((resolve, reject) => {
            response.json ().then ((json: defs.ResponseModel) => {
                if (json && json.code === "10000") {
                    resolve (json.result);
                } else {
                    reject (json)
                }
            });
        }
    )

}
