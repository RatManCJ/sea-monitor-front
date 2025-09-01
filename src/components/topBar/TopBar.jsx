import React, {useState} from 'react';
import {Layout, TreeSelect, Typography, theme, Button} from 'antd';
import styles from './TopBar.module.scss';
import DropDate from "@components/topBar/time/DropDate.jsx"; // 引入SCSS文件

const {Header} = Layout;
const {Title, Text} = Typography;
const {useToken} = theme;
import layerImg from '../../assets/map_logo/g_map_1.png';
import sourceImg from '../../assets/map_logo/t_map_2.png';
import analysisImg from '../../assets/map_logo/t_map_3.png';
import LayerMenu from "./layer/LayerMenu.jsx";
import SourceMenu from "./source/SourceMenu.jsx";
import AnalysisMenu from "./analysis/AnalysisMenu.jsx";
import ImportMenu from "@components/topBar/import/ImportMenu.jsx";
import ExportMenu from "@components/topBar/export/ExportMenu.jsx";
import AboutMenu from "@components/topBar/about/AboutMenu.jsx";
import ToolMenu from "@components/topBar/tool/ToolMenu.jsx";

const TopBar = ({selectedTime, viewer}) => {
    // const [isTreeSelectVisible, setIsTreeSelectVisible] = useState(true); // 控制选择框是否可见
    const {token} = useToken();

    const [value, setValue] = useState();

    return (
        <Header className={styles.topBar}
                style={{
                    background: token.colorBgContainer,
                    color: token.colorPrimary,
                    zIndex: 2,
                }}>

            <div style={{
                display: 'flex',
                gap: '16px',
                marginLeft: '300px'
            }}>
                <LayerMenu viewer={viewer}/>
                <SourceMenu viewer={viewer}/>
                <AnalysisMenu viewer={viewer} selectedTime={selectedTime}/>
            </div>
            <div className={styles.topBarContent}>
                <div className={styles.navItems}>
                    <Title className={styles.title}>近海水质信息可视化系统</Title>
                </div>
                <div className={styles.rightControls}>
                    <DropDate/>

                </div>
                <div style={{
                    display: 'flex',
                    gap: '16px',
                    // marginRight: '400px'
                }}>
                    <ImportMenu viewer={viewer}/>
                    <ExportMenu viewer={viewer}/>
                    <ToolMenu viewer={viewer}/>
                    <AboutMenu viewer={viewer}/>
                </div>
            </div>
        </Header>
    );
};

export default TopBar;