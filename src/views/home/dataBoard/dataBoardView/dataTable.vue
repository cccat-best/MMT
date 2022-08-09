<template>
  <div class="content">
    <!-- 搜索区域 -->
    <div class="seach-header">
      <el-tooltip
        class="item"
        effect="dark"
        content="取消所有筛选"
        placement="top"
      >
        <i class="el-icon-folder-delete myRefresh" @click="searchKeyWord"></i>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="刷新" placement="top">
        <i class="el-icon-refresh-right myRefresh" @click="reFresh"></i>
      </el-tooltip>
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
      height="82vh"
      v-loading="myLoading"
      element-loading-text="拼命加载中"
      :row-style="{ height: '0' }"
      :cell-style="{ padding: '0px' }"
      :header-cell-style="handleTheadStyle"
      ref="filterTable"
      :data="tableList"
      @sort-change="sortTableFun"
      @filter-change="filterChange"
    >
      <!-- 注意上面有tableList -->
      <el-table-column label="ID" align="center" width="70px">
        <template slot-scope="scope">
          {{ scope.$index + 1 + (currentPage - 1) * pagesize }}
        </template>
      </el-table-column>
      <el-table-column
        prop="stuNum"
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
        width="230px"
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
        prop="departmentOrder"
        label="部门志愿次序"
        :filters.sync="departmentOrderFilter"
        column-key="departmentOrder"
      >
      </el-table-column>

      <!-- 当前志愿部门 -->
      <el-table-column
        width="160px"
        align="center"
        prop="wishDepartment"
        label="当前志愿部门"
        column-key="wishDepartment"
        :filters.sync="wishDepartmentFilter"
      >
      </el-table-column>

      <!-- 当前志愿状态 -->
      <el-table-column
        width="160px"
        align="center"
        prop="interviewStatus"
        label="当前志愿状态"
        :filters.sync="interviewStatusFilter"
        column-key="interviewStatus"
      >
        <template #default="{ row }">
          <el-tag :type="row.interviewStatus | statusFilter">
            {{ row.interviewStatus }}
          </el-tag>
        </template>
      </el-table-column>

      <!-- 下一场面试时间 -->
      <el-table-column
        width="180px"
        align="center"
        prop="nextTime"
        label="下一场面试时间"
        sortable="custom"
        :filters.sync="nextTimeFilter"
        column-key="nextTime"
      >
      </el-table-column>

      <!-- 下一场面试地点 -->
      <el-table-column
        width="180px"
        align="center"
        prop="nextPlace"
        label="下一场面试地点"
        sortable="custom"
        :filters.sync="nextPlaceFilter"
        column-key="nextPlace"
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
      :total.sync="total"
    >
    </el-pagination>
  </div>
</template>

