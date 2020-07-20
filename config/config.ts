// https://umijs.org/config/
import { defineConfig } from "umi";
import defaultSettings from "./defaultSettings";
import router from "./router";
// const { REACT_APP_ENV } = process.env;

export default defineConfig({
    //hash模式打包

    hash: true,
    title: "网络货运平台",
    // build时去掉打印和debug
    terserOptions:
        process.env.NODE_ENV === "development"
            ? {}
            : {
                compress: {
                    drop_console: true,
                    drop_debugger: true,
                },
            },
    devtool: process.env.NODE_ENV === "development" ? "cheap-module-source-map" : false,

    antd: {
        // 开启紧凑的
        compact: false,
    },
    dva: {
        hmr: true,
    },

    layout: {
        navTheme: "light",
        layout: "mix",
        name: "网络货运平台",
        locale: true,
        siderWidth: 208,
        fixSiderbar: true,
    },
    locale: {
        // default zh-CN
        default: "zh-CN",
        // default true, when it is true, will use `navigator.language` overwrite default
        antd: true,
        baseNavigator: true,
    },
    history: {
        type: "hash",
    },

    inlineLimit: 100000,
    // 设备大组件不编译
    externals: {
        react: "window.React",
        "react-dom": "window.ReactDOM",
    },
    // 引入被 external 库的 scripts
    // 区分 development 和 production，使用不同的产物
    scripts:
        process.env.NODE_ENV === "development"
            ? [
                "https://gw.alipayobjects.com/os/lib/react/16.13.1/umd/react.development.js",
                "https://gw.alipayobjects.com/os/lib/react-dom/16.13.1/umd/react-dom.development.js",
            ]
            : [
                "https://gw.alipayobjects.com/os/lib/react/16.13.1/umd/react.production.min.js",
                "https://gw.alipayobjects.com/os/lib/react-dom/16.13.1/umd/react-dom.production.min.js",
            ],
    dynamicImport: {
        loading: "@/components/PageLoading/index",
    },

    // targets: {
    // 	ie: 11,
    // },

    // umi routes: https://umijs.org/docs/routing
    routes: router,
    // Theme for antd: https://ant.design/docs/react/customize-theme-cn
    theme: {
        // ...darkTheme,
        "primary-color": defaultSettings.primaryColor,
    },
    ignoreMomentLocale: true,
    manifest: {
        basePath: "./",
    },
    publicPath: "./",
});
