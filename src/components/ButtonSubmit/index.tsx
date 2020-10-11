import {Button, message, Popconfirm} from "antd";
import React, {useRef} from "react";
import {BaseButtonProps} from "antd/es/button/button";
import {useRequest} from "ahooks";
import {PopconfirmProps} from "antd/lib/popconfirm";

interface ButtonSubmitProps {
    buttonProps?: BaseButtonProps,
    popconfirmProps?: PopconfirmProps,
    reqFun: (data: any) => void,
    data: any,
    successContent?: string,
    loadingContent?: string
    okCallback?: (params:any) => void;
    errCallback?: (params:any) => void;
}


const ButtonSubmit: React.FC<ButtonSubmitProps> = (props) => {
    const hide = useRef<any> ();

    const {buttonProps, reqFun, popconfirmProps, successContent, data, loadingContent, okCallback, errCallback} = props
    const {run,} = useRequest<any> (reqFun, {
        manual: true,
        onSuccess: (data) => {
            hide.current ()
            message.success (successContent || "操作成功");
            okCallback && okCallback (data)
        },
        onError: (data) => {
            hide.current ()
            errCallback && errCallback (data)
        },


    });
    const onConfirm = () => {
        hide.current = message.loading (loadingContent || '操作中... ', 0);
        run (data)
    }
    return (
        <Popconfirm
            title="你确定该操作吗"
            onConfirm={ onConfirm }
            okText="确定"
            cancelText="取消"
            { ...popconfirmProps }
        >
            <Button
                type='link'
                onClick={ async () => {

                } }
                { ...buttonProps }
            >{ props.children }</Button>
        </Popconfirm>

    );
};

export default ButtonSubmit;
