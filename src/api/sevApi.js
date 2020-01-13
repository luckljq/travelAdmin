import request from '../utils/request';
/**
 * description：景区api
 *
 * @author ljq
 * @date 2020/1/7　9:09
 */
//获取美食列表
export const getFoodList = (query) => {
    return request({
        url:'sev/foods',
        method: 'get',
        params:query
    })
};
//新增美食攻略
export const addFood = (query) => {
    return request({
        url:'/sev/food',
        method: 'post',
        data: query
    })
};

//删除图片
export const deleteSpotImage = (id) => {
    return request({
        url:'/sev/spot/image/' + id,
        method: 'delete'
    })
};
//获取景区列表
export const getSpotImages = (id, query) => {
    return request({
        url:'/sev/spot/images/' + id,
        method: 'get',
        params: query
    })
};

//删除景区
export const deleteSpot = (id) =>{
    return request({
        url:'/sev/spot/' + id,
        method: 'delete'
    })
};
//启用、禁用
export const enableSpot = (id, enable) =>{
    return request({
        url:'/sev/spot/' + id +'/' + enable,
        method:'patch'
    })
};
//新增景区
export const insertSpot = (query) =>{
    return request({
        url:'/sev/spot',
        method: 'post',
        data: query
    })
};
//修改景区信息
export const editSpot = (query) =>{
    return request({
        url:'/sev/spot',
        method: 'put',
        data: query
    })
};

//获取景区列表
export const getSpots = (query) => {
    return request({
        url:'/sev/spots',
        method: 'get',
        params: query
    })
};
