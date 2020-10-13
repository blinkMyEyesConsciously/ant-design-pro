import { Button, Card, Divider, Skeleton, Tree } from 'antd';
import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { pageTransition } from '@/utils/utils';
import { getMenu } from '@/api/mods/menu/geMenListPage';
import AddOrUpDateMenu from '@/pages/admin/menu/components/AddOrUpDateMenu';
import { useBoolean, useRequest } from 'ahooks';
import { getMenuTreeMenuList } from '@/api/mods/menu/treeMenuList';
import ButtonSubmit from '@/components/ButtonSubmit';
import { deleteMenuById } from '@/api/mods/menu/deleteById';

// import { TableListItem } from "./data.d";
interface TableListItem {}

const { DirectoryTree } = Tree;

const menuTreeListDispose = (menuList: any[]): any[] => {
  return menuList.map(({ name, menuId, childMenu }) => {
    if (childMenu.length === 0) {
      return {
        title: name,
        key: menuId,
        isLeaf: true,
      };
    } else {
      return {
        title: name,
        key: menuId,
        children: menuTreeListDispose(childMenu),
      };
    }
  });
};

const UserList: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const { data: menuTreeList, loading: menTreeLoading, refresh } = useRequest<any[]>(
    getMenuTreeMenuList,
  );
  const [selectedKey, setSelectedKeys] = useState<number>();
  const [menuItem, setMenuItem] = useState<MenuEntity>();
  const [addOrUpdateMenuType, setAddOrUpdateMenuType] = useState<'add' | 'edit'>('add');
  const [
    addMenuShow,
    { setTrue: addMenuShowSetTrue, setFalse: addMenuShowSetFalse },
  ] = useBoolean();

  const columns: ProColumns<MenuEntity>[] = [
    {
      title: '菜单名称',
      dataIndex: 'name',
      search: false,
    },
    {
      title: '父级菜单',
      dataIndex: 'parentName',
      search: false,
    },
    {
      title: 'URL',
      dataIndex: 'url',
      search: false,
    },
    {
      title: '排序',
      dataIndex: 'num',
      search: false,
    },
    {
      title: 'icon',
      dataIndex: 'icon',
      search: false,
    },

    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render: (_, record) => (
        <>
          <ButtonSubmit
            okCallback={() => {
              actionRef.current?.reload();
              refresh();
            }}
            loadingContent={'删除中'}
            successContent={'删除完成'}
            reqFun={deleteMenuById}
            data={{ id: record.menuId }}
          >
            删除
          </ButtonSubmit>
          <Divider type="vertical" />
          <Button
            type="link"
            onClick={async () => {
              setAddOrUpdateMenuType('edit');
              setMenuItem(record);
              addMenuShowSetTrue();
            }}
          >
            编辑
          </Button>
        </>
      ),
    },
  ];
  if (menuTreeList) {
    console.log(menuTreeListDispose(menuTreeList));
  }

  return (
    <PageContainer>
      <AddOrUpDateMenu
        menuItem={menuItem}
        show={addMenuShow}
        onCancel={() => {
          addMenuShowSetFalse();
        }}
        type={addOrUpdateMenuType}
        onOk={() => {
          addMenuShowSetFalse();
          actionRef.current?.reload();
          refresh();
        }}
      />
      <ProTable<TableListItem>
        search={false}
        tableRender={(_, dom) => (
          <div
            style={{
              display: 'flex',
            }}
          >
            <Card
              title={'菜单列表'}
              style={{
                minWidth: '320px',
                minHeight: '640px',
              }}
            >
              <Skeleton loading={menTreeLoading}>
                <DirectoryTree
                  onSelect={(selectedKeys, info) => {
                    setSelectedKeys(selectedKeys?.[0] as number);
                    actionRef.current?.reload();
                  }}
                  style={{
                    margin: '12px',
                  }}
                  treeData={menuTreeList ? menuTreeListDispose(menuTreeList) : []}
                />
              </Skeleton>
            </Card>

            <div
              style={{
                flex: 1,
              }}
            >
              {dom}
            </div>
          </div>
        )}
        key={'menuId'}
        actionRef={actionRef}
        rowKey="menuId"
        toolBarRender={() => [
          <Button
            key={'1'}
            onClick={() => {
              setAddOrUpdateMenuType('add');
              addMenuShowSetTrue();
            }}
          >
            添加
          </Button>,
        ]}
        request={(params) => {
          return pageTransition<TableListItem>(
            (obj) =>
              getMenu({
                ...obj,
                menuType: 1,
                selectedKey: selectedKey,
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
