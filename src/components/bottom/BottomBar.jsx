import React from 'react';
import {Layout, Typography, Button, theme, Space, Card, Select} from 'antd';
import styles from './BottomBar.module.scss';
// Ensure this import path is correct based on your project structure
import WaterQualityTrend from "@components/bottom/trend/WaterQualityTrend.jsx";
import {ScrollRankingBoard} from '@jiaminghi/data-view-react';
// The WaterQualityTrend component definition provided in the prompt is correct
// and already uses width: '100%', height: '100%' for its inner container.
// We'll assume it's imported correctly and works as shown.

const {Footer} = Layout;
const {Text} = Typography;
const {useToken} = theme;

const stackData = [
    {
        "type": "一类",
        "year": "2017",
        "value": 374
    },
    {
        "type": "二类",
        "year": "2017",
        "value": 96
    },
    {
        "type": "三类",
        "year": "2017",
        "value": 98
    },
    {
        "type": "四类",
        "year": "2017",
        "value": 72
    },
    {
        "type": "劣四类",
        "year": "2017",
        "value": 197
    },
    {
        "type": "一类",
        "year": "2018",
        "value": 386
    },
    {
        "type": "二类",
        "year": "2018",
        "value": 88
    },
    {
        "type": "三类",
        "year": "2018",
        "value": 75
    },
    {
        "type": "四类",
        "year": "2018",
        "value": 67
    },
    {
        "type": "劣四类",
        "year": "2018",
        "value": 212
    },
    {
        "type": "一类",
        "year": "2019",
        "value": 402
    },
    {
        "type": "二类",
        "year": "2019",
        "value": 106
    },
    {
        "type": "三类",
        "year": "2019",
        "value": 50
    },
    {
        "type": "四类",
        "year": "2019",
        "value": 35
    },
    {
        "type": "劣四类",
        "year": "2019",
        "value": 179
    },
    {
        "type": "一类",
        "year": "2020",
        "value": 516
    },
    {
        "type": "二类",
        "year": "2020",
        "value": 164
    },
    {
        "type": "三类",
        "year": "2020",
        "value": 75
    },
    {
        "type": "四类",
        "year": "2020",
        "value": 51
    },
    {
        "type": "劣四类",
        "year": "2020",
        "value": 138
    },
    {
        "type": "一类",
        "year": "2021",
        "value": 274
    },
    {
        "type": "二类",
        "year": "2021",
        "value": 40
    },
    {
        "type": "三类",
        "year": "2021",
        "value": 23
    },
    {
        "type": "四类",
        "year": "2021",
        "value": 15
    },
    {
        "type": "劣四类",
        "year": "2021",
        "value": 61
    },
    {
        "type": "一类",
        "year": "2022",
        "value": 245
    },
    {
        "type": "二类",
        "year": "2022",
        "value": 66
    },
    {
        "type": "三类",
        "year": "2022",
        "value": 30
    },
    {
        "type": "四类",
        "year": "2022",
        "value": 32
    },
    {
        "type": "劣四类",
        "year": "2022",
        "value": 102
    },
    {
        "type": "一类",
        "year": "2023",
        "value": 166
    },
    {
        "type": "二类",
        "year": "2023",
        "value": 97
    },
    {
        "type": "三类",
        "year": "2023",
        "value": 13
    },
    {
        "type": "四类",
        "year": "2023",
        "value": 9
    },
    {
        "type": "劣四类",
        "year": "2023",
        "value": 97
    },
    {
        "type": "一类",
        "year": "2024",
        "value": 147
    },
    {
        "type": "二类",
        "year": "2024",
        "value": 55
    },
    {
        "type": "三类",
        "year": "2024",
        "value": 15
    },
    {
        "type": "四类",
        "year": "2024",
        "value": 13
    },
    {
        "type": "劣四类",
        "year": "2024",
        "value": 51
    }
];

