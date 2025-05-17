import React, {useState} from 'react';
import {TreeSelect, Card, Select, Space} from 'antd';
import styles from './SideBar.module.scss';
import WaterQualityDistribution from "@components/sideBar/distribution/WaterQualityDistribution.jsx";
import WaterQualityComparison from "@components/sideBar/comparison/WaterQualityComparison.jsx";

const {TreeNode} = TreeSelect;

const comparisonMockData = [
    {sea: '东海', type: '一类', value: 30},
    {sea: '东海', type: '二类', value: 20},
    {sea: '东海', type: '三类', value: 15},
    {sea: '东海', type: '四类', value: 25},

    {sea: '南海', type: '一类', value: 40},
    {sea: '南海', type: '二类', value: 10},
    {sea: '南海', type: '三类', value: 20},
    {sea: '南海', type: '四类', value: 15},

    {sea: '西海', type: '一类', value: 20},
    {sea: '西海', type: '二类', value: 30},
    {sea: '西海', type: '三类', value: 10},
    {sea: '西海', type: '四类', value: 25},
];

const distributionMockData = [
    { type: '优质水', value: 10 },
    { type: '良好水', value: 20 },
    { type: '一般水', value: 15 },
    { type: '较差水', value: 5 },
    { type: '污水', value: 2 },
];

// 示例数据源，可以根据实际需求进行调整
const treeData = [
    {
        title: '黄海',
        value: '黄海',
        children: [
            {
                title: '辽宁省',
                value: '辽宁省',
                children: [
                    {title: '丹东市', value: '丹东市'},
                    // 可以继续添加更多城市
                ],
            },
            // 可以继续添加更多省份
        ],
    },
    // 可以继续添加更多海区
];

