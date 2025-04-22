// 转换函数
const transformData = (data, metricData) => {
    data.forEach(item => {
        // 处理时间格式
        const date = new Date(item.monitorMonth);
        const year = date.getUTCFullYear().toString().slice(-2); // 取年份后两位
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // 取月份并补零
        const timeLabel = `${year}-${month}`;

        // 处理特殊值（如 "未检出"）
        const parseValue = (value) => {
            if (value === "未检出") return 0; // 将 "未检出" 替换为 0
            return parseFloat(value); // 转换为浮点数
        };

        // 添加数据到 metricData
        metricData.pH.push({ type: timeLabel, value: parseValue(item.ph) });
        metricData.溶解氧.push({ type: timeLabel, value: parseValue(item.dissolvedOxygen) });
        metricData.化学需氧量.push({ type: timeLabel, value: parseValue(item.chemicalOxygenDemand) });
        metricData.无机氮.push({ type: timeLabel, value: parseValue(item.inorganicNitrogen) });
        metricData.活性磷酸盐.push({ type: timeLabel, value: parseValue(item.activePhosphate) });
        metricData.石油类.push({ type: timeLabel, value: parseValue(item.petroleum) });
    });

    return metricData;
};

export default transformData;