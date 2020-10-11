import { PlusOutlined } from "@ant-design/icons";
import { Button, Divider } from "antd";
import React, { useRef } from "react";
import { PageContainer } from "@ant-design/pro-layout";
import ProTable, { ActionType, ProColumns } from "@ant-design/pro-table";
import { orderSourceGetListForSource } from "@/api/mods/orderSource/orderList";
import { pageTransition } from "@/utils/utils";
import { getUserPageList } from '@/api/mods/user/findList';
// import { TableListItem } from "./data.d";
interface TableListItem {}

const TableList: React.FC<{}> = () => {
	const actionRef = useRef<ActionType>();

	const columns: ProColumns<TableListItem>[] = [
		{
			title: "订单编号",
			dataIndex: "orderNum",
			search: true,
		},

		{
			title: "货物名称",
			dataIndex: "goodsName",
			hideInForm: true,
			search: true,
		},
		{
			title: "货物重量(吨)",
			dataIndex: "goodPrice",
			hideInForm: true,
			search: true,
			renderText: (val: string) => `${val || "--"} 吨`,
		},
		{
			title: "运输单价(元/吨)",
			dataIndex: "plannedTraffic",
			hideInForm: true,
			search: true,
		},
		{
			title: "订单状态",
			dataIndex: "orderState",
			filters: undefined,
			hideInForm: true,

			valueEnum: {
				"1": "未调度",
				"2": "运输中",
				"3": "已完成",
				"4": "订单撤回",
			},
		},
		{
			title: "发布时间",
			dataIndex: "createDatetime",
			valueType: "dateRange",
			hideInForm: true,
		},
		{
			title: "订单号/货物名称",
			dataIndex: "orderNumAndGoodsName",
			hideInTable: true,
			hideInForm: true,
		},

		{
			title: "操作",
			dataIndex: "option",
			valueType: "option",
			render: (_, record) => (
				<>
					<a onClick={() => {}}>编辑</a>
					<Divider type="vertical" />
					<a onClick={() => {}}>详情</a>
				</>
			),
		},
	];

	return (
		<PageContainer>
			<ProTable<TableListItem>
				beforeSearchSubmit={(params: any) => {
					params.beginDateTime = params?.createDatetime?.[0];
					params.endDateTime = params?.createDatetime?.[1];
					delete params.createDatetime;
					return params;
				}}
				actionRef={actionRef}
				rowKey="id"
				toolBarRender={(action, { selectedRows }) => [
					<Button type="primary" onClick={() => {}}>
						<PlusOutlined /> 新建
					</Button>,
				]}
				request={(params) => {
					return pageTransition<TableListItem>(getUserPageList, params);
				}}
				columns={columns}
			/>
		</PageContainer>
	);
};

export default TableList;
