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

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑公告" :visible.sync="editVisible" width="25%">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="公告标题" prop="name">
                    <el-input v-model="ruleForm.name" style="width: 260px"></el-input>
                </el-form-item>
                <el-form-item label="公告内容" prop="description">
                    <el-input type="textarea"
                              :autosize="{ minRows: 5, maxRows: 10}"
                              v-model="ruleForm.description"
                              style="width: 260px">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="editUser('ruleForm')">确认修改</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">是否确定删除此公告？</div>
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
    import {getNotices, deleteNotice, updateNotice} from  '../../api/sysApi'

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
                editVisible:false,
                delVisible:false,
                //表格初始化
                tableData: [],
                tableEle,
                rowNum: 5,
                pageNumber:1,
                total:0,
                //查询条件
                name: '',
                id:null,
                //编辑框
                ruleForm: {
                    name: '',
                    description: '',
                },
                rules: {
                    name: [
                        { required: true, message: '请输入公告标题', trigger: 'blur' },
                        { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
                    ],
                    description: [
                        { required: true, message: '请输入公告内容', trigger: 'blur' },
                        { min: 2, max: 2000, message: '最长度为 2000 个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        created() {
            this.getData();
        },
        methods:{
            //修改公告信息
            editUser(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        updateNotice({
                            id:this.id,
                            senderId:this.$store.getters.getUser.id,
                            noticeName: this.ruleForm.name,
                            description: this.ruleForm.description
                        }).then(res => {
                            this.editVisible = false;
                            this.getData();
                            Message.success({
                                message:res.message,
                                center:true
                            })
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //删除公告
            deleteRow() {
                deleteNotice(this.id).then(res => {
                    Message.success({
                        message:res.message,
                        center:true
                    });
                    this.delVisible = false;
                    this.getData();
                })
            },
            //修改页面
            handleEdit(row) {
                this.id = row.id;
                this.ruleForm.name = row.noticeName;
                this.ruleForm.description = row.description;
                this.editVisible = true;
            },
            //删除页面显示
            handleDelete(row) {
                this.id = row.id;
                this.delVisible = true;
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
