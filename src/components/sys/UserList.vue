/**
 * description：用户列表页面
 *
 * @author ljq
 * @date 2019/12/20　10:51
 */
<template slot-scope="scope">
    <div class="sidebar">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 用户管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="container">
            <div class="handle-box">
<!--                <el-button type="primary" icon="el-icon-circle-plus" class="handle-del mr10">增加</el-button>-->
                <el-input v-model="name" placeholder="用户昵称模糊查询" class="handle-input mr10"></el-input>
                <el-input v-model="phone" placeholder="用户号码准确查询" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="getData">搜索</el-button>
            </div>
            <tableCom :tableData="tableData" :rowNum="this.rowNum" :tableEle="tableEle" :total="this.total"
                      v-on:getPageNumber="getPageNumber">
                <el-table-column slot="btn-operation"
                                 fixed="right"
                                 label="操作"
                                 width="300px">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-info" >查看</el-button>
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.row)"
                        >编辑
                        </el-button>
                        <el-button type="text" icon="el-icon-edit" @click="enableUser(scope.row.userId, 1)" >启用</el-button>
                        <el-button type="text" icon="el-icon-edit" @click="enableUser(scope.row.userId, 0)">禁用</el-button>
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

            <!-- 删除提示框 -->
            <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
              <div class="del-dialog-cnt">是否确定删除此用户？</div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
              </span>
            </el-dialog>

        </div>
    </div>
</template>
<script>
    import {Message} from 'element-ui'
    import tableCom from '../common/Table.vue'
    import {getUsers,editEnable,deleteUser} from '../../api/sysApi'
    //初始化表头
    let tableEle = [{
        fixed: 'left',
        prop: 'userName',
        label: '用户昵称',
        width: ''
    }, {
        fixed: '',
        prop: 'sex',
        label: '性别',
        width: '120'
    }, {
        fixed: '',
        prop: 'phone',
        label: '电话',
        width: ''
    }, {
        fixed: '',
        prop: 'localName',
        label: '所在地区',
        width: ''
    }, {
        fixed: '',
        prop: 'email',
        label: '电子邮箱',
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
                delVisible: false,
                //表格初始化
                tableData: [],
                tableEle,
                rowNum: 5,
                pageNumber:1,
                total:0,
                //查询条件
                name: '',
                phone:'',
                id:null
            }
        },
        //打开页面初始化
        created() {
            this.getData();
        },
        methods: {
            //跳转到编辑页面
            handleEdit(row) {
                this.$router.push({
                    path:'/user/edit',
                    name:'userEdit',
                    params: {
                        data: row
                    }
                });
            },
            //删除用户
            deleteRow() {
                deleteUser(this.id).then(res => {
                    this.getData();
                    Message.success({
                        message:res.message,
                        center:true
                    })
                });
                this.delVisible = false;
            },
            //删除页面显示
            handleDelete(row) {
                this.id = row.userId;
                this.delVisible = true;
            },
            //启用/禁用
            enableUser(id, i) {
                editEnable({
                    userId:id,
                    isEnable: i
                }).then(res => {
                    Message.success({
                        message: '操作成功',
                        center: true
                    });
                    this.getData();
                })
            },
            //翻页
            getPageNumber(pageNumber){
                this.pageNumber = pageNumber;
                this.getData()
            },
            //获取用户列表
            getData() {
                getUsers({
                    name: this.name,
                    phone: this.phone,
                    pageNumber: this.pageNumber,
                    pageSize: this.rowNum
                }).then(res => {
                    let list = res.data.list;
                    list.forEach( list=>{
                        if (list.isEnable === 0) {
                            list.isEnable = '禁用'
                        } else {
                            list.isEnable = '可用'
                        }
                    });
                    this.tableData = res.data.list;
                    this.total = res.data.total;
                    // console.log(this.tableData);
                })
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
