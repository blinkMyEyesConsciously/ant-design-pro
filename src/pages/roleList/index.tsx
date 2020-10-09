import {Divider, Button} from "antd";
import React, {useRef} from "react";
import {PageContainer} from "@ant-design/pro-layout";
import ProTable, {ActionType, ProColumns} from "@ant-design/pro-table";
import {pageTransition} from "@/utils/utils";
import {deleteUserByUserNo,} from "@/api/mods/user/deleteUser";
import {getRolePageList} from "@/api/mods/role/getPageList";

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

    const columns: ProColumns<defs.User>[] = [
        {
            title: "权限名称",
            dataIndex: "roleName",
            hideInForm: true,
            hideInSearch: true,
        },
        {
            title: "roleCode",
            dataIndex: "roleCode",
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
                        await delUser (record.userNo as string)
                    } }>删除</Button>
                    <Divider type="vertical"/>
                    <Button type='link' onClick={ () => {
                    } }>禁用</Button>
                    <Divider type="vertical"/>
                    <Button type="link" onClick={ () => {
                    } }>详情</Button>
                </>
            ),
        },
    ];

    return (
        <PageContainer>
                <ProTable<TableListItem>

                    actionRef={ actionRef }
                    rowKey="userNo"

                    request={ (params) => {
                        return pageTransition<TableListItem> (getRolePageList, params);
                    } }
                    columns={ columns }
                />
        </PageContainer>
    );
};

export default UserList;
