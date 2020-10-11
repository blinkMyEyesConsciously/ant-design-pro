import React from "react";
import { BasicLayoutProps, Settings as LayoutSettings } from "@ant-design/pro-layout";
import { RequestInterceptor, RequestOptionsInit, ResponseInterceptor } from "umi-request";
import { notification } from "antd";

import { history, RequestConfig } from "umi";
import Footer from "@/components/Footer";
import RightContentRender from "@/components/RightContentRender";
import { MenuDataItem } from "@ant-design/pro-layout/lib/typings";
import { queryCurrent } from "./services/registerAndLogin";

import defaultSettings from "../config/defaultSettings";
import { API } from "@/services/API";
import { HeaderViewProps } from "@ant-design/pro-layout/lib/Header";

export interface InitialState {
	currentUser?: API.CurrentUser;
	settings?: LayoutSettings;
	routers?: any;
}

export async function getInitialState(): Promise<InitialState> {
	// 如果是登录页面，不执行
	if (history.location.pathname !== "/registerAndLogin/login") {
		try {
			const currentUser = await queryCurrent();
			const routers = { a: 1 };
			return {
				routers,
				currentUser: currentUser.data,
				settings: defaultSettings,
			};
		} catch (error) {
			history.replace("/registerAndLogin/login");
		}
	}

	return {
		settings: defaultSettings,
	};
}

export const layout = ({ initialState }: { initialState: InitialState }): BasicLayoutProps => {
	return {
		disableContentMargin: false,
		footerRender: () => <Footer />,
		menuDataRender: (menuData: MenuDataItem[]) => {
			const menuDataList = menuData.map((item: MenuDataItem) => {
				const i: MenuDataItem = { ...item };
				return i;
			});
			return menuDataList;
		},
		itemRender: (route, params, routes, paths) => {
			console.log(paths);
			// const first = routes.indexOf(route) === 0;
			return null;
		},
		menuHeaderRender: undefined,
		...initialState?.settings,
		rightContentRender: (headerViewProps: HeaderViewProps) => {
			return <RightContentRender initialState={initialState} />;
		},
	};
};
/*
export function rootContainer(container: any) {
	moment.locale("zh-cn");
	const root = () => {
		moment.locale("zh-cn");

		return <ConfigProvider locale={zhCN}>{container}</ConfigProvider>;
	};
	return React.createElement(root);
}
*/
const codeMessage = {
	200: "服务器成功返回请求的数据。",
	201: "新建或修改数据成功。",
	202: "一个请求已经进入后台排队（异步任务）。",
	204: "删除数据成功。",
	400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
	401: "用户没有权限（令牌、用户名、密码错误）。",
	403: "用户得到授权，但是访问是被禁止的。",
	404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
	405: "请求方法不被允许。",
	406: "请求的格式不可得。",
	410: "请求的资源被永久删除，且不会再得到的。",
	422: "当创建一个对象时，发生一个验证错误。",
	500: "服务器发生错误，请检查服务器。",
	502: "网关错误。",

	503: "服务不可用，服务器暂时过载或维护。",
	504: "网关超时。",
};

/**
 * 异常处理程序
 */
const errorHandler = (error: { response: Response }) => {
	const { response } = error;
	if (response && response.status) {
		const errorText = codeMessage[response.status] || response.statusText;
		const { status, url } = response;

		notification.error({
			message: `请求错误 ${status}: ${url}`,
			description: errorText,
		});
	}

	if (!response) {
		notification.error({
			description: "您的网络发生异常，无法连接服务器",
			message: "网络异常",
		});
	}
	throw error;
};

const requestInterceptors: RequestInterceptor[] = [
	(url: string, options: RequestOptionsInit) => {
		const optionsParams: any = { ...options };
		if (localStorage.getItem("token")) {
			optionsParams.headers.token = localStorage.getItem("token") ?? "";
		}
		return { url, optionsParams };
	},
];
const responseInterceptors: ResponseInterceptor[] = [
	async (response: Response) => {
		const json = await response?.json();
		if (json && (json.status === 904 || json.status === 903 || json.status === 901)) {
			history.replace("/registerAndLogin/login");
			setTimeout(() => {
				notification.warn({
					description: "您的登录已过期,请重新登录",
					message: "登录信息过期",
				});
			}, 1000);
		}
		return json;
	},
];

export const request: RequestConfig = {
	errorHandler,
	prefix: defaultSettings.baseUrl,
	requestInterceptors,
	responseInterceptors,
};
