import {Area} from '@antv/g2plot';
import {useEffect, useRef} from 'react';

const createChart = (container, data) => {
    if (!data || data.length === 0) {
        console.error('Invalid data:', data);
        return null;
    }

    const chart = new Area(container, {
        data,
        xField: 'year',
        yField: 'value',
        seriesField: 'type',
        color: ({ type }) => getChartColorForWaterType(type), // 根据水质类型设置颜色
        xAxis: {
            type: 'time',
            mask: 'YYYY',
        },
        yAxis: {
            label: {
                // 数值格式化为千分位
                formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
            },
        },
        legend: {
            position: 'top',
        },
    });

    chart.render();
};

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

const WaterQualityTrend = ({data}) => {
    const containerRef = useRef(null); // 这个 ref 要绑定到 div 上
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        if (data && data.length > 0 && containerRef.current) {
            if (!chartInstanceRef.current) {
                chartInstanceRef.current = createChart(containerRef.current, data);
            }
        }

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
                chartInstanceRef.current = null;
            }
        };
    }, [data]);

    return (
        <div style={{width: '650px', height: '350px'}}>
            {/* 必须指定 ref 和 id，否则 G2Plot 找不到容器 */}
            <div ref={containerRef} style={{width: '620px', height: '100%'}}/>
        </div>
    );
};

export default WaterQualityTrend;