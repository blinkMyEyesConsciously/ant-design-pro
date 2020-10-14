import { Divider, DatePicker } from "antd";
import React, { useRef } from "react";
import { PageContainer } from "@ant-design/pro-layout";
import ProTable, { ActionType, ProColumns } from "@ant-design/pro-table";
import { pageTransition } from "@/utils/utils";
import { getUserAdminInfoList } from "@/api/mods/user/findInfoList";
import Select from "antd/es/select";
import { useRequest } from "ahooks";
import { getRoleAll } from "@/api/mods/role/getAllRole";
import ButtonSubmit from "@/components/ButtonSubmit";
import { postUserUpdateStatus } from "@/api/mods/user/updateStatus";

// import { TableListItem } from "./data.d";
interface TableListItem {}

const { Option } = Select;

const UserList: React.FC<{}> = () => {
	const actionRef = useRef<ActionType>();
	const RoleRequest = useRequest<any[]>(getRoleAll);
	// @ts-ignore
	const columns: ProColumns<defs.User>[] = [
		{
			title: "信息",
			dataIndex: "info",
			search: true,
			hideInTable: true,
		},
		{
			title: "手机号",
			dataIndex: "mobile",
			search: false,
		},

		{
			title: "用户名称",
			dataIndex: "username",
			search: false,
		},
		{
			title: "邮箱",
			dataIndex: "email",
			search: false,
		},
		{
			title: "创建时间",
			dataIndex: "createTime",
			valueType: "dateTimeRange",
			render: (_, record) => {
				return <div>{record.createTime}</div>;
			},
			search: {
				transform: (value: any) => ({ startTime: value[0], endTime: value[1] }),
			},
		},

		{
			title: "用户状态",
			dataIndex: "status",
			filters: undefined,
			valueEnum: {
				"1": { text: "正常", status: "Success" },
				"2": { text: "禁用", status: "Warning" },
				"3": { text: "删除", status: "Error" },
			},
		},
		{
			title: "权限名称",
			dataIndex: "roleName",
			search: {
				transform: (value: any) => ({ roleId: value }),
			},
			renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
				return (
					<Select placeholder="请选择" {...rest} allowClear>
						{RoleRequest.data &&
							RoleRequest.data.map((item) => (
								<Option key={item.roleCode} value={item.roleCode}>
									{item.roleName}
								</Option>
							))}
					</Select>
				);
			},
		},

		{
			title: "操作",
			dataIndex: "option",
			valueType: "option",
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			render: (_, record) => (
				<span className={"testspan"}>
					<ButtonSubmit
						disabled={record.status === 1}
						okCallback={() => {
							actionRef.current?.reload();
						}}
						data={{
							status: 1,
							userNo: record.userNo,
						}}
						reqFun={postUserUpdateStatus}>
						启用
					</ButtonSubmit>
					<Divider type="vertical" />
					<ButtonSubmit
						disabled={record.status === 2}
						okCallback={() => {
							actionRef.current?.reload();
						}}
						data={{
							status: 2,
							userNo: record.userNo,
						}}
						reqFun={postUserUpdateStatus}>
						禁用
					</ButtonSubmit>

					<Divider type="vertical" />

					<ButtonSubmit
						disabled={record.status === 3}
						okCallback={() => {
							actionRef.current?.reload();
						}}
						data={{
							status: 3,
							userNo: record.userNo,
						}}
						reqFun={postUserUpdateStatus}>
						删除
					</ButtonSubmit>
				</span>
			),
		},
	];

	return (
		<PageContainer>
			<DatePicker />

			<ProTable<TableListItem>
				actionRef={actionRef}
				rowKey="userNo"
				request={(params) => {
					return pageTransition<TableListItem>(getUserAdminInfoList, params);
				}}
				columns={columns}
			/>
		</PageContainer>
	);
};

export default UserList;
