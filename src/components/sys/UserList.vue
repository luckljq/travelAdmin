/**
 * description：用户列表页面
 *
 * @author ljq
 * @date 2019/12/20　10:51
 */
<template slot-scope="scope">
    <div class="sidebar">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 用户管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-circle-plus" class="handle-del mr10">增加</el-button>
                <el-input v-model="select_word" placeholder="标题" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="getData">搜索</el-button>
            </div>
            <tableCom :tableData="tableData" :rowNum="this.rowNum" :tableEle="tableEle" :total="this.total"
                      v-on:getPageNumber="getPageNumber">
                <el-table-column slot="btn-operation"
                                 fixed="right"
                                 label="操作"
                                 width="300px">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-info">查看</el-button>
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                        >编辑
                        </el-button>
                        <el-button type="text" icon="el-icon-edit">启用</el-button>
                        <el-button type="text" icon="el-icon-edit">禁用</el-button>
                        <el-button
                                type="text"
                                icon="el-icon-delete"
                                class="red"
                        >删除
                        </el-button>
                    </template>
                </el-table-column>
            </tableCom>
        </div>
    </div>
</template>
<script>
    import tableCom from '../common/Table.vue'
    import {getUsers} from '../../api/sysApi'
    let tableEle = [{
        fixed: 'left',
        prop: 'userName',
        label: '用户昵称',
        width: ''
    }, {
        fixed: '',
        prop: 'sex',
        label: '性别',
        width: '120'
    }, {
        fixed: '',
        prop: 'phone',
        label: '电话',
        width: ''
    }, {
        fixed: '',
        prop: 'localName',
        label: '所在地区',
        width: ''
    }, {
        fixed: '',
        prop: 'email',
        label: '电子邮箱',
        width: ''
    }, {
        fixed: '',
        prop: 'isEnable',
        label: '状态',
        width: ''
    }];
    export default {
        data() {
            return {
                tableData: [],
                tableEle,
                select_word: '',
                rowNum: 2,
                pageNumber:1,
                total:0
            }
        },
        created() {
            this.getData();
        },
        methods: {
            getPageNumber(pageNumber){
                this.pageNumber = pageNumber;
                this.getData()
            },
            getData() {
                getUsers({
                    name: "",
                    phone: "",
                    pageNumber: this.pageNumber,
                    pageSize: this.rowNum
                }).then(res => {
                    this.tableData = res.data.list;
                    this.total = res.data.total;
                    // console.log(this.tableData);
                })
            },
        },
        components: {
            tableCom
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
        width: 300px;
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
