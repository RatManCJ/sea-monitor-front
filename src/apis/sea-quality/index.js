import {defaultRequest as request}  from '../request.js';

// 按照年份获取当前年份数据
export function getDataByTime(time) {
    return request.get('get-data-by-time', {
        time
    });
}

export function getDataBySiteInfo(site){
    return request.get('get-data-by-site-info', {
        site
    });
}
