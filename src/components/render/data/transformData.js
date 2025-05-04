// 转换函数
const transformData = (data, metricData) => {
    for (let key in metricData) {
        if (Array.isArray(metricData[key])) {
            metricData[key] = [];
        }
    }
    data.forEach(item => {
        // 处理特殊值（如 "未检出"）
        const parseValue = (value) => {
            if (value === "未检出") return 0; // 将 "未检出" 替换为 0
            return parseFloat(value); // 转换为浮点数
        };

        // 添加数据到 metricData
        metricData.pH.push({type: item.monitorMonth, value: parseValue(item.ph)});
        metricData.溶解氧.push({type: item.monitorMonth, value: parseValue(item.dissolvedOxygen)});
        metricData.化学需氧量.push({type: item.monitorMonth, value: parseValue(item.chemicalOxygenDemand)});
        metricData.无机氮.push({type: item.monitorMonth, value: parseValue(item.inorganicNitrogen)});
        metricData.活性磷酸盐.push({type: item.monitorMonth, value: parseValue(item.activePhosphate)});
        metricData.石油类.push({type: item.monitorMonth, value: parseValue(item.petroleum)});
    });

    return metricData;
};

export default transformData;