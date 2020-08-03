import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { postLogin } from '@/api/mods/login/login';
import omit from 'omit.js';
import { replaceGoto } from '@/utils/utils';
import { useModel } from '@@/plugin-model/useModel';
import styles from './style.less';

interface PostLoginData {
  token: string
}

const LoginAccountAndPassword: React.FC<{}> = () => {
  const { refresh } = useModel ('@@initialState');

  const { run, loading } = useRequest<PostLoginData> (postLogin, {
    manual: true, onSuccess: (msg) => {
      // 登录成功后写入token
      localStorage.setItem ('Authorization', msg?.token ?? '');
      setTimeout (refresh, 0);
      replaceGoto ();
    },
  });
  const onFinish = (values: any) => {

    run (omit (values, ['remember']));

  };
  return <Form
    name="normal_login"
    className="login-form"
    initialValues={ { remember: true } }
    onFinish={ onFinish }
  >
    <Form.Item
      name="identity"
      rules={ [{ required: true, message: '请输入账号' }] }
    >
      <Input prefix={ <UserOutlined className="site-form-item-icon"/> } placeholder="用户名"/>
    </Form.Item>
    <Form.Item
      name="password"
      rules={ [{ required: true, message: '请输入密码' }] }
    >
      <Input
        prefix={ <LockOutlined className="site-form-item-icon"/> }
        type="password"
        placeholder="密码"
      />
    </Form.Item>
    <Form.Item>
      <Form.Item name="remember" valuePropName="checked" noStyle>
        <Checkbox>记住密码</Checkbox>
      </Form.Item>

      <a className={ styles.register }>忘记密码</a>
    </Form.Item>

    <Form.Item>
      <Button loading={ loading } type="primary" block htmlType="submit">
        登录
      </Button>
      OR<a href=""> 注册账号</a>
    </Form.Item>
  </Form>;
};

export default LoginAccountAndPassword;
