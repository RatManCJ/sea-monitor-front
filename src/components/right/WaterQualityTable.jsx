import React from 'react';
import {Table} from 'antd';

// 数据源
const data = [
    {
        key: '1',
        item: 'PH',
        class1: '7.8-8.5',
        class2: '-',
        class3: '6.8-8.8',
        class4: '-',
    },
    {
        key: '2',
        item: '溶解氧 >',
        class1: '6',
        class2: '5',
        class3: '4',
        class4: '3',
    },
    {
        key: '3',
        item: '化学需氧量 <=',
        class1: '2',
        class2: '3',
        class3: '4',
        class4: '5',
    },
    {
        key: '4',
        item: '无机氮 <=',
        class1: '0.2',
        class2: '0.3',
        class3: '0.4',
        class4: '0.5',
    },
    {
        key: '5',
        item: '活性磷酸盐 <=',
        class1: '0.015',
        class2: '0.03',
        class3: '-',
        class4: '0.045',
    },
    {
        key: '6',
        item: '石油类 <=',
        class1: '0.05',
        class2: '-',
        class3: '0.3',
        class4: '0.50',
    },
];

const WaterQualityTable = () => {
    return (
        <div>
            <Table
                dataSource={data}
                pagination={false}
                bordered
            >
                <Table.Column title="项目" dataIndex="item" key="item" align="center"/>

                <Table.ColumnGroup title="第一类">
                    <Table.Column title="标准值" dataIndex="class1" key="class1" align="center"/>
                </Table.ColumnGroup>

                <Table.ColumnGroup title="第二类">
                    <Table.Column title="标准值" dataIndex="class2" key="class2" align="center"/>
                </Table.ColumnGroup>

                <Table.ColumnGroup title="第三类">
                    <Table.Column title="标准值" dataIndex="class3" key="class3" align="center"/>
                </Table.ColumnGroup>

                <Table.ColumnGroup title="第四类">
                    <Table.Column title="标准值" dataIndex="class4" key="class4" align="center"/>
                </Table.ColumnGroup>
            </Table>
        </div>

    );
};

export default WaterQualityTable;