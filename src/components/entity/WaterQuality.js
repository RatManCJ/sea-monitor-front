/**
 * 定义 WaterQuality 数据结构
 */
export class WaterQuality {
    constructor(
        id, // 主键id
        sea, // 海区
        province, // 省份
        city, // 地市
        site, // 点位编码
        longitude, // 实测经度
        latitude, // 实测纬度
        monitorMonth, // 监测时间（后端返回的 Date 类型可能被序列化为字符串）
        ph, // pH
        dissolvedOxygen, // 溶解氧
        chemicalOxygenDemand, // 化学需氧量
        inorganicNitrogen, // 无机氮
        activePhosphate, // 活性磷酸盐
        petroleum, // 石油类
        waterQualityClassification // 水质类别
    ) {
        this.id = id;
        this.sea = sea;
        this.province = province;
        this.city = city;
        this.site = site;
        this.longitude = longitude;
        this.latitude = latitude;
        this.monitorMonth = monitorMonth;
        this.ph = ph;
        this.dissolvedOxygen = dissolvedOxygen;
        this.chemicalOxygenDemand = chemicalOxygenDemand;
        this.inorganicNitrogen = inorganicNitrogen;
        this.activePhosphate = activePhosphate;
        this.petroleum = petroleum;
        this.waterQualityClassification = waterQualityClassification;
    }
}
