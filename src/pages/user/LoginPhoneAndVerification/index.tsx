import {Button, Checkbox, Form, Input, } from "antd";
import React from "react";
import styles from "./style.less";
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const LoginAccountAndPassword: React.FC<{}> = () => {
    const onFinish = (values:any) => {
        console.log('Received values of form: ', values);
    };
    return <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
    >
        <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入账号' }]}
        >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
        >
            <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
            />
        </Form.Item>
        <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a  className={styles.register} >
                Forgot password
            </a>
        </Form.Item>

        <Form.Item>
            <Button type="primary" block htmlType="submit" >
                手机号登录
            </Button>
            Or <a href="">register now!</a>
        </Form.Item>
    </Form>;
};

export default LoginAccountAndPassword;
