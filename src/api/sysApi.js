import request from '../utils/request';

export const getUsers = (query) => {
    console.log(query);
    return request({
        url: '/sys/users',
        method: 'get',
        params: query
    })
};
