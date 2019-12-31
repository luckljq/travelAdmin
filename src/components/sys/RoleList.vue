/**
 * description：角色列表
 *
 * @author ljq
 * @date 2019/12/31　15:19
 */
<template slot-scope="scope">
    <div class="sidebar">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 角色管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="name" placeholder="角色昵称模糊查询" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="getData">搜索</el-button>
                <el-button type="primary" icon="el-icon-circle-plus" class="handle-del mr10" @click="addVisible = true">增加</el-button>
            </div>

            <tableCom :tableData="tableData" :rowNum="this.rowNum" :tableEle="tableEle" :total="this.total"
                      v-on:getPageNumber="getPageNumber">
                <el-table-column slot="btn-operation"
                                 fixed="right"
                                 label="权限操作"
                                 width="300px">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-info" @click="showPrivileges(scope.row)">查看权限</el-button>
                        <el-button type="text" icon="el-icon-edit">分配权限</el-button>
                    </template>
                </el-table-column>
                <el-table-column slot="btn-operation"
                                 fixed="right"
                                 label="基本操作"
                                 width="300px">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red">删除</el-button>
                    </template>
                </el-table-column>
            </tableCom>
            <!--新增用户弹出框-->
            <el-dialog title="新增角色" :visible.sync="addVisible" width="25%">

                <el-form :model="addForm" :rules="addRules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

                    <el-form-item label="角色名称" prop="name">
                        <el-input v-model="addForm.name" style="width: 215px"></el-input>
                    </el-form-item>
                    <el-form-item label="角色描述" prop="description">
                        <el-input v-model="addForm.description" style="width: 215px"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="add('ruleForm')">确认增加</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>

            <el-dialog title="拥有权限" :visible.sync="showPrivilege" width="25%">
                <div class="container">
                <el-tree    style="margin: auto"
                            :data="data"
                            node-key="id"
                            :default-expanded-keys="[-1, -2, -3]"
                            :props="defaultProps">
                </el-tree>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="showPrivilege = false">确定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import {Message} from 'element-ui'
    import tableCom from '../common/Table.vue'
    import {getRoles, addRole} from '../../api/sysApi'
    let tableEle = [{
        fixed: 'left',
        prop: 'roleName',
        label: '角色名称',
        width: ''
    }, {
        fixed: '',
        prop: 'description',
        label: '角色描述',
        width: ''
    }, {
        fixed: '',
        prop: 'createTime',
        label: '创建时间',
        width: ''
    }];
    export default {
        data() {
            return {
                data: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                showPrivilege:false,
                addVisible:false,
                //表格初始化
                tableData: [],
                tableEle,
                rowNum: 5,
                pageNumber:1,
                total:0,
                name:'',
                addForm: {
                    name: '',
                    description: ''
                },
                addRules: {
                    name: [
                        { required: true, message: '请输入角色名', trigger: 'blur' },
                        { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
                    ],
                    description: [
                        { required: true, message: '请输入角色描述', trigger: 'blur' },
                        { min: 2, max: 50, message: '长度为 50 个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        created() {
            this.getData();
        },
        methods: {
            showPrivileges(row) {
                this.data = [];
                let i = -1;
                let privileges = row.privileges;
                privileges.forEach(privilege => {
                    let flag = false;
                    if (this.data.length == 0){
                        this.data.push({
                            id:i,
                            label:privilege.groupName,
                            children:[]
                        });
                        i = i-1;
                    }
                    this.data.forEach(d => {
                        if (d.label == privilege.groupName) {
                            let a = {
                                id: privilege.privilegeId,
                                label:  privilege.privilegeName
                            };
                            d.children.push(a);
                            flag = true;
                        }
                    });
                    if (flag == false) {
                        this.data.push({
                            id:i,
                            label:privilege.groupName,
                            children:[{
                                id: privilege.privilegeId,
                                label:  privilege.privilegeName
                            }]
                        });
                        i = i-1;
                    }
                });
                this.showPrivilege = true;
            },
            // showPrivileges(row) {
            //     let flag = false;
            //     let privileges = row.privileges;
            //     this.data.forEach(d => {
            //         d.children = [];
            //     });
            //     privileges.forEach(privilege => {
            //         this.data.forEach(d => {
            //             if (d.label == privilege.groupName) {
            //                 let a = {
            //                     id: privilege.privilegeId,
            //                     label:  privilege.privilegeName
            //                 };
            //                 d.children.push(a);
            //             }
            //         })
            //     });
            //     this.showPrivilege = true;
            // },
            add(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        addRole({
                            roleName:this.addForm.name,
                            description:this.addForm.description,
                        }).then(res => {
                            this.getData();
                            Message.success({
                                message:res.message,
                                center:true
                            });
                            this.addVisible = false
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            getData(){
                getRoles({
                    name: this.name,
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
