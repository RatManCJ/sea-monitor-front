import * as Cesium from "cesium";
import {getDataBySiteInfo} from "../../../apis/sea-quality/index.js";
import {WaterQuality} from "@components/entity/WaterQuality.js";

/**
 * 根据点位编号查询点位信息并锁定 Cesium 视角
 * @param {string} site - 点位编号
 * @param {object} viewer - Cesium Viewer 实例
 * @returns {Promise<Array>} - 返回点位数据数组（如果查询失败则返回空数组）
 */
const queryDataByInfo = async (site, viewer) => {
    if (!site) {
        console.error("点位编号或 Cesium Viewer 未提供");
        return [];
    }

    try {
        // 调用 API 获取点位信息
        const response = await getDataBySiteInfo(site);

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

        if (!Array.isArray(points) || points.length === 0) {
            alert(`未找到点位编号为 ${site} 的相关信息`);
            return [];
        }

        // 清空之前的实体
        viewer.entities.removeAll();

        // 存储第一个有效点的经纬度
        let firstPosition = null;

        // 遍历点位数据，只添加第一个有效的点
        for (const pointInfo of points) {
            const longitude = parseFloat(pointInfo.longitude);
            const latitude = parseFloat(pointInfo.latitude);

            if (isNaN(longitude) || isNaN(latitude)) {
                console.warn(`无效的经纬度数据: ${pointInfo.longitude}, ${pointInfo.latitude}`);
                continue; // 跳过无效数据
            }

            // 在 Cesium 中创建点实体
            viewer.entities.add({
                position: Cesium.Cartesian3.fromDegrees(longitude, latitude),
                point: {
                    pixelSize: 30, // 点的大小
                    color: getColorByWaterQuality(pointInfo.waterQualityClassification), // 点的颜色
                    outlineColor: Cesium.Color.WHITE,
                    outlineWidth: 2
                },
                label: {
                    text: pointInfo.site, // 显示点位编号
                    font: '14px sans-serif',
                    fillColor: Cesium.Color.WHITE,
                    outlineColor: Cesium.Color.BLACK,
                    outlineWidth: 2,
                    style: Cesium.LabelStyle.FILL_AND_OUTLINE
                }
            });

            // 记录第一个有效点的位置
            firstPosition = Cesium.Cartesian3.fromDegrees(longitude, latitude,1000000);

            // 只添加第一个有效点后退出循环
            break;
        }

        // 如果有有效点，调整视角到该点
        if (firstPosition) {
            viewer.camera.flyTo({
                destination: firstPosition, // 高度 5000 米
                orientation: {
                    heading: Cesium.Math.toRadians(0), // 方向角度
                    pitch: Cesium.Math.toRadians(-90), // 俯仰角度
                    roll: 0.0
                }
            });
        } else {
            alert("未找到任何有效的点位信息");
        }

        // 返回点位数据
        return points;
    } catch (error) {
        console.error('查询点位信息时发生错误:', error);
        alert(`查询点位编号为 ${site} 的信息失败，请稍后再试`);
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

export default queryDataByInfo;