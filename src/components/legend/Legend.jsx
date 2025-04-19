import React from 'react';
// import styles from './Legend.module.scss'
const Legend = () => {
    return (
        <div style={styles.legendContainer}>
            <h4 style={styles.legendTitle}>水质分类图例</h4>
            <div style={styles.legendItem}>
                <div style={{ ...styles.colorBox, backgroundColor: 'green' }}></div>
                <span>一类水质：优质水，适合饮用</span>
            </div>
            <div style={styles.legendItem}>
                <div style={{ ...styles.colorBox, backgroundColor: 'yellow' }}></div>
                <span>二类水质：良好水，适合游泳和娱乐活动</span>
            </div>
            <div style={styles.legendItem}>
                <div style={{ ...styles.colorBox, backgroundColor: 'orange' }}></div>
                <span>三类水质：一般水，适合工业用水</span>
            </div>
            <div style={styles.legendItem}>
                <div style={{ ...styles.colorBox, backgroundColor: 'red' }}></div>
                <span>四类水质：较差水，需处理后使用</span>
            </div>
            <div style={styles.legendItem}>
                <div style={{ ...styles.colorBox, backgroundColor: 'gray' }}></div>
                <span>其他：污染水，不建议使用</span>
            </div>
        </div>
    );
};

// 样式
const styles = {
    legendContainer: {
        position: 'absolute',
        bottom: '20px', // 放置在左下角
        left: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
        zIndex: 1000,
    },
    legendTitle: {
        fontSize: '16px',
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    legendItem: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '5px',
    },
    colorBox: {
        width: '15px',
        height: '15px',
        marginRight: '10px',
    },
};

export default Legend;