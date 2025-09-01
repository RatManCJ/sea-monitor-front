import React, {useState, useRef, useEffect} from 'react';
import {Button, Radio} from 'antd';
import DarkGaoDe from '../../../assets/map_logo/g_map_1_s.png';
import Vector from '../../../assets/map_logo/g_map_1.png';
import Image from '../../../assets/map_logo/t_map_2.png';
import Topographic from '../../../assets/map_logo/t_map_3.png';
import Annotation from '../../../assets/map_logo/t_map_5.png';
import {
    imageLayer,
    baseLayer,
    topographicLayer,
    annotationLayer
} from '../../../const/index.jsx'
import * as Cesium from "cesium";
import {CloseOutlined} from '@ant-design/icons';

const ImportMenu = ({viewer}) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    // 图源选项数据
    const sourceOptions = [
        {
            label: '影像图层',
            value: 'image',
            imgSrc: Image,
        },
        {
            label: '矢量底图',
            value: 'vector',
            imgSrc: Vector,
        },
        {
            label: '地形晕渲',
            value: 'topographic',
            imgSrc: Topographic,
        },
        {
            label: '地图注记',
            value: 'annotation',
            imgSrc: Annotation,
        },
    ];

    useEffect(() => {
        /**
         * 关闭下拉菜单的处理函数。
         */
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        // 绑定事件，当窗口被点击时触发
        window.addEventListener('mousedown', handleClickOutside);

        // 清理事件监听器
        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelectChange = (e) => {
        viewer.imageryLayers.removeAll();
        switch (e.target.value) {
            case 'vector':
                viewer.imageryLayers.addImageryProvider(new window.Cesium.WebMapTileServiceImageryProvider({
                    url: baseLayer,
                    layer: "tdtVecBasicLayer",
                    style: 'default',
                    format: 'tiles',
                    tileMatrixSetID: 'w',
                    subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
                    maximumLevel: 18,
                }))
                break;
            case 'image':
                viewer.imageryLayers.addImageryProvider(new window.Cesium.WebMapTileServiceImageryProvider({
                    url: imageLayer,
                    layer: "tdtImgBasicLayer",
                    style: 'default',
                    format: 'tiles',
                    tileMatrixSetID: 'w',
                    subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
                    maximumLevel: 18,
                }))
                break;
            case 'topographic':
                viewer.imageryLayers.addImageryProvider(new window.Cesium.WebMapTileServiceImageryProvider({
                    url: topographicLayer,
                    layer: "tdtTerrainBasicLayer",
                    style: 'default',
                    format: 'tiles',
                    tileMatrixSetID: 'w',
                    subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
                    maximumLevel: 18,
                }))
            case 'annotation':
                viewer.imageryLayers.addImageryProvider(new window.Cesium.WebMapTileServiceImageryProvider({
                    url: annotationLayer,
                    layer: "tdtAnnotationBasicLayer",
                    style: 'default',
                    format: 'tiles',
                    tileMatrixSetID: 'w',
                    subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
                    maximumLevel: 18,
                }))
        }
    };

    return (
        <div style={{position: 'relative'}} ref={containerRef}>
            <Button
                type={isOpen ? 'primary' : 'default'}
                onClick={() => setIsOpen(!isOpen)}
            >
                导入
            </Button>
            {isOpen && (
                <div style={{
                    position: 'absolute',
                    top: 70,
                    left: 0,
                    background: '#fff',
                    padding: 16,
                    borderRadius: 8,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    backgroundColor: 'rgba(7,26,1,0.6)',
                    width: '300px',
                }}>
                    {/* 添加关闭按钮 */}
                    <Button
                        type="text"
                        shape="circle"
                        icon={<CloseOutlined/>}
                        onClick={() => setIsOpen(false)}
                        style={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            zIndex: 10,
                        }}
                    />
                    <div>
                        <h2 style={{margin: 0, color: '#ffffff', fontSize: '18px'}}>天地图</h2>
                    </div>
                    <Radio.Group onChange={handleSelectChange} defaultValue="image">
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '16px',
                        }}>
                            {sourceOptions.map((option, index) => (
                                <div key={index}
                                     style={{
                                         display: 'flex',
                                         flexDirection: 'column',
                                         alignItems: 'center',
                                         flex: '0 0 auto',
                                         width: '120px',
                                     }}>
                                    <img src={option.imgSrc} alt={option.label}
                                         style={{
                                             width: '100px',
                                             height: '100px',
                                             objectFit: 'cover',
                                             marginBottom: '8px'
                                         }}/>
                                    <Radio value={option.value} style={{whiteSpace: 'nowrap'}}>
                                        {option.label}
                                    </Radio>
                                </div>
                            ))}
                        </div>
                    </Radio.Group>
                </div>
            )}
        </div>
    );
};

export default ImportMenu;