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
        {{$route.params.data}}
        </div>
    </div>
</template>
<script>
    export default {
        name: "userEdit",
        data () {
            return{
            }
        },
        methods:{

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
