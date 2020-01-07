<template slot-scope="scope">
    <div class="sidebar">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 景区详情
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            {{this.$route.params.data}}
        </div>
    </div>
</template>
<script>
    export default {
        name: "spotDetail",
        data () {
            return{
            }
        },
        methods:{
        }
    }
</script>
<style scoped>
</style>
