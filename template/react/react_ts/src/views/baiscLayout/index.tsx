import React, {Suspense, useEffect, useState} from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Breadcrumb, Layout, Menu, theme} from 'antd';
import {Outlet, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../stores";

const {Header, Content, Footer, Sider} = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('导航', '/navigate', <PieChartOutlined/>),
  getItem('首页', '/home', <DesktopOutlined/>),
  getItem('User', 'sub1', <UserOutlined/>,
    [
      getItem('Tom', '3'),
      getItem('Bill', '4'),
      getItem('Alex', '5'),
    ]),
  getItem('Team', 'sub2', <TeamOutlined/>,
    [
      getItem('Team 1', '6'),
      getItem('Team 2', '8')
    ]),
  getItem('Files', '9', <FileOutlined/>),
];

const BasicLayout: React.FC = () => {
  const navigate = useNavigate()
  const auth = useSelector((state: RootState) => state.auth)
  useEffect(() => {
    const checkAuth = () => {
      if (!auth.isAuthenticated) {
        navigate('/login')
      }
    }
    checkAuth()
  }, [auth.isAuthenticated, navigate])
  const handleMenuClick = (val: { key: string }) => {
    console.log(val)
    const {key: path} = val
    navigate(path)
  }
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: {colorBgContainer, borderRadiusLG},
  } = theme.useToken();

  return (
    <Layout style={{minHeight: '100vh'}}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical"/>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={handleMenuClick}>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{padding: 0, background: colorBgContainer}}></Header>
        <Content style={{margin: '0 16px'}}>
          <Breadcrumb items={[{title: 'User'}, {title: 'Bill'}]} style={{margin: '16px 0'}}>
            {/*<Breadcrumb.Item>User</Breadcrumb.Item>*/}
            {/*<Breadcrumb.Item>Bill</Breadcrumb.Item>*/}
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Suspense fallback={<div>Loading...</div>}>
              <Outlet></Outlet>

            </Suspense>

          </div>
        </Content>
        <Footer style={{textAlign: 'center'}}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;