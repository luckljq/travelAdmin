import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode:'history',
    routes: [
        {
            path: '/',
            redirect: '/spots'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '主页' },
            children:[
                //景区管理start
                {
                    path: '/spots',
                    component: resolve => require(['../components/sev/SpotList.vue'], resolve),
                    meta: { title: '景区列表' }
                },
                {
                    path: '/images',
                    component: resolve => require(['../components/sev/SpotImageList.vue'], resolve),
                    meta: { title: '图片管理' }
                },
                {
                    path: '/strategy',
                    component: resolve => require(['../components/sev/StrategyManage.vue'], resolve),
                    meta: { title: '攻略管理' }
                },
                {
                    path: '/diary',
                    component: resolve => require(['../components/sev/Diary.vue'], resolve),
                    meta: { title: '游记管理' }
                },
                {
                    path: '/question',
                    component: resolve => require(['../components/sev/Question.vue'], resolve),
                    meta: { title: '问答管理' }
                },
                //内容管理start
                {
                    path: '/notice',
                    component: resolve => require(['../components/sys/Notice.vue'], resolve),
                    meta: { title: '系统公告' }
                },
                //内容管理end
                //系统管理start
                {
                    path: '/users',
                    component: resolve => require(['../components/sys/UserList.vue'], resolve),
                    meta: { title: '用户列表' }
                },
                {
                    path: '/user/edit',
                    name:'userEdit',
                    component: resolve => require(['../components/sys/UserEdit.vue'], resolve),
                    meta: { title: '编辑用户' }
                },
                {
                    path: '/roles',
                    component: resolve => require(['../components/sys/RoleList.vue'], resolve),
                    meta: { title: '角色列表' }
                },
                //系统管理end
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/404',
                    component: resolve => require(['../components/page/404.vue'], resolve),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: resolve => require(['../components/page/403.vue'], resolve),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
