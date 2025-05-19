import React, {useState, useRef, useEffect} from 'react';
import {Button, Checkbox} from 'antd';
import {CloseOutlined} from '@ant-design/icons';

// 自定义组件用于显示SVG图标
const LineIcon = () => (
    <svg t="1747641454634" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
         p-id="1759" style={{width: '20px', height: '20px', display: 'inline-block'}}>
        <path
            d="M324.608 598.592l242.336 166.592a16 16 0 0 0 23.072-5.472L926.112 120.576a16 16 0 1 0-28.064-15.424L570.496 728.8l-241.44-165.984a16 16 0 0 0-22.56 4.608L99.136 903.04a16 16 0 0 0 27.008 17.184l198.464-321.664z"
            fill="#FFFFFF" p-id="1760"></path>
    </svg>
);


const PolygonIcon = () => (
    <svg t="1747641537289" className="icon" viewBox="0 0 1100 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
         p-id="11356" style={{width: '20px', height: '20px', display: 'inline-block'}}>
        <path
            d="M997.166 933.875l-907.041-4.347 84.004-682.007 717.936-157.395 105.101 843.75zM176.814 853.196l733.407 3.579-83.876-673.696-582.787 127.732-66.743 542.383z"
            fill="#FFFFFF"
            p-id="11357"></path>
    </svg>
);
const SourceMenu = ({viewer}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [layers, setLayers] = useState({
        divisionFill: false,
        division: false,
        nationalBoundary: false,
    });

    const containerRef = useRef(null);

    // 点击外部区域关闭菜单
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // 图层加载/移除逻辑
    useEffect(() => {
        if (viewer === null) return;
        const loadLayer = async (layerName, url) => {
            if (layers[layerName]) {
                removeLayer(layerName); // 防止重复加载
                const dataSource = await window.Cesium.GeoJsonDataSource.load(url, {});
                dataSource.name = layerName;
                await viewer.dataSources.add(dataSource);
            } else {
                removeLayer(layerName);
            }
        };

        const removeLayer = (layerName) => {
            const ds = viewer.dataSources._dataSources.find(ds => ds.name === layerName);
            if (ds) {
                viewer.dataSources.remove(ds);
            }
        };

        loadLayer('divisionFill', '/geojson/china_fill.json');
        loadLayer('division', '/geojson/china_division.json');
        loadLayer('nationalBoundary', '/geojson/china_boundary.json');

    }, [layers, viewer]);

    // 切换图层状态
    const toggleLayer = (layerName) => {
        setLayers(prev => ({
            ...prev,
            [layerName]: !prev[layerName],
        }));
    };

    // 单独处理删除操作
    const handleRemoveLayer = (layerName) => {
        setLayers(prev => ({
            ...prev,
            [layerName]: false,
        }));

        const ds = viewer.dataSources._dataSources.find(ds => ds.name === layerName);
        if (ds) {
            viewer.dataSources.remove(ds);
        }
    };

    return (
        <div style={{position: 'relative'}} ref={containerRef}>
            <Button
                type={isOpen ? 'primary' : 'default'}
                onClick={() => setIsOpen(!isOpen)}
            >
                图层
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
                    {/* 关闭按钮 */}
                    <Button
                        type="text"
                        shape="circle"
                        icon={<CloseOutlined/>}
                        onClick={() => setIsOpen(false)}
                        style={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                        }}
                    />

                    <div>
                        <h2 style={{margin: 0, color: '#ffffff', fontSize: '18px'}}>系统图层</h2>
                    </div>

                    {/* 图层复选框 + 删除按钮 */}
                    <div style={{display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16}}>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Checkbox
                                checked={layers.divisionFill}
                                onChange={() => toggleLayer('divisionFill')}
                            >
                                行政区划面图层

                            </Checkbox>
                            <PolygonIcon/>
                        </div>

                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Checkbox
                                checked={layers.division}
                                onChange={() => toggleLayer('division')}
                            >
                                行政区划线图层
                            </Checkbox>
                            <LineIcon/>
                        </div>

                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Checkbox
                                checked={layers.nationalBoundary}
                                onChange={() => toggleLayer('nationalBoundary')}
                            >
                                国界线图层
                            </Checkbox>
                            <LineIcon/>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SourceMenu;