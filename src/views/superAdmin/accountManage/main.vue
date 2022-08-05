<template>
  <div>
    <!-- 批量操作 -->
    <div class="seach-header">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="28"
          height="28"
          style="
            border-color: rgba(187, 187, 187, 1);
            border-width: 0px;
            border-style: solid;
          "
          filter="none"
        >
          <g>
            <rect
              width="48"
              height="48"
              fill="rgba(16.065,16.065,16.065,1)"
              fill-opacity="0.01"
              stroke="none"
            ></rect>
            <path
              d="M42 26V40C42 41.1046 41.1046 42 40 42H8C6.89543 42 6 41.1046 6 40V8C6 6.89543 6.89543 6 8 6L22 6"
              stroke="rgba(16.065,16.065,16.065,1)"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="none"
            ></path>
            <path
              d="M14 26.7199V34H21.3172L42 13.3081L34.6951 6L14 26.7199Z"
              fill="none"
              stroke="rgba(16.065,16.065,16.065,1)"
              stroke-width="4"
              stroke-linejoin="round"
            ></path>
          </g>
        </svg>
        <el-button
          size="mini"
          @click="showDialogVisible"
          :disabled="this.multipleSelection.length == 0"
          >批量修改</el-button
        >
      </div>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="28"
          height="28"
          style="
            border-color: rgba(187, 187, 187, 1);
            border-width: 0px;
            border-style: solid;
          "
          filter="none"
        >
          <g>
            <path
              d="M8.032 28.64c0.032 0.768 0.64 1.376 1.408 1.376h13.152c0.736 0 1.376-0.608 1.408-1.376l0.928-19.84h-17.856l0.96 19.84zM18.976 13.728c0-0.288 0.256-0.544 0.576-0.544h0.928c0.32 0 0.576 0.256 0.576 0.544v11.36c0 0.288-0.288 0.544-0.576 0.544h-0.928c-0.32 0-0.576-0.256-0.576-0.544v-11.36zM14.976 13.728c0-0.288 0.256-0.544 0.576-0.544h0.928c0.297 0.009 0.535 0.247 0.544 0.543l0 0.001v11.36c-0.009 0.297-0.247 0.535-0.543 0.544l-0.001 0h-0.928c-0.32 0-0.576-0.256-0.576-0.544v-11.36zM10.976 13.728c0-0.288 0.256-0.544 0.576-0.544h0.896c0.32 0 0.576 0.256 0.576 0.544v11.36c0 0.288-0.256 0.544-0.576 0.544h-0.896c-0.32 0-0.576-0.256-0.576-0.544v-11.36zM25.568 3.456h-6.080v-1.152c0-0.16-0.128-0.32-0.288-0.32h-6.368c-0.16 0-0.32 0.16-0.32 0.32v1.152h-6.048c-0.48 0-0.896 0.384-0.896 0.864v2.784h20.864v-2.784c0-0.001 0-0.003 0-0.004 0-0.475-0.385-0.86-0.86-0.86-0.001 0-0.003 0-0.004 0h0z"
              fill="rgba(16.065,16.065,16.065,1)"
            ></path>
          </g>
        </svg>
        <el-button
          size="mini"
          @click="deleteDialogVisible"
          :disabled="this.multipleSelection.length == 0"
          >批量删除</el-button
        >
      </div>

      <!-- 搜索区域 -->
      <el-input
        v-model="searchWord"
        type="search"
        @change="searchKeyWord"
        style="width: 300px; margin: 10px"
        size="mini"
        placeholder="搜索学号、姓名"
      ></el-input>
    </div>
    <!-- 信息表单 -->
    <!-- @sort-change="sortChange"排序 -->
    <el-table
      stripe
      tooltip-effect="dark"
      style="width: 100%"
      height="400px"
      ref="multipleTable"
      :data="tableList"
      :default-sort="{ prop: 'studentId', order: 'ascending' }"
      @selection-change="handleSelectionChange"
    >
      <!-- 注意上面有tableList -->
      <el-table-column type="selection" width="55" fixed> </el-table-column>
      <el-table-column prop="studentId" label="学号" sortable width="120" fixed>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
      <el-table-column
        prop="permission"
        label="用户权限"
        :filters="[
          { text: 'commitee', value: 'commitee' },
          { text: 'member', value: 'member' }
        ]"
        :filter-method="filterPermission"
        width="120"
      >
      </el-table-column>
      <el-table-column prop="phone" label="手机号" width="120">
        <!-- 脱敏显示 -->
        <template slot-scope="scope">
          {{ scope.row.phone | replacestar }}
        </template>
      </el-table-column>
      <el-table-column label="修改账号" fixed="right">
        <!-- 单次删除需要scope来传数据 -->
        <template slot-scope="scope">
          <el-button size="mini" @click="DialogVisibleChangeAccount(scope.row)"
            >修改账号</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="修改密码" fixed="right">
        <el-button size="mini" @click="handleKeyEdit">修改密码</el-button>
      </el-table-column>

      <el-table-column label="删除账号" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 生成邀请码 -->
    <div>
      <el-button type="primary" class="makeJoinKey" @click="DialogVisibleJoin"
        >生成邀请码</el-button
      >
      <!-- 邀请码，可一键复制 -->
      <clipBoard ref="clipBoard" />
      <!-- 引入很多弹窗 -->
      <manyDialog ref="manyDialog" />
      <!-- 批量操作弹窗 -->
      <batchOperateDialog ref="batchOperateDialog" />
    </div>
    <!-- 页码 -->
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
    >
    </el-pagination>
  </div>
