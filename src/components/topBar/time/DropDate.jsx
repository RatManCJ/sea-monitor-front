import React, {useState} from 'react';
import {DownOutlined} from '@ant-design/icons';
import {Dropdown, Menu, Space} from 'antd';
import {useNavigate} from "react-router-dom";

const DropDate = () => {
    const navigate = useNavigate(); // 获取路由导航函数
    const [selectedDate, setSelectedDate] = useState('');

    // 定义下拉菜单的选项
    const items = [
        {
            title: '2017年',
            value: '2017',
            children: [
                {key: '2017-05-01', label: '2017-05-01'},
                {key: '2017-06-01', label: '2017-06-01'},
                {key: '2017-08-01', label: '2017-08-01'},
                {key: '2017-09-01', label: '2017-09-01'},
                {key: '2017-10-01', label: '2017-10-01'},
                {key: '2017-11-01', label: '2017-11-01'},
            ],
        },
        {
            title: '2018年',
            value: '2018',
            children: [
                {key: '2018-05-01', label: '2018-05-01'},
                {key: '2018-06-01', label: '2018-06-01'},
                {key: '2018-08-01', label: '2018-08-01'},
                {key: '2018-09-01', label: '2018-09-01'},
                {key: '2018-10-01', label: '2018-10-01'},
                {key: '2018-11-01', label: '2018-11-01'},
            ],
        },
        {
            title: '2019年',
            value: '2019',
            children: [
                {key: '2019-04-01', label: '2019-04-01'},
                {key: '2019-05-01', label: '2019-05-01'},
                {key: '2019-06-01', label: '2019-06-01'},
                {key: '2019-07-01', label: '2019-07-01'},
                {key: '2019-08-01', label: '2019-08-01'},
                {key: '2019-09-01', label: '2019-09-01'},
                {key: '2019-10-01', label: '2019-10-01'},
                {key: '2019-11-01', label: '2019-11-01'},
                {key: '2019-12-01', label: '2019-12-01'},
            ],
        },
        {
            title: '2020年',
            value: '2020',
            children: [
                {key: '2020-04-01', label: '2020-04-01'},
                {key: '2020-05-01', label: '2020-05-01'},
                {key: '2020-07-01', label: '2020-07-01'},
                {key: '2020-08-01', label: '2020-08-01'},
                {key: '2020-10-01', label: '2020-10-01'},
                {key: '2020-11-01', label: '2020-11-01'},
                {key: '2020-12-01', label: '2020-12-01'},
            ],
        },
        {
            title: '2021年',
            value: '2021',
            children: [
                {key: '2021-04-01', label: '2021-04-01'},
                {key: '2021-05-01', label: '2021-05-01'},
                {key: '2021-07-01', label: '2021-07-01'},
                {key: '2021-08-01', label: '2021-08-01'},
                {key: '2021-10-01', label: '2021-10-01'},
                {key: '2021-11-01', label: '2021-11-01'},
            ],
        },
        {
            title: '2022年',
            value: '2022',
            children: [
                {key: '2022-04-01', label: '2022-04-01'},
                {key: '2022-05-01', label: '2022-05-01'},
                {key: '2022-07-01', label: '2022-07-01'},
                {key: '2022-08-01', label: '2022-08-01'},
                {key: '2022-10-01', label: '2022-10-01'},
                {key: '2022-11-01', label: '2022-11-01'},
            ],
        },
        {
            title: '2023年',
            value: '2023',
            children: [
                {key: '2023-04-01', label: '2023-04-01'},
                {key: '2023-05-01', label: '2023-05-01'},
                {key: '2023-07-01', label: '2023-07-01'},
                {key: '2023-08-01', label: '2023-08-01'},
                {key: '2023-10-01', label: '2023-10-01'},
                {key: '2023-11-01', label: '2023-11-01'},
                {key: '2023-12-01', label: '2023-12-01'},
            ],
        },
        {
            title: '2024年',
            value: '2024',
            children: [
                {key: '2024-04-01', label: '2024-04-01'},
                {key: '2024-05-01', label: '2024-05-01'},
                {key: '2024-07-01', label: '2024-07-01'},
                {key: '2024-08-01', label: '2024-08-01'},
                {key: '2024-10-01', label: '2024-10-01'},
                {key: '2024-11-01', label: '2024-11-01'},
            ],
        },
    ];

    // 处理菜单项点击事件
    const handleMenuClick = (e) => {
        const selectedKey = e.key;
        setSelectedDate(selectedKey); // 更新选中的时间
        navigate(`/data/${selectedKey}`); // 跳转到对应的路由
    };

    // 将 items 转换为 Ant Design 的 Menu 需要的格式
    const menuItems = items.map((item) => (
        <Menu.SubMenu
            key={item.title}
            title={item.title}>
            {item.children.map((child) => (
                <Menu.Item key={child.key}>{child.label}</Menu.Item>
            ))}
        </Menu.SubMenu>
    ));

    return (
        <>
            <Dropdown
                overlay={
                    <Menu onClick={handleMenuClick}>
                        {menuItems}
                    </Menu>
                }
            >
                <a onClick={(e) => e.preventDefault()} style={{color: 'white', textDecoration: 'none'}}>
                    <Space color={'red'}>
                        选择时间
                        {selectedDate}
                        <DownOutlined />
                    </Space>
                </a>
            </Dropdown>
        </>
    )
}
export default DropDate;
