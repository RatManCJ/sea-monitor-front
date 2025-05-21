import * as Cesium from "cesium";

import { getDataByTime } from "../../../apis/sea-quality/index.js";
import { WaterQuality } from "@components/entity/WaterQuality.js";

/**
 * 根据 selectedTime 和 viewer 渲染点位，通过颜色和大小表示水质
 * @param {string} selectedTime - 用户选择的时间
 * @param {object} viewer - Cesium Viewer 实例
 * @returns {Promise<Array>} - 返回点位数据数组
 */

let pointEntities = [];
const renderPoints = async (selectedTime, viewer,  onPointSelect) => {
    if (!viewer) {
        console.error("Cesium Viewer 未初始化");
        return [];
    }

    try {
        const response = await getDataByTime(selectedTime + " 00:00:00");
        const data = response.data.map(item => new WaterQuality(
            item.id,
            item.sea,
            item.province,
            item.city,
            item.site,
            item.longitude,
            item.latitude,
            item.monitorMonth,
            item.pH,
            item.dissolvedOxygen,
            item.chemicalOxygenDemand,
            item.inorganicNitrogen,
            item.activePhosphate,
            item.petroleum,
            item.waterQualityClassification
        ));

        // viewer.entities.removeAll();

        const dataSize = data.length;
        let pointSize = 3; // 默认点大小
        if (dataSize < 20) {
            pointSize = 20;
        } else if (dataSize < 50) {
            pointSize = 8; // 数据较少时，点较大
        } else if (dataSize < 200) {
            pointSize = 5; // 数据中等时，点中等大小
        } else {
            pointSize = 3; // 数据较多时，点较小
        }

        // 创建一个用于显示信息的标签实体
        let labelEntity = viewer.entities.add({
            label: {
                text: '',
                font: '14px sans-serif',
                fillColor: Cesium.Color.WHITE,
                outlineColor: Cesium.Color.BLACK,
                outlineWidth: 2,
                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                show: false, // 默认不显示
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                pixelOffset: new Cesium.Cartesian2(0, -10), // 稍微向上偏移一点
            }
        });

        // 遍历数据并创建 Cesium 点实体
        data.forEach(item => {
            const longitude = parseFloat(item.longitude); // 经度
            const latitude = parseFloat(item.latitude); // 纬度

            if (isNaN(longitude) || isNaN(latitude)) {
                console.warn(`无效的经纬度数据: ${item.longitude}, ${item.latitude}`);
                return;
            }

            // 创建 Cesium 点实体
            const pointEntity = viewer.entities.add({
                position: Cesium.Cartesian3.fromDegrees(longitude, latitude),
                point: {
                    pixelSize: pointSize, // 点的大小
                    color: getColorByWaterQuality(item.waterQualityClassification), // 根据水质类别设置颜色
                    outlineColor: Cesium.Color.BLACK,
                    outlineWidth: 0.5
                },
                properties: item // 将原始数据作为属性附加到实体上
            });
            pointEntities.push({ entity: pointEntity, originalSize: pointSize });
        });

// 记录上一个高亮的点
        let lastHighlighted = null;

        // 鼠标悬停放大
        const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
        handler.setInputAction((movement) => {
            const picked = viewer.scene.pick(movement.endPosition);
            if (Cesium.defined(picked) && picked.id && picked.id.point) {
                if (lastHighlighted && lastHighlighted !== picked.id) {
                    // 恢复上一个点的大小
                    const found = pointEntities.find(p => p.entity === lastHighlighted);
                    if (found) lastHighlighted.point.pixelSize = found.originalSize;
                }
                picked.id.point.pixelSize = 2 * pointSize; // 放大
                lastHighlighted = picked.id;
            } else if (lastHighlighted) {
                // 鼠标移出时恢复
                const found = pointEntities.find(p => p.entity === lastHighlighted);
                if (found) lastHighlighted.point.pixelSize = found.originalSize;
                lastHighlighted = null;
            }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

        handler.setInputAction((movement) => {
            const picked = viewer.scene.pick(movement.position);
            if (Cesium.defined(picked) && picked.id && picked.id.point) {
                const entity = picked.id;
                const cartographic = Cesium.Cartographic.fromCartesian(entity.position._value);
                const longitude = Cesium.Math.toDegrees(cartographic.longitude).toFixed(2);
                const latitude = Cesium.Math.toDegrees(cartographic.latitude).toFixed(2);
                const site = entity.properties.site;
                if (onPointSelect) {
                    onPointSelect({
                        site: site,
                        longitude: longitude,
                        latitude: latitude
                    });
                }
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        if (data.length > 0) {
            const positions = data.map(item =>
                Cesium.Cartesian3.fromDegrees(parseFloat(item.longitude), parseFloat(item.latitude))
            );
            viewer.zoomTo(viewer.entities);
        }

        return data;
    } catch (error) {
        console.error('Error rendering points:', error);
        return [];
    }
};

// 根据水质类别返回颜色
const getColorByWaterQuality = (classification) => {
    switch (classification) {
        case '一类':
            return Cesium.Color.GREEN;
        case '二类':
            return Cesium.Color.YELLOW;
        case '三类':
            return Cesium.Color.ORANGE;
        case '四类':
            return Cesium.Color.RED;
        default:
            return Cesium.Color.GRAY;
    }
};

export default renderPoints;