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
        compact: true,
    },

    layout: {

        navTheme: "light",
        name: "网络货运平台",
        locale: true,
        siderWidth: 208,
        fixSiderbar: true,
    },
    locale: {
        // default zh-CN
        default: "zh-CN",
        antd: true,
    },
    // 路由模式
    history: {
        type: "hash",
    },

    // 图片超过小于多少 生成base64
    inlineLimit: 10000,
    /**
     * 底下配置 打开后无法生成sourceMap
     */
    // 设备大组件单独编译
    // chunks: ["vendors", "umi"],
    // chainWebpack: function (config, { webpack }) {
    //     config.merge({
    //         optimization: {
    //             minimize: true,
    //             splitChunks: {
    //                 chunks: "all",
    //                 minSize: 30000,
    //                 minChunks: 3,
    //                 automaticNameDelimiter: ".",
    //                 cacheGroups: {
    //                     vendor: {
    //                         name: "vendors",
    //                         // @ts-ignore
    //                         test({ resource }) {
    //                             return /[\\/]node_modules[\\/]/.test(resource);
    //                         },
    //                         priority: 10,
    //                     },
    //                 },
    //             },
    //         },
    //     });
    // },
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
        layout: 'mix',

        // ...darkTheme,
        "primary-color": defaultSettings.primaryColor,
    },
    ignoreMomentLocale: true,
    manifest: {
        basePath: "./",
    },
    publicPath: "./",
});
