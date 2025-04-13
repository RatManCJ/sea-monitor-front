import axios from 'axios';
import {defaultRequest as request}  from '../request.js';

// 按照年份获取当前年份数据
export function getDataByYear(year) {
    return request.get('/year-date/get', {
        year
    });
}

// 按照年份、月份获取当前年份数据
export function getDataByYearMonth(year, month) {
    return request.get('/year-month-date/get', {
        year,
        month
    });
}