import {
    Viewer,
    Ion,
    ScreenSpaceEventHandler,
    Cartographic,
    ScreenSpaceEventType,
    Math as cesiumMath,
    ImageryLayer,
    WebMapTileServiceImageryProvider,
    createWorldTerrainAsync
} from 'cesium';
import {useEffect, useState} from "react";
import {Upload, Button, message, ConfigProvider, theme, Layout} from 'antd';
import styles from './App.module.scss';
import * as Cesium from "cesium";
import TopBar from "@components/topBar/TopBar.jsx";
import SideBar from "@components/sideBar/SideBar.jsx";
import DataRender from '@components/render/DataRender.jsx';
import Legend from './components/rightAndBottom/legend/Legend'; // 引入 Legend 组件
import CesiumNavigation from "cesium-navigation-es6";
import PositionAndLegend from "@components/rightAndBottom/PositionAndLegend.jsx";
import {BrowserRouter as Router, Routes, Route, useNavigate, useParams} from 'react-router-dom';
// 配置导航控件选项（JavaScript对象格式）
const navigationOptions = {
    // 启用指南针
    enableCompass: true,
    // 启用缩放控件
    enableZoomControls: true,
    // 启用距离图例
    enableDistanceLegend: true,
    // 启用罗盘环
    enableCompassRing: true,

    // 自定义选项示例
    defaultResetView: {
        orientation: {
            heading: Cesium.Math.toRadians(0),
            pitch: Cesium.Math.toRadians(-90),
            roll: 0.0
        }
    },
    // 更多可用配置...
};
const App = () => {
    const [viewerState, setViewer] = useState(null);
    const [selectedTime, setSelectedTime] = useState('2017-05-01');
    const [positionInfo, setPositionInfo] = useState({
        longitude: '--',
        latitude: '--',
        height: '--'
    });

    const createViewer = async () => {
        const viewer = new Viewer("cesiumContainer", {
            contextOptions: {webgl: {powerPreference: 'high-performance'}},

            //是否显示 信息窗口
            infoBox: false,
            //是否显示 搜索框
            geocoder: true,
            //是否显示 home
            homeButton: true,
            //是否显示 2d->3d
            sceneModePicker: true,
            //是否显示 图层选择器
            baseLayerPicker: false,
            //是否显示 帮助按钮
            navigationHelpButton: false,
            //-------------------------------------底部的
            //是否显示 播放
            animation: false,
            //是否显示 时间轴
            timeline: false,
            //是否显示 全屏
            fullscreenButton: false,
            shouldAnimate: true,

            // baseLayer: new ImageryLayer(
            //   new WebMapTileServiceImageryProvider({
            //       url: 'http://t0.tianditu.gov.cn/vec_w/wmts?tk=ea280c007d7d86ab4698216ac22c5b7f',
            //       layer: 'tdtBasicLayer',
            //       style: 'default',
            //       format: 'tiles',
            //       tileMatrixSetID: 'w',
            //       subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
            //       maximumLevel: 18,
            //       credit: new Cesium.Credit('天地图')
            //   }),
            //   {}
            // ),
        });

        // viewer.terrainProvider = createWorldTerrainAsync({
        //     requestVertexNormals: true, //开启地形光照
        //     // requestWaterMask: true, // 开启水面波纹
        // });

        //抗锯齿
        viewer.scene.postProcessStages.fxaa.enabled = true;

        // 去除logo
        const logo = viewer.cesiumWidget.creditContainer
        logo.style.display = "none";
        // 显示帧率
        // viewer.scene.debugShowFramesPerSecond = true;
        // viewer.scene.globe.depthTestAgainstTerrain = true;

        // 添加相机变化监听
        viewer.scene.camera.changed.addEventListener(() => {
            updateCameraPosition(viewer);
        });

        // 直接设置相机视角
        viewer.camera.setView({
            destination: Cesium.Cartesian3.fromDegrees(102.548808, 29.563009, 19910652.65),
            orientation: {
                // 指向
                heading: 6.283185307179581,
                // 视角
                pitch: -1.5688168484696687,
                roll: 0.0
            }
        });

        // 立即触发一次初始位置更新
        updateCameraPosition(viewer);

        setViewer(viewer);
        const navigationControl = new CesiumNavigation(viewer, navigationOptions);

        const handler = new ScreenSpaceEventHandler(viewer.scene.canvas);
        handler.setInputAction((e) => {
            const clickPosition = viewer.scene.camera.pickEllipsoid(e.position);
            const randiansPos = Cartographic.fromCartesian(clickPosition);
            console.log(
                "经度：" +
                cesiumMath.toDegrees(randiansPos.longitude) +
                ", 纬度：" +
                cesiumMath.toDegrees(randiansPos.latitude)
            );
        }, ScreenSpaceEventType.LEFT_CLICK);
        return viewer
    }


    useEffect(() => {
        // 初始化Cesium
        Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlZjdlNTE2Mi05MjE4LTQ1OGMtOGQ1ZS0wODdiNzI5YWQxYzYiLCJpZCI6MjI5NDYzLCJpYXQiOjE3MjEzOTA3OTR9.Vyt-kvvNogPDPw4y74AMwsJDHUUBuhHtwyGDuCBDtSw"
        let viewer;
        const fn = async () => {
            viewer = await createViewer();
        }
        fn();
        return () => {
            viewer?.destroy();
        }
    }, []);

    // 添加坐标更新函数
    const updateCameraPosition = (viewer) => {
        const camera = viewer.scene.camera;
        const cartesian = camera.position;

        // 转换坐标系
        const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
        let longitude = Cesium.Math.toDegrees(cartographic.longitude).toFixed(6);
        const latitude = Cesium.Math.toDegrees(cartographic.latitude).toFixed(6);
        const height = cartographic.height.toFixed(2);

        if (longitude > 180) {
            longitude = ((longitude + 180) % 360) - 180;
        } else if (longitude < -180) {
            longitude = ((longitude - 180) % 360) + 180;
        }

        setPositionInfo({
            longitude,
            latitude,
            height: height + '米'
        });
    };

    // 定义时间选择回调函数
    const handleTimeChange = (time) => {
        setSelectedTime(time)
        console.log('选中的时间:', time);
    };
    const {defaultAlgorithm, darkAlgorithm} = theme;

    // 定义自定义 token
    const token = {
        colorBgContainer: 'rgba(122,245,83,0.1)', // 设置容器背景色，透明度为 10%
        borderRadiusLG: 12, // 设置大圆角
        colorPrimary: '#1677ff', // 设置主色调
        fontSize: 14, // 设置默认字体大小
        colorTextBase: 'rgba(255,255,255, 0.6)', // 设置字体颜色为白色
    };

    return (
        <>
            <ConfigProvider
                theme={{
                    algorithm: darkAlgorithm, // 使用黑色主题算法
                    token: token, // 应用自定义 token
                }}>

                {/* 顶部菜单栏*/}
                <TopBar onTimeChange={handleTimeChange}/>
                {/* 左侧菜单栏*/}
                <SideBar/>
                {/*渲染图表*/}
                {/*<DataRender*/}
                {/*    selectedTime={selectedTime}*/}
                {/*    viewer={viewerState}*/}
                {/*/>*/}
                <div className={styles.visualizationContainer}>
                    <div id="cesiumContainer" className={styles.cesiumContainer}/>
                </div>
                <PositionAndLegend positionInfo={positionInfo}/>
                    <Routes>
                        <Route path="/data/:date"
                               element={
                                   <DataRender
                                       viewer={viewerState}/>
                               }/>
                    </Routes>
            </ConfigProvider>
        </>
    );

}

export default App;
