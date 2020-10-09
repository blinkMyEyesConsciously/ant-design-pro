import React from "react";
import {Form, Modal, Input, message, TreeSelect} from "antd";
import {ModalFuncProps} from "antd/lib/modal";
import {useRequest} from "ahooks";
import {requiredRules} from "@/utils";
import {getMenuTreeMenuList} from "@/api/mods/menu/treeMenuList";
import {DataNode} from "rc-tree-select/lib/interface";
import { postMenu } from "@/api/mods/menu/saveOrUpdateMenu";

export interface FormProps extends ModalFuncProps {
    show: boolean,
    onCancel: () => void,
    type:"add"|'edit',
    menuItem?:MenuEntity
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

const AddMenu: React.FC<FormProps> = (props) => {
    const [form] = Form.useForm ();

    const {data: menuTreeList} = useRequest<any[]> (getMenuTreeMenuList);

    const {loading, run} = useRequest<any> (postMenu, {
        manual: true,
        onSuccess: (data) => {
            if (data.status === 0) {
                form.resetFields ();
                props.onOk && props.onOk ();
            } else {
                message.error (data.message);
            }
        },
    });

    let onOk = async () => {
        let data: MenuEntity = await form.validateFields ();
        /**
         * 如果没有选择父级ID,则给他后台配置好的初始值0
         */
        if (!data.parentId) {
            data.parentId = 0
        }

      await  run (data);
    };
    let onCancel = () => {
        form.resetFields ();
        props.onCancel && props.onCancel ();
    };
    return (
        <Modal title={ "添加菜单" } visible={ props.show } { ...props } onOk={ onOk } onCancel={ onCancel }
               confirmLoading={ loading }>
            <Form { ...formLayout } form={ form }>
                <Form.Item label="菜单名称" name="name" rules={ requiredRules }>
                    <Input/>
                </Form.Item>
                <Form.Item label="URL" name="url" rules={ requiredRules }>
                    <Input/>
                </Form.Item>
                <Form.Item label="Icon" name="icon" rules={ requiredRules }>
                    <Input/>
                </Form.Item>
                <Form.Item label="Code" name="menuCode" rules={ requiredRules }>
                    <Input/>
                </Form.Item>
                <Form.Item label="序号" name="num" rules={ requiredRules }>
                    <Input type={ "number" }/>
                </Form.Item>
                <Form.Item label="父级菜单" name="parentId">
                    <TreeSelect
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

export default AddMenu;
