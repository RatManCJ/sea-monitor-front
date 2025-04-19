import React, { useState } from 'react';
import { Layout, TreeSelect, Typography, theme } from 'antd';
import styles from './TopBar.module.scss'; // 引入SCSS文件

const { Header } = Layout;
const { Title, Text } = Typography;
const { useToken } = theme;

const TopBar = ({ onTimeChange }) => {
  const [selectedTime, setSelectedTime] = useState('2017-05-01'); // 默认时间
  const [selectedDate, setSelectedDate] = useState(null); // 新增状态变量，用于存储选中的日期
  const { token } = useToken();

  // 定义时间选项，按年份分组
  const timeTreeData = [
    {
      title: '2017年',
      value: '2017',
      children: [
        { title: '2017-05-01', value: '2017-05-01' },
        { title: '2017-06-01', value: '2017-06-01' },
        { title: '2017-08-01', value: '2017-08-01' },
        { title: '2017-09-01', value: '2017-09-01' },
        { title: '2017-10-01', value: '2017-10-01' },
        { title: '2017-11-01', value: '2017-11-01' },
      ],
    },
    {
      title: '2023年',
      value: '2023',
      children: [
        { title: '2023-01-01', value: '2023-01-01' },
        { title: '2023-02-01', value: '2023-02-01' },
        { title: '2023-03-01', value: '2023-03-01' },
        // 可以根据实际需求动态生成更多选项
      ],
    },
  ];

  // 处理时间选择
  const handleTimeSelect = (value) => {
    setSelectedTime(value);
    setSelectedDate(value); // 更新选中的日期
    onTimeChange(value); // 触发父组件的回调函数
  };

  return (
    <Header className={styles.topBar}>
      <div className={styles.topBarContent}>
        <div className={styles.navItems}>
          <Title className={styles.title}>近海水质信息可视化系统</Title>
        </div>
        <div className={styles.rightControls}>
          <TreeSelect
            treeData={timeTreeData}
            value={selectedTime}
            onChange={handleTimeSelect}
            placeholder="请选择时间"
            style={{ width: 200 }}
            dropdownRender={(menu) => (
              <div>
                {menu}
                {selectedDate && (
                  <div style={{ padding: '8px', color: '#999' }}>
                    已选择日期: {selectedDate}
                  </div>
                )}
              </div>
            )}
          />
          <Text className={styles.authorInfo}>
            作者：陈靖
          </Text>
        </div>
      </div>
    </Header>
  );
};

export default TopBar;