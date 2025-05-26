import axios from 'axios';

const BASE_URL = 'http://localhost:8080/water';

const BASE_URL_AI = 'http://localhost:8090/api/v1/ollama';

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

const instanceAI = axios.create({
    baseURL: BASE_URL_AI,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

const createAIRequest = (instanceAI, preUrl) => {
    return {
        get: (url, params) => instanceAI.get(`${preUrl}${url}`, { params }),
        post: (url, data) => instanceAI.post(`${preUrl}${url}`, data),
        put: (url, data) => instanceAI.put(`${preUrl}${url}`, data),
        delete: (url, params) => instanceAI.delete(`${preUrl}${url}`, { params }),
    };
};

export const defaultAIRequest = createAIRequest(instanceAI, '');
// 使用高阶函数创建具体的请求对象，传入公共的前置url部分
const createRequest = (instance, preUrl) => {
    return {
        get: (url, params) => instance.get(`${preUrl}${url}`, { params }),
        post: (url, data) => instance.post(`${preUrl}${url}`, data),
        put: (url, data) => instance.put(`${preUrl}${url}`, data),
        delete: (url, params) => instance.delete(`${preUrl}${url}`, { params }),
    };
};

// 创建一个默认的请求实例
export const defaultRequest = createRequest(instance, '');

// 创建一个特定于某个服务的请求实例

// 创建一个新的axios实例用于外部请求
const externalInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json', // 根据需要调整headers
    },
});

// 导出封装后的请求对象
export const externalRequest = createRequest(externalInstance, '/external-api');