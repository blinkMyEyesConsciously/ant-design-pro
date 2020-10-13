import React, {useEffect} from "react";
import {Form, Modal, Input, message, TreeSelect} from "antd";
import {ModalFuncProps} from "antd/lib/modal";
import {useRequest} from "ahooks";
import {requiredRules} from "@/utils";
import {getMenuTreeMenuList} from "@/api/mods/menu/treeMenuList";
import {DataNode} from "rc-tree-select/lib/interface";
import {postMenu} from "@/api/mods/menu/saveOrUpdateMenu";

export interface FormProps extends ModalFuncProps {
    show: boolean,
    onCancel: () => void,
    onOk: () => void,
    type: "add" | 'edit',
    menuItem?: MenuEntity
}

const formLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 18},
};
const menuTreeListDispose = (menuList: any[]): DataNode[] => {

    return menuList.map (({name, menuId, childMenu}) => ({
        title: name,
        value: menuId,
        children: menuTreeListDispose (childMenu)
    }))
}

const AddOrUpDateMenu: React.FC<FormProps> = (props) => {
    const [form] = Form.useForm ();

    const {data: menuTreeList, run: menuTreeListRun} = useRequest<any[]> (getMenuTreeMenuList, {manual: true});


    const {loading, run} = useRequest<any> (postMenu, {
        manual: true,
        onSuccess: (data) => {
            message.success (data)
            props.onOk && props.onOk ();

        },
        onError: (data) => {
            message.error (data.message)
        }
    });
    useEffect (() => {
        if (props.type === 'edit') {
            if (props.menuItem?.parentId === 0) {
                delete props.menuItem?.parentId
            }
            console.log('插入输入',form )
            form.setFieldsValue (props.menuItem)
        }
    }, [props.show])

    useEffect (() => {
        props.show && menuTreeListRun ()
    }, [props.show])


    const onOk = async () => {
        let data: MenuEntity = await form.validateFields ();
        /**
         *
         * 如果没有选择父级ID,则给他后台配置好的初始值0
         */
        if (!data.parentId) {
            data.parentId = 0
        }
        data.menuType = 1
        await run (props.type === 'add' ? data : {...data, menuId: props.menuItem?.menuId,});
    };
    const onCancel = () => {
        props.onCancel && props.onCancel ();
    };
    return (
        <Modal destroyOnClose   title={ props.type === 'add' ? "添加菜单" : '编辑菜单' } visible={ props.show } { ...props } onOk={ onOk }
               onCancel={ onCancel }
               confirmLoading={ loading }>
            <Form  preserve={false} { ...formLayout } form={ form }>
                <Form.Item label="菜单名称" name="name" rules={ requiredRules }>
                    <Input/>
                </Form.Item>
                <Form.Item label="URL" name="url" rules={ requiredRules }>
                    <Input/>
                </Form.Item>
                <Form.Item label="Icon" name="icon">
                    <Input/>
                </Form.Item>
                <Form.Item label="Code" name="code">
                    <Input/>
                </Form.Item>
                <Form.Item label="序号" name="num" rules={ requiredRules }>
                    <Input type={ "number" }/>
                </Form.Item>
                <Form.Item label="父级菜单" name="parentId">
                    <TreeSelect
                        allowClear={ true }
                        style={ {width: '100%'} }
                        dropdownStyle={
                            {
                                maxHeight: 400, overflow: 'auto'
                            }
                        }
                        treeData={ menuTreeList ? menuTreeListDispose (menuTreeList) : [] }
                        treeDefaultExpandAll
                    />
                </Form.Item>


            </Form>
        </Modal>
    );
};

export default AddOrUpDateMenu;
