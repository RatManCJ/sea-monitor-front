import React from 'react';
import { Pie } from '@ant-design/charts';
import { Card } from 'antd';

const data = [
  { type: '优质水', value: 10 },
  { type: '良好水', value: 20 },
  { type: '一般水', value: 15 },
  { type: '较差水', value: 5 },
  { type: '污水', value: 2 },
];

const config = {
  appendPadding: 10,
  data,
  angleField: 'value',
  colorField: 'type',
  radius: 1,
  innerRadius: 0.6,
  color: ['#1890ff', '#2fc25b', '#facc14', '#223273', '#8543e0'],
  legend: false,
  label: {
    type: 'inner',
    offset: '-50%',
    formatter: (text, item) => {
      return `${item.type}:${item.value}`;
    },
    style: {
      textAlign: 'center',
      fontSize: 14,
      fill: '#ffffff'
    },
  },
  tooltip: {
    formatter: (datum) => {
      return { name: datum.type, value: datum.value };
    },
  },
  interactions: [{ type: 'element-selected' }, { type: 'element-active' }]
};

const WaterQualityPieCard = () => (
  <Card 
    title="水质类别分布" 
    headStyle={{
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      color: 'white',
      background: 'rgba(236,83,83,0.5)',
    }}
    bodyStyle={{
      padding: '12px 16px',
      color: 'white',
      background: 'rgba(122,245,83,0.1)',
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
    <Pie {...config} />
  </Card>
);

export default WaterQualityPieCard; 