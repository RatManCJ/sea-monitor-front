import React from 'react';
const Legend = () => {
    return (
        <div style={styles.legendContainer}>
            <h4 style={styles.legendTitle}>水质分类图例</h4>
            <div style={styles.legendItem}>
                <div style={{ ...styles.colorBox, backgroundColor: 'green' }}></div>
                <span style={{ color: '#ffffff', fontSize: '14px', opacity: 0.8 }}>一类水质：优质水，适合饮用</span>
            </div>
            <div style={styles.legendItem}>
                <div style={{ ...styles.colorBox, backgroundColor: 'yellow' }}></div>
                <span style={{ color: '#ffffff', fontSize: '14px', opacity: 0.8 }}>二类水质：良好水，适合游泳和娱乐活动</span>
            </div>
            <div style={styles.legendItem}>
                <div style={{ ...styles.colorBox, backgroundColor: 'orange' }}></div>
                <span style={{ color: '#ffffff', fontSize: '14px', opacity: 0.8 }}>三类水质：一般水，适合工业用水</span>
            </div>
            <div style={styles.legendItem}>
                <div style={{ ...styles.colorBox, backgroundColor: 'red' }}></div>
                <span style={{ color: '#ffffff', fontSize: '14px', opacity: 0.8 }}>四类水质：较差水，需处理后使用</span>
            </div>
            <div style={styles.legendItem}>
                <div style={{ ...styles.colorBox, backgroundColor: 'gray' }}></div>
                <span style={{ color: '#ffffff', fontSize: '14px', opacity: 0.8 }}>其他：污染水，不建议使用</span>
            </div>
        </div>
    );
};

// 样式
const styles = {
    legendContainer: {
        position: 'fixed',
        bottom: '150px', // 放置在左下角
        right: '20px', // 距离右侧的距离
        background: 'rgba(0, 0, 0, 0.7)', // 背景颜色
        padding: '15px 20px', // 内边距
        borderRadius: '8px', // 圆角
        zIndex: 1000, // 层级
        backdropFilter: 'blur(5px)', // 背景模糊效果
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', // 阴影
    },
    legendTitle: {
        color: '#ffffff', // 标题颜色与坐标显示面板一致
        opacity: 0.8, // 透明度
        fontSize: '16px', // 字体大小
        fontWeight: 'bold', // 加粗
        marginBottom: '10px', // 标题与内容的间距
    },
    legendItem: {
        display: 'flex',
        alignItems: 'center',
        margin: '8px 0', // 图例项之间的间距
    },
    colorBox: {
        width: '10px', // 颜色块宽度
        height: '10px', // 颜色块高度
        marginRight: '10px', // 颜色块与文字的间距
    },
    legendLabel: {
        color: '#ffffff', // 文字颜色与坐标显示面板一致
        opacity: 0.8, // 透明度
        fontSize: '14px', // 字体大小
    },
};

export default Legend;