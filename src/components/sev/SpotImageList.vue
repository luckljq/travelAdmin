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
                <el-table-column slot="btn-operation" fixed="right" label="操作" width="300px">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-info" @click="showImage(scope.row)" >查看图片</el-button>
                        <el-button type="text" icon="el-icon-upload" @click="openAddImage(scope.row)">
                            图片上传</el-button>
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
                <div class="handle-box">
                    <el-input v-model="imageUrl" placeholder="图片地址查询" class="handle-input mr10"></el-input>
                    <el-button type="primary" icon="el-icon-search" @click="getImages">搜索</el-button>
                </div>
                <tableCom :tableData="tableData2" :rowNum="this.rowNum2" :tableEle="tableEle2" :total="this.total2"
                          v-on:getPageNumber="getPageNumber2">
                    <el-table-column slot="btn-operation" fixed="right" label="操作" width="300px">
                        <template slot-scope="scope">
                            <el-button type="text" icon="el-icon-info" @click="openImage(scope.row)">图片预览</el-button>
                            <el-button type="text" icon="el-icon-delete" class="red" @click="openDelete(scope.row)">删除图片</el-button>
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

        <!-- 上传图片弹出框 -->
        <el-dialog title="图片上传" :visible.sync="addImageVisible" :before-close="beforeClose" width="30%"  center>
<!--            <el-upload-->
<!--                    action="http://localhost:8888/sev/spot/image"-->
<!--                    :show-file-list="false"-->
<!--                    :headers="{Authorization:token}"-->
<!--                    :data="uploadData"-->
<!--            >-->
<!--                <el-button type="primary" size="medium">上传图片</el-button>-->
<!--            </el-upload>-->
            <div class="my">
                <el-upload
                        action="http://localhost:8888/sev/spot/image"
                        list-type="picture-card"
                        :headers="{Authorization:token}"
                        :data="uploadData"
                        :on-preview="handlePictureCardPreview"
                        :file-list="fileList"
                        :on-success="onSuccess"
                        :on-remove="handleRemove"
                        >
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible" :modal="false">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="beforeClose">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 图片预览框 -->
        <el-dialog title="图片预览" :visible.sync="imageVisible"  center>
            <div style="text-align: center">
            <el-image
                    :src="url"
                    ></el-image>
            </div>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">是否确定删除此图片？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteImage">确 定</el-button>
              </span>
        </el-dialog>
    </div>
</template>
<script>
    import {Message} from 'element-ui'
    import tableCom from '../common/Table.vue'
    import {getSpots, getSpotImages, deleteSpotImage} from '../../api/sevApi'

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
        width: '500px'
    },{
        fixed: '',
        prop: 'createTime',
        label: '创建时间',
        width: ''
    }];
    export default {
        data () {
            return{
                l:'',
                fileList:[],
                dialogImageUrl: '',
                dialogVisible:false,
                token: "Bearer " + JSON.parse(window.sessionStorage.getItem('UserState')).user.token,
                uploadData:{
                    id:null,
                },
                url:'',
                addImageVisible:false,
                imageVisible:false,
                delVisible:false,
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
                spotName:'',
                imageId:null,
            }
        },
        created() {
            this.getData();
        },
        methods:{
            handleRemove(res) {
                this.imageId = res.response.data;
                this.deleteImage();
            },
            onSuccess(res) {
                Message.success({
                    message:res.message,
                    center:true
                });
                this.show = true;
                this.getImages();
            },
            //上传图片预览
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },

            //关闭上传图片弹窗
            beforeClose(){
                this.fileList = [];
                this.addImageVisible = false;
            },
            //打开上传图片弹窗
            openAddImage(row) {
                this.id = row.scenicSpotId;
                this.spotName = row.scenicSpotName;
                this.uploadData.id = row.scenicSpotId;
                this.addImageVisible = true;
            },

            //图片预览弹框
            openImage(row) {
              this.url = row.imageUrl;
              this.imageVisible = true;
            },

            //删除弹框
            openDelete(row) {
                this.imageId = row.id;
                this.delVisible = true;
            },

            //删除图片
            deleteImage() {
                deleteSpotImage(this.imageId).then(res=>{
                    Message.success({
                        message:res.message,
                        center:true
                    });
                    this.delVisible = false;
                    this.getImages();
                });
            },
            //获取图片列表2
            getImages() {
                getSpotImages(this.id, {
                    url:this.imageUrl,
                    pageNumber:this.pageNumber2,
                    pageSize: this.rowNum2
                }).then(res => {
                    let list = res.data.list;
                    list.forEach( list=>{
                        list.scenicSpotId = this.spotName;
                    });
                    this.tableData2 = list;
                    this.total2 = res.data.total;
                })
            },
            //获取图片列表
            showImage(row) {
                this.id = row.scenicSpotId;
                this.spotName = row.scenicSpotName;
                getSpotImages(this.id, {
                    pageNumber:this.pageNumber2,
                    pageSize: this.rowNum2
                }).then(res => {
                    let list = res.data.list;
                    list.forEach( list=>{
                        list.scenicSpotId = this.spotName;
                    });
                    this.tableData2 = list;
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
            //翻页2
            getPageNumber2(pageNumber) {
                console.log(pageNumber);
                this.pageNumber2 = pageNumber;
                this.getImages();
            }
        },
        components: {
            tableCom
        }
    }
</script>
<style scoped>

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
