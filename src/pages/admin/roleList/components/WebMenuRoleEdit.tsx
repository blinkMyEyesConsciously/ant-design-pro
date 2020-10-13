import React, { useEffect, useState } from "react";
import { Modal, message, Tree } from "antd";
import { useRequest } from "ahooks";
import { ModalFuncProps } from "antd/lib/modal";
import { getMenuTreeMenuList } from "@/api/mods/menu/treeMenuList";
import { getRoleByMenuTypeByRoleCode } from "@/api/mods/role/getByIdByMenuType";
import { postRoleToPermissionUpdateMenuByRoleCode } from "@/api/mods/roleToMenu/updateMenuByRoleCode";

export interface WebMenuRoleEditProps extends ModalFuncProps {
	roleId: string;
}

const menuTreeListDispose = (menuList: any[]): any[] => {
	return menuList.map(({ name, menuCode, childMenu }) => ({
		title: name,
		key: menuCode,
		children: menuTreeListDispose(childMenu),
	}));
};

/**
 * 获取所有子节点
 * @param {any[]} children
 * @returns {string[]}
 */
const getChildrenKes = (children: any[]): string[] => {
	const keys: string[] = [];

	const fun = (child: any[]) => {
		child.forEach((item) => {
			keys.push(item.key);
			fun(item.children);
		});
	};
	fun(children);
	return keys;
};
/**
 * 获取所有父节点
 * @param {any[]} arr1
 * @param {string} id
 * @returns {any}
 */
// @ts-ignore
const familyTree = (arr1: any[], id: string) => {
	var temp: any = [];
	var forFn = function (arr: any) {
		for (var i = 0; i < arr.length; i++) {
			let item = arr[i];

			if (item.key === id) {
				console.log(item, "okkkk");
				break;
			} else {
				temp.push(item.key);
				if (item.children.length === 0) {
					temp = [];
				} else {
					forFn(item.children);
				}
			}
		}
	};
	forFn(arr1);
	return temp;
};

const WebMenuRoleEdit: React.FC<WebMenuRoleEditProps> = (props) => {
	const [selectedKeys, setSelectedKeys] = useState<any>([]);

	const { data: menuTreeList, run: getMenuTreeMenuListRun } = useRequest<any>(getMenuTreeMenuList, {
		manual: true,
		onSuccess: (data) => {
			getRoleByMenuTypeByRoleCodeReq.run();
		},
	});

	const getRoleByMenuTypeByRoleCodeReq = useRequest<any>(
		() =>
			getRoleByMenuTypeByRoleCode({
				roleCode: props.roleId,
				menuType: "1",
			}),
		{
			onSuccess: (data) => {
				setSelectedKeys({ checked: data });
			},
			manual: true,
		},
	);

	useEffect(() => {
		if (props.visible) {
			getMenuTreeMenuListRun();
		}
	}, [props.visible]);

	const { loading, run } = useRequest<string>(postRoleToPermissionUpdateMenuByRoleCode, {
		manual: true,
		onSuccess: (data) => {
			message.success(data);
			props.onOk && props.onOk();
		},
	});

	const onOk = async () => {
		console.log(selectedKeys.checked);
		run({ roleCode: props.roleId, ids: selectedKeys.checked.join(","), menuType: "1" });
	};
	const onCancel = () => {
		props.onCancel && props.onCancel();
	};

	const onCheck = (checkedKeys: any, info: any) => {
		if (info.checked) {
			// console.log(menuTreeListDispose (menuTreeList),'shun')
			// console.log (familyTree (menuTreeListDispose (menuTreeList), info.node.key));
			checkedKeys.checked = [...checkedKeys.checked, ...getChildrenKes(info.node.children)];
		} else {
			const delkeys = getChildrenKes(info.node.children);
			checkedKeys.checked = checkedKeys.checked.filter((item: string) => delkeys.indexOf(item) === -1);
		}

		setSelectedKeys(checkedKeys);
		// setSelectedKeys (checkedKeys)
	};
	return (
		<Modal
			visible={props.visible}
			destroyOnClose
			title={"前端菜单编辑"}
			{...props}
			onOk={onOk}
			onCancel={onCancel}
			confirmLoading={loading}>
			<Tree
				checkable
				autoExpandParent={true}
				checkStrictly={true}
				onCheck={onCheck}
				checkedKeys={selectedKeys}
				treeData={menuTreeList ? menuTreeListDispose(menuTreeList) : []}
			/>
		</Modal>
	);
};

export default WebMenuRoleEdit;
