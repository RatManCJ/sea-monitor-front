import React, { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import {Card, Space, Input, message, Button, Drawer} from 'antd';
import queryDataByInfo from './data/queryDataByInfo.js';
import renderPoints from './data/renderPoints.js';

const DateRender = ({ selectedTime, viewer }) => {
    const [siteQuery, setSiteQuery] = useState(''); // 用于存储用户输入的点位编号
    const [siteInfo, setSiteInfo] = useState(null); // 用于存储查询到的点位信息
    const [error, setError] = useState(null); // 错误提示信息
    const [drawerVisible, setDrawerVisible] = useState(false); // 控制抽屉的显示状态
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(true); // 触发粒子效果
        setTimeout(() => setIsClicked(false), 1000); // 1秒后恢复默认状态
        console.log('Button clicked!');
    };

    // 调用渲染函数
    // renderPoints(selectedTime, viewer);

    // 查询点位信息
    const handleSearch = async () => {
        try {
            // 调用异步查询函数
            const data = await queryDataByInfo(siteQuery, viewer);

            console.log('查询结果:', data);
            // 如果返回数据为空
            if (!data || data.length === 0) {
                message.error("未找到相关点位信息");
                setSiteInfo(null); // 清空查询结果
                return;
            }

            // 假设只显示第一个点位的信息
            const foundSite = data[0];
            setSiteInfo(foundSite);

            // 显示成功消息
            message.success(`查询成功：点位编号 ${foundSite.site}`);
        } catch (error) {
            console.error("查询点位信息时发生错误:", error);
            message.error("查询点位信息失败，请稍后再试");
            setSiteInfo(null); // 清空查询结果
        }
    };

// 卡件数据配置
    const cardItems = [
        {
            title: '点位查询',
            icon: <SearchOutlined style={{ color: 'white' }} />,
            content: (
                <div>
                    <Input
                        placeholder="请输入点位编号（如 H00JQ007）"
                        value={siteQuery}
                        onChange={(e) => setSiteQuery(e.target.value)}
                        onPressEnter={handleSearch}
                        style={{
                            marginBottom: 8,
                            color: 'white', // 输入框文字颜色为白色
                            background: 'rgba(255, 255, 255, 0.2)', // 输入框背景颜色
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                        }}
                    />
                    <Button
                        type="primary"
                        icon={<SearchOutlined />}
                        style={{
                            width: '100%',
                            background: isClicked ? '#bfc7e5' : 'rgba(255, 255, 255, 0.1)', // 点击时背景颜色变化
                            borderColor: '#FF1493',
                            color: 'white',
                            transition: 'background 0.3s ease, transform 0.2s ease', // 添加过渡动画
                            transform: isClicked ? 'scale(0.95)' : 'scale(1)', // 点击时缩小按钮
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = '#FF1493'; // 鼠标进入时背景颜色变为粉色
                            e.target.style.borderColor = '#FF1493'; // 边框颜色保持一致
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'rgba(255, 255, 255, 0.1)'; // 鼠标离开时恢复默认背景颜色
                            e.target.style.borderColor = '#FF1493'; // 边框颜色保持一致
                        }}
                        onClick={handleSearch}
                    >
                        Search
                    </Button>
                    {siteInfo && (
                        <div style={{ marginTop: 8, color: 'white' }}>
                            <p><strong>点位编号：</strong>{siteInfo.site}</p>
                            <p><strong>经度：</strong>{siteInfo.longitude}</p>
                            <p><strong>纬度：</strong>{siteInfo.latitude}</p>
                        </div>
                    )}
                </div>
            ),
        },
    ];

    return (
        <div
            style={{
                position: 'fixed',
                left: '260px',
                bottom: '20px',
                zIndex: 1000,
                backgroundColor: 'rgba(0, 0, 0, 0.1)', // 使用与 SideBar 相同的背景颜色
                backdropFilter: 'blur(1px)', // 背景模糊效果
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                padding: '16px',
            }}
        >
            <Space
                direction="vertical"
                size="middle"
                style={{
                    width: '100%',
                    color: 'white', // 设置全局字体颜色为白色
                }}
            >
                {cardItems.map((item, index) => (
                    <Card
                        key={index}
                        title={item.title}
                        extra={item.icon}
                        headStyle={{
                            borderBottom: '1px solid rgba(255, 255, 255, 0.2)', // 标题底部边框颜色
                            color: 'white', // 标题文字颜色
                            background: 'rgba(0, 0, 0, 0.5)', // 标题背景颜色
                        }}
                        bodyStyle={{
                            padding: '12px 16px',
                            color: 'white', // 内容文字颜色
                            background: 'rgba(0, 0, 0, 0.5)', // 内容背景颜色
                        }}
                        style={{
                            width: 300,
                            transition: 'transform 0.2s',
                            borderRadius: '8px',
                            ':hover': {
                                transform: 'translateY(-2px)',
                            },
                        }}
                    >
                        {typeof item.content === 'string'
                            ? <p>{item.content}</p>
                            : item.content}
                    </Card>
                ))}
            </Space>

            {/* 抽屉组件 */}
            <Drawer
                title="点位信息"
                placement="right" // 从右侧弹出
                onClose={() => setDrawerVisible(false)} // 关闭抽屉
                visible={drawerVisible} // 控制抽屉显示状态
                width={300} // 抽屉宽度
                headerStyle={{
                    background: 'rgba(0, 0, 0, 0.7)', // 抽屉标题背景颜色
                    color: 'white', // 抽屉标题文字颜色
                }}
                bodyStyle={{
                    background: 'rgba(0, 0, 0, 0.7)', // 抽屉内容背景颜色
                    color: 'white', // 抽屉内容文字颜色
                }}
            >
                {siteInfo && (
                    <div style={{ color: 'white' }}>
                        <p><strong>点位编号：</strong>{siteInfo.site}</p>
                        <p><strong>经度：</strong>{siteInfo.longitude}</p>
                        <p><strong>纬度：</strong>{siteInfo.latitude}</p>
                    </div>
                )}
            </Drawer>
        </div>
    );
};

export default DateRender;