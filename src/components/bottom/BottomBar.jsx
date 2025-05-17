import React from 'react';
import {Layout, Typography, Button, theme} from 'antd';
import styles from './BottomBar.module.scss'; // 引入SCSS文件

const { Footer } = Layout;
const { Text } = Typography;
const {useToken} = theme;
const BottomBar = () => {

    const {token} = useToken();

    return (
        <Footer className={styles.bottomBar } style={{background: token.colorBgContainer, color: token.colorPrimary}}>
            <div className={styles.bottomBarContent}>
                <div className={styles.footerItems}>

                </div>
            </div>
        </Footer>
    );
};

export default BottomBar;