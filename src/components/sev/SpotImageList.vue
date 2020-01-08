/**
 * description：图片管理
 *
 * @author ljq
 * @date 2020/1/8　14:54
 */
<template slot-scope="scope">
    <div class="sidebar">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 图片管理
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
                <el-table-column slot="btn-operation" fixed="right" label="操作" width="300px">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-info" @click="showImage(scope.row)" >查看图片</el-button>
                        <el-button type="text" icon="el-icon-info" >新增图片</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red">删除图片</el-button>
                    </template>
                </el-table-column>
            </tableCom>
        </div>

        <div v-if="show">
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>
                        <i class="el-icon-lx-cascades"></i> 景区图片
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="container">
                <tableCom :tableData="tableData2" :rowNum="this.rowNum2" :tableEle="tableEle2" :total="this.total2"
                          v-on:getPageNumber="getPageNumber2">
                    <el-table-column slot="btn-operation" fixed="right" label="操作" width="300px">
                        <template slot-scope="scope">
                            <el-button type="text" icon="el-icon-info" >图片预览</el-button>
                            <el-button type="text" icon="el-icon-delete" class="red">删除图片</el-button>
                        </template>
                    </el-table-column>
                </tableCom>
            </div>

            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>
    </div>
</template>
<script>
    import {Message} from 'element-ui'
    import tableCom from '../common/Table.vue'
    import {getSpots, getSpotImages} from '../../api/sevApi'

    let tableEle =  [{
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
    let tableEle2 =  [{
        fixed: 'left',
        prop: 'scenicSpotId',
        label: '景区名',
        width: ''
    },{
        fixed: '',
        prop: 'imageUrl',
        label: '图片链接',
        width: ''
    },{
        fixed: '',
        prop: 'createTime',
        label: '创建时间',
        width: ''
    }];
    export default {
        data () {
            return{
                show:false,
                //表格初始化
                tableData: [],
                tableEle,
                rowNum: 5,
                pageNumber:1,
                total:0,
                //表格2初始化
                tableData2: [],
                tableEle2,
                rowNum2: 5,
                pageNumber2:1,
                total2:0,
                //查询条件
                name: '',
                id:null,
            }
        },
        created() {
            this.getData();
        },
        methods:{
            showImage(row) {
                getSpotImages(row.scenicSpotId).then(res => {
                    let list = res.data.list;
                    list.forEach( list=>{

                    });
                    this.tableData2 = res.data.list;
                    this.total2 = res.data.total;
                });
                this.show = true;
            },

            getData() {
                getSpots({
                    name: this.name,
                    pageNumber: this.pageNumber,
                    pageSize: this.rowNum
                }).then(res => {
                    let list = res.data.list;
                    list.forEach( list=>{
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
                this.getData()
            },
            //翻页
            getPageNumber2(pageNumber) {
                this.pageNumber2 = pageNumber;
                this.getData()
            }
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

    .handle-input {
        width: 200px;
        display: inline-block;
    }

    .red {
        color: #ff0000;
    }

    .mr10 {
        margin-right: 10px;
    }
</style>
