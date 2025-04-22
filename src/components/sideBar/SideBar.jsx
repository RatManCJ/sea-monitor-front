import React, {useState} from 'react';
import {Menu, Button, Drawer, Switch} from 'antd';
import {Link} from 'react-router-dom';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    DatabaseOutlined,
    DeploymentUnitOutlined,
    TranslationOutlined
} from '@ant-design/icons';
import styles from './SideBar.module.scss';

const {SubMenu} = Menu;

const SideBar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [drawerVisible, setDrawerVisible] = useState(false);

    // 导航数据结构
    const navItems = [
        {
            type: 'show',
            // icon: <DatabaseOutlined/>,
            label: '地图展示',
            children: [
                {key: 'nc', label: <Link to="/map/show">{'地图展示'}</Link>},
            ]
        },
        {
            type: 'data',
            // icon: <DeploymentUnitOutlined/>,
            label: '数据分析',
            children: [
                {key: 'salinity', label: <Link to="/data/analysis">{'数据分析'}</Link>},
            ]
        }
    ];

    // 渲染菜单项
    const renderMenu = (mode = 'inline') => (
        <Menu
            mode={mode}
            defaultSelectedKeys={['1']}
            inlineCollapsed={collapsed}
            className={styles.menu}
        >
            {navItems.map(item => (
                <SubMenu
                    key={item.type}
                    icon={item.icon}
                    title={item.label}
                    className={styles.subMenu}
                >
                    {item.children.map(child => (
                        <Menu.Item key={child.key} className={styles.menuItem}>
                            {child.label}
                        </Menu.Item>
                    ))}
                </SubMenu>
            ))}
        </Menu>
    );

    return (
        <>
            <div className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                    onClick={() => setCollapsed(!collapsed)}
                    className={styles.collapseBtn}
                />
                {renderMenu()}
            </div>
        </>
    );
};

export default SideBar;