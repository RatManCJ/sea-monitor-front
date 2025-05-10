export const transformData = (data, currentMetricData) => {
    const newMetricData = {
        pH: [],
        '溶解氧': [],
        '化学需氧量': [],
        '无机氮': [],
        '活性磷酸盐': [],
        '石油类': [],
    };

    data.forEach(item => {
        const parseValue = (value) => (value === "未检出" ? 0 : parseFloat(value));
        newMetricData.pH.push({ type: item.monitorMonth, value: parseValue(item.ph) });
        newMetricData['溶解氧'].push({ type: item.monitorMonth, value: parseValue(item.dissolvedOxygen) });
        newMetricData['化学需氧量'].push({ type: item.monitorMonth, value: parseValue(item.chemicalOxygenDemand) });
        newMetricData['无机氮'].push({ type: item.monitorMonth, value: parseValue(item.inorganicNitrogen) });
        newMetricData['活性磷酸盐'].push({ type: item.monitorMonth, value: parseValue(item.activePhosphate) });
        newMetricData['石油类'].push({ type: item.monitorMonth, value: parseValue(item.petroleum) });
    });

    return newMetricData;
};