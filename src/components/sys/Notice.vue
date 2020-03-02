/**
 * description：公告管理页面
 *
 * @author ljq
 * @date 2020/3/2　8:47
 */
<template slot-scope="scope">
    <div class="sidebar">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 公告管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-circle-plus" class="handle-del mr10">增加</el-button>
                <el-input v-model="name" placeholder="用户昵称模糊查询" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="getData">搜索</el-button>
            </div>
            <tableCom :tableData="tableData" :rowNum="this.rowNum" :tableEle="tableEle" :total="this.total"
                      v-on:getPageNumber="getPageNumber">
                <el-table-column slot="btn-operation"
                                 fixed="right"
                                 label="操作"
                                 width="200px">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.row)"
                        >编辑
                        </el-button>
                        <el-button
                                type="text"
                                icon="el-icon-delete"
                                class="red"
                                @click="handleDelete(scope.row)"
                        >删除
                        </el-button>
                    </template>
                </el-table-column>
            </tableCom>
        </div>
    </div>
</template>
<script>
    import {Message} from 'element-ui'
    import tableCom from '../common/Table.vue'
    import {getNotices} from  '../../api/sysApi'

    let tableEle = [{
        fixed: 'left',
        prop: 'noticeName',
        label: '公告标题',
        width: ''
    }, {
        fixed: '',
        prop: 'senderName',
        label: '发布人',
        width: '120'
    }, {
        fixed: '',
        prop: 'description',
        label: '公告内容',
        width: '600'
    }, {
        fixed: '',
        prop: 'createTime',
        label: '创建时间',
        width: ''
    }, {
        fixed: '',
        prop: 'updateTime',
        label: '修改时间',
        width: ''
    }];
    export default {
        data() {
            return {
                //表格初始化
                tableData: [],
                tableEle,
                rowNum: 5,
                pageNumber:1,
                total:0,
                //查询条件
                name: '',
                id:null,
            }
        },
        created() {
            this.getData();
        },
        methods:{
            //删除用户
            deleteRow() {

            },
            //修改页面
            handleEdit(row) {
                this.id = row.id;
            },
            //删除页面显示
            handleDelete(row) {
                this.id = row.id;
            },
            getData() {
                getNotices({
                    name:this.name,
                    pageNumber: this.pageNumber,
                    pageSize: this.rowNum
                }).then(res => {
                    this.tableData = res.data.list;
                    this.total = res.data.total;
                })
            },
            //翻页
            getPageNumber(pageNumber){
                this.pageNumber = pageNumber;
                this.getData()
            },
        },
        components: {
            tableCom,
        }
    }
</script>
<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 200px;
        display: inline-block;
    }

    .del-dialog-cnt {
        font-size: 16px;
        text-align: center;
    }

    .red {
        color: #ff0000;
    }

    .mr10 {
        margin-right: 10px;
    }
</style>
