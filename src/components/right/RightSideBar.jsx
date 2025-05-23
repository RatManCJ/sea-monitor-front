import styles from './RightSideBar.module.scss';
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {queryDataByInfo} from "@components/render/data/queryDataByInfo.js";
import {Button, Card, FloatButton, Input, message, Select, Space} from "antd";
import {transformData} from "@components/render/data/transformData.js";
import renderPoints from "@components/render/data/renderPoints.js";
import {QuestionCircleOutlined, SearchOutlined, SyncOutlined} from "@ant-design/icons";
import ColumnRender from "@components/render/ColumnRender.jsx";
import WaterQualityTable from "@components/right/WaterQualityTable.jsx";


const RightSideBar = ({viewer}) => {
    const {date} = useParams(); // 获取路由参数
    const [siteQuery, setSiteQuery] = useState(''); // 用户输入的点位编号
    const [siteInfo, setSiteInfo] = useState('--'); // 查询到的点位信息
    const [isClicked, setIsClicked] = useState(false);
    const [selectedMetric, setSelectedMetric] = useState('pH'); // 当前选中的指标
    // 模拟不同指标的数据
    const [metricData, setMetricData] = useState({
        'pH': [
            {type: '17-05', value: 8.13},
            {type: '17-08', value: 8.10},
            {type: '17-10', value: 8.11},
            {type: '18-05', value: 8.17},
            {type: '18-08', value: 8.15},
            {type: '18-10', value: 8.11},
            {type: '19-05', value: 8.09},
            {type: '19-08', value: 8.05},
            {type: '19-11', value: 8.05},
        ],
        '溶解氧': [
            {type: 'A', value: 9.71},
            {type: 'B', value: 7.33},
            {type: 'C', value: 8.15},
            {type: 'D', value: 10.20},
            {type: 'E', value: 7.58},
        ],
        '化学需氧量': [
            {type: 'A', value: 0.71},
            {type: 'B', value: 1.05},
            {type: 'C', value: 0.96},
            {type: 'D', value: 0.77},
            {type: 'E', value: 0.83},
        ],
        '无机氮': [
            {type: 'A', value: 0.132},
            {type: 'B', value: 0.027},
            {type: 'C', value: 0.045},
            {type: 'D', value: 0.016},
            {type: 'E', value: 0.050},
        ],
        '活性磷酸盐': [
            {type: 'A', value: 0.003},
            {type: 'B', value: 0.006},
            {type: 'C', value: 0.0074},
            {type: 'D', value: 0.005},
            {type: 'E', value: 0.011},
        ],
        '石油类': [
            {type: 'A', value: 0.006},
            {type: 'B', value: 0.009},
            {type: 'C', value: 0.012},
            {type: 'D', value: 0.008},
            {type: 'E', value: 0.010},
        ],
    })

    const handleSearch = async () => {
        try {
            const data = await queryDataByInfo(siteQuery, viewer);

            if (!data || data.length === 0) {
                message.error("未找到相关点位信息");
                setSiteInfo(null);
                return;
            }

            const foundSite = data[0];
            setSiteInfo(foundSite);
            const transformedData = transformData(data, metricData);
            setMetricData(transformedData); // 更新状态
        } catch (error) {
            console.error("查询点位信息时发生错误:", error);
            message.error("查询点位信息失败，请稍后再试");
            setSiteInfo(null);
        }
    };

    // 页面加载时自动发送请求
    useEffect(() => {
        const defaultSiteQuery = 'H00JQ007';
        setSiteQuery(defaultSiteQuery);
        handleSearch(defaultSiteQuery);
        // 重点：传入 onPointSelect 回调
        renderPoints(date, viewer, (info) => {
            setSiteQuery(info.site);
            setSiteInfo({
                site: typeof info.site === 'object' && info.site.getValue ? info.site.getValue() : info.site,
                longitude: typeof info.longitude === 'object' && info.longitude.getValue ? info.longitude.getValue() : info.longitude,
                latitude: typeof info.latitude === 'object' && info.latitude.getValue ? info.latitude.getValue() : info.latitude,
            });
            // 你可以根据需要自动查询详细信息
            // handleSearch(info.site);
        });

    }, [date, viewer]);

    // 根据选中的指标获取当前数据
    const currentChartData = metricData[selectedMetric];

    // 柱状图配置
    const barChartConfig = {
        data: currentChartData,
        xField: 'type',
        yField: 'value',
        columnWidthRatio: 0.6,
        color: '#FF1493',
        xAxis: {
            label: {
                style: {
                    fill: '#ec9d9d', // X轴标签文字颜色为白色
                },
            },
        },
        yAxis: {
            min: 6.50, // 设置y轴起始值为6.5
            max: 9.00, // 设置y轴最大值（根据数据调整）
            tickInterval: 0.05, // 设置y轴刻度间隔为0.05
            label: {
                style: {
                    fill: '#ffffff', // Y轴标签文字颜色为白色
                },
            },
        },
        tooltip: {
            domStyles: {
                'g2-tooltip': {
                    color: 'blue', // 提示框文字颜色为白色
                }
            }
        },
        slider: {
            defaultCfg: {
                backgroundStyle: {
                    stroke: 'rgba(255, 255, 255, 0.5)', // 滑块背景颜色较淡
                },
                foregroundStyle: {
                    stroke: 'white', // 滑块前景色（即选中部分的颜色）
                },
                handlerStyle: {
                    fill: 'white', // 滑块手柄颜色
                    stroke: 'rgba(122,245,83,0.1)', // 滑块手柄边框颜色
                },
            },
        },
        theme: {
            styleSheet: {
                fontFamily: 'Arial, sans-serif', // 设置字体
                backgroundColor: 'rgba(243,235,235,0.9)', // 背景颜色
            }
        }
    };
    // 卡件数据配置
    const cardItems = [
        {
            title: '点位查询',
            icon: <SearchOutlined style={{color: 'white'}}/>,
            content: (
                <div>
                    <Input
                        placeholder="H00JQ007"
                        value={siteQuery}
                        onChange={(e) => setSiteQuery(e.target.value)}
                        onPressEnter={handleSearch}
                        style={{
                            marginBottom: 8,
                            color: 'white',
                            background: 'rgba(255, 255, 255, 0.2)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                        }}
                    />
                    <Button
                        type="primary"
                        icon={<SearchOutlined/>}
                        style={{
                            width: '100%',
                            background: isClicked ? '#bfc7e5' : 'rgba(255, 255, 255, 0.1)',
                            borderColor: 'rgba(7,26,1,0.1)',
                            color: 'white',
                            transition: 'background 0.3s ease, transform 0.2s ease',
                            transform: isClicked ? 'scale(0.95)' : 'scale(1)',
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = '#FF1493';
                            e.target.style.borderColor = '#FF1493';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                            e.target.style.borderColor = '#FF1493';
                        }}
                        onClick={handleSearch}
                    >
                        Search
                    </Button>
                    {siteInfo && (
                        <div style={{marginTop: 8, color: 'white'}}>
                            <p><strong>点位编号：</strong>{siteInfo.site}</p>
                            <p><strong>经度：</strong>{siteInfo.longitude}</p>
                            <p><strong>PH：</strong>
                                <span style={{
                                    color:
                                        (siteInfo.ph >= 7.8 && siteInfo.ph <= 8.5)
                                            ? 'green'
                                            : (siteInfo.ph >= 6.8 && siteInfo.ph <= 8.8)
                                                ? 'orange'
                                                : 'red'
                                }}>
                                    {siteInfo.ph}||一二类：7.8-8.5;三四类：6.8-8.8
                                </span>
                            </p>
                            <p><strong>溶解氧：</strong>
                                <span style={{
                                    color:
                                        (siteInfo.dissolvedOxygen >= 6)
                                            ? 'green'
                                            : (siteInfo.dissolvedOxygen >= 5)
                                                ? 'yellow'
                                                : (siteInfo.dissolvedOxygen >= 4)
                                                    ? 'orange'
                                                    : (siteInfo.dissolvedOxygen >= 3)
                                                        ? 'red'
                                                        : 'gray'
                                }}>
                                    {siteInfo.dissolvedOxygen}||一类：≥6;二类：≥5;三类：≥4;四类：≥3;
                                </span>
                            </p>
                            <p>
                                <strong>化学需氧量：</strong>
                                <span style={{
                                    color:
                                        (siteInfo.chemicalOxygenDemand <= 2)
                                            ? 'green'
                                            : (siteInfo.chemicalOxygenDemand <= 3)
                                                ? 'yellow'
                                                : (siteInfo.chemicalOxygenDemand <= 4)
                                                    ? 'orange'
                                                    : (siteInfo.chemicalOxygenDemand <= 5)
                                                        ? 'red'
                                                        : 'gray'
                                }}>
    {siteInfo.chemicalOxygenDemand}
  </span>
                            </p>

                            <p>
                                <strong>无机氮：</strong>
                                <span style={{
                                    color:
                                        (siteInfo.inorganicNitrogen <= 0.2)
                                            ? 'green'
                                            : (siteInfo.inorganicNitrogen <= 0.3)
                                                ? 'yellow'
                                                : (siteInfo.inorganicNitrogen <= 0.4)
                                                    ? 'orange'
                                                    : (siteInfo.inorganicNitrogen <= 0.5)
                                                        ? 'red'
                                                        : 'gray'
                                }}>
    {siteInfo.inorganicNitrogen}||一类：≤2；二类：≤3；三类：≤4；四类：≤5
  </span>
                            </p>

                            <p>
                                <strong>活性磷酸盐：</strong>
                                <span style={{
                                    color:
                                        (siteInfo.activePhosphate <= 0.015)
                                            ? 'green'
                                            : (siteInfo.activePhosphate <= 0.03)
                                                ? 'yellow'
                                                : (siteInfo.activePhosphate <= 0.045)
                                                    ? 'orange'
                                                    : 'red'
                                }}>
    {siteInfo.activePhosphate}||一类：≤0.015；二、三类：≤0.03；四类：≤0.045
  </span>
                            </p>

                            <p>
                                <strong>石油类：</strong>
                                <span style={{
                                    color:
                                        (siteInfo.petroleum <= 0.05)
                                            ? 'green'
                                            : (siteInfo.petroleum <= 0.3)
                                                ? 'yellow'
                                                : (siteInfo.petroleum <= 0.5)
                                                    ? 'orange'
                                                    : 'red'
                                }}>
    {siteInfo.petroleum}||一类：≤0.05；二类：≤0.3；三类：≤0.5
  </span>
                            </p>
                            <p><strong>水质类别：</strong>
                                <span style={{
                                    color:
                                        (siteInfo.waterQualityClassification === '一类')
                                            ? 'green'
                                            : (siteInfo.waterQualityClassification === '二类')
                                                ? 'yellow'
                                                : (siteInfo.waterQualityClassification === '三类')
                                                    ? 'orange'
                                                    : (siteInfo.waterQualityClassification === '四类')
                                                        ? 'red'
                                                        : 'gray'
                                }}>
                                    {siteInfo.waterQualityClassification}
                                </span>
                            </p>
                        </div>
                    )}
                </div>
            ),
        },
        {
            title: '柱状图示例',
            icon: null,
            content: (
                <div>
                    {/* 下拉菜单 */}
                    <Select
                        defaultValue="pH"
                        style={{
                            width: '100%',
                            marginBottom: 16,
                            background: 'rgba(90,245,44,0.4)',
                            color: 'pink',
                            border: '1px solid rgba(122, 28, 123, 0.8)',
                        }}
                        dropdownStyle={{
                            background: 'deepPink', // 下拉菜单背景颜色
                            color: 'white', // 下拉菜单文字颜色
                        }}
                        onChange={(value) => setSelectedMetric(value)}
                    >
                        <Select.Option value="pH">pH</Select.Option>
                        <Select.Option value="溶解氧">溶解氧</Select.Option>
                        <Select.Option value="化学需氧量">化学需氧量</Select.Option>
                        <Select.Option value="无机氮">无机氮</Select.Option>
                        <Select.Option value="活性磷酸盐">活性磷酸盐</Select.Option>
                        <Select.Option value="石油类">石油类</Select.Option>
                    </Select>

                    {/* 柱状图 */}
                    <div style={{height: '200px'}}>
                        <ColumnRender
                            metricData={currentChartData}
                        />
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div className={`${styles.rightSidebar}`}
             style={{
                 position: 'fixed',
                 bottom: '20px',
                 zIndex: 1000,
                 backgroundColor: 'rgba(0, 0, 0, 0.1)',
                 backdropFilter: 'blur(1px)',
                 borderRadius: '8px',
                 boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                 padding: '16px',
             }}>
            <Space
                direction="vertical"
                size="middle"
                style={{
                    width: '100%',
                    color: 'white',
                }}
            >
                {cardItems.map((item, index) => (
                    <Card
                        key={index}
                        title={item.title}
                        extra={item.icon}
                        headStyle={{
                            borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                            color: 'white',
                            background: 'rgba(236,83,83,0.5)',
                        }}
                        bodyStyle={{
                            padding: '12px 16px',
                            color: 'pink',
                            background: 'rgba(122,245,83,0.1)',
                            gap: '12px', // 设置间距
                        }}
                        style={{
                            width: '100%',
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
        </div>
    );
};

export default RightSideBar;