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
                <el-button type="primary" icon="el-icon-circle-plus" class="handle-del mr10"
                           @click="openAdd">增加</el-button>
            </div>

            <tableCom :tableData="tableData" :rowNum="this.rowNum" :tableEle="tableEle" :total="this.total"
                      v-on:getPageNumber="getPageNumber">
                <el-table-column slot="btn-operation"
                                 fixed="right"
                                 label="操作"
                                 width="300px">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="showSpot(scope.row)">查看/编辑</el-button>
                        <el-button type="text" icon="el-icon-edit" @click="enableSpots(scope.row, 1)">启用</el-button>
                        <el-button type="text" icon="el-icon-edit" @click="enableSpots(scope.row, 0)">禁用</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.row)" >删除</el-button>
                    </template>
                </el-table-column>
            </tableCom>
        </div>
        <div v-if="show">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 景区详情
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-form ref="form" :inline="true" :model="spot" label-width="80px">
                <el-form-item label="景点名称" class="left">
                    <el-input v-model="spot.scenicSpotName"></el-input>
                </el-form-item>
                <el-form-item label="景区类型" class="left">
                    <el-select v-model="spot.scenicSpotType" placeholder="景区类型" style="width: 200px">
                        <el-option label="城市" value="城市"></el-option>
                        <el-option label="景点" value="景点"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="点赞总数" class="left">
                    <el-input v-model="spot.recommendTotal"></el-input>
                </el-form-item>
                <div v-if="spot.scenicSpotType == '景点'">
                    <div><el-form-item label="景点电话" class="left">
                        <el-input v-model="spot.scenicSpotPhone"></el-input>
                    </el-form-item>
                        <el-form-item label="景点网址" class="left">
                            <el-input v-model="spot.scenicSpotUrl"></el-input>
                        </el-form-item>
                        <el-form-item label="参考用时" class="left">
                            <el-input v-model="spot.useTime"></el-input>
                        </el-form-item>
                    </div>
                    <div class="left">
                        <el-form-item label="开放时间">
                            <el-input type="textarea" v-model="spot.openTime" style="width: 500px"></el-input>
                        </el-form-item>
                        <el-form-item label="交通">
                            <el-input type="textarea" v-model="spot.traffic" style="width: 500px"></el-input>
                        </el-form-item>
                    </div>
                    <div class="left">
                        <el-form-item label="景点票价">
                            <el-input type="textarea" v-model="spot.admissionTicket" style="width: 900px"></el-input>
                        </el-form-item>
                    </div>
                    <div class="left">
                        <el-form-item label="景点描述">
                            <el-input type="textarea" v-model="spot.description" style="width: 900px"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div>
                <el-form-item class="left2">
                    <el-button @click="show = false">取 消</el-button>
                    <el-button type="primary" @click="editSpot">确认修改</el-button>
                </el-form-item>
                </div>
            </el-form>
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

        <!-- 新增弹出框 -->
        <el-dialog title="新增景点" :visible.sync="addVisible" width="25%">
            <el-form :model="form" ref="form" label-width="100px" class="demo-ruleForm">
                <el-form-item label="景点名字">
                    <el-input v-model="form.scenicSpotName"  style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="景点类型">
                    <el-radio-group v-model="form.scenicSpotType">
                        <el-radio label="1">城市</el-radio>
                        <el-radio label="2">景点</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="景点关键字">
                    <el-input v-model="form.keyWord"  style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="景点电话">
                    <el-input v-model="form.scenicSpotPhone"  style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="景点网址">
                    <el-input v-model="form.scenicSpotUrl"  style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="参考用时">
                    <el-input v-model="form.useTime"  style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="交通">
                    <el-input v-model="form.traffic"  style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="门票">
                    <el-input v-model="form.admissionTicket"  style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="开放时间">
                    <el-input v-model="form.openTime"  style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="景点描述">
                    <el-input type="textarea" v-model="form.description"  style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addSpot">确认修改</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">是否确定删除此景点？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import {Message} from 'element-ui'
    import tableCom from '../common/Table.vue'
    import {getSpots, editSpot, insertSpot, enableSpot, deleteSpot} from '../../api/sevApi'
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
                form:{
                },
                delVisible:false,
                addVisible:false,
                id:null,
                show:false,
                spot:{
                },
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
            this.getData();
        },
        methods: {
            //打开删除弹窗
            handleDelete(row){
                this.id = row.scenicSpotId;
                this.delVisible = true;
            },
            //删除
            deleteRow(){
                deleteSpot(this.id).then(res => {
                    Message.success({
                        message:res.message,
                        center:true
                    });
                    this.delVisible = false;
                    this.getData();
                })
            },
            //启用禁用
            enableSpots(row, enable){
                enableSpot(row.scenicSpotId,enable).then(res => {
                    Message.success({
                        message:res.message,
                        center:true
                    });
                    this.getData();
                })
            },
            //新增
            addSpot(){
                insertSpot({
                    scenicSpotName: this.form.scenicSpotName,
                    keyWord: this.form.keyWord,
                    scenicSpotType: this.form.scenicSpotType,
                    description: this.form.description,
                    scenicSpotPhone: this.form.scenicSpotPhone,
                    scenicSpotUrl: this.form.scenicSpotUrl,
                    useTime: this.form.useTime,
                    traffic: this.form.traffic,
                    admissionTicket: this.form.admissionTicket,
                    openTime: this.form.openTime,
                }).then(res => {
                    this.getData();
                    Message.success({
                        message:res.message,
                        center:true
                    });
                    this.addVisible = false;
                });
            },
            //打开新增弹出框
            openAdd(){
                this.from = {};
                this.addVisible = true;
            },
            //修改景点
            editSpot(){
                let type = 1;
                if (this.spot.scenicSpotType == '景点'){
                    type = 2
                }
                editSpot({
                    scenicSpotId: this.id,
                    scenicSpotName: this.spot.scenicSpotName,
                    scenicSpotType: type,
                    recommendTotal: this.spot.recommendTotal,
                    description: this.spot.description,
                    scenicSpotPhone: this.spot.scenicSpotPhone,
                    scenicSpotUrl: this.spot.scenicSpotUrl,
                    useTime: this.spot.useTime,
                    traffic: this.spot.traffic,
                    admissionTicket: this.spot.admissionTicket,
                    openTime: this.spot.openTime
                }).then(res => {
                    this.getData();
                    Message.success({
                        message:res.message,
                        center:true
                    });
                    this.show = false;
                })
            },
            //打开详情
            showSpot(row) {
                this.spot = row;
                this.show = true;
                this.id = row.scenicSpotId;
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
    .left2 {
        margin-left: 580px;
    }
    .left {
        margin-left: 100px;
    }
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
