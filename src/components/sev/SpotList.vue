<template slot-scope="scope">
    <div class="sidebar">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 景区管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="name" placeholder="景区名模糊查询" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="getData">搜索</el-button>
                <el-button type="primary" icon="el-icon-circle-plus" class="handle-del mr10" @click="addVisible = true">增加</el-button>
            </div>

            <tableCom :tableData="tableData" :rowNum="this.rowNum" :tableEle="tableEle" :total="this.total"
                      v-on:getPageNumber="getPageNumber">
                <el-table-column slot="btn-operation"
                                 fixed="right"
                                 label="操作"
                                 width="300px">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" >编辑</el-button>
                        <el-button type="text" icon="el-icon-edit" >启用</el-button>
                        <el-button type="text" icon="el-icon-edit" >禁用</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" >删除</el-button>
                    </template>
                </el-table-column>
            </tableCom>
        </div>
    </div>
</template>
<script>
    import {Message} from 'element-ui'
    import tableCom from '../common/Table.vue'
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
    export default {
        data() {
            return {
                //表格初始化
                tableData: [],
                tableEle,
                rowNum: 5,
                pageNumber:1,
                total:0,
                name:'',
            }
        },
        created() {
        },
        methods: {
            getData() {

            },
            //翻页
            getPageNumber(pageNumber){
                this.pageNumber = pageNumber;
                this.getData()
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
