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
                <tableCom :tableData="tableData3" :rowNum="this.rowNum3" :tableEle="tableEle3" :total="this.total3"
                          v-on:getPageNumber="getPageNumber3">
                    <el-table-column slot="btn-operation" fixed="right" label="操作" width="300px">
                        <template slot-scope="scope">
                            <el-button type="text" icon="el-icon-info" @click="openHotelDetail(scope.row)">酒店详情</el-button>
                            <el-button type="text" icon="el-icon-delete" class="red" @click="openDelete2(scope.row)" >删除酒店</el-button>
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

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteFoods">确 定</el-button>
              </span>
        </el-dialog>

        <!-- 美食详情弹窗 -->
        <el-dialog title="美食详情" :visible.sync="showFoodDetail" width="700px">
            <el-row :gutter="20" style="text-align: center">
                <el-divider>{{this.strategyName}}</el-divider>
                <el-col :span="24"><div >店家：{{this.address}}</div></el-col>
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
        <el-dialog title="新增美食攻略" :visible.sync="showAddFood" width="560px"   center>
            <el-form :model="form" ref="form" label-width="100px" >
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
        <el-dialog title="新增住宿攻略" :visible.sync="showAddHotel" width="560px" center>
            <el-form :model="hotelForm" ref="form" label-width="100px" class="demo-ruleForm">
                <el-form-item label="酒店名字">
                    <el-input v-model="hotelForm.strategyName"  style="width: 360px"></el-input>
                </el-form-item>
                <el-form-item label="酒店电话">
                    <el-input v-model="hotelForm.phone"  style="width: 360px"></el-input>
                </el-form-item>
                <el-form-item label="酒店地址">
                    <el-input v-model="hotelForm.address"  style="width: 360px"></el-input>
                </el-form-item>
                <el-form-item label="价格">
                    <el-input v-model="hotelForm.price"  style="width: 360px"></el-input>
                </el-form-item>
                <el-form-item label="是否可以停车">
                    <el-select v-model="hotelForm.isPark" placeholder="请选择">
                        <el-option label="可以" value="1"></el-option>
                        <el-option label="不可以" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input type="textarea" v-model="hotelForm.description"  style="width: 360px"></el-input>
                </el-form-item>
                <el-form-item label="图片上传">
                    <el-upload
                            action="http://localhost:8888/sev/hotel/upload"
                            list-type="picture-card"
                            :headers="{Authorization:token}"
                            :file-list="file"
                            :on-preview="handlePictureCardPreview"
                            :on-success="onSuccess2"
                            :on-remove="handleRemove"
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible" :modal="false">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
                <el-form-item>
                    <el-button @click="showAddHotel = false">取 消</el-button>
                    <el-button type="primary" @click="AddHotels">确认</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 住宿详情弹窗 -->
        <el-dialog title="住宿详情" :visible.sync="showHotelDetail" width="700px">
            <el-row :gutter="20">
                <el-divider>{{this.hotelDetail.strategyName}}</el-divider>
                    <div class="mt20">酒店电话： {{this.hotelDetail.phone}} </div>
                    <div class="mt20">简介： {{this.hotelDetail.description}} </div>
            </el-row>
            <div class="mt20" style="height: 360px; overflow-y: scroll">
                <img width="100%" :src="url" alt="" v-for="url in this.hotelDetail.imageUrl">
            </div>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible2" width="300px" center>
            <div class="del-dialog-cnt">是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="deleteHotels">确 定</el-button>
              </span>
        </el-dialog>
    </div>

</template>
<script>
    import {Message} from 'element-ui'
    import tableCom from '../common/Table.vue'
    import {getSpots, addFood, getFoodList, deleteFood, AddHotel, getHotelList, deleteHotel} from '../../api/sevApi'
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
        prop: 'strategyName',
        label: '酒店名称',
        width: ''
    },{
        fixed: '',
        prop: 'address',
        label: '酒店地址',
        width: '400px'
    },{
        fixed: '',
        prop: 'price',
        label: '酒店价格',
        width: ''
    },{
        fixed: '',
        prop: 'isPark',
        label: '是否可以停车',
        width: ''
    },{
        fixed: '',
        prop: 'createTime',
        label: '创建时间',
        width: ''
    }];
    export default {
        data() {
            return {
                delVisible2:false,
                hotelDetail:{},
                showHotelDetail:false,
                file:[],
                fileList:[],
                dialogImageUrl: '',
                hotelForm:{
                },
                showFoodDetail: false,
                token: "Bearer " + JSON.parse(window.sessionStorage.getItem('UserState')).user.token,
                imageUrl: '',
                form:{},
                dialogVisible:false,
                delVisible:false,
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
                description:'',
                foodId:null,
                hotelId:null
            }
        },
        created() {
            this.getData();
        },
        methods:{
            //打开删除弹窗
            openDelete2(row) {
                this.hotelId = row.id;
                this.delVisible2 = true;
            },
            //删除
            deleteHotels() {
                deleteHotel(this.hotelId).then(res => {
                    Message.success({
                        message: res.message,
                        center: true
                    });
                    this.delVisible2 = false;
                    this.getHotel();
                })
            },
            //打开酒店详情
            openHotelDetail(row) {
                console.log(row);
                this.hotelDetail = row;
                this.showHotelDetail = true;
            },
            //新增酒店
            AddHotels() {
                AddHotel({
                    scenicSpotId:this.id,
                    strategyName:this.hotelForm.strategyName,
                    phone:this.hotelForm.phone,
                    address:this.hotelForm.address,
                    price:this.hotelForm.price,
                    description:this.hotelForm.description,
                    isPark:this.hotelForm.isPark,
                    imageUrl:this.fileList
                }).then(res => {
                    Message.success({
                        message:res.message,
                        center:true
                    });
                    this.showAddHotel = false;
                    this.hotelForm = {};
                    this.file = [];
                    this.getHotel();
                })
            },
            handleRemove(file, fileList) {
                this.change(fileList);
            },
            onSuccess2(res, file, fileList) {
                Message.success({
                    message:res.message,
                    center:true
                });
                this.change(fileList);
            },
            change(fileList) {
                this.fileList = [];
                fileList.forEach(file => {
                    this.fileList.push(file.response.data)
                });
            },
            //上传图片预览
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },

            openFoodDetail(row) {
                this.strategyName = row.strategyName;
                this.foodImageUrl = row.imageUrl;
                this.address = row.address;
                this.description = row.description;
                this.showFoodDetail = true;
            },
            //获取住宿列表
            getHotel() {
                getHotelList({
                    id:this.id,
                    pageNumber:this.pageNumber3,
                    pageSize:this.rowNum3,
                }).then(res => {
                    let list = res.data.list;
                    list.forEach(i => {
                        if (i.isPark == 1) {
                            i.isPark = '可以';
                        } else {
                            i.isPark = '不可以';
                        }
                    });
                    this.tableData3 = list;
                    this.total3 = res.data.total;
                })
            },
            //删除
            deleteFoods() {
              deleteFood(this.foodId).then(res =>{
                  Message.success({
                      message:res.message,
                      center:true
                  });
                  this.delVisible = false;
                  this.getFoods();
              })
            },
            //打开删除弹窗
            openDelete(row) {
                this.foodId = row.id;
                this.delVisible = true;
            },
            //获取美食列表
            getFoods() {
                getFoodList({
                    id:this.id,
                    name:this.foodName,
                    pageNumber:this.pageNumber2,
                    pageSize:this.rowNum2
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
                this.getHotel();
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

    .mt20 {
        margin-top: 20px;
    }

    .mr10 {
        margin-right: 10px;
    }
</style>
