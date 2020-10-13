import React from "react";
import { Form, Modal, Input, message } from "antd";
import { ModalFuncProps } from "antd/lib/modal";
import { useRequest } from "ahooks";
import { postRole } from "@/api/mods/role/addRole";
import { requiredRules } from "@/utils";

export interface FormProps extends ModalFuncProps {}

const formLayout = {
	labelCol: { span: 5 },
	wrapperCol: { span: 20 },
};

const AddOrUpdateRole: React.FC<FormProps> = (props) => {
	const [form] = Form.useForm();
	const { loading, run } = useRequest<string>(postRole, {
		manual: true,
		onSuccess: (data) => {
			message.success("添加成功");
			props.onOk && props.onOk();
		},
	});
	let onOk = async () => {
		let data = await form.validateFields();
		run(data);
	};
	let onCancel = () => {
		props.onCancel && props.onCancel();
	};
	return (
		<Modal destroyOnClose title={"添加Role"} {...props} onOk={onOk} onCancel={onCancel} confirmLoading={loading}>
			<Form preserve={false} {...formLayout} form={form}>
				<Form.Item label="RoleName" name="roleName" rules={requiredRules}>
					<Input />
				</Form.Item>
			</Form>
		</Modal>
	);
};
export default AddOrUpdateRole;
