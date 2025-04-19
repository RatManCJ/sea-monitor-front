import React, {useState} from 'react';
import {Layout, TreeSelect, Typography, theme, Button} from 'antd';
import styles from './TopBar.module.scss'; // 引入SCSS文件

const {Header} = Layout;
const {Title, Text} = Typography;
const {useToken} = theme;

const TopBar = ({onTimeChange}) => {
    const [selectedTime, setSelectedTime] = useState('2017-05-01'); // 默认时间
    const [isTreeSelectVisible, setIsTreeSelectVisible] = useState(true); // 控制选择框是否可见
    const {token} = useToken();

    // 定义时间选项，按年份分组
    const timeTreeData = [
        {
            title: '2017年',
            value: '2017',
            children: [
                {title: '2017-05-01', value: '2017-05-01'},
                {title: '2017-06-01', value: '2017-06-01'},
                {title: '2017-08-01', value: '2017-08-01'},
                {title: '2017-09-01', value: '2017-09-01'},
                {title: '2017-10-01', value: '2017-10-01'},
                {title: '2017-11-01', value: '2017-11-01'},
            ],
        },
        {
            title: '2018年',
            value: '2018',
            children: [
                {title: '2018-05-01', value: '2018-05-01'},
                {title: '2018-06-01', value: '2018-06-01'},
                {title: '2018-08-01', value: '2018-08-01'},
                {title: '2018-09-01', value: '2018-09-01'},
                {title: '2018-10-01', value: '2018-10-01'},
                {title: '2018-11-01', value: '2018-11-01'},
            ],
        },
        {
            title: '2019年',
            value: '2019',
            children: [
                {title: '2019-04-01', value: '2019-04-01'},
                {title: '2019-05-01', value: '2019-05-01'},
                {title: '2019-06-01', value: '2019-06-01'},
                {title: '2019-07-01', value: '2019-07-01'},
                {title: '2019-08-01', value: '2019-08-01'},
                {title: '2019-09-01', value: '2019-09-01'},
                {title: '2019-10-01', value: '2019-10-01'},
                {title: '2019-11-01', value: '2019-11-01'},
                {title: '2019-12-01', value: '2019-12-01'},
            ],
        },
        {
            title: '2020年',
            value: '2020',
            children: [
                {title: '2020-04-01', value: '2020-04-01'},
                {title: '2020-05-01', value: '2020-05-01'},
                {title: '2020-07-01', value: '2020-07-01'},
                {title: '2020-08-01', value: '2020-08-01'},
                {title: '2020-10-01', value: '2020-10-01'},
                {title: '2020-11-01', value: '2020-11-01'},
                {title: '2020-12-01', value: '2020-12-01'},
            ],
        },
        {
            title: '2021年',
            value: '2021',
            children: [
                {title: '2021-04-01', value: '2021-04-01'},
                {title: '2021-05-01', value: '2021-05-01'},
                {title: '2021-07-01', value: '2021-07-01'},
                {title: '2021-08-01', value: '2021-08-01'},
                {title: '2021-10-01', value: '2021-10-01'},
                {title: '2021-11-01', value: '2021-11-01'},
            ],
        },
        {
            title: '2022年',
            value: '2022',
            children: [
                {title: '2022-04-01', value: '2022-04-01'},
                {title: '2022-05-01', value: '2022-05-01'},
                {title: '2022-07-01', value: '2022-07-01'},
                {title: '2022-08-01', value: '2022-08-01'},
                {title: '2022-10-01', value: '2022-10-01'},
                {title: '2022-11-01', value: '2022-11-01'},
            ],
        },
        {
            title: '2023年',
            value: '2023',
            children: [
                {title: '2023-04-01', value: '2023-04-01'},
                {title: '2023-05-01', value: '2023-05-01'},
                {title: '2023-07-01', value: '2023-07-01'},
                {title: '2023-08-01', value: '2023-08-01'},
                {title: '2023-10-01', value: '2023-10-01'},
                {title: '2023-11-01', value: '2023-11-01'},
                {title: '2023-12-01', value: '2023-12-01'},
            ],
        },
        {
            title: '2024年',
            value: '2024',
            children: [
                {title: '2024-04-01', value: '2024-04-01'},
                {title: '2024-05-01', value: '2024-05-01'},
                {title: '2024-07-01', value: '2024-07-01'},
                {title: '2024-08-01', value: '2024-08-01'},
                {title: '2024-10-01', value: '2024-10-01'},
                {title: '2024-11-01', value: '2024-11-01'},
            ],
        },
    ];

    // 检查节点是否为最后一层节点
    const isLeafNode = (value) => {
        const findNode = (data) => {
            for (const node of data) {
                if (node.value === value) {
                    return !node.children || node.children.length === 0;
                }
                if (node.children) {
                    const result = findNode(node.children);
                    if (result !== undefined) return result;
                }
            }
            return undefined;
        };
        return findNode(timeTreeData);
    };

    const [value, setValue] = useState();
    const onPopupScroll = e => {
        console.log('onPopupScroll', e);
    };

    return (
        <Header className={styles.topBar} style={{background: token.colorBgContainer, color: token.colorPrimary}}>
            <div className={styles.topBarContent}>
                <div className={styles.navItems}>
                    <Title className={styles.title}>近海水质信息可视化系统</Title>
                </div>
                <Text>
                    时间：
                </Text>
                <div className={styles.rightControls}>
                    <TreeSelect
                        showSearch
                        style={{width: '70%'}}
                        value={selectedTime} // 将 selectedTime 绑定到 TreeSelect 的 value 属性
                        dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                        allowClear
                        treeDefaultExpandAll={false}
                        onChange={(value) => {
                            if (isLeafNode(value)) {
                                setSelectedTime(value); // 更新选中值
                                onTimeChange(value);
                                setIsTreeSelectVisible(false); // 隐藏选择框
                            }
                        }}
                        treeData={timeTreeData}
                        onPopupScroll={onPopupScroll}
                        size={'large'}
                    />
                </div>
            </div>
        </Header>
    );
};

export default TopBar;