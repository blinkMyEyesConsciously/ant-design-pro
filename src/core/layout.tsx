import {BasicLayoutProps, MenuDataItem, Settings as LayoutSettings} from "@ant-design/pro-layout";
import {HeaderViewProps} from "@ant-design/pro-layout/lib/Header";
import RightContentRender from "@/components/RightContentRender";
import Footer from "@/components/Footer";
import React from 'react';
import {history} from "@@/core/history";
import {getUserCurrentUser} from "@/api/mods/user/getUser";
import defaultSettings from "../../config/defaultSettings";

export async function getInitialData (): Promise<{
    currentUser?: any;
    settings?: LayoutSettings;
}> {
    // 如果是登录页面，不执行获取用户信息
    if (history.location.pathname.indexOf ("/user/login")<0) {
        try {
            const currentUser = await getUserCurrentUser<ResultData> ({});
            return {
                currentUser:currentUser?.result,
                settings: defaultSettings,
            };
        } catch (error) {
            console.error ('未知的网络错误', error)
            return {
                settings: defaultSettings,
            }
        }
    }else {
     return    {settings: defaultSettings,}

    }
}


export const antProLayout = ({
                                 initialState,
                             }: {
    initialState: { settings?: LayoutSettings };
}): BasicLayoutProps => {
    return {
        /**
         * 兼用 content的 margin
         */
        disableContentMargin: false,
        /**
         * 自定义渲染右上角内容
         */
        rightContentRender: (headerViewProps: HeaderViewProps) => {
            console.log (headerViewProps)
            return <RightContentRender initialState={ initialState }/>;
        },
        /**
         * 生成页面底部标签
         * @returns {JSX.Element}
         */
        footerRender: () => <Footer/>,
        /**
         * 在左侧菜单的上面,log的下面添加一个区域
         */
        menuHeaderRender: undefined,
        /**
         * 去掉面包屑
         */
        itemRender: () => null,
        /**
         *通过服务器端生成路由
         * */
        menuDataRender: (menuData: MenuDataItem[]) => {
            return menuData;
        },
        ...initialState?.settings,
    };
};



