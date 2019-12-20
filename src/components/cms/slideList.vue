<template slot-scope="scope">
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 轮播管理
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
      <el-table :data="tableData" border class="table" ref="multipleTable">
        <!--                <el-table-column type="selection" width="55" align="center"></el-table-column>-->
        <el-table-column prop="title" label="标题" width="150"></el-table-column>
        <el-table-column prop="position" label="显示位置" :formatter="formatPosition"></el-table-column>
        <el-table-column prop="isEnable" label="状态" :formatter="formatIsEnable"></el-table-column>
        <el-table-column prop="createUserName" label="创建人"></el-table-column>
        <el-table-column prop="gmtCreate" label="创建时间"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column label="操作" width="300" align="center">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-info" @click="handleDetails(scope.row)">查看</el-button>
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button type="text" icon="el-icon-edit" @click="editEnable(scope.row.id)">启用</el-button>
            <el-button type="text" icon="el-icon-edit" @click="editNotEnable(scope.row.id)">禁用</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="1000"
        ></el-pagination>
      </div>
    </div>


    <!-- 编辑弹出框 -->
    <!-- <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="50px">
        <el-form-item label="日期">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.date"
            value-format="yyyy-MM-dd"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog> -->

    <!-- 删除提示框 -->
    <!-- <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteRow">确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
    export default {
        name: 'basetable',
        data() {
            return {
                tableData: [],
                cur_page: 1,
                select_cate_position: '',
                select_cate_isEnable: '',
                select_word: '',
                editVisible: false,
                delVisible: false,
                form: {
                },
                idx: -1,
                id: -1
            }
        },
        created() {
            this.getData();
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            // 获取数据
            getData() {
                this.axios({
                    method: 'get',
                    url: 'http://localhost:8004/cms/slides',
                    params: {
                        pageNumber: this.cur_page,
                        pageSize: 5,
                        title: this.select_word,
                        isEnable: this.select_cate_isEnable,
                        position: this.select_cate_position
                    }
                }).then(res => {
                    // console.log(res.data.data.list);
                    this.tableData = res.data.data.list;
                    console.log(this.tableData);
                })
            },
            //跳转到详情
            handleDetails(row) {
                this.$router.push({
                    path:'/slide/details',
                    name:'slideDetails',
                    params: {
                        data: row
                    }
                });
            },
            // //修改页面
            // handleEdit(index, row) {
            //     this.editVisible = true;
            // },
            // //删除页面显示
            // handleDelete(index, row) {
            //     this.idx = index;
            //     this.id = row.id;
            //     this.delVisible = true;
            // },
            editEnable(id){
                console.log(id);
                this.axios({
                    method: 'put',
                    url: 'http://localhost:8004/cms/slide/enable',
                    params: {
                        slideId: id,
                        isEnable: 1
                    }
                }).then(res => {
                  if (res.data.code == 200) {
                    this.getData();
                  }
                });
            },
            editNotEnable(id){
                console.log(id);
                this.axios({
                    method: 'put',
                    url: 'http://localhost:8004/cms/slide/enable',
                    params: {
                        slideId: id,
                        isEnable: 0
                    }
                }).then(res => {
                  if (res.data.code == 200) {
                    this.getData();
                  }
                });
            },
            //格式化position
            formatIsEnable: function (row, column) {
                return row.isEnable === 1 ? '可用' : row.isEnable === 0 ? '禁用' : '未知';
            },
            //格式化position
            formatPosition: function (row, column) {
                switch(row.position){
                    case 0:
                        return '首页';
                        break;
                    case 1:
                        return '登陆页';
                        break;
                    case 2:
                        return '启动页';
                        break;
                    default:
                        return '未知';
                }
            }
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
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
</style>
