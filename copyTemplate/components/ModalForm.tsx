import React from "react";
import { Form, Modal, Input, message } from "antd";
import { ModalFuncProps } from "antd/lib/modal";
import { useRequest } from "ahooks";
import { adviseAdd } from "@/api/mods/advise/add";
import { ResData } from "@/typings";

export interface FormProps extends ModalFuncProps {}

const formLayout = {
	labelCol: { span: 5 },
	wrapperCol: { span: 20 },
};

const AddFormModal: React.FC<FormProps> = (props) => {
	const [form] = Form.useForm();
	const { loading, run } = useRequest<ResData>(adviseAdd, {
		manual: true,
		onSuccess: (data) => {
			if (data.status === 0) {
				form.resetFields();
				props.onOk && props.onOk();
			} else {
				message.error(data.message);
			}
		},
	});
	let onOk = async () => {
		let data = await form.validateFields();
		run(data);
	};
	let onCancel = () => {
		form.resetFields();

		props.onCancel && props.onCancel();
	};
	return (
		<Modal  destroyOnClose title={"操作"} {...props} onOk={onOk} onCancel={onCancel} confirmLoading={loading}>
			<Form preserve={false} {...formLayout} form={form}>
				<Form.Item label="咨询的内容" name="content" rules={[{ required: true, message: "必须填写" }]}>
					<Input.TextArea />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default AddFormModal;
