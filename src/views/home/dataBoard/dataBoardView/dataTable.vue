<template>
  <div class="content">
    <!-- 测试更新数据 -->
    <div
      @click="de"
      style="
      position:fixed
      left:50px
        float: left;
        height: 5px;
        width: 150px;
        margin-right: 10px;
        color: blue;
      "
    >
      测试
      <!-- </div>
    <div
      @click="co"
      style="float: left; height: 5px; width: 150px; color: blue"
    >
    cookie -->
    </div>
    <!--  -->

    <!-- 搜索区域 -->
    <div class="seach-header">
      <el-input
        v-model="searchWord"
        type="search"
        @input="searchKeyWord"
        class="searchInput"
        size="small"
        prefix-icon="el-icon-search"
        placeholder="搜索学号、姓名"
      ></el-input>
    </div>
    <!-- 信息表单 -->
    <el-table
      stripe
      tooltip-effect="dark"
      class="el-table"
      height="72.2vh"
      :row-style="{ height: '0' }"
      :cell-style="{ padding: '0px' }"
      :header-cell-style="{
        background: '#282e38',
        color: '#ffffff',
        padding: '5px'
      }"
      ref="filterTable"
      :data="tableList"
      @sort-change="sortTableFun"
      @filter-change="filterChange"
      :default-sort="
        ({ prop: 'studentId', order: 'ascending' },
        { prop: 'permission', order: 'ascending' })
      "
    >
      <!-- 注意上面有tableList -->
      <el-table-column label="ID" align="center" width="70px">
        <template slot-scope="scope">
          {{ scope.$index + 1 + (currentPage - 1) * pagesize }}
        </template>
      </el-table-column>
      <el-table-column
        prop="studentId"
        label="学号"
        width="100px"
        align="center"
        sortable="custom"
      >
      </el-table-column>
      <!-- 姓名 -->
      <el-table-column
        prop="name"
        label="姓名"
        width="100px"
        align="center"
        sortable="custom"
      >
      </el-table-column>
      <!-- 班级 -->
      <el-table-column
        prop="className"
        width="120px"
        align="center"
        label="班级"
        :filters.sync="classNameFilter"
        column-key="className"
      >
        <!-- <template slot="header">
          <my-select-header
            :filterCondition="classNameFilter"
            :myLabel="classNameLabel"
          ></my-select-header>
        </template> -->
      </el-table-column>
      <el-table-column prop="phone" label="手机号" width="120px" align="center">
      </el-table-column>

      <!-- 社团志愿次序 -->
      <el-table-column
        width="160px"
        align="center"
        prop="organizationOrder"
        label="社团志愿次序"
        column-key="organizationOrder"
        :filters.sync="organizationOrderFilter"
      >
        <!-- <template slot="header">
          <my-select-header
            :filterCondition="organizationOrderFilter"
            :myLabel="organizationOrderLabel"
          ></my-select-header>
        </template> -->
      </el-table-column>

      <!-- 部门志愿次序 -->
      <el-table-column
        width="160px"
        align="center"
        prop="permission"
        label="部门志愿次序"
        :filters.sync="departmentOrderFilter"
        column-key="permission"
      >
      </el-table-column>

      <!-- 当前志愿部门 -->
      <el-table-column
        width="160px"
        align="center"
        prop="permission"
        label="当前志愿部门"
      >
      </el-table-column>

      <!-- 当前志愿状态 -->
      <el-table-column
        width="160px"
        align="center"
        prop="permission"
        label="当前志愿状态"
        :filters.sync="interviewStatusFilter"
        column-key="permission"
      >
      </el-table-column>

      <!-- 下一场面试时间 -->
      <el-table-column
        width="180px"
        align="center"
        prop="permission"
        label="下一场面试时间"
        sortable="custom"
        :filters.sync="nextTimeFilter"
        column-key="permission"
      >
      </el-table-column>

      <!-- 下一场面试地点 -->
      <el-table-column
        width="180px"
        align="center"
        prop="permission"
        label="下一场面试地点"
        sortable="custom"
        :filters.sync="nextPlaceFilter"
        column-key="permission"
      >
      </el-table-column>

      <!-- 修改 -->
      <el-table-column label="修改" align="center" fixed="right">
        <!-- 单次删除需要scope来传数据 -->
        <template slot-scope="scope">
          <el-button
            type="text"
            class="buttonMove"
            @click="openChangeDialog(scope.row)"
          >
            <div class="changeicon">
              <i class="el-icon-edit-outline"></i>
            </div>
          </el-button>
        </template>
      </el-table-column>

      <!-- 简历 -->
      <el-table-column label="简历" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="medium"
            type="text"
            class="buttonMove"
            @click="openResumeDialog(scope.row)"
          >
            <div class="changeicon">
              <i class="el-icon-document"></i>
            </div>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改弹窗组件 -->
    <change-dialog ref="changeDialog"></change-dialog>
    <!-- 简历弹窗组件 -->
    <resume-dialog ref="resumeDialog"></resume-dialog>
    <!-- 页码 -->
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size.sync="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
//引入表单全部数据,这是模拟数据，后期应该会删掉
import data from '../dataBoardView/data'
import data2 from '../../../superAdmin/accountManage/data copy'
// import mySelectHeader from './selectHeader.vue'
import changeDialog from '../components/changeDialog.vue'
import resumeDialog from '../components/resumeDialog.vue'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'dataBoardTable',
  computed: {
    ...mapState('dataBoard', [
      'classNameFilter',
      'organizationOrderFilter',
      'departmentOrderFilter',
      'interviewStatusFilter',
      'nextPlaceFilter',
      'nextTimeFilter'
    ])
  },
  data() {
    return {
      // 关键字搜索
      admissionId: 0, //纳新ID不知道，需要询问////////////////////////
      organizationId: 2, ////组织名不知道，需要询问////////////////////////
      searchWord: '',
      postdata: '', //发请求的data
      order: 'ascending', //排序顺序，默认升序
      column: 'permission', //排序变量，默认权限升序
      permissionSelect: null, //筛选变量

      // 页码
      tableList: [], //当前页展示数据
      currentPage: 1, // 当前页码
      pagesize: 10, // 每页条数，默认10
      total: 100,
      // 表格数据
      tableData: [...data], //模拟数据，发请求会获取数据覆盖它
      tableDataChange: [] //排序、筛选之后的数据

      // 表头名
      // classNameLabel: '班级',
      // organizationOrderLabel: '社团志愿次序',
      // departmentOrderLabel: '部门志愿次序',
      // wishDepartmentLabel: '部门志愿筛选项',
      // interviewStatus: '当前志愿状态',
      // nextPlaceLabel: '下一场面试地点',
      // nextTimeLabel: '下一次面试时间'
    }
  },
  created() {
    //获取数据
    this.searchKeyWord()
    //渲染并分页
    this.orderChange(this.tableData)
  },
  components: {
    // mySelectHeader
    resumeDialog,
    changeDialog
  },
  methods: {
    ...mapMutations('dataBoard', [
      'updateClassNameFilter',
      'updateOrganizationOrderFilter',
      'updateDepartmentOrderFilter',
      'updateInterviewStatusFilter',
      'updateNextPlaceFilter',
      'updateNextTimeFilter'
    ]),
    // 修改弹窗
    openChangeDialog(data) {
      this.$refs.changeDialog.changeDialogVisible = true
      console.log(data)
      this.$refs.changeDialog.studentId = true
    },
    // 简历弹窗
    openResumeDialog() {
      this.$refs.resumeDialog.resumeDialogVisible = true
      this.$refs.resumeDialog.studentId = true
      console.log(data)
    },
    // 测试数据更新时，表单数据是否同步更新了
    de() {
      // this.$message.success(
      //   '测试更新数据，删掉了前三个数据，后面完工时记得删掉这个'
      // )
      this.$message.success('测试更新数据，后面完工时记得删掉这个')
      // this.tableData = this.tableData.slice(3)
      this.tableData = data2
      // this.orderChange(this.tableData)
      console.log(this.classNameFilter)
      // 模拟更新过滤项
      this.updateClassNameFilter([
        { text: 'committee', value: 'committee' },
        { text: 'member', value: 'member' },
        { text: '筛选2', value: 'member' }
      ])
      console.log(this.classNameFilter)
    },
    // 测试cookie
    co() {
      // 发请求模板，待删除，防止后面更改需求，先不删
      this.$http
        .post('api/login/b', {
          studentId: '20200002',
          password: '123456'
        })
        .then(
          (res) => {
            this.$message.success('post获取cookie正常' + res)
            console.log(res)
          },
          (err) => {
            this.$message.error(err)
          }
        )
    },
    // 触发排序
    sortTableFun(column) {
      //用户点击这一列的上下排序按钮时，触发的函数
      console.log(column)
      this.column = column.prop //该方法获取到当前列绑定的prop字段名赋值给一个变量，之后这个变量做为入参传给后端
      if (column.prop) {
        //该列有绑定prop字段走这个分支
        if (column.order == 'ascending') {
          //当用户点击的是升序按钮，即ascending时
          this.order = 'ascending' //将order这个变量赋值为后端接口文档定义的升序的字段名，之后作为入参传给后端
        } else if (column.order == 'descending') {
          //当用户点击的是升序按钮，即descending时
          this.order = 'descending' //将order这个变量赋值为后端接口文档定义的降序的字段名，之后作为入参传给后端
        }
        this.orderChange(this.tableDataChange) //改变全部数据顺序
      }
    },
    // 排序，默认权限升序，并完成渲染分页
    orderChange(datalist, currentPage) {
      // this.$message.success('发起后端请求的接口')
      // 对权限排序
      if (this.column == 'permission') {
        // console.log(Number(datalist[4].permission[0]))
        if (this.order == 'desc') {
          datalist.sort((a, b) => {
            return b.permission[0] > a.permission[0] ? 1 : -1
          }) //permission 降序
        } else {
          datalist.sort((a, b) => {
            return b.permission[0] < a.permission[0] ? 1 : -1
          }) //permission 升序
        }
      }
      // 对学号排序
      else if (this.column == 'studentId') {
        // 修改数组顺序，后续可能要用对象保存原始数据
        if (this.order == 'desc') {
          datalist.sort((a, b) => {
            return Number(b.studentId) > Number(a.studentId) ? 1 : -1
          }) //permission 降序
        } else {
          datalist.sort((a, b) => {
            return Number(b.studentId) < Number(a.studentId) ? 1 : -1
          }) //permission 升序
        }
      }
      // 渲染排序后的数据，分页
      this.currentPage = currentPage == undefined ? 1 : currentPage
      this.tableDataChange = datalist
      this.pageCutDouwn(this.tableDataChange)
    },

    //关键字搜索
    searchKeyWord() {
      // 判断字符串是否为空
      if (this.searchWord != '') {
        this.postdata = {
          admissionId: this.admissionId,
          organizationId: this.organizationId,
          keyWord: this.searchWord,
          pageNum: 1,
          pageSize: this.pagesize
        }
      } else {
        this.postdata = {
          admissionId: this.admissionId,
          organizationId: this.organizationId,
          pageNum: 1,
          pageSize: this.pagesize
        }
      }
      // 发请求
      this.$http.post('api/account/manage/all', this.postdata).then(
        (res) => {
          // 因为请求访问权限异常，res.data.studentList在返回信息中为undefined
          if (res.data.data.studentList == undefined) {
            // 用造的假数据顶上
            this.$message.success(res.data.message)
            // 成功后页面上回到第一页
            this.currentPage = 1
          } else {
            this.tableData = res.data.data.studentList
            this.total = res.data.data.total
            console.log(this.tableData)
          }
          // 通知所有相关项更新数据，因为他们使用tableDataChange而不是tableData
          // this.orderChange(this.tableData)
        },
        (err) => {
          this.$message.error('获取数据失败' + err)
        }
      )
    },

    // 触发筛选权限
    filterChange(data) {
      // console.log(data.permission)
      this.permissionSelect = data.permission[0]
      // 传permission
      this.filterChangeData(data.permission[0])
      // 仅自行触发的筛选跳转到第一页
      this.currentPage = 1
      this.pageCutDouwn(this.tableDataChange)
    },
    // 对数组筛选
    filterChangeData(permission) {
      if (permission == 'committee') {
        // console.log(permission=="committee")
        // console.log(this.tableData[0].permission=="committee")
        // this.$message.success(permission)
        // 只改变tableDataChange，保证能够还原，不会越筛越少
        this.tableDataChange = this.tableData.filter((element) => {
          // console.log(element.permission=="committee")
          return element.permission == 'committee'
        })
        // console.log(this.tableData)
      } else if (permission == 'member') {
        // this.$message.success(permission)
        this.tableDataChange = this.tableData.filter((element) => {
          // console.log(element.permission=="committee")
          return element.permission == 'member'
        })
      } else {
        // permission结果为undefined,因为element-ui自动生成这个选项，我也不知道怎么给它加value值
        // console.log(permission)
        // this.$message.error('全部')
        this.tableDataChange = this.tableData
      }
      // 渲染筛选后数据
      // 考虑不周，不应该直接返回第一页
      // this.currentPage = 1
      this.pageCutDouwn(this.tableDataChange)
    },
    //修改密码弹窗
    handleKeyEdit(data) {
      this.$refs.manyDialog.dialogVisibleKey = true
      this.$refs.manyDialog.organizationId = this.organizationId
      this.$refs.manyDialog.formLabelAlign = data
    },
    //修改页容量
    handleSizeChange(val) {
      this.pagesize = val
      // 回到第一页
      this.currentPage = 1
      // console.log(`每页: ${val}`)
      this.pageCutDouwn(this.tableDataChange)
    },
    // 修改到第几页
    handleCurrentChange(val) {
      this.currentPage = val
      // console.log(`当前页: ${val}`)
      this.pageCutDouwn(this.tableDataChange)
    },
    // 具体分页操作
    pageCutDouwn(tableDataChange) {
      this.tableList = tableDataChange.filter(
        (item, index) =>
          index < this.currentPage * this.pagesize &&
          index >= this.pagesize * (this.currentPage - 1)
      )
      this.total = tableDataChange.length
    }
  }
}
</script>
<style lang="less" scoped>
// * {
// line-height: 15px;
// line-height: 2.8vh;
// color: black;
// }