</template>

<script>
//引入axios
import axios from 'axios'
//引入表单全部数据
import data from './data.js'
// 引入clipBoard
import clipBoard from './clipboard.vue'
//引入弹窗
import manyDialog from './manyDialog.vue' //单行修改
import batchOperateDialog from './batchOperateDialog.vue' //批量修改
export default {
  data() {
    return {
      // 关键字搜索
      organizationId: 0, ////组织名不知道，需要询问
      searchWord: '',

      // 页码
      tableList: [], //当前页展示数据
      page: {
        currentPage: 1, // 当前页码
        pagesize: 10, // 每页条数
        total: 100
      },
      // 表格数据
      tableData: [...data], //模拟数据
      //多选选中记录,只能记录单页，需要改进
      multipleSelection: []
    }
  },
  // 注册组件（一键复制）
  components: {
    clipBoard,
    manyDialog,
    batchOperateDialog
  },
  created() {
    //获取数据
    // this.getData()???
    this.searchKeyWord()
    //渲染数据
    this.page.pagesize = 10
    this.page.currentPage = 1
    this.pageCutDouwn()
  },
  methods: {
    // url
    // https://mmt-dev.sipcoj.com/
    //关键字搜索
    searchKeyWord() {
      axios({
        method: 'post',
        url: 'https://mmt-dev.sipcoj.com/account/manage/all',
        data: {
          organizationId: this.organizationId,
          searchWord: this.searchWord
        }
      }).then(
        (res) => {
          this.tableData = res.data.studentList
          this.total = res.data.total
        },
        (err) => {
          this.$message.error('获取数据失败' + err)
        }
      )
    },

    // 筛选权限
    filterPermission(value, row) {
      return row.permission === value
    },
    //修改账号表单校验，待修改
    findError() {
      if (!/^20[1-9][0-9][0-9]{4}$/.test(this.sendData.stdId)) {
        this.$message.error('学号长度为8')
      } else if (!/^[\u4E00-\u9FA5]{2,5}$/.test(this.sendData.stdName)) {
        this.$message.error('请输入真实姓名')
      } else if (!/^(1[3-9][0-9])[0-9]{8}$/.test(this.sendData.stdPhone)) {
        this.$message.error('电话不符合规范')
      } else this.ifError = true
    },
    //发请求模板////////////////////////////////////////
    postData() {
      this.findError() //校验数据
      if (this.ifError) {
        axios({
          method: 'post',
          url: 'http://47.94.90.140:8000/post',
          data: this.sendData
        }).then(
          (res) => {
            this.$message.success(res.data.message)
          },
          (err) => {
            this.$message.error(err)
          }
        )
      }
    },
    // 批量操作，先传输选中数据
    pushMultipleSelectionData() {
      this.$refs.batchOperateDialog.multipleSelection = this.multipleSelection
    },
    // 批量修改权限弹窗
    showDialogVisible() {
      // Object.assign(this.permission,data)
      this.$refs.batchOperateDialog.dialogVisible = true
      this.$refs.batchOperateDialog.organizationId = this.organizationId
      this.pushMultipleSelectionData() //批量传输选中数据
    },
    //批量删除弹窗
    deleteDialogVisible() {
      this.$refs.batchOperateDialog.dialogVisibleDelete = true
      this.$refs.batchOperateDialog.organizationId = this.organizationId
      this.pushMultipleSelectionData() //批量传输选中数据
    },
    //邀请码弹窗
    DialogVisibleJoin() {
      this.$refs.clipBoard.DialogVisibleJoin = true
      this.$refs.clipBoard.getInvitationCode()
    },
    //多选选中添加到记录中
    handleSelectionChange(val) {
      this.multipleSelection = val
      /////////////////直接获取选中数据
      console.log(this.multipleSelection)
    },
    //修改账号弹窗
    DialogVisibleChangeAccount(data) {
      // console.log(data)
      //不够优雅，待改进
      this.$refs.manyDialog.DialogVisibleChangeAccount = true
      this.$refs.manyDialog.organizationId = this.organizationId
      this.$refs.manyDialog.formLabelAlign = data
    },
    //修改密码弹窗
    handleKeyEdit() {
      this.$refs.manyDialog.dialogVisibleKey = true
      this.$refs.manyDialog.organizationId = this.organizationId
    },
    //删除 弹窗
    handleDelete(data) {
      console.log(data)
      // console.log(data.__ob__)
      // console.log(index)
      this.$refs.manyDialog.dialogVisibleDeleteAlign = true
      this.$refs.manyDialog.organizationId = this.organizationId
      this.$refs.manyDialog.formLabelAlign.studentId = data.studentId
      // this.$confirm('此操作将删除：' + data.name + '，是否继续？', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // })
      //   .then(() => {
      //     this.$message({
      //       type: 'info',
      //       message: '已删除'
      //     })
      //   })
      //   .catch(() => {
      //     this.$message({
      //       type: 'info',
      //       message: '已取消删除'
      //     })
      //   })
    },
    // 获取全部信息
    getData() {},
    //修改页码
    handleSizeChange(val) {
      this.page.pagesize = val
      // 页容量回到第一页
      this.page.currentPage = 1
      // console.log(`每页: ${val}`)
      this.pageCutDouwn()
    },
    handleCurrentChange(val) {
      this.page.currentPage = val
      // console.log(`当前页: ${val}`)
      this.pageCutDouwn()
    },
    // 具体分页操作
    pageCutDouwn() {
      this.tableList = this.tableData.filter(
        (item, index) =>
          index < this.page.currentPage * this.page.pagesize &&
          index >= this.page.pagesize * (this.page.currentPage - 1)
      )
      this.page.total = this.tableData.length
    }
  }
}
</script>
<style lang="less" scoped>
* {
  // line-height: 15px;
  line-height: 2.95vh;
  // color: black;
}
.seach-header {
  display: flex;
  justify-content: flex-end;
  margin: 0;
  padding: 0%;
  // height: 100px;
}
button {
  margin-left: 20px;
}
.search {
  width: 40vh;
  height: 100px;
}
.makeJoinKey {
  display: flex;
}
.yhqx {
  margin-right: 20px;
}
el-table {
  padding: 0px;
}
</style>
