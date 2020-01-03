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
                        <el-button type="text" icon="el-icon-edit" @click="changePrivileges(scope.row)">分配权限</el-button>
                    </template>
                </el-table-column>
                <el-table-column slot="btn-operation"
                                 fixed="right"
                                 label="基本操作"
                                 width="300px">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="editRoleOpen(scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="deleteOpen(scope.row)">删除</el-button>
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

            <!-- 查看权限弹出框 -->
            <el-dialog title="拥有权限" :visible.sync="showPrivilege" width="25%">
                <div class="container">
                <el-tree    style="margin: auto"
                            :data="data"
                            node-key="id"
                            :default-expand-all = "true"
                            :props="defaultProps">
                </el-tree>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="showPrivilege = false">确定</el-button>
                </span>
            </el-dialog>

            <!-- 分配权限弹出框 -->
            <el-dialog title="分配权限" :visible.sync="changePrivilege" width="25%">
                <div class="container">
                    <el-tree    ref="tree"
                                style="margin: auto"
                                show-checkbox
                                :data="privileges"
                                node-key="id"
                                :default-expand-all="true"
                                :props="defaultProps">
                    </el-tree>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="changePrivilege = false">取 消</el-button>
                    <el-button type="primary" @click="updatePrivilege()">确定</el-button>
                </span>
            </el-dialog>

            <!-- 编辑弹出框 -->
            <el-dialog title="编辑角色" :visible.sync="editVisible" width="25%">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="角色名称" prop="name">
                        <el-input v-model="ruleForm.name" style="width: 215px"></el-input>
                    </el-form-item>
                    <el-form-item label="角色描述" prop="description">
                        <el-input v-model="ruleForm.description" style="width: 215px"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="editVisible = false">取 消</el-button>
                        <el-button type="primary" @click="editRole('ruleForm')">确认修改</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <!-- 删除提示框 -->
            <el-dialog title="提示" :visible.sync="deleteVisible" width="300px" center>
                <div class="del-dialog-cnt">是否确定删除此用户？</div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="deleteVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
              </span>
            </el-dialog>

        </div>
    </div>
</template>
<script>
    import {Message} from 'element-ui'
    import tableCom from '../common/Table.vue'
    import {getRoles, addRole, getPrivileges, distributePrivilege, updateRole, deleteRole} from '../../api/sysApi'
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
                ruleForm: {
                    name: '',
                    description: '',
                },
                rules: {
                    name: [
                        { required: true, message: '请输入角色名称', trigger: 'blur' },
                        { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
                    ],
                    description: [
                        { required: true, message: '请输入角色描述', trigger: 'blur' },
                        { min: 2, max: 50, message: '长度为 2到50 个字符', trigger: 'blur' }
                    ]
                },
                roleId:null,
                privilege:[],
                privileges:[],
                data: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                editVisible:false,
                changePrivilege:false,
                showPrivilege:false,
                addVisible:false,
                deleteVisible:false,
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
            //获取所有权限形成树形图
            getPrivileges().then(res => {
                let i = -1;
                let privileges = res.data;
                privileges.forEach(privilege => {
                    let flag = false;
                    if (this.privileges.length == 0){
                        this.privileges.push({
                            id:i,
                            label:privilege.groupName,
                            children:[]
                        });
                        i = i-1;
                    }
                    this.privileges.forEach(d => {
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
                        this.privileges.push({
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
            });
        },
        methods: {
            //删除
            deleteRow() {
                deleteRole(this.roleId).then(res => {
                    this.getData();
                    Message.success({
                        message:res.message,
                        center:true
                    });
                    this.deleteVisible = false
                })
            },
            //打开删除弹窗
            deleteOpen(row) {
                this.deleteVisible= true;
                this.roleId = row.roleId;
            },
            //打开编辑弹窗
            editRoleOpen(row) {
                this.editVisible = true;
                this.roleId = row.roleId;
                this.ruleForm.name = row.roleName;
                this.ruleForm.description = row.description;
            },
            //编辑角色
            editRole(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        updateRole({
                            roleId:this.roleId,
                            roleName:this.ruleForm.name,
                            description:this.ruleForm.description
                        }).then(res => {
                            this.getData();
                            Message.success({
                                message:res.message,
                                center:true
                            });
                            this.editVisible = false
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //修改权限
            updatePrivilege() {
                console.log(this.$refs.tree.getCheckedKeys(true));
                distributePrivilege({
                    roleId:this.roleId,
                    privilegeIdList:this.$refs.tree.getCheckedKeys(true)
                }).then(res => {
                    this.getData();
                    Message.success({
                        message:res.message,
                        center:true
                    });
                    this.changePrivilege = false
                })
            },
            changePrivileges(row) {
                this.roleId = row.roleId;
                //遍历组装树形图选择数据
                this.changePrivilege = true;
                this.privilege = [];
                row.privileges.forEach(privilege => {
                    this.privilege.push(privilege.privilegeId)
                });
                this.$nextTick(() => {
                    this.$refs.tree.setCheckedKeys(this.privilege);
                });
            },
            //展示拥有权限
            showPrivileges(row){
                this.data = [];
                let i = -1;
                let privileges = row.privileges;
                //遍历组装树形图数据
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
            //新增角色
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
            //获取角色数据
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
