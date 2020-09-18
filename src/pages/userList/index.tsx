import {Divider, Button} from "antd";
import React, {useRef} from "react";
import {PageContainer} from "@ant-design/pro-layout";
import ProTable, {ActionType, ProColumns} from "@ant-design/pro-table";
import {pageTransition} from "@/utils/utils";
import {getUserPageList} from '@/api/mods/user/findList';

// import { TableListItem } from "./data.d";
interface TableListItem {
}


const Layout = (props:any) => {
    console.log(props.children,'childre')
    return <div>
        { props.children }
    </div>
}


const UserList: React.FC<{}> = () => {
    const actionRef = useRef<ActionType> ();
    const columns: ProColumns<TableListItem>[] = [
        {
            title: "手机号",
            dataIndex: "mobile",
        },

        {
            title: "用户名称",
            dataIndex: "username",
            hideInForm: true,
            hideInSearch: true,
        },
        {
            title: "邮箱",
            dataIndex: "email",
            hideInForm: true,
            hideInSearch: true,
        },

        {
            title: "用户状态",
            dataIndex: "status",
            filters: undefined,
            hideInForm: true,
            valueEnum: {

                "1": {text: '正常', status: 'Success'},
                "2": {text: '禁用', status: 'Warning'},
                "3": {text: '删除', status: 'Error'},
            },
        },

        {
            title: "权限名称",
            dataIndex: "roleName",
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
                    <Button type='link' onClick={ () => {
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
            <Layout>
                <ProTable<TableListItem>

                    actionRef={ actionRef }
                    rowKey="userNo"

                    request={ (params) => {
                        return pageTransition<TableListItem> (getUserPageList, params);
                    } }
                    columns={ columns }
                />
            </Layout>

        </PageContainer>
    );
};

export default UserList;
