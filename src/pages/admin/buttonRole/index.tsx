import { Button, Divider } from "antd";
import React, { useRef, useState } from "react";
import { PageContainer } from "@ant-design/pro-layout";
import ProTable, { ActionType, ProColumns } from "@ant-design/pro-table";
import { pageTransition } from "@/utils/utils";
import { getMenu } from "@/api/mods/menu/geMenListPage";
import { useBoolean } from "ahooks";
import ButtonSubmit from "@/components/ButtonSubmit";
import { deleteMenuById } from "@/api/mods/menu/deleteById";
import AddOrUpDateButtonRole from "./components/AddOrUpDateButtonRole";
import { postMenuBuild } from "@/api/mods/menu/build";

interface TableListItem {}

const UserList: React.FC<{}> = () => {
	const actionRef = useRef<ActionType>();
	const [menuItem, setMenuItem] = useState<MenuEntity>();
	const [addOrUpdateMenuType, setAddOrUpdateMenuType] = useState<"add" | "edit">("add");
	const [addMenuShow, { setTrue: addMenuShowSetTrue, setFalse: addMenuShowSetFalse }] = useBoolean();

	const columns: ProColumns<MenuEntity>[] = [
		{
			title: "按钮管理",
			dataIndex: "name",
			search: false,
		},
		{
			title: "权限名",
			dataIndex: "code",
			search: false,
		},

		{
			title: "操作",
			dataIndex: "option",
			valueType: "option",
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			render: (_, record) => (
				<>
					<ButtonSubmit
						okCallback={() => {
							actionRef.current?.reload();
						}}
						loadingContent={"删除中"}
						successContent={"删除完成"}
						reqFun={deleteMenuById}
						data={{ id: record.menuId }}>
						删除
					</ButtonSubmit>
					<Divider type="vertical" />
					<Button
						type="link"
						onClick={async () => {
							setAddOrUpdateMenuType("edit");
							setMenuItem(record);
							addMenuShowSetTrue();
						}}>
						编辑
					</Button>
				</>
			),
		},
	];

	return (
		<PageContainer>
			<AddOrUpDateButtonRole
				menuItem={menuItem}
				show={addMenuShow}
				onCancel={() => {
					addMenuShowSetFalse();
				}}
				type={addOrUpdateMenuType}
				onOk={() => {
					addMenuShowSetFalse();
					actionRef.current?.reload();
				}}
			/>
			<ProTable<TableListItem>
				search={false}
				actionRef={actionRef}
				rowKey="menuId"
				toolBarRender={() => [
					<ButtonSubmit
						isModal={true}
						reqFun={postMenuBuild}
						data={{}}
						okCallback={() => {
							actionRef.current?.reload();
						}}
						buttonProps={{ type: "default" }}>
						根据服务端生成权限
					</ButtonSubmit>,
					<Button
						type={"primary"}
						key={"1"}
						onClick={() => {
							setAddOrUpdateMenuType("add");
							addMenuShowSetTrue();
						}}>
						添加
					</Button>,
				]}
				request={(params) => {
					return pageTransition<TableListItem>(
						(obj) =>
							getMenu({
								...obj,
								menuType: 2,
							}),
						params,
					);
				}}
				columns={columns}
			/>
		</PageContainer>
	);
};

export default UserList;
