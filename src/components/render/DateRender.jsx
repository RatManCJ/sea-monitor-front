import React, {useEffect} from 'react';
import {CommentOutlined, CustomerServiceOutlined, LikeOutlined} from '@ant-design/icons';
import {Card, Space} from 'antd';
import {getDataByTime} from '../../apis/sea-quality/index.js';
import {WaterQuality} from "@components/entity/WaterQuality.js";
import * as Cesium from "cesium";

// // 热力图配置
// const HEATMAP_CONFIG = {
//     radius: 40,
//     maxOpacity: 0.7,
//     gradient: {
//         '0.4': 'blue',
//         '0.6': 'cyan',
//         '0.7': 'lime',
//         '0.8': 'yellow',
//         '1.0': 'red'
//     }
// };
const DateRender = ({selectedTime, viewer}) => {
    console.log(selectedTime)

    const getData = async (selectedTime) => {
        try {
            console.log("Request time:", selectedTime);
            const response = await getDataByTime(selectedTime + " 00:00:00");

            // 修改后 ✅
            return response.data.map(item => new WaterQuality(
                item.id,
                item.sea,
                item.province,
                item.city,
                item.site,
                item.longitude,
                item.latitude,
                item.monitorMonth,
                item.pH,
                item.dissolvedOxygen,
                item.chemicalOxygenDemand,
                item.inorganicNitrogen,
                item.activePhosphate,
                item.petroleum,
                item.waterQualityClassification
            ));
        } catch (error) {
            console.error('完整错误信息:', {
                message: error.message,
                response: error.response?.data
            });
            throw error;
        }
    }
    useEffect(() => {
        if (!viewer) {
            console.error("Cesium Viewer 未初始化");
            return;
        }

        // 获取数据并渲染到 Cesium
        getData(selectedTime)
            .then(data => {
                console.log("成功获取数据:", data);

                // 清空之前的实体
                viewer.entities.removeAll();

                // 遍历数据并创建 Cesium 点实体
                data.forEach(item => {
                    const longitude = parseFloat(item.longitude); // 经度
                    const latitude = parseFloat(item.latitude); // 纬度

                    if (isNaN(longitude) || isNaN(latitude)) {
                        console.warn(`无效的经纬度数据: ${item.longitude}, ${item.latitude}`);
                        return;
                    }

                    // 创建 Cesium 点实体
                    viewer.entities.add({
                        position: Cesium.Cartesian3.fromDegrees(longitude, latitude),
                        point: {
                            pixelSize: 3, // 点的大小
                            color: getColorByWaterQuality(item.waterQualityClassification), // 根据水质类别设置颜色
                            outlineColor: Cesium.Color.BLACK,
                            outlineWidth: 0.5
                        },
                    });
                });

                // 调整视角到数据点范围
                if (data.length > 0) {
                    const positions = data.map(item =>
                        Cesium.Cartesian3.fromDegrees(parseFloat(item.longitude), parseFloat(item.latitude))
                    );
                    viewer.zoomTo(viewer.entities);
                }
            })
            .catch(error => console.error('Error:', error));
    }, [selectedTime, viewer]);

    // 根据水质类别返回颜色
    const getColorByWaterQuality = (classification) => {
        switch (classification) {
            case '一类':
                return Cesium.Color.GREEN;
            case '二类':
                return Cesium.Color.YELLOW;
            case '三类':
                return Cesium.Color.ORANGE;
            case '四类':
                return Cesium.Color.RED;
            default:
                return Cesium.Color.GRAY;
        }
    };
    // 卡件数据配置
    const cardItems = [
        {
            title: '数据分析',
            icon: <CommentOutlined/>,
            content: [
                '实时数据监测',
                '历史数据查询',
                '统计报表生成'
            ]
        },
        {
            title: '用户反馈',
            icon: <CustomerServiceOutlined/>,
            content: [
                '最新用户留言',
                '服务请求处理',
                '满意度统计'
            ]
        },
        {
            title: '系统状态',
            icon: <LikeOutlined/>,
            content: [
                '服务器负载',
                '存储空间监控',
                '网络状态检测'
            ]
        }
    ];

    return (
        <div style={{
            position: 'fixed',
            right: '20px',
            top: '100px',
            zIndex: 1000,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            padding: '16px'
        }}>
            <Space direction="vertical" size="middle" style={{width: '100%'}}>
                {cardItems.map((item, index) => (
                    <Card
                        key={index}
                        title={item.title}
                        extra={item.icon}
                        headStyle={{borderBottom: '1px solid #f0f0f0'}}
                        bodyStyle={{padding: '12px 16px'}}
                        style={{
                            width: 300,
                            transition: 'transform 0.2s',
                            borderRadius: '8px',
                            ':hover': {
                                transform: 'translateY(-2px)'
                            }
                        }}
                    >
                        {item.content.map((text, i) => (
                            <p key={i} style={{margin: '8px 0'}}>{text}</p>
                        ))}
                    </Card>
                ))}
            </Space>
        </div>
    );
};

export default DateRender;