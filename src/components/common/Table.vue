/**
* description：表格组件
*
* @author ljq
* @date 2019/12/20　10:04
*/
<template>
    <div>
        <el-table :data="tableData_changge" border class="table" ref="multipleTable">
            <el-table-column v-for="(ele,i) in  tableEle" :key="i"
                             :fixed="ele.fixed"
                             :prop="ele.prop"
                             :label="ele.label"
                             :width="ele.width">
            </el-table-column>
            <slot name="btn-operation"></slot>
        </el-table>
        <!--分页-开始-->
        <div class="pagination">
                <el-pagination background layout="total, prev, pager, next" @current-change="handleCurrentChange"
                               :total="total" :page-size="page_size" :current-page="currentPage">
                </el-pagination>
        </div>
        <!--分页-结束-->
    </div>
</template>
<script>
    export default {
        data() {
            return {
                // 总条数
                total: this.tableData.length,
                tableData_changge: this.tableData.slice(0, this.rowNum),
                page_size: this.rowNum,
                // 当前页
                currentPage: 1
            }
        },
        props: ['tableEle', 'tableData', 'rowNum'],
        mounted() {
        },
        methods: {
            handleCurrentChange(val) {
                let pageNum = this.rowNum;
                let vm = this;
                this.currentPage = val;
                let aa = this.currentPage - 1;
                let startPage = aa * pageNum;
                let endPage = parseInt(this.currentPage * pageNum);
                if (!(vm.tableData.length > endPage)) {
                    endPage = vm.tableData.length
                }
                let list = [];
                for (let i = startPage; i < endPage; i++) {
                    list.push(vm.tableData[i])
                }
                vm.tableData_changge = list
            }
        }
    }
</script>
<style>
    .table {
        width: 100%;
        font-size: 14px;
    }
</style>

