import "./index.scss"
import React, {useEffect} from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import {useNavigate} from "react-router-dom";
import {setToken, clear} from "@/stores/modules/user.ts";
import {useDispatch} from "react-redux";
import require from "../utils/require.ts";
import {loginApi} from "../../api/modules/system/login.ts";
import {ILogin} from "../../api/interface/system/login.ts";
import {setUserInfo} from "../../stores/modules/user.ts";

const Index: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onFinish = async(values: ILogin.LoginParams) => {
    console.log('Received values of form: ', values)
    // 1、执行登录接口
    const {data} = await loginApi({...values})
    dispatch(setToken(data.accessToken))
    dispatch(setUserInfo(data.userInfo))

    // 2、添加动态路由
    await initDy
    navigate('/', {replace: true})
    // navigate('/', )
  }
  useEffect(() => {
    dispatch(clear())
  }, [dispatch])

  return (
    <div className={'login-container flx-center'}>
      <div className={'login-box'}>
        <div className={'login-left'}>
          <img className={'login-left-img'} src={require('assets/images/login_left3.png')} alt="login"/>
        </div>
        <div className={'login-form'}>
          <div className={'login-logo'}>
            <img className={'login-icon'} src={require('assets/images/logo.svg')} alt=""/>
            <h2 className={'logo-text'}>Fc-Admin</h2>
          </div>
          <Flex style={{height: "inherit"}} justify={"center"} align={"center"}>
            <Form
              name="login"
              initialValues={{remember: true}}
              style={{maxWidth: 360}}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[{required: true, message: 'Please input your Username!'}]}
              >
                <Input prefix={<UserOutlined/>} placeholder="Username"/>
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
              >
                <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
              </Form.Item>
              <Form.Item>
                <Flex justify="space-between" align="center">
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>记住密码</Checkbox>
                  </Form.Item>
                  <a href="">忘记密码</a>
                </Flex>
              </Form.Item>

              <Form.Item>
                <Flex justify="space-between" align="center" gap={15}>
                  <Button style={{flex: 1}} type="primary" htmlType="submit">
                    登录
                  </Button>
                  <a href="">立即注册</a>
                </Flex>
              </Form.Item>
            </Form>
          </Flex>
        </div>
      </div>
    </div>

  );
};

export default Index;