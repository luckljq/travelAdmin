import request from '../utils/request';

export const getUsers = (query) => {
    return request({
        url: '/sys/users',
        method: 'get',
        params: query
    })
};
