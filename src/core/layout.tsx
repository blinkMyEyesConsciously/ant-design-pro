import {BasicLayoutProps, MenuDataItem, Settings as LayoutSettings} from "@ant-design/pro-layout";
import {HeaderViewProps} from "@ant-design/pro-layout/lib/Header";
import RightContentRender from "@/components/RightContentRender";
import Footer from "@/components/Footer";
import React from 'react';
import {history} from "@@/core/history";
import {getUserCurrentUser} from "@/api/mods/user/getUser";
import defaultSettings from "../../config/defaultSettings";
import { FormOutlined } from "@ant-design/icons";


export interface InitialState {
    currentUser?: any;
    settings?: LayoutSettings;
    routers?: any;
}

const loopMenuItem = (menus: MenuDataItem[]): MenuDataItem[] => {
    return menus?.map(({ icon, name,childMenu,url, ...item }) => ({
        ...item,
        name: name,
        path:url,
        icon: <FormOutlined />,
        children: childMenu && loopMenuItem(childMenu),
    }));
};


export async function getInitialData (): Promise<InitialState> {
    // 如果是登录页面，不执行获取用户信息
    if (history.location.pathname.indexOf ("/registerAndLogin/login")<0) {
        try {
            const currentUser = await getUserCurrentUser<any> ({});
            console.log(currentUser,'currrentUser')
            console.log(loopMenuItem(currentUser?.menuList),'loopMenuItem(currentUser?.menuList)')
            return {
                currentUser:currentUser,
                routers:loopMenuItem(currentUser.menuList),
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
    initialState:InitialState;
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
            return initialState.routers;
        },
        ...initialState?.settings,
    };
};



