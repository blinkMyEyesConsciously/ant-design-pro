import React, { useEffect, useState } from "react";
import { Checkbox, Col, Modal, Row, Divider, message } from "antd";
import { ModalFuncProps } from "antd/lib/modal";
import { useRequest } from "ahooks";
import { getRoleByMenuTypeByRoleCode } from "@/api/mods/role/getByIdByMenuType";
import { getMenu } from "@/api/mods/menu/geMenListPage";
import { postRoleToPermissionUpdateMenuByRoleCode } from "@/api/mods/roleToMenu/updateMenuByRoleCode";

export interface ButtonRoleEditProps extends ModalFuncProps {
	roleId: string;
}

const ButtonRoleEdit: React.FC<ButtonRoleEditProps> = (props) => {
	const [checkboxGroupState, setCheckboxGroupState] = useState<any>({
		checkedList: [],
		indeterminate: false,
		checkAll: false,
	});
	const getMenuReqest = useRequest<any>(() => getMenu({ pageNum: 1, pageSize: 999, menuType: 2 }), {
		manual: true,
		onSuccess: (data) => {
			getRoleByMenuTypeByRoleCodeReq.run();
		},
	});
	const { loading, run } = useRequest<string>(postRoleToPermissionUpdateMenuByRoleCode, {
		manual: true,
		onSuccess: (data) => {
			message.success(data);
			props.onOk && props.onOk();
		},
	});

	const getRoleByMenuTypeByRoleCodeReq = useRequest<any>(
		() =>
			getRoleByMenuTypeByRoleCode({
				roleCode: props.roleId,
				menuType: "2",
			}),
		{
			onSuccess: (data) => {
				if (data.length === 0) {
					setCheckboxGroupState({ ...checkboxGroupState, checkedList: data, indeterminate: false, checkAll: false });
				} else if (data.length === getMenuReqest.data.data.length) {
					setCheckboxGroupState({ ...checkboxGroupState, checkedList: data, indeterminate: false, checkAll: true });
				} else if (data.length < getMenuReqest.data.data.length) {
					setCheckboxGroupState({ ...checkboxGroupState, checkedList: data, indeterminate: true, checkAll: false });
				}

				// setSelectedKeys ({checked: data})
			},
			manual: true,
		},
	);

	const onCheckAllChange = (e: any) => {
		setCheckboxGroupState({
			checkedList: e.target.checked ? getMenuReqest.data.data.map((item: any) => item.menuCode) : [],
			indeterminate: false,
			checkAll: e.target.checked,
		});
	};
	const onChange = (checkedList: any) => {
		setCheckboxGroupState({
			checkedList,
			indeterminate: !!checkedList.length && checkedList.length < getMenuReqest.data.data.length,
			checkAll: checkedList.length === getMenuReqest.data.data.length,
		});
	};

	useEffect(() => {
		props.visible && getMenuReqest.run();
	}, [props.visible]);

	const onOk = async () => {
		run({ roleCode: props.roleId, ids: checkboxGroupState.checkedList.join(","), menuType: "1" });
	};
	const onCancel = () => {
		props.onCancel && props.onCancel();
	};
	return (
		<Modal destroyOnClose title={"操作"} {...props} onOk={onOk} onCancel={onCancel} confirmLoading={loading}>
			{getMenuReqest.data && (
				<>
					<Checkbox indeterminate={checkboxGroupState.indeterminate} onChange={onCheckAllChange} checked={checkboxGroupState.checkAll}>
						选择全部
					</Checkbox>
					<Divider />
					<Checkbox.Group onChange={onChange} value={checkboxGroupState.checkedList}>
						<Row>
							{getMenuReqest.data.data.map((item: any) => (
								<Col
									key={item.menuCode}
									span={12}
									style={{
										marginBottom: "10px",
									}}>
									<Checkbox value={item.menuCode}>{`${item.name}(${item.code})`}</Checkbox>
								</Col>
							))}
						</Row>
					</Checkbox.Group>
				</>
			)}
		</Modal>
	);
};

export default ButtonRoleEdit;
