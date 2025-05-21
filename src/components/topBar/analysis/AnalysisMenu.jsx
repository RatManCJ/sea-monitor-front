import React, { useState, useRef, useEffect } from 'react';
import { Button, Switch } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { getAllCityByTime, getDataByCityAndYear } from "../../../apis/sea-quality/index.js";

const AnalysisMenu = ({ viewer, selectedTime }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [heatmapEnabled, setHeatmapEnabled] = useState(false); // 开关状态
    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        window.addEventListener('mousedown', handleClickOutside);
        return () => window.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleRenderHeatmap = async () => {
        if (!heatmapEnabled) return null;

        const waterQualityClassifications = ['二类', '三类', '四类', '劣四类'];

        for (const waterQualityClassification of waterQualityClassifications) {
            try {
                console.log(`Fetching data for ${waterQualityClassification}`);
                console.log(`Fetching data for ${selectedTime + " 00:00:00"}`);
                const response = await getAllCityByTime(selectedTime + " 00:00:00", waterQualityClassification);
                if (!Array.isArray(response.data)) {
                    console.error("Expected response.data to be an array", response);
                    continue;
                }
                for (const city of response.data) {
                    console.log(city);
                    // renderHeatmap(city, '2017-05-01 00:00:00', waterQualityClassification);
                    await renderHeatmap(city, selectedTime + " 00:00:00", waterQualityClassification);
                }
            } catch (error) {
                console.error(`Error fetching data for ${waterQualityClassification}:`, error);
            }
        }

        return (
            <div style={{ marginTop: 16 }}>
                <p style={{ color: '#ffffff' }}>热力图已启用</p>
            </div>
        );
    };

    async function renderHeatmap(city, time, waterQualityClassification) {
        try {
            const response = await getDataByCityAndYear(city, time, waterQualityClassification);

            let _south = 90, _north = -90, _east = -180, _west = 180;

            response.data.forEach(location => {
                let lat = parseFloat(location.latitude);
                let lng = parseFloat(location.longitude);

                if (lat > _north) _north = lat;
                if (lat < _south) _south = lat;
                if (lng > _east) _east = lng;
                if (lng < _west) _west = lng;
            });

            let _value;

            switch (waterQualityClassification) {
                case '劣四类':
                    _value = 700;
                    break;
                case '四类':
                    _value = 500;
                    break;
                case '三类':
                    _value = 300;
                    break;
                case '二类':
                    _value = 150;
                    break;
            }

            let points = response.data.map(location => {
                return { x: location.longitude, y: location.latitude, value: _value };
            });

            let cesiumHeatmap = CesiumHeatmap.create(
                viewer,
                {
                    west: _west,
                    south: _south,
                    east: _east,
                    north: _north
                },
                {
                    radius: 300,
                    maxOpacity: 5,
                    minOpacity: 0.5,
                    blur: 1
                }
            );

            cesiumHeatmap.setWGS84Data(0, 1200, points);
        } catch (error) {
            console.error(`Error rendering heatmap for ${city}:`, error);
        }
    }

    useEffect(() => {
        if (heatmapEnabled) {
            handleRenderHeatmap();
        }
    }, [heatmapEnabled]);

    return (
        <div style={{ position: 'relative' }} ref={containerRef}>
            <Button
                type={isOpen ? 'primary' : 'default'}
                onClick={() => setIsOpen(!isOpen)}
            >
                分析
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
                    <Button
                        type="text"
                        shape="circle"
                        icon={<CloseOutlined />}
                        onClick={() => setIsOpen(false)}
                        style={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            zIndex: 10,
                        }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
                        <span style={{ color: '#ffffff' }}>渲染热力图</span>
                        <Switch checked={heatmapEnabled} onChange={(checked) => setHeatmapEnabled(checked)} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnalysisMenu;