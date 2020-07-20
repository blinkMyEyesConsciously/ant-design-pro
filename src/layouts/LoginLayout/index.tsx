import React from "react";
import {history, useLocation} from "umi";
import styles from "@/layouts/UserLayout/style.less";
import { Tabs } from "antd";
const { TabPane } = Tabs;
const Basics: React.FC<{}> = (props) => {
    const location = useLocation()
const LoginAccountAndPassword=  '/user/login/LoginAccountAndPassword'
const LoginPhoneAndVerification=  '/user/login/LoginPhoneAndVerification'
    return <>
        <Tabs
            onChange={(key)=>{
                history.push(key);
            }}
            centered
            className={styles.tabs}
            defaultActiveKey={location.pathname} >
            <TabPane tab="账户密码登录" key={LoginAccountAndPassword}>
            </TabPane>
            <TabPane tab="手机号登录" key={LoginPhoneAndVerification}>
            </TabPane>
        </Tabs>
        {props.children}
    </>
};

export default Basics;
