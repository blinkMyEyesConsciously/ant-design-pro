import React, { useEffect } from "react";
import { Form, Input, message, Modal } from "antd";
import { ModalFuncProps } from "antd/lib/modal";
import { useRequest } from "ahooks";
import { requiredRules } from "@/utils";
import { DataNode } from "rc-tree-select/lib/interface";
import { postMenu } from "@/api/mods/menu/saveOrUpdateMenu";

export interface FormProps extends ModalFuncProps {
	show: boolean;
	onCancel: () => void;
	onOk: () => void;
	type: "add" | "edit";
	menuItem?: MenuEntity;
}

const formLayout = {
	labelCol: { span: 5 },
	wrapperCol: { span: 18 },
};
const menuTreeListDispose = (menuList: any[]): DataNode[] => {
	return menuList.map(({ name, menuId, childMenu }) => ({
		title: name,
		value: menuId,
		children: menuTreeListDispose(childMenu),
	}));
};

const AddOrUpDateButtonRole: React.FC<FormProps> = (props) => {
	const [form] = Form.useForm();

	const { loading, run } = useRequest<any>(postMenu, {
		manual: true,
		onSuccess: (data) => {
			message.success(data);
			props.onOk && props.onOk();
		},
		onError: (data) => {
			message.error(data.message);
		},
	});

	useEffect(() => {
		if (props.type === "edit") {
			form.setFieldsValue(props.menuItem);
			console.log("执行了吸入", props.menuItem);
			form.setFieldsValue(props.menuItem);
		}
	}, [props.show]);

	const onOk = async () => {
		let data: MenuEntity = await form.validateFields();
		/**
		 *
		 * 如果没有选择父级ID,则给他后台配置好的初始值0
		 * menuType 2 是按钮的权限  也是后台路由的权限
		 */
		data.menuType = 2;
		await run(props.type === "add" ? { ...data, parentId: 0 } : { ...data, menuId: props.menuItem?.menuId });
	};
	const onCancel = () => {
		props.onCancel && props.onCancel();
	};

	return (
		<Modal
			destroyOnClose
			title={props.type === "add" ? "添加按钮" : "编辑按钮"}
			visible={props.show}
			{...props}
			onOk={onOk}
			onCancel={onCancel}
			confirmLoading={loading}>
			<Form preserve={false} {...formLayout} form={form}>
				<Form.Item label="按钮名称" name="name" rules={requiredRules}>
					<Input />
				</Form.Item>
				<Form.Item label="code" name="code" rules={requiredRules}>
					<Input />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default AddOrUpDateButtonRole;
