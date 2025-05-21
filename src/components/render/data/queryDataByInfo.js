import * as Cesium from "cesium";
import { getDataBySiteInfo } from "../../../apis/sea-quality/index.js";
import { WaterQuality } from "@components/entity/WaterQuality.js";
import {message} from "antd";

// 用于存储通过 queryDataByInfo 添加的实体，以便后续查找
let queriedEntities = {};

const queryDataByInfo = async (searchInfo, viewer) => { // 修改参数为 searchInfo
    let site;

    if (typeof searchInfo === 'string') {
        site = searchInfo; // 如果直接传入字符串，则认为是点位编号
    } else if (searchInfo || searchInfo.site) {
        site = searchInfo;
    }

    if (!site) {
        return [];
    }

    try {
        // 调用 API 获取点位信息 (仍然使用点位编号进行查询)
        const response = await getDataBySiteInfo(site);

        console.log(response.data);

        const points = response.data.map(item => new WaterQuality(
            item.id,
            item.sea,
            item.province,
            item.city,
            item.site,
            item.longitude,
            item.latitude,
            item.monitorMonth,
            item.ph,
            item.dissolvedOxygen,
            item.chemicalOxygenDemand,
            item.inorganicNitrogen,
            item.activePhosphate,
            item.petroleum,
            item.waterQualityClassification
        ));

        // 清空之前的实体
        // viewer.entities.removeAll();
        queriedEntities = {}; // 清空之前的实体引用
        let firstPosition = null;

        for (const pointInfo of points) {
            const longitude = parseFloat(pointInfo.longitude);
            const latitude = parseFloat(pointInfo.latitude);

            if (isNaN(longitude) || isNaN(latitude)) {
                console.warn(`无效的经纬度数据: ${pointInfo.longitude}, ${pointInfo.latitude}`);
                continue;
            }

            const entity = viewer.entities.add({
                position: Cesium.Cartesian3.fromDegrees(longitude, latitude),
                point: {
                    // pixelSize: 30,
                    color: getColorByWaterQuality(pointInfo.waterQualityClassification),
                    outlineColor: Cesium.Color.WHITE,
                    outlineWidth: 2,
                    pick: true
                },
                label: {
                    text: pointInfo.site,
                    font: '14px sans-serif',
                    fillColor: Cesium.Color.WHITE,
                    outlineColor: Cesium.Color.BLACK,
                    outlineWidth: 2,
                    style: Cesium.LabelStyle.FILL_AND_OUTLINE
                },
                properties: pointInfo
            });
            queriedEntities[pointInfo.site] = entity;
            firstPosition = Cesium.Cartesian3.fromDegrees(longitude, latitude, 20000);
            break;
        }

        if (firstPosition) {
            viewer.camera.flyTo({
                destination: firstPosition,
                orientation: {
                    heading: Cesium.Math.toRadians(0),
                    pitch: Cesium.Math.toRadians(-90),
                    roll: 0.0
                }
            });
        } else {
            message.warn(`未找到点位编号为 ${site} 的有效坐标信息。`);
        }
        return points;
    } catch (error) {
        console.error('查询点位信息时发生错误:', error);
        message.error(`查询点位编号为 ${site} 的信息失败，请稍后再试`);
        return [];
    }
};

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

export { queryDataByInfo, queriedEntities };