import {Divider, Button} from "antd";
import React, {useRef} from "react";
import {PageContainer} from "@ant-design/pro-layout";
import ProTable, {ActionType, ProColumns} from "@ant-design/pro-table";
import {pageTransition} from "@/utils/utils";
import {deleteUserByUserNo,} from "@/api/mods/user/deleteUser";
import {getMenu} from "@/api/mods/menu/geMenListPage";
import AddMenu from "@/pages/menu/components/AddMenu";
import {useBoolean} from "ahooks";

// import { TableListItem } from "./data.d";
interface TableListItem {

}

const delUser = async (userNo: string,) => {
    console.log (userNo, 'userNo')
    const data = await deleteUserByUserNo ({userNo})
    console.log (data);
}

const UserList: React.FC<{}> = () => {
    const actionRef = useRef<ActionType> ();
    const [addMenuShow, {setTrue: addMenuShowSetTrue, setFalse: addMenuShowSetFalse}] = useBoolean ()
    const columns: ProColumns<MenuEntity>[] = [
        {
            title: "菜单名称",
            dataIndex: "name",
            hideInForm: true,
            hideInSearch: true,
        },
        {
            title: "父级菜单",
            dataIndex: "parentName",
            hideInForm: true,
            hideInSearch: true,
        },
        {
            title: "URL",
            dataIndex: "url",
            hideInForm: true,
            hideInSearch: true,
        },
        {
            title: "排序",
            dataIndex: "num",
            hideInForm: true,
            hideInSearch: true,
        },
        {
            title: "icon",
            dataIndex: "icon",
            hideInForm: true,
            hideInSearch: true,
        },

        {
            title: "操作",
            dataIndex: "option",
            valueType: "option",
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            render: (_, record) => (
                <>
                    <Button type='link' onClick={ async () => {
                    } }>删除</Button>
                    <Divider type="vertical"/>

                </>
            ),
        },
    ];

    return (
        <PageContainer>
            <AddMenu show={ addMenuShow } onCancel={ () => {
                addMenuShowSetFalse ()
                actionRef.current?.reload ()
            } }/>
            <ProTable<TableListItem>
                actionRef={ actionRef }
                rowKey="menuId"
                toolBarRender={ () => [
                    <Button onClick={ addMenuShowSetTrue }>添加</Button>
                ] }
                request={ (params) => {
                    return pageTransition<TableListItem> (() => getMenu ({menuType: 1}), params);
                } }
                columns={ columns }
            />
        </PageContainer>
    );
};

export default UserList;
