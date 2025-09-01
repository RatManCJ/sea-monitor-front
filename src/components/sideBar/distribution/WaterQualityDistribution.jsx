import React, { useEffect, useRef } from 'react';
import { Pie } from '@antv/g2plot';

const getChartColorForWaterType = (type) => {
  switch(type) {
    case '优质水':
      return '#00FF00'; // Green for '一类'
    case '良好水':
      return '#FFFF00'; // Yellow for '二类'
    case '一般水':
      return '#FFA500'; // Orange for '三类'
    case '较差水':
      return '#FF0000'; // Red for '四类'
    default:
      return '#808080'; // Gray for any other type
  }
};
const WaterQualityDistribution = ({ data }) => {
  const containerRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !data || data.length === 0) return;

    chartRef.current = new Pie(containerRef.current, {
      forceFit: true,
      title: {
        visible: true,
        text: '水质分布',
      },
      description: {
        visible: false,
        text: '饼图用于展示分类数据的占比情况。',
      },
      radius: 0.8,
      innerRadius: 0.4,
      padding: 'auto',
      data,
      color: ({ type }) => getChartColorForWaterType(type), // 根据水质类型设置颜色
      angleField: 'value',
      colorField: 'type',
      label: {
        visible: true,
        type: 'inner',
      },
      legend: false,
      tooltip: {
        visible: true,
      },
      statistic: {
        visible: true,
        title: {
          style: {
            fontSize: '12px',
            fill: 'white !important',
          },
          content: '--',
        },
        content: {
          style: {
            fontSize: '18px',
            fill: 'white !important',
          },
          // formatter: () => {
          //   const total = data.reduce((sum, item) => sum + item.value, 0);
          //   return `${total}`;
          // },
        },
      },
      interactions: [
        { type: 'element-active' },
        { type: 'pie-statistic-active' },
      ],
      background: '#f0f0f0', // 设置背景色为浅灰色
    });

    chartRef.current.render();

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [data]);

  return (
      <div style={{ width: '100%', height: '200px' }}>
        <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
      </div>
  );
};

export default WaterQualityDistribution;