<script>
//引入表单全部数据,这是模拟数据，后期应该会删掉
import data from '../dataBoardView/data'
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
      'wishDepartmentFilter',
      'interviewStatusFilter',
      'nextPlaceFilter',
      'nextTimeFilter'
    ])
  },
  // 面试状态根据字符显示颜色
  filters: {
    statusFilter(status) {
      const statusMap = {
        一面通过: 'success',
        一面进行中: 'gray',
        一面失败: 'danger',
        二面通过: 'success',
        二面进行中: 'gray',
        二面失败: 'danger',
        三面通过: 'success',
        三面进行中: 'gray',
        三面失败: 'danger',
        四面通过: 'success',
        四面进行中: 'gray',
        四面失败: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      // 计时器
      myLoading: false,
      timerUpdate: null,
      activeThead: {}, //保存排序所选择的表头
      // 关键字搜索
      admissionId: 1, //纳新ID不知道，需要询问////////////////////////
      organizationId: 1, ////组织名不知道，需要询问////////////////////////
      searchWord: '',
      // 筛选勾选的请求信息的数组
      className: [],
      organizationOrder: [],
      departmentOrder: [],
      wishDepartment: [],
      interviewStatus: [],
      nextPlace: [],
      nextTime: [],
      // 排序，排序选择（姓名0、学号1、地点2、时间3），排序方式（1正序、2倒序）
      sort: [],
      postdata: '', //发请求的data
      // 页码
      tableList: [...data], //当前页展示数据
      currentPage: 1, // 当前页码
      pagesize: 10, // 每页条数，默认10
      total: 100

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
    this.organizationId = sessionStorage.getItem('loginOrganizationId')
    this.getTwoId()
  },
  // 定时更新数据和筛选项
  mounted() {
    this.timerUpdate = setInterval(() => {
      setTimeout(this.requestFilterItem, 0)
    }, 1000 * 900)
  },
  beforeDestroy() {
    clearInterval(this.timerUpdate)
    this.timerUpdate = null
  },
  components: {
    // mySelectHeader
    resumeDialog,
    changeDialog
  },
  // 排序保存表头
  props: {
    mutilSort: {
      default: true
    }
  },
  methods: {
    ...mapMutations('dataBoard', [
      'updateClassNameFilter',
      'updateOrganizationOrderFilter',
      'updateDepartmentOrderFilter',
      'updateWishDepartmentFilter',
      'updateInterviewStatusFilter',
      'updateNextPlaceFilter',
      'updateNextTimeFilter'
    ]),
    // 获取organizationId与admissionId
    getTwoId() {
      this.$http
        .get('api/organization/interview/id-latest', {
          organizationId: this.organizationId
        })
        .then(
          (res) => {
            if (res.data.code == '00000') {
              this.admissionId = res.data.data.admissionIdList[0].admissionId
              // admissionId存在session中
              sessionStorage.setItem(
                'admissionId',
                res.data.data.admissionIdList[0].admissionId
              )
            } else this.$message.error(res.data.message)
            // 获取数据
            this.searchKeyWord()
          },
          (err) => {
            this.$message.error('获取数据失败' + err)
            this.searchKeyWord()
          }
        )
    },
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
      // this.$refs.resumeDialog.demo()
      console.log(data)
    },
    // 手动刷新
    reFresh() {
      // loading
      this.myLoading = true
      this.requestFilterItem()
      // loading
      setTimeout(() => {
        this.myLoading = false
      }, 300)
    },
    // 触发排序
    sortTableFun(data) {
      // 多列排序，保存排序表头高亮
      this.$emit('sort-change', data)
      if (!this.mutilSort) return
      if (data.order) {
        this.activeThead[data.prop] = data.order
      } else if (!data.order) {
        this.activeThead[data.prop] = ''
      }
      // 准备排序数组要接收的值
      let sortvalue
      switch (data.order) {
        case 'ascending':
          sortvalue = 1
          break
        case 'descending':
          sortvalue = 2
          break
        default:
          sortvalue = 0
          break
      }
      // 姓名0、学号1、地点2、时间3
      let sortItem
      switch (data.prop) {
        case 'stuNum':
          sortItem = 1
          // console.log('stuNum sort')
          // console.log(this.className)
          break
        case 'name':
          sortItem = 0
          // console.log('name sort')
          break
        case 'nextTime':
          sortItem = 3
          // console.log('nextTime sort')
          break
        case 'nextPlace':
          sortItem = 2
          // console.log('nextPlace sort')
          break
      }
      // console.log('================')
      this.orderChange(sortItem, sortvalue)
      // console.log(this.sort[0])
      // console.log(this[Object.keys(data)[0]])
      this.currentPage = 1
      // loading
      this.myLoading = true
      this.requestData()
      // loading
      setTimeout(() => {
        this.myLoading = false
      }, 300)
    },
    // 处理排序
    orderChange(sortItem, sortvalue) {
      if (this.sort.length == 0) {
        this.sort.push({
          sortCondition: sortItem,
          sortModel: sortvalue
        })
      } else {
        let isPush = true
        this.sort.forEach((element) => {
          if (element.sortCondition == sortItem) {
            element.sortModel = sortvalue
            isPush = false
          }
        })
        if (isPush) {
          this.sort.push({
            sortCondition: sortItem,
            sortModel: sortvalue
          })
        }
      }
      this.sort = this.sort.filter((element) => {
        return element.sortModel != 0
      })
      // this.sort.forEach((element) => {
      //   console.log('sortCondition' + element.sortCondition)
      //   console.log('sortModel' + element.sortModel)
      // })
    },

    //关键字搜索
    searchKeyWord() {
      // loading
      this.myLoading = true
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
      if (this.sort.length != 0) {
        this.postdata.sort = this.sort
      }
      // 发请求
      this.$http.post('api/data-panel/all-information', this.postdata).then(
        (res) => {
          if (res.data.code == '00000') {
            this.tableList = res.data.data.allInformationData
            this.total = res.data.data.totalNum
            // console.log(res.data)
            // 清除筛选的选中
            this.$refs.filterTable.clearFilter()
            this.$refs.filterTable.clearSort()
            ;(this.className = []),
              (this.organizationOrder = []),
              (this.departmentOrder = []),
              (this.wishDepartment = []),
              (this.interviewStatus = []),
              (this.nextPlace = []),
              (this.nextTime = []),
              // 成功后,'页面上'回到第一页
              (this.currentPage = 1)
          } else this.$message.error(res.data.message)
          // loading
          setTimeout(() => {
            this.myLoading = false
          }, 50)
        },
        (err) => {
          this.$message.error('获取数据失败' + err)
          // loading
          setTimeout(() => {
            this.myLoading = false
          }, 50)
        }
      )
    },

    // 触发筛选权限
    filterChange(data) {
      // console.log(data)
      // 取出修改的筛选的名字
      let name = Object.keys(data)[0]
      // 取出修改的筛选的值
      let filtervalue = Object.values(data)[0]
      // console.log(filtervalue)
      // console.log(name)
      // 根据筛选项更新传输的筛选数据，记得注释掉多余代码
      switch (name) {
        case 'className':
          this.className = filtervalue
          // console.log('className ok')
          // console.log(this.className)
          break
        case 'organizationOrder':
          this.organizationOrder = filtervalue
          // console.log('organizationOrder ok')
          break
        case 'departmentOrder':
          this.departmentOrder = filtervalue
          // console.log('departmentOrder ok')
          break
        case 'wishDepartment':
          this.wishDepartment = filtervalue
          // console.log('wishDepartment ok')
          break
        case 'interviewStatus':
          this.interviewStatus = filtervalue
          // console.log('interviewStatus ok')
          break
        case 'nextPlace':
          this.nextPlace = filtervalue
          // console.log('nextPlace ok')
          break
        case 'nextTime':
          this.nextTime = filtervalue
          // console.log('nextTime ok')
          break
      }
      // console.log(this[Object.keys(data)[0]])
      // 仅自行触发的筛选跳转到第一页
      this.currentPage = 1
      // loading
      this.myLoading = true
      this.requestData()
      // loading
      setTimeout(() => {
        this.myLoading = false
      }, 300)
    },
    requestData() {
      // 下面是初步实现请求，后续要精简，把不必要的参数去除
      let myRequestData = {
        admissionId: this.admissionId,
        organizationId: this.organizationId,
        pageNum: this.currentPage,
        pageSize: this.pagesize
      }
      if (this.searchWord != '') {
        myRequestData.keyWord = this.searchWord
      }
      if (this.className.length != 0) {
        myRequestData.className = this.className
      }
      if (this.organizationOrder.length != 0) {
        myRequestData.organizationOrder = this.organizationOrder
      }
      if (this.departmentOrder.length != 0) {
        myRequestData.departmentOrder = this.departmentOrder
      }
      if (this.wishDepartment.length != 0) {
        myRequestData.wishDepartment = this.wishDepartment
      }
      if (this.interviewStatus.length != 0) {
        myRequestData.interviewStatus = this.interviewStatus
      }
      if (this.nextPlace.length != 0) {
        myRequestData.nextPlace = this.nextPlace
      }
      if (this.nextTime.length != 0) {
        myRequestData.nextTime = this.nextTime
      }
      if (this.sort.length != 0) {
        myRequestData.sort = this.sort
      }
      this.$http.post('api/data-panel/all-information', myRequestData).then(
        (res) => {
          // 因为请求访问权限异常，res.data.studentList在返回信息中为undefined
          if (res.data.code == '00000') {
            this.tableList = res.data.data.allInformationData
            this.total = res.data.data.totalNum
            // console.log(this.tableList)
          } else {
            this.$message.error(res.data.message)
          }
        },
        (err) => {
          this.$message.error('获取数据失败' + err)
        }
      )
    },
    // 获取所有筛选项
    requestFilterItem() {
      // 更新数据,不要改变排序筛选等，避免用户发现刷新痕迹
      this.requestData()
      // 获取班级
      this.$http
        .get(
          'api/data-panel/class?admissionId=' +
            this.admissionId +
            '&organizationId=' +
            this.organizationId
        )
        .then(
          (res) => {
            if (res.data.code == '00000') {
              this.updateClassNameFilter(res.data.data)
            } else {
              this.$message.error(res.data.message)
            }
          },
          (err) => {
            this.$message.error('获取数据失败' + err)
          }
        )
      // 获取社团志愿次序
      this.$http
        .get(
          'api/data-panel/organization-order?admissionId=' +
            this.admissionId +
            '&organizationId=' +
            this.organizationId
        )
        .then(
          (res) => {
            if (res.data.code == '00000') {
              this.updateOrganizationOrderFilter(res.data.data)
            } else {
              this.$message.error(res.data.message)
            }
          },
          (err) => {
            this.$message.error('获取数据失败' + err)
          }
        )
      // 获取部门志愿次序
      this.$http
        .get(
          'api/data-panel/department-order?admissionId=' +
            this.admissionId +
            '&organizationId=' +
            this.organizationId
        )
        .then(
          (res) => {
            if (res.data.code == '00000') {
              this.updateDepartmentOrderFilter(res.data.data)
            } else {
              this.$message.error(res.data.message)
            }
          },
          (err) => {
            this.$message.error('获取数据失败' + err)
          }
        )
      // 获取当前志愿状态
      this.$http
        .get(
          'api/data-panel/interview-status?admissionId=' +
            this.admissionId +
            '&organizationId=' +
            this.organizationId
        )
        .then(
          (res) => {
            if (res.data.code == '00000') {
              this.updateInterviewStatusFilter(res.data.data)
            } else {
              this.$message.error(res.data.message)
            }
          },
          (err) => {
            this.$message.error('获取数据失败' + err)
          }
        )
      // 获取下一场面试地点
      this.$http
        .get(
          'api/data-panel/next-place?admissionId=' +
            this.admissionId +
            '&organizationId=' +
            this.organizationId
        )
        .then(
          (res) => {
            if (res.data.code == '00000') {
              this.updateNextPlaceFilter(res.data.data)
            } else {
              this.$message.error(res.data.message)
            }
          },
          (err) => {
            this.$message.error('获取数据失败' + err)
          }
        )
      // 获取下一次面试时间
      this.$http
        .get(
          'api/data-panel/next-time?admissionId=' +
            this.admissionId +
            '&organizationId=' +
            this.organizationId
        )
        .then(
          (res) => {
            if (res.data.code == '00000') {
              this.updateNextTimeFilter(res.data.data)
            } else {
              this.$message.error(res.data.message)
            }
          },
          (err) => {
            this.$message.error('获取数据失败' + err)
          }
        )
      // 获取当前部门志愿
      this.$http
        .get(
          'api/data-panel/wish-department?admissionId=' +
            this.admissionId +
            '&organizationId=' +
            this.organizationId
        )
        .then(
          (res) => {
            if (res.data.code == '00000') {
              this.updateWishDepartmentFilter(res.data.data)
            } else {
              this.$message.error(res.data.message)
            }
          },
          (err) => {
            this.$message.error('获取数据失败' + err)
          }
        )
    },
    //修改页容量
    handleSizeChange(val) {
      this.pagesize = val
      // 回到第一页
      this.currentPage = 1
      // loading
      this.myLoading = true
      this.requestData()
      // loading
      setTimeout(() => {
        this.myLoading = false
      }, 300)
    },
    // 修改到第几页
    handleCurrentChange(val) {
      this.currentPage = val
      // loading
      this.myLoading = true
      this.requestData()
      // loading
      setTimeout(() => {
        this.myLoading = false
      }, 300)
    },
    // 具体分页操作
    // pageCutDouwn(tableDataChange) {
    //   this.tableList = tableDataChange.filter(
    //     (item, index) =>
    //       index < this.currentPage * this.pagesize &&
    //       index >= this.pagesize * (this.currentPage - 1)
    //   )
    //   this.total = tableDataChange.length
    // }
    /**
     * 设置表头排序,允许多个排序高亮
     */
    handleTheadStyle({ row, column }) {
      /**
       * 多列排序
       */
      console.log(row.length + '未使用定义变量的错误，记得删掉这行信息')
      if (!this.mutilSort) return
      if (this.activeThead[column.property]) {
        column.order = this.activeThead[column.property]
      }
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
  margin-bottom: 6px;
  margin-right: 10px;
  padding: 0%;
  // height: 100px;
  .myRefresh {
    font-size: 20px;
    margin-right: 15px;
  }
  // 刷新按钮变色
  .myRefresh:hover {
    font-size: 20px;
    color: #409eff;
  }
}
.searchInput {
  width: 300px;
  // display: block;
  // height: 34.4px;
  // margin-left: 20px;
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
  border-radius: 10px;
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
  // 表格第一行
  // /deep/ thead{
  //   color: #ffffff;
  // }
  // 表格第一行
  /deep/ th {
    background: #282e38;
    color: #ffffff;
    padding: 5px;
  }
  // 表格右上角
  /deep/ .el-table__fixed-right-patch {
    background: #282e38;
  }
  // 筛选图标替换
  /deep/ .el-icon-arrow-down {
    color: #ffffff;
  }
  // /deep/ .el-icon-arrow-down{
  //   background: ;
  //   background-size: 24px;
  // }
  //   /deep/ .el-icon-arrow:before{
  //   font-family:"iconfont" !important;
  //   -webkit-font-smoothing: antialiased;
  //   -moz-osx-font-smoothing: grayscale;
  //   font-size:24px;
  //   font-style:normal;
  //   content: "\e65c";
  // }
}
</style>
