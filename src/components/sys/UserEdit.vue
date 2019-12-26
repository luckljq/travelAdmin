<template>
    <div class="sidebar">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 编辑用户
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户昵称" prop="name">
                    <el-input v-model="ruleForm.name" style="width: 215px"></el-input>
                </el-form-item>
                <el-form-item label="用户电话" prop="phone">
                    <el-input v-model="ruleForm.phone" style="width: 215px"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱">
                    <el-input v-model="ruleForm.email" style="width: 215px"></el-input>
                </el-form-item>
                <el-form-item label="用户性别" prop="sex">
                    <el-radio-group v-model="ruleForm.sex">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                        <el-radio label="保密"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="用户地区">
                    <location v-on:getValue="getValue"></location>
<!--                    <locations></locations>-->
                </el-form-item>
                <el-form-item label="活动形式" prop="desc">
                    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" >确认修改</el-button>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>
<script>
    import location  from '../common/Location'
    import Locations  from '../common/Locations'
    export default {
        name: "userEdit",
        data () {
            return{
                user:this.$route.params.data,
                ruleForm: {
                    name: this.$route.params.data.userName,
                    phone: this.$route.params.data.phone,
                    email: this.$route.params.data.email,
                    sex: '',
                    desc: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入用户昵称', trigger: 'blur' },
                        { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '请输入用户电话', trigger: 'blur' },
                        { min: 2, max: 11, message: '长度为 11 个字符', trigger: 'blur' }
                    ],
                    sex: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请填写活动形式', trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            getValue(locationCode) {
                console.log(locationCode[2])
            }
        },
        components: {
            location,
            Locations
        }
    }
</script>
<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .red {
        color: #ff0000;
    }

    .mr10 {
        margin-right: 10px;
    }
</style>
