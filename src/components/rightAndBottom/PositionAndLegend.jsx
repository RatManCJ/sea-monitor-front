import React from 'react';
import Legend from './legend/Legend'; // 假设图例组件单独定义在一个文件中
import styles from './PositionAndLegend.module.scss'; // 引入样式文件

const PositionAndLegend = ({ positionInfo }) => {
    return (
        <div className={styles.bottomRightContainer}>
            {/* 坐标显示面板 */}
            <div className={styles.positionPanel}>
                <div className={styles.positionItem}>
                    <span className={styles.positionLabel}>中心点位经度：</span>
                    <span className={styles.positionValue}>{positionInfo.longitude}</span>
                </div>
                <div className={styles.positionItem}>
                    <span className={styles.positionLabel}>中心点位纬度：</span>
                    <span className={styles.positionValue}>{positionInfo.latitude}</span>
                </div>
                <div className={styles.positionItem}>
                    <span className={styles.positionLabel}>中心点位高度：</span>
                    <span className={styles.positionValue}>{positionInfo.height}</span>
                </div>
            </div>

            {/* 图例组件 */}
            <Legend />
        </div>
    );
};

export default PositionAndLegend;