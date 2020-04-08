<template slot-scope="scope">
    <div class="sidebar">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 景区列表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="name" placeholder="景区名模糊查询" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="getData">搜索</el-button>
            </div>
            <tableCom :tableData="tableData" :rowNum="this.rowNum" :tableEle="tableEle" :total="this.total"
                      v-on:getPageNumber="getPageNumber">
                <el-table-column slot="btn-operation"
                                 fixed="right"
                                 label="操作"
                                 width="300px">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-info" @click="showQuestion(scope.row)">查看相关问答</el-button>
                    </template>
                </el-table-column>
            </tableCom>
        </div>
        <div v-show="show">
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>
                        <i class="el-icon-lx-cascades"></i> 问答列表
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="container">
                <div class="handle-box">
                    <el-input v-model="title" placeholder="问题关键字模糊查询" class="handle-input mr10"></el-input>
                    <el-button type="primary" icon="el-icon-search" @click="getQuestion" >搜索</el-button>
                </div>
                <tableCom :tableData="tableData2" :rowNum="this.rowNum2" :tableEle="tableEle2" :total="this.total2"
                          v-on:getPageNumber="getPageNumber2">
                    <el-table-column slot="btn-operation"
                                     fixed="right"
                                     label="操作"
                    >
                        <template slot-scope="scope">
                            <el-button type="text" icon="el-icon-info" @click="showDetails(scope.row)">详情</el-button>
                            <el-button type="text" icon="el-icon-delete" class="red" @click="openDelete(scope.row)" >删除</el-button>
                        </template>
                    </el-table-column>
                </tableCom>
            </div>
        </div>
    </div>
</template>

<script>

    let tableEle = [{
        fixed: 'left',
        prop: 'scenicSpotName',
        label: '景区名',
        width: ''
    }, {
        fixed: '',
        prop: 'scenicSpotType',
        label: '景区类型',
        width: ''
    }, {
        fixed: '',
        prop: 'recommendTotal',
        label: '点赞总数',
        width: ''
    }, {
        fixed: '',
        prop: 'isEnable',
        label: '状态',
        width: ''
    }];
    let tableEle2 = [{
        fixed: 'left',
        prop: 'description',
        label: '用户问题',
        width: '500px'
    }, {
        fixed: '',
        prop: 'destination',
        label: '目的地',
        width: ''
    }, {
        fixed: '',
        prop: 'userName',
        label: '用户名',
        width: ''
    }, {
        fixed: '',
        prop: 'createTime',
        label: '创建时间',
        width: ''
    }];

    import {Message} from 'element-ui'
    import tableCom from '../common/Table.vue'
    import {getSpots} from '../../api/sevApi'
    import {getQuestions} from '../../api/active'
    export default {
        data (){
            return {
                show: false,
                //表格初始化
                tableData: [],
                tableEle,
                rowNum: 5,
                pageNumber: 1,
                total: 0,
                //表格2初始化
                tableData2: [],
                tableEle2,
                rowNum2: 5,
                pageNumber2: 1,
                total2: 0,
                //查询条件
                spotId: null,
                name: '',
                title: '',
                diaryId:null,
            }
        },
        methods: {
            openDelete() {

            },
            showDetails() {

            },
            showQuestion(row) {
                this.spotId = row.scenicSpotId;
                this.getQuestion();
                this.show = true;
            },
            getQuestion() {
                getQuestions({
                    spotId: this.spotId,
                    description: this.title,
                    pageNumber: this.pageNumber2,
                    pageSize: this.rowNum2,
                }).then(res => {
                    this.total2 = res.data.total;
                    this.tableData2 = res.data.list;
                })
            },
            getData() {
                getSpots({
                    name: this.name,
                    pageNumber: this.pageNumber,
                    pageSize: this.rowNum
                }).then(res => {
                    let list = res.data.list;
                    list.forEach(list => {
                        if (list.scenicSpotType === 1) {
                            list.scenicSpotType = '城市'
                        } else {
                            list.scenicSpotType = '景点'
                        }
                        if (list.isEnable === 0) {
                            list.isEnable = '禁用'
                        } else {
                            list.isEnable = '可用'
                        }
                    });
                    this.tableData = res.data.list;
                    this.total = res.data.total;
                })
            },
            //翻页
            getPageNumber(pageNumber) {
                this.pageNumber = pageNumber;
                this.getData();
            },
            //翻页2
            getPageNumber2(pageNumber) {
                this.pageNumber2 = pageNumber;
                this.getQuestion();
            },
        },
        created() {
            this.getData();
        },
        components: {
            tableCom
        }
    }
</script>


<style scoped>
    .red {
        color: #ff0000;
    }
    .detail-title {
        padding: 0 20px;
        text-align: center;
        font-size: 20px;
    }

    .handle-box {
        margin-bottom: 20px;
    }

    .handle-input {
        width: 200px;
        display: inline-block;
    }

    .mr10 {
        margin-right: 10px;
    }
</style>
