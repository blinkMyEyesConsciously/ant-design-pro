import { Button, message, Modal, Popconfirm } from "antd";
import React, { useRef, InputHTMLAttributes } from "react";
import { BaseButtonProps } from "antd/es/button/button";
import { useRequest } from "ahooks";
import { PopconfirmProps } from "antd/lib/popconfirm";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { ModalFuncProps } from "antd/lib/modal/Modal";

interface ButtonSubmitProps {
	buttonProps?: BaseButtonProps & InputHTMLAttributes<any>;
	popconfirmProps?: PopconfirmProps & InputHTMLAttributes<any>;
	confirmProps?: ModalFuncProps;
	reqFun: (data: any) => any;
	data: any;
	successContent?: string;
	loadingContent?: string;
	okCallback?: (params: any) => void;
	errCallback?: (params: any) => void;
	dataFun?: () => any;
	isModal?: boolean;
	disabled?: boolean;
}

const { confirm } = Modal;
/**
 * dataFun 则data属性失效. 请求的参数值由dataFun返回值作为参数
 * @param {React.PropsWithChildren<ButtonSubmitProps>} props
 * @returns {JSX.Element}
 * @constructor
 */
const ButtonSubmit: React.FC<ButtonSubmitProps> = (props) => {
	const hide = useRef<any>();

	const {
		buttonProps,
		reqFun,
		popconfirmProps,
		successContent,
		data,
		loadingContent,
		okCallback,
		errCallback,
		dataFun,
		confirmProps,
		isModal,
		disabled,
	} = props;
	const { run } = useRequest<any>(reqFun, {
		manual: true,
		onSuccess: (data) => {
			if (!isModal) {
				hide.current();
			}
			hide.current();
			message.success(successContent || "操作成功");
			okCallback && okCallback(data);
		},
		onError: (data) => {
			if (!isModal) {
				hide.current();
			}
			errCallback && errCallback(data);
		},
	});
	const onConfirm = () => {
		hide.current = message.loading(loadingContent || "操作中... ", 0);
		run(!!dataFun ? dataFun() : data);
	};
	return (
		<>
			{!!props.isModal ? (
				<Button
					onClick={async () => {
						confirm({
							title: "你确定该操作吗",
							icon: <ExclamationCircleOutlined />,
							onOk() {
								return new Promise(async (resolve, reject) => {
									reqFun(!!dataFun ? dataFun() : data)
										.then(() => {
											resolve();
											message.success(successContent || "操作成功");
											okCallback && okCallback(data);
										})
										.catch(() => {
											errCallback && errCallback(data);
										});
								});
							},
							onCancel() {
								console.log("Cancel");
							},
							...confirmProps,
						});
					}}
					{...buttonProps}
					disabled={disabled}>
					{props.children}
				</Button>
			) : (
				<Popconfirm title="你确定该操作吗?" onConfirm={onConfirm} okText="确定" disabled={disabled} cancelText="取消" {...popconfirmProps}>
					<Button type="link" onClick={async () => {}} {...buttonProps} disabled={disabled}>
						{props.children}
					</Button>
				</Popconfirm>
			)}
		</>
	);
};

export default ButtonSubmit;
