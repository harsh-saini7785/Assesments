import React, { useState } from 'react';
import { Layout, Menu, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import logo from '../../assets/sign.png'

import { styles } from './NavBarStyle';

const { Header } = Layout;

const Navbar = () => {
    const [selectedKey, setSelectedKey] = useState('1');

    const handleMenuClick = (e) => {
        setSelectedKey(e.key);
    };

    return (
        <Layout style={styles.navbarContainer}>
            <Header style={styles.headerContainer}>
                <div style={styles.imageContainer}>
                    <img src={logo} alt="Logo" style={styles.image} />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        style={styles.menuContainer}
                        electedKeys={[selectedKey]}
                        onClick={handleMenuClick}
                    >
                        <Menu.Item key="1" style={selectedKey === '1' ? styles.active : {}}>Profile</Menu.Item>
                        <Menu.Item key="2" style={selectedKey === '2' ? styles.active : {}}
                        >About</Menu.Item>
                    </Menu>
                </div>
                <Avatar style={styles.avatar} size="large" icon={<UserOutlined />} />
            </Header>
        </Layout>
    );
};

export default Navbar;