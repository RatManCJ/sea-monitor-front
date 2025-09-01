import {Column} from '@antv/g2plot';
import React, {useEffect, useRef} from 'react';

const createColumn = (container, data) => {
    // 计算数据的最大值和最小值
    if (!data || data.length === 0) {
        console.error('Invalid data:', data);
        return null;
    }

// 1. 按 year 分组，并累加 value
    const seaSumMap = {};
    let minNumber = Number.MAX_VALUE;
    data.forEach(item => {
        const sea = item.sea;
        const value = parseFloat(item.value); // 确保是数字

        if (!seaSumMap[sea]) {
            seaSumMap[sea] = 0;
        }

        seaSumMap[sea] += value;
        minNumber = Math.min(minNumber, value);
    });

// 2. 获取每年总值数组
    const seaSums = Object.values(seaSumMap);

// 3. 计算最大值和最小值
    const maxValue = Math.max(...seaSums);
    const minValue = minNumber;

// 4. 动态设置 y 轴的范围
// 先对 maxValue 和 minValue 做处理
    const yAxisMax = Math.round(maxValue); // 四舍五入到整数
    const yAxisMinRaw = Math.round(minValue); // 四舍五入到整数
    const yAxisMin = yAxisMinRaw > 0 ? yAxisMinRaw : 0; // 确保不小于 0

    const tickInterval = Math.round((yAxisMax - yAxisMin) / 5);
    // 创建柱状图实例
    const columnPlot = new Column(container, {
        data,
        isStack: true,
        xField: 'sea',
        yField: 'value',
        seriesField: 'type',
        color: ({ type }) => getChartColorForWaterType(type), // 根据水质类型设置颜色
        label: {
            position: 'middle', // 'top', 'bottom', 'middle'
        },
        interactions: [{type: 'active-region', enable: false}],
        connectedArea: {
            style: (oldStyle, element) => {
                return {fill: 'rgba(0,0,0,0.25)', stroke: oldStyle.fill, lineWidth: 0.5};
            },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        yAxis: {
            min: yAxisMin, // 设置 Y 轴的最小值
            max: yAxisMax, // 设置 Y 轴的最大值
            tickInterval: tickInterval, // 设置 Y 轴的刻度间隔
        },
        legend: false,
        meta: {
            type: {
                alias: '类别',
            },
            value: {
                alias: '值',
            },
        },
    });

    columnPlot.render();

    return columnPlot;
};

// 定义一个函数，用于返回基于水质类型的G2Plot可用的颜色格式
const getChartColorForWaterType = (type) => {
    switch(type) {
        case '一类':
            return '#00FF00'; // Green for '一类'
        case '二类':
            return '#FFFF00'; // Yellow for '二类'
        case '三类':
            return '#FFA500'; // Orange for '三类'
        case '四类':
            return '#FF0000'; // Red for '四类'
        default:
            return '#808080'; // Gray for any other type
    }
};
const WaterQualityComparison = ({data}) => {
    const containerRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        // 初始化图表
        if (data && data.length > 0) {
            if (!chartInstanceRef.current) {
                // 如果是第一次加载，则创建图表
                chartInstanceRef.current = createColumn(containerRef.current, data);
            }
        }

        // 清理函数用于销毁图表实例
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
                chartInstanceRef.current = null;
            }
        };
    }, [data]); // 监听 data 的变化

    return(
        <div style={{width: '100%', height: '350px'}}>
            <div ref={containerRef} style={{width: '100%', height: '100%'}}/>
        </div>
        )
};

export default WaterQualityComparison;