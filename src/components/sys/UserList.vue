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
                <el-button type="primary" icon="el-icon-circle-plus" class="handle-del mr10">增加</el-button>
                <el-select
                        v-model="select_cate_position"
                        placeholder="显示位置"
                        class="handle-select mr10"
                        @change="getData"
                >
                    <el-option key="1" label="启动页" value="2"></el-option>
                    <el-option key="2" label="登录页" value="1"></el-option>
                    <el-option key="3" label="首页" value="0"></el-option>
                </el-select>
                <el-select
                        v-model="select_cate_isEnable"
                        placeholder="状态"
                        class="handle-select mr10"
                        @change="getData"
                >
                    <el-option key="1" label="启用" value="1"></el-option>
                    <el-option key="2" label="禁用" value="0"></el-option>
                </el-select>
                <el-input v-model="select_word" placeholder="标题" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="getData">搜索</el-button>
            </div>
            <tableCom :tableData="tableData" :rowNum="5" :tableEle="tableEle">
                <el-table-column slot="btn-operation"
                                 fixed="right"
                                 label="操作"
                                 width="300px">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-info" @click="handleDetails(scope.row)">查看</el-button>
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.$index, scope.row)"
                        >编辑
                        </el-button>
                        <el-button type="text" icon="el-icon-edit" @click="editEnable(scope.row.id)">启用</el-button>
                        <el-button type="text" icon="el-icon-edit" @click="editNotEnable(scope.row.id)">禁用</el-button>
                        <el-button
                                type="text"
                                icon="el-icon-delete"
                                class="red"
                                @click="handleDelete(scope.$index, scope.row)"
                        >删除
                        </el-button>
                    </template>
                </el-table-column>
            </tableCom>
        </div>
    </div>
</template>
<script>
    import tableCom from '../common/Table.vue'
    let tableData = [{
        date: 'ins-fargqeu',
        province: '运行中',
        city: '亚太区 ',
        address: '标准型S1 ',
        zip: '1核 8GB 1Mbps',
        ip: '192.202.34.24'
    }, {
        date: 'ins-qwerr',
        province: '关机',
        city: '亚太区 ',
        address: '标准型S3 ',
        zip: '1核 1GB 1Mbps',
        ip: '198.292.34.24'
    }, {
        date: 'ins-qwerr',
        province: '关机',
        city: '亚太区 ',
        address: '标准型S3 ',
        zip: '1核 1GB 1Mbps',
        ip: '198.292.34.24'
    }, {
        date: 'ins-qwerr',
        province: '关机',
        city: '亚太区 ',
        address: '标准型S3 ',
        zip: '1核 1GB 1Mbps',
        ip: '198.292.34.24'
    }];
    let tableEle = [{
        fixed: 'left',
        prop: 'date',
        label: 'ID/主机名',
        width: ''
    }, {
        fixed: '',
        prop: 'province',
        label: '状态',
        width: '120'
    }, {
        fixed: '',
        prop: 'city',
        label: '可用区',
        width: ''
    }, {
        fixed: '',
        prop: 'address',
        label: '主机类型',
        width: ''
    }, {
        fixed: '',
        prop: 'zip',
        label: '配置',
        width: ''
    }, {
        fixed: '',
        prop: 'ip',
        label: 'IP地址',
        width: ''
    }];
    export default {
        data() {
            return {
                tableData,
                tableEle,
                rowNum: '2'
            }
        },
        methods: {
            check() {
                alert('查看功能')
            },
            edit(row) {
                console.log('编辑功能')
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

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
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
