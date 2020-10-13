import { Button, Divider } from "antd";
import React, { useRef, useState } from "react";
import { PageContainer } from "@ant-design/pro-layout";
import ProTable, { ActionType, ProColumns } from "@ant-design/pro-table";
import { pageTransition } from "@/utils/utils";
import { getRolePageList } from "@/api/mods/role/getPageList";
import WebMenuRoleEdit from "./components/WebMenuRoleEdit";
import ButtonRoleEdit from "@/pages/admin/roleList/components/ButtonRoleEdit";
import { useBoolean } from "ahooks";

// import { TableListItem } from "./data.d";
interface TableListItem {}

const UserList: React.FC<{}> = () => {
	const actionRef = useRef<ActionType>();
	const [roleId, setRoleId] = useState<string>("");
	const [webMenuRoleEditVisible, setWebMenuRoleEditVisible] = useState<boolean>(false);
	const buttonRoleEditVisible = useBoolean(false);
	const columns: ProColumns<defs.Role>[] = [
		{
			title: "权限名称",
			dataIndex: "roleName",
			hideInForm: true,
			search: true,
		},

		{
			title: "roleCode",
			dataIndex: "roleCode",
			hideInForm: true,
			search: true,
		},

		{
			title: "操作",
			dataIndex: "option",
			valueType: "option",
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			render: (_, record) => (
				<>
					<Button type="link" onClick={async () => {}}>
						删除
					</Button>
					<Divider type="vertical" />
					<Button type="link" onClick={() => {}}>
						删除
					</Button>
					<Divider type="vertical" />
					<Button
						type="link"
						onClick={() => {
							setRoleId(record.roleCode as string);
							setWebMenuRoleEditVisible(true);
						}}>
						修改前端菜单权限
					</Button>
					<Divider type="vertical" />
					<Button
						type="link"
						onClick={() => {
							setRoleId(record.roleCode as string);
							buttonRoleEditVisible[1].setTrue();
						}}>
						修改后端接口权限
					</Button>
				</>
			),
		},
	];

	return (
		<PageContainer>
			{roleId !== "" && (
				<WebMenuRoleEdit
					visible={webMenuRoleEditVisible}
					onOk={() => {
						setWebMenuRoleEditVisible(false);
						setRoleId("");
						actionRef.current?.reload();
					}}
					onCancel={() => {
						setWebMenuRoleEditVisible(false);
						setRoleId("");
					}}
					roleId={roleId}
				/>
			)}

			{roleId !== "" && (
				<ButtonRoleEdit
					visible={buttonRoleEditVisible[0]}
					onOk={() => {
						buttonRoleEditVisible[1].setFalse();
						setRoleId("");
						actionRef.current?.reload();
					}}
					onCancel={() => {
						buttonRoleEditVisible[1].setFalse();
						setRoleId("");
					}}
					roleId={roleId}
				/>
			)}

			<ProTable<TableListItem>
				actionRef={actionRef}
				rowKey="roleCode"
				request={(params) => {
					return pageTransition<TableListItem>(getRolePageList, params);
				}}
				columns={columns}
			/>
		</PageContainer>
	);
};

export default UserList;
