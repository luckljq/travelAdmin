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
                <el-table-column slot="btn-operation" fixed="right" label="查看" width="300px">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-food" @click="openFood(scope.row)" >美食攻略</el-button>
                        <el-button type="text" icon="el-icon-office-building" @click="openHotel(scope.row)">住宿攻略</el-button>
                    </template>
                </el-table-column>
                <el-table-column slot="btn-operation" fixed="right" label="新增" width="300px">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-food" @click="openAddFood(scope.row)"  >新增美食攻略</el-button>
                        <el-button type="text" icon="el-icon-office-building" @click="openAddHotel(scope.row)">新增住宿攻略</el-button>
                    </template>
                </el-table-column>
            </tableCom>
        </div>

        <div v-if="showFood">
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>
                        <i class="el-icon-lx-cascades"></i> 美食攻略
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="container">
                <div class="handle-box">
                    <el-input v-model="foodName" placeholder="美食名模糊查询" class="handle-input mr10"></el-input>
                    <el-button type="primary" icon="el-icon-search" @click="getFoods">搜索</el-button>
                </div>
                <tableCom :tableData="tableData2" :rowNum="this.rowNum2" :tableEle="tableEle2" :total="this.total2"
                          v-on:getPageNumber="getPageNumber2">
                    <el-table-column slot="btn-operation" fixed="right" label="操作" width="300px">
                        <template slot-scope="scope">
                            <el-button type="text" icon="el-icon-info" @click="openFoodDetail(scope.row)" >美食详情</el-button>
                            <el-button type="text" icon="el-icon-delete" class="red" @click="openDelete(scope.row)">删除美食</el-button>
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

        <div v-if="showHotel">
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>
                        <i class="el-icon-lx-cascades"></i> 住宿攻略
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="container">
<!--                <tableCom :tableData="tableData2" :rowNum="this.rowNum2" :tableEle="tableEle2" :total="this.total2"-->
<!--                          v-on:getPageNumber="getPageNumber2">-->
<!--                    <el-table-column slot="btn-operation" fixed="right" label="操作" width="300px">-->
<!--                        <template slot-scope="scope">-->
<!--                            <el-button type="text" icon="el-icon-info" @click="openImage(scope.row)">图片预览</el-button>-->
<!--                            <el-button type="text" icon="el-icon-delete" class="red" @click="openDelete(scope.row)">删除图片</el-button>-->
<!--                        </template>-->
<!--                    </el-table-column>-->
<!--                </tableCom>-->
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

        <!-- 美食详情弹窗 -->
        <el-dialog title="美食详情" :visible.sync="showFoodDetail" width="500px" center>
            <el-row :gutter="20" style="text-align: center">
                <el-col :span="6"><div > <el-tag>{{this.strategyName}} </el-tag></div></el-col>
                <el-col :span="18"><div >店家：{{this.address}}</div></el-col>
            </el-row>
            <el-row :gutter="20" style="text-align: center">
                <el-col :span="24"><div style="margin-top: 10px">
                    <el-image :src="foodImageUrl"></el-image>
                </div></el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="24"><div >{{this.description}}</div></el-col>
            </el-row>
        </el-dialog>

        <!-- 新增美食弹窗 -->
        <el-dialog title="新增美食攻略" :visible.sync="showAddFood" width="560px"  center>
            <el-form :model="form" ref="form" label-width="100px" class="demo-ruleForm">
                <el-form-item label="美食名字">
                    <el-input v-model="form.strategyName"  style="width: 360px"></el-input>
                </el-form-item>
                <el-form-item label="推荐地址">
                    <el-input v-model="form.address"  style="width: 360px"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input type="textarea" v-model="form.description"  style="width: 360px"></el-input>
                </el-form-item>
                <el-form-item label="图片上传">
                    <el-upload
                            class="avatar-uploader"
                            action="http://localhost:8888/sev/food/image"
                            :headers="{Authorization:token}"
                            :on-success="onSuccess"
                            :show-file-list="false">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button @click="showAddFood = false">取 消</el-button>
                    <el-button type="primary" @click="addFoods">确认</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 新增住宿弹窗 -->
        <el-dialog title="新增住宿攻略" :visible.sync="showAddHotel" width="300px" center>

        </el-dialog>
    </div>