// main面板的样式
.content {
  // 暂定900px
  min-width: 900px;
  min-height: 500px;
}
// 包含搜索的div
.seach-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 10px;
  padding: 0%;
  // height: 100px;
}
.searchInput {
  width: 300px;
  // display: block;
  // height: 34.4px;
  margin-left: 20px;
}
.search {
  width: 40vh;
  height: 100px;
}
// icon变色
.changeicon {
  font-size: 25px;
  color: #a1a3a9;
}
.changeicon:hover {
  font-size: 25px;
  color: #409eff;
}
.el-table {
  padding: 0px;
  color: #666690;
  font-size: 15px;
  // 滚动条，暂时只兼容chrome
  /deep/ .el-table__body-wrapper::-webkit-scrollbar {
    width: 15px; /*滚动条宽度*/
    height: 14px; /*滚动条高度*/
  }
  /deep/ .el-table__body-wrapper::-webkit-scrollbar-track {
    border-radius: 8px; /*滚动条的背景区域的圆角*/
    background-color: #ffffff; /*滚动条的背景颜色*/
  }
  /deep/ .el-table__body-wrapper::-webkit-scrollbar-corner {
    background-color: #ffffff;
  }
  /deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
    border-radius: 8px; /*滚动条的圆角*/
    background-color: #a1a3a9; /*滚动条的背景颜色*/
    // rgba(24,144,255,0.50)
  }
}
</style>
