import request from '../utils/request';

//删除问答
export const deleteQuestion = (id) => {
    return request({
        url:'/active/question/' + id,
        method:'delete'
    })
};

//获取游记列表
export const getQuestions = (query) => {
    return request({
        url:'/active/questions',
        method:'get',
        params:query
    })
};

//删除游记
export const deleteDiary = (id) => {
    return request({
        url: '/active/diary/' + id,
        method: 'delete'
    })
};

//获取游记列表
export const getDiaries = (query) => {
    return request({
        url:'/active/diaries',
        method: 'get',
        params: query
    })
};