</template>
<script>
    import {Message} from 'element-ui'
    import tableCom from '../common/Table.vue'
    import {getSpots, addFood, getFoodList} from '../../api/sevApi'
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
        prop: 'strategyName',
        label: '美食名称',
        width: ''
    },{
        fixed: '',
        prop: 'scenicSpotName',
        label: '所在城市',
        width: ''
    },{
        fixed: '',
        prop: 'address',
        label: '推荐店家',
        width: '500px'
    },{
        fixed: '',
        prop: 'recommendTotal',
        label: '点赞总数',
        width: ''
    },{
        fixed: '',
        prop: 'createTime',
        label: '创建时间',
        width: ''
    }];
    let tableEle3 =  [{
        fixed: 'left',
        prop: 'scenicSpotId',
        label: '景区名',
        width: ''
    },{
        fixed: '',
        prop: 'imageUrl',
        label: '图片链接',
        width: '500px'
    },{
        fixed: '',
        prop: 'createTime',
        label: '创建时间',
        width: ''
    }];
    export default {
        data() {
            return {
                showFoodDetail: false,
                token: "Bearer " + JSON.parse(window.sessionStorage.getItem('UserState')).user.token,
                imageUrl: '',
                form:{},
                showAddHotel:false,
                showAddFood:false,
                showFood:false,
                showHotel:false,
                //表格初始化
                tableData: [],
                tableEle,
                rowNum: 5,
                pageNumber:1,
                total:0,
                //查询条件
                name: '',
                id:null,
                //food表格初始化
                tableData2: [],
                tableEle2,
                rowNum2: 5,
                pageNumber2:1,
                total2:0,
                //查询条件
                foodName: '',
                //hotel表格初始化
                tableData3: [],
                tableEle3,
                rowNum3: 5,
                pageNumber3:1,
                total3:0,
                //food详情查看
                strategyName:'',
                foodImageUrl:'',
                address:'',
                description:''
            }
        },
        created() {
            this.getData();
        },
        methods:{
            openFoodDetail(row) {
                this.strategyName = row.strategyName;
                this.foodImageUrl = row.imageUrl;
                this.address = row.address;
                this.description = row.description;
                this.showFoodDetail = true;
            },
            //获取住宿列表
            getHotel() {

            },
            //打开删除弹窗
            openDelete(row) {

            },
            //获取美食列表
            getFoods() {
                getFoodList({
                    id:this.id,
                    name:this.foodName
                }).then(res => {
                    this.tableData2 = res.data.list;
                    this.total2 = res.data.total;
                })
            },
            //新增美食
            addFoods() {
              addFood({
                  scenicSpotId:this.id,
                  strategyName:this.form.strategyName,
                  address:this.form.address,
                  description:this.form.description,
                  imageUrl:this.imageUrl,
              }).then(res => {
                  Message.success({
                      message:res.message,
                      center:true
                  });
                  this.showAddFood = false;
              })
            },
            //上传成功
            onSuccess(res){
                console.log(res);
                this.imageUrl = "http://localhost" + res.data;
            },
            //打开新增住宿弹窗
            openAddHotel(row) {
                this.id = row.scenicSpotId;
                this.showAddHotel =true;
            },
            //打开新增美食弹窗
            openAddFood(row) {
                this.imageUrl = '';
                this.id = row.scenicSpotId;
                this.showAddFood =true;
            },
            //打开住宿攻略
            openHotel(row) {
                this.id = row.scenicSpotId;
                this.showFood = false;
                this.showHotel = true;
            },
            //打开美食攻略
            openFood(row) {
                this.id = row.scenicSpotId;
                this.getFoods();
                this.showHotel = false;
                this.showFood = true;
            },
            //获取景点列表
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
                this.getData()
            },
            //翻页2
            getPageNumber2(pageNumber) {
                this.pageNumber2 = pageNumber;
                this.getFoods();
            },
            //翻页3
            getPageNumber3(pageNumber) {
                this.pageNumber3 = pageNumber;
                this.getHotel();
            },
        },
        components: {
            tableCom
        }
    }
</script>
<style scoped>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 360px;
        height: 360px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 360px;
        height: 178px;
        display: block;
    }

    .my {
        text-align: center;
        margin: auto 0;
    }

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
