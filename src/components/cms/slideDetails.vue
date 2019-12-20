<template>
    <div class="ljq">
        <h1 class="el-button" >基本信息</h1>
        <br>
        <br>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            标题：{{ $route.params.data.title }}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            创建人：{{ $route.params.data.createUserName }}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            创建时间：{{ $route.params.data.gmtCreate }}</p><br><br>

        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            显示位置：{{ position }}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            备注：{{ $route.params.data.remark }}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            状态：{{ isEnable }}</p>
        <br>
        <br>
        <h1 class="el-button" >图片信息</h1>
        <br>
        <br>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            是否显示内容：{{ isShowContent }}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            内容：{{ $route.params.data.content }}
        </p>
        <br>
        <br>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            是否可跳转：{{ isLink }}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            详情url：{{ $route.params.data.linkUrl }}
        </p>
        <br>
        <br>
        <h1 class="el-button" >缩略图</h1>
        <div class="demo-image__placeholder">

<!--            {{ this.$route.params.data.imageUrl }}-->
            <div class="block">
                <span class="demonstration"></span>
                <el-image :src="src"></el-image>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "slideDetails",
        data () {
            return{
                position:this.toPosition(this.$route.params.data.position),
                isEnable:this.toEnable(this.$route.params.data.isEnable),
                isShowContent:this.toIsShowContent(this.$route.params.data.isShowContent),
                isLink:this.toIsShowContent(this.$route.params.data.isLink),
                // src:this.$route.params.data.imageUrl
                src:"http://www.tomqiao.cn/timg.jpg"
            }
        },
        methods:{
            toPosition(positon){
                if (positon === 2) {
                    return '启动页';
                }
                if (positon === 1) {
                    return '登陆页';
                }
                if (positon === 0) {
                    return '首页';
                }
            },
            toEnable(i){
                if (i === 1) {
                    return '启用';
                }
                if (i === 0) {
                    return '禁用';
                }
            },
            toIsShowContent(i){
                if (i === 1) {
                    return '是';
                }
                if (i === 0) {
                    return '否';
                }
            },
        }
    }
</script>

<style scoped>
.ljq{
    width: 1300px;
    height: 100%;
    background-color: white;
    margin-left: 150px;
    padding: 50px;
    font-size: large;
}
</style>
