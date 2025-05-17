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
        // color: ['#6897a7', '#8bc0d6', '#60d7a7', '#dedede', '#fedca9', '#fab36f', '#d96d6f'],
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


const WaterQualityTrend = ({data}) => {
    const containerRef = useRef(null); // 这个 ref 要绑定到 div 上
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        if (data && data.length > 0 && containerRef.current) {
            if (!chartInstanceRef.current) {
                chartInstanceRef.current = createChart(containerRef.current, data);
            } else {
                // 如果数据变化了，可以更新图表
                chartInstanceRef.current.changeData(data);
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
        <div style={{width: '650px', height: '250px'}}>
            {/* 必须指定 ref 和 id，否则 G2Plot 找不到容器 */}
            <div ref={containerRef} style={{width: '620px', height: '100%'}}/>
        </div>
    );
};

export default WaterQualityTrend;