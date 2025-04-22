import React, { useEffect, useRef } from 'react';
import { Column } from '@antv/g2plot';

const createColumn = (container, data) => {
    // 计算数据的最大值和最小值
    if (!data || data.length === 0) {
        console.error('Invalid data:', data);
        return null;
    }
    const values = data.map((item) => item.value); // 提取 value 字段
    const maxValue = Math.max(...values); // 数据中的最大值
    const minValue = Math.min(...values); // 数据中的最小值

    // 动态设置 y 轴的范围
    const yAxisMax = parseFloat((maxValue + 0.03).toFixed(2)); // 最大值加 0.03 并保留两位小数
    const yAxisMin = parseFloat((minValue - 0.02).toFixed(2)) > 0 ? parseFloat((minValue - 0.02).toFixed(2)) : 0; // 最小值减 0.02 并保留两位小数
    const tickInterval = ((yAxisMax - yAxisMin) / 5).toFixed(2);

    // 创建柱状图实例
    const columnPlot = new Column(container, {
        data,
        xField: 'type',
        yField: 'value',
        label: {
            position: 'middle',
            style: {
                fill: '#FFFFFF',
                opacity: 0.6,
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
const ColumnRender = ({metricData}) => {
    const containerRef = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        if (containerRef.current && metricData) {
            // 创建图表实例
            chartRef.current = createColumn(containerRef.current, metricData);
        }

        // 清理函数：在组件卸载时销毁图表实例
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
                chartRef.current = null;
            }
        };
    }, [metricData]); // 依赖于传入的 data

    return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
}

export default ColumnRender;