const SideBar = () => {
    const [value, setValue] = useState();
    const [selectedMetric, setSelectedMetric] = useState('pH');

    const handleMetricChange = (value) => {
        setSelectedMetric(value);
        // 这里可以添加逻辑处理选中的指标变化，例如更新图表数据等
    };
    const onChange = (newValue) => {
        console.log(newValue);
        setValue(newValue);
    };

    return (
        <>
            <div className={`${styles.sidebar} ${false ? styles.collapsed : ''}`}
                 style={{
                     position: 'fixed',
                     bottom: '20px',
                     zIndex: 1000,
                     backgroundColor: 'rgba(0, 0, 0, 0.1)',
                     backdropFilter: 'blur(1px)',
                     borderRadius: '8px',
                     boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                     padding: '16px',
                 }}

            >
                <Space
                    direction="vertical"
                    size="small"
                    style={{
                        width: '100%',
                        color: 'white',
                    }}
                >
                    {/* 使用卡片包裹多级搜索树、水质饼图和选择器 */}
                    <Card
                        title="水质信息分布"
                        headStyle={{
                            borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                            color: 'white',
                            background: 'rgba(236,83,83,0.5)',
                        }}
                        bodyStyle={{
                            padding: '12px 16px',
                            color: 'white',
                            background: 'rgba(122,245,83,0.1)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px', // 设置间距
                        }}
                        style={{
                            width: '100%',
                            transition: 'transform 0.2s',
                            borderRadius: '8px',
                            marginBottom: '16px', // 为美观添加的外边距
                        }}
                    >
                        {/* 添加多级搜索树 */}
                        <TreeSelect
                            style={{
                                width: '100%',
                                background: 'rgba(90,245,44,0.4)',
                                color: 'pink',
                                border: '1px solid rgba(122, 28, 123, 0.8)',
                            }}
                            value={value}
                            dropdownStyle={{
                                maxHeight: 400, overflow: 'auto',
                            }}
                            treeData={treeData}
                            placeholder="请选择区域"
                            treeDefaultExpandAll
                            onChange={onChange}
                        />

                        {/* 水质饼图 */}
                        {/* 调整饼图大小并确保其与其它元素紧凑排列 */}
                        <WaterQualityDistribution data={distributionMockData} style={{height: '200px'}}/>
                        {/*<WaterQualityComparison data={comparisonMockData} style={{height: '200px'}}/>*/}
                        {/* 新增：不同海域水质信息对比图表 */}
                        {/*<WaterQualityComparison data={distributionMockData} style={{ height: '200px'}}/>*/}
                        {/* 添加下拉框 */}
                        <Select
                            defaultValue="pH"
                            style={{
                                width: '100%',
                                background: 'rgba(90,245,44,0.4)',
                                color: 'pink',
                                border: '1px solid rgba(122, 28, 123, 0.8)',
                            }}
                            dropdownStyle={{
                                background: 'deepPink', // 下拉菜单背景颜色
                                color: 'white', // 下拉菜单文字颜色
                            }}
                            onChange={handleMetricChange}
                        >
                            <Select.Option value="pH">pH</Select.Option>
                            <Select.Option value="溶解氧">溶解氧</Select.Option>
                            <Select.Option value="化学需氧量">化学需氧量</Select.Option>
                            <Select.Option value="无机氮">无机氮</Select.Option>
                            <Select.Option value="活性磷酸盐">活性磷酸盐</Select.Option>
                            <Select.Option value="石油类">石油类</Select.Option>
                            <Select.Option value="水质类别">水质类别</Select.Option>
                        </Select>
                    </Card>
                    <Card
                        title="水质信息分布"
                        headStyle={{
                            borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                            color: 'white',
                            background: 'rgba(236,83,83,0.5)',
                        }}
                        bodyStyle={{
                            padding: '12px 16px',
                            color: 'white',
                            background: 'rgba(122,245,83,0.1)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px', // 设置间距
                        }}
                        style={{
                            width: '100%',
                            transition: 'transform 0.2s',
                            borderRadius: '8px',
                            marginBottom: '16px', // 为美观添加的外边距
                        }}
                    >
                        {/* 添加多级搜索树 */}
                        <TreeSelect
                            style={{
                                width: '100%',
                                background: 'rgba(90,245,44,0.4)',
                                color: 'pink',
                                border: '1px solid rgba(122, 28, 123, 0.8)',
                            }}
                            value={value}
                            dropdownStyle={{
                                maxHeight: 400, overflow: 'auto',
                            }}
                            treeData={treeData}
                            placeholder="请选择区域"
                            treeDefaultExpandAll
                            onChange={onChange}
                        />

                        {/* 水质饼图 */}
                        {/* 调整饼图大小并确保其与其它元素紧凑排列 */}
                        {/*<WaterQualityDistribution data={treeData} style={{height: '200px'}}/>*/}
                        <WaterQualityComparison data={comparisonMockData} style={{height: '200px'}}/>
                        {/* 新增：不同海域水质信息对比图表 */}
                        {/*<WaterQualityComparison data={distributionMockData} style={{ height: '200px'}}/>*/}
                        {/* 添加下拉框 */}
                        <Select
                            defaultValue="pH"
                            style={{
                                width: '100%',
                                background: 'rgba(90,245,44,0.4)',
                                color: 'pink',
                                border: '1px solid rgba(122, 28, 123, 0.8)',
                            }}
                            dropdownStyle={{
                                background: 'deepPink', // 下拉菜单背景颜色
                                color: 'white', // 下拉菜单文字颜色
                            }}
                            onChange={handleMetricChange}
                        >
                            <Select.Option value="pH">pH</Select.Option>
                            <Select.Option value="溶解氧">溶解氧</Select.Option>
                            <Select.Option value="化学需氧量">化学需氧量</Select.Option>
                            <Select.Option value="无机氮">无机氮</Select.Option>
                            <Select.Option value="活性磷酸盐">活性磷酸盐</Select.Option>
                            <Select.Option value="石油类">石油类</Select.Option>
                            <Select.Option value="水质类别">水质类别</Select.Option>
                        </Select>
                    </Card>
                </Space>
            </div>
        </>
    );
};

export default SideBar;