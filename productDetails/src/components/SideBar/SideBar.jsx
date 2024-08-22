import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { AppstoreOutlined, BarChartOutlined } from '@ant-design/icons';
import { Content } from 'antd/es/layout/layout';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';

import { styles } from './SideBarStyle';

const { Sider } = Layout;

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleCollapse = () => {
        setCollapsed(!collapsed);
    };


    return (
        <Layout style={{ maxHeight: 'calc(100vh - 64px)', minHeight: 'calc(100vh - 64px)' }}>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={handleCollapse}
                breakpoint="sm"
                collapsedWidth="80"
                style={{ backgroundColor: '#001529' }}
            >
                <Menu theme="dark" mode="inline" defaultSelectedKeys={location.pathname} selectedKeys={location.pathname}>
                    <Menu.Item
                        key="/"
                        icon={<AppstoreOutlined />}
                        onClick={() => navigate('/')}
                    >
                        {collapsed ? '' : 'Product Details'}
                    </Menu.Item>
                    <Menu.Item
                        key="/compare-product"
                        icon={<BarChartOutlined />}
                        onClick={() => navigate('/compare-product')}
                    >
                        {collapsed ? '' : 'Product Compare'}
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Content style={styles.contentConainer}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default Sidebar;