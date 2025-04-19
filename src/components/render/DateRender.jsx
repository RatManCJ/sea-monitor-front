import React from 'react';
import {CommentOutlined, CustomerServiceOutlined, LikeOutlined} from '@ant-design/icons';
import {Card, Space} from 'antd';
import {getDataByTime} from '../../apis/sea-quality/index.js';
import {WaterQuality} from "@components/entity/WaterQuality.js";

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
            return response.data.map(item => new WaterQuality());
        } catch (error) {
            console.error('完整错误信息:', {
                message: error.message,
                response: error.response?.data
            });
            throw error;
        }
    }
    getData(selectedTime).then(r => console.log("success")).catch(error => console.error('Error:', error));

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