const BottomBar = () => {
    const {token} = useToken();

    return (
        <Footer
            className={styles.bottomBar}
            style={{
                // background: token.colorBgContainer,
                // color: token.colorPrimary,
                height: '350px',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                // The SCSS already has display: flex, justify-content: center, align-items: center
                // These center the *content block* within the footer.
                // The inner div will handle filling the height.
            }}
        >
            <Select
                defaultValue="5月"
                style={{
                    width: '6%',
                    height: '100%',
                    background: 'rgba(90,245,44,0.4)',
                    color: 'pink',
                    border: '1px solid rgba(122, 28, 123, 0.8)',
                }}
                dropdownStyle={{
                    background: 'deepPink', // 下拉菜单背景颜色
                    color: 'white', // 下拉菜单文字颜色
                }}
                // onChange={handleMetricChange}
            >
                <Select.Option value="5月">5月</Select.Option>
                {/*<Select.Option value="溶解氧">溶解氧</Select.Option>*/}
                {/*<Select.Option value="化学需氧量">化学需氧量</Select.Option>*/}
                {/*<Select.Option value="无机氮">无机氮</Select.Option>*/}
                {/*<Select.Option value="活性磷酸盐">活性磷酸盐</Select.Option>*/}
                {/*<Select.Option value="石油类">石油类</Select.Option>*/}
                {/*<Select.Option value="水质类别">水质类别</Select.Option>*/}
            </Select>
            {/* This div acts as a flex container to make its children (the Space) fill its height */}
            <div style={{
                width: '100%', // Take full width within footer padding
                height: '100%', // Take full height of the footer
                display: 'flex', // Enable flexbox
                alignItems: 'stretch', // Crucial: Makes items inside the flex container stretch vertically
            }}>
                <Space
                    direction="horizontal"
                    size="small"
                    // align="stretch"
                    style={{
                        height: '100%', // 确保 Space 占满父容器高度
                        width: '100%',  // 占满宽度
                    }}
                >
                    {/*<Card*/}
                    {/*    bordered={false}*/}
                    {/*    headStyle={{*/}
                    {/*        backgroundColor: 'rgba(255, 255, 255, 0.2)',*/}
                    {/*        color: '#ffffff',*/}
                    {/*        fontWeight: 'bold',*/}
                    {/*    }}*/}
                    {/*    bodyStyle={{*/}
                    {/*        backgroundColor: 'rgba(255, 255, 255, 0.1)',*/}
                    {/*        color: '#ffffff',*/}
                    {/*        fontSize: '14px',*/}
                    {/*        overflow: 'hidden',*/}
                    {/*        padding: 0, // Remove padding to allow chart to fill completely*/}
                    {/*    }}*/}
                    {/*    style={{*/}
                    {/*        flex: 5, // 关键点：卡片2也占1份*/}
                    {/*        width: '100%', // Still useful if Space has multiple items and this one should take specific width*/}
                    {/*        height: '100%', // Make Card fill the parent Space item's height*/}
                    {/*        transition: 'transform 0.2s', // Keep original*/}
                    {/*        borderRadius: '8px', // Keep original*/}
                    {/*        // Remove marginBottom: '16px' as it prevents filling the full height*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    <WaterQualityTrend data={stackData}/>*/}
                    {/*</Card>*/}
                    <Card
                        bordered={false}
                        headStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            color: '#ffffff',
                            fontWeight: 'bold',
                        }}
                        bodyStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            color: '#ffffff',
                            fontSize: '14px',
                            overflow: 'hidden',
                        }}
                        style={{
                            flex: 1, // 关键点：卡片2也占1份
                            width: '100%', // Still useful if Space has multiple items and this one should take specific width
                            height: '100%', // Make Card fill the parent Space item's height
                            transition: 'transform 0.2s', // Keep original
                            borderRadius: '8px', // Keep original
                            // Remove marginBottom: '16px' as it prevents filling the full height
                        }}
                    >
                        <ScrollRankingBoard config={config} style={{
                            width: '558px',
                            height: '329px',
                        }} />
                    </Card>

                </Space>
            </div>
        </Footer>
    );
};
const config = {
    color: [ '#EE82EE'],
    data: [
        {
            name: '上海',
            value: 101
        },
        {
            name: '舟山',
            value: 86
        },
        {
            name: '崇明县',
            value: 81
        },
        {
            name: '宁德',
            value: 75
        },
        {
            name: '珠海',
            value: 71
        },
        {
            name: '宁波',
            value: 64
        },
        {
            name: '深圳',
            value: 55
        },
        {
            name: '浦东新区',
            value: 39
        }
    ]
};
export default BottomBar;