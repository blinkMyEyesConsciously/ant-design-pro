import {  Dropdown, Menu, Space, Tooltip } from "antd";
import React from "react";
import { history } from "umi";
import { FileTextOutlined, InsuranceOutlined, LoginOutlined, PayCircleFilled, PayCircleOutlined } from "@ant-design/icons";
import style from "./index.less";

const Basics: React.FC<{ initialState: InitialState }> = () => {

	const menu = (
		<Menu className={style.menuItemEdit} >

			<Menu.Item key="资金余额">
				<PayCircleOutlined />
				<span>资金余额</span>
				<span
					style={{
						float: "right",
					}}>
					￥100860.0 元
				</span>
			</Menu.Item>
			<Menu.Item key="资金明细">
				<FileTextOutlined />
				<span>资金明细</span>
			</Menu.Item>
			<Menu.Item key="安全设置">
				<InsuranceOutlined />
				<span>安全设置</span>
			</Menu.Item>
			<Menu.Item key="退出登录">
				<LoginOutlined />
				<span>退出登录</span>
			</Menu.Item>

		</Menu>
	);
	return (
		<Space size="large">
			<a
				onClick={() => {
					history.push("/wallet");
				}}>
				<Tooltip title="我的钱包">
					<div>
						<PayCircleFilled
							style={{
								color: "#faad14",
							}}
						/>
						<span
							style={{
								color: "#eaeae9",
								marginLeft: "6px",
							}}>
							我的钱包
						</span>
					</div>
				</Tooltip>
			</a>
			<Dropdown overlay={menu}>
				<a>

					<span
						style={{
							paddingLeft: "6px",
							color: "#eceae6",
						}}>
					    我的name
					</span>
				</a>
			</Dropdown>
		</Space>
	);
};

export default Basics;
