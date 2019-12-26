import request from '../utils/request';
/**
 * description：sys接口
 *
 * @author ljq
 * @date 2019/12/24　11:16
 */
//获取地区列表
export const getLocations = (id) => {
    return request({
        url: '/sys/location/'+id,
        method: 'get'
    })
};

//获取用户列表
export const getUsers = (query) => {
    return request({
        url: '/sys/users',
        method: 'get',
        params: query
    })
};

export const deleteUser = (id) => {
    return request({
        url: '/sys/user/'+id,
        method: 'delete'
    })
};

//启用、禁用
export const editEnable = (query) => {
    return request({
        url: '/sys/user/enable',
        method: 'patch',
        data: query
    })
};
