import { parse } from "querystring";
import { history } from "umi";
import moment from "moment";
import { dataTimeUtilEnum } from "./dataTimeUtilEnum";

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const isAntDesignPro = (): boolean => {
	if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === "site") {
		return true;
	}
	return window.location.hostname === "preview.pro.ant.design";
};

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export const isAntDesignProOrDev = (): boolean => {
	const { NODE_ENV } = process.env;
	if (NODE_ENV === "development") {
		return true;
	}
	return isAntDesignPro();
};

export const getPageQuery = () => {
	const { href } = window.location;
	const qsIndex = href.indexOf("?");
	const sharpIndex = href.indexOf("#");

	if (qsIndex !== -1) {
		if (qsIndex > sharpIndex) {
			return parse(href.split("?")[1]);
		}

		return parse(href.slice(qsIndex + 1, sharpIndex));
	}

	return {};
};

/**
 * 此方法会跳转到 redirect 参数所在的位置
 */
export const replaceGoto = () => {
	const urlParams = new URL(window.location.href);
	const params = getPageQuery();
	let { redirect } = params as { redirect: string };
	if (redirect) {
		const redirectUrlParams = new URL(redirect);
		if (redirectUrlParams.origin === urlParams.origin) {
			redirect = redirect.substr(urlParams.origin.length);
			if (redirect.match(/^\/.*#/)) {
				redirect = redirect.substr(redirect.indexOf("#") + 1);
			}
		} else {
			window.location.href = "/";
			return;
		}
	}
	history.replace(redirect || "/");
};

/**
 * moment转字符串
 * @param obj
 * @param option 例如:{ksrq:'YYYY-MM-DD'}
 * @returns {T}
 */
export const momentToString = <T>(obj: any, option: any = {}): T => {
	// eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
	const _obj = {};
	Object.keys(obj).forEach((i: string) => {
		if (moment.isMoment(obj[i])) {
			if (option.hasOwnProperty(i)) {
				_obj[i] = obj[i].format(option[i]);
			} else {
				_obj[i] = obj[i].format(dataTimeUtilEnum.YYYYMMDD);
			}
		} else {
			_obj[i] = obj[i];
		}
	});

	// @ts-ignore
	return _obj;
};

/**
 * proTable所需要的格式
 */
interface ProTableRequestData<T> {
	data: T[];
	success: boolean;
	total: number;
}
// obj是protable分页的逻辑逻辑
export const pageTransition = async <T>(fun: (objs: any) => Promise<any>, obj: any) => {
	// eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
	const _obj = { ...obj };
	_obj.pageNum = _obj.current;
	delete _obj.current;
	delete _obj.sorter;
	const data: defs.Laypage = await fun(_obj);
	// eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
	const _data: ProTableRequestData<T> = { data: [], success: true, total: 0 };
	_data.total = data?.count ?? 0;
	_data.data = data?.data ?? [];
	_data.success = true;
	return _data;
};
