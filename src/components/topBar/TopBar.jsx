import React, {useState} from 'react';
import {Layout, TreeSelect, Typography, theme, Button} from 'antd';
import styles from './TopBar.module.scss';
import DropDate from "@components/topBar/time/DropDate.jsx"; // 引入SCSS文件

const {Header} = Layout;
const {Title, Text} = Typography;
const {useToken} = theme;

const TopBar = ({onTimeChange}) => {
    const [selectedTime, setSelectedTime] = useState('2017-05-01'); // 默认时间
    const [isTreeSelectVisible, setIsTreeSelectVisible] = useState(true); // 控制选择框是否可见
    const {token} = useToken();

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
                <div className={styles.rightControls}>
                    <DropDate/>
                </div>
            </div>
        </Header>
    );
};

export default TopBar;