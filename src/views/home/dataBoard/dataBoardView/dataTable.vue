<template>
  <div class="content">
    <!-- <div class="output-excel">
      <el-button type="primary">导出数据</el-button>
    </div> -->
    <!-- 搜索区域 -->
    <div class="seach-header">
      <div class="output-excel">
        <el-button type="primary" @click="outPutExcel">导出数据</el-button>
      </div>
      <div>
        <el-tooltip class="item" effect="dark" placement="top">
          <div slot="content" class="noticeContent">
            <div style="color: red">请注意:</div>
            <div style="margin: 2px"></div>
            <div>数据支持多种筛选共同使用</div>
            <!-- <div style="margin: 2px"></div>
          <div>同时也提供了手动刷新按钮</div> -->
          </div>
          <i class="el-icon-warning-outline myRefresh"></i>
        </el-tooltip>
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
          @input="inputSearchKeyWord"
          class="searchInput"
          size="small"
          prefix-icon="el-icon-search"
          placeholder="搜索学号、姓名"
        ></el-input>
      </div>
    </div>
    <!-- 信息表单 -->
    <!-- :header-cell-style="handleTheadStyle"支持多种排序的高亮 -->
    <el-table
      stripe
      tooltip-effect="dark"
      class="el-table"
      height="76vh"
      v-loading="myLoading"
      element-loading-text="拼命加载中"
      :row-style="{ height: '0' }"
      :cell-style="{ padding: '0px' }"
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
          <el-tag :type="row.interviewStatus | statusFilter" class="tagStyle">
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
      class="paginationMove"
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
      // 数据库所有信息
      allData: [],
      // 计时器
      myLoading: false,
      timerUpdate: null,
      // 防抖计时器
      timeout: null,
      activeThead: {}, //保存排序所选择的表头
      // 关键字搜索
      admissionId: 1, //纳新ID
      organizationId: 2, //组织名
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
      tableList: [], //当前页展示数据
      currentPage: 1, // 当前页码
      pagesize: 10, // 每页条数，默认10
      total: 100
      // 自定义表头排序和筛选的方案
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
    // 拿到全部信息
    this.getAllDate()
    // 无痕刷新
    this.timerUpdate = setInterval(() => {
      setTimeout(this.reFreshWithoutSee, 0)
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
  // props: {
  //   mutilSort: {
  //     default: true
  //   }
  // },
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
      // 获取数据
      this.admissionId = sessionStorage.getItem('homeAdmissionId')
      // 注释一个请求，先使用假数据
      // console.log('显示假数据，等数据库有数据时再删')
      this.requestFilterItem()
    },
    // 修改弹窗
    openChangeDialog(data) {
      this.$refs.changeDialog.changeDialogVisible = true
      console.log(data.stuNum + '记得删')
      this.$refs.changeDialog.studentId = data.stuNum
      this.$refs.changeDialog.Mymounted()
    },
    // 简历弹窗
    openResumeDialog(data) {
      this.$refs.resumeDialog.resumeDialogVisible = true
      this.$refs.resumeDialog.studentId = data.stuNum
      this.$refs.resumeDialog.Mymounted()
      console.log(data.stuNum + '记得删')
    },
    // 手动刷新
    reFresh() {
      this.requestFilterItem()
    },
    // 触发排序
    sortTableFun(data) {
      // 多列排序，保存排序表头高亮
      // this.$emit('sort-change', data)
      // if (!this.mutilSort) return
      // if (data.order) {
      //   this.activeThead[data.prop] = data.order
      // } else if (!data.order) {
      //   this.activeThead[data.prop] = ''
      // }
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
      // 多种排序的方案
      this.orderChange(sortItem, sortvalue)
      // console.log(this.sort[0])
      // console.log(this[Object.keys(data)[0]])
      this.currentPage = 1
      this.requestData()
    },
    // 处理排序，支持多种排序的方案
    orderChange(sortItem, sortvalue) {
      // 此为简单支持单种排序
      if (this.sort.length == 0) {
        this.sort.push({
          sortCondition: sortItem,
          sortModel: sortvalue
        })
      } else {
        ;(this.sort[0].sortCondition = sortItem),
          (this.sort[0].sortModel = sortvalue)
      }
      // 取消排序后，清除排序数组
      this.sort = this.sort.filter((element) => {
        return element.sortModel != 0
      })
      // if (this.sort.length == 0) {
      //   this.sort.push({
      //     sortCondition: sortItem,
      //     sortModel: sortvalue
      //   })
      // } else {
      //   let isPush = true
      //   this.sort.forEach((element) => {
      //     if (element.sortCondition == sortItem) {
      //       element.sortModel = sortvalue
      //       isPush = false
      //     }
      //   })
      //   if (isPush) {
      //     this.sort.push({
      //       sortCondition: sortItem,
      //       sortModel: sortvalue
      //     })
      //   }
      // }
      // this.sort = this.sort.filter((element) => {
      //   return element.sortModel != 0
      // })
      // this.sort.forEach((element) => {
      //   console.log('sortCondition' + element.sortCondition)
      //   console.log('sortModel' + element.sortModel)
      // })
    },
    // input输入防抖
    inputSearchKeyWord() {
      // 防抖函数
      clearTimeout(this.timeout)
      this.timeout = setTimeout(this.searchKeyWord, 700)
    },
    //关键字搜索
    searchKeyWord() {
      // loading
      this.myLoading = true
      this.postdata = {
        admissionId: this.admissionId,
        organizationId: this.organizationId,
        pageNum: 1,
        pageSize: this.pagesize
      }
      // 判断字符串是否为空
      if (this.searchWord != '') {
        this.postdata.keyWord = this.searchWord
      }
      // 判断是否有排序
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
          this.myLoading = false
        },
        (err) => {
          this.$message.error('获取数据失败' + err)
          // loading
          this.myLoading = false
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
      this.requestData()
    },
    requestData() {
      // loading
      this.myLoading = true
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
          this.myLoading = false
        },
        (err) => {
          this.$message.error('获取数据失败' + err)
          this.myLoading = false
        }
      )
    },
    // 无痕刷新,去除loading效果
    reFreshWithoutSee() {
      // 获取筛选项
      this.requestAllItem()
      // 请求数据，无loading效果
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
    requestAllItem() {
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
    // 获取所有筛选项并刷新数据
    requestFilterItem() {
      // 更新数据,不要改变排序筛选等，避免用户发现刷新痕迹
      this.requestData()
      this.requestAllItem()
    },
    //修改页容量
    handleSizeChange(val) {
      this.pagesize = val
      // 回到第一页
      this.currentPage = 1
      this.requestData()
    },
    // 修改到第几页
    handleCurrentChange(val) {
      this.currentPage = val
      this.requestData()
    },
    /**
     * 设置表头排序,允许多个排序高亮
     */
    // handleTheadStyle({ column }) {
    //   //多列排序
    //   if (!this.mutilSort) return
    //   if (this.activeThead[column.property]) {
    //     column.order = this.activeThead[column.property]
    //   }
    // }
    getAllDate() {
      let postData = {
        admissionId: this.admissionId,
        organizationId: this.organizationId,
        pageNum: 1,
        pageSize: 0
      }
      this.$http
        .post('api/data-panel/all-information', postData)
        .then((res) => {
          if (res.data.code == '00000') {
            this.allData = res.data.data.allInformationData
          } else {
            return this.$message.error(res.data.message)
          }
        })
        .catch((err) => {
          this.$message.error('获取数据失败' + err)
        })
    },
    outPutExcel() {
      let updateBef = this.allData
      // 添加id
      updateBef.forEach((item, index) => {
        item.id = index + 1
      })
      let jsonData = updateBef.map((v) => {
        const { ...updateBef } = v
        return { ...updateBef }
      })
      jsonData = jsonData.map((v) => ({
        ID: v.id,
        学号: v.stuNum,
        姓名: v.name,
        班级: v.className,
        手机号: v.phone,
        当前社团志愿: v.organizationOrder,
        当前部门志愿: v.departmentOrder,
        面试部门: v.wishDepartment
      }))
      this.JSONToExcelConvertor(jsonData, '数据看板数据表')
    },

    JSONToExcelConvertor(JSONData, FileName) {
      //先转化json
      var arrData =
        typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData
      var excel = '<table>'
      var row = '<tr>'
      //设置表头
      var keys = Object.keys(JSONData[0])
      keys.forEach(function (item) {
        row += '<td>' + item + '</td>'
      })
      //换行
      excel += row + '</tr>'
      //设置数据
      for (let i = 0; i < arrData.length; i++) {
        row = '<tr>'
        for (var index in arrData[i]) {
          //var value = arrData[i][index] === "." ? "" : arrData[i][index];
          row += '<td>' + arrData[i][index] + '</td>'
        }
        excel += row + '</tr>'
      }
      excel += '</table>'
      var excelFile =
        "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>"
      excelFile +=
        '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">'
      excelFile +=
        '<meta http-equiv="content-type" content="application/vnd.ms-excel'
      excelFile += '; charset=UTF-8">'
      excelFile += '<head>'
      excelFile += '<!--[if gte mso 9]>'
      excelFile += '<xml>'
      excelFile += '<x:ExcelWorkbook>'
      excelFile += '<x:ExcelWorksheets>'
      excelFile += '<x:ExcelWorksheet>'
      excelFile += '<x:Name>'
      excelFile += '{worksheet}'
      excelFile += '</x:Name>'
      excelFile += '<x:WorksheetOptions>'
      excelFile += '<x:DisplayGridlines/>'
      excelFile += '</x:WorksheetOptions>'
      excelFile += '</x:ExcelWorksheet>'
      excelFile += '</x:ExcelWorksheets>'
      excelFile += '</x:ExcelWorkbook>'
      excelFile += '</xml>'
      excelFile += '<![endif]-->'
      excelFile += '</head>'
      excelFile += '<body>'
      excelFile += excel
      excelFile += '</body>'
      excelFile += '</html>'
      var uri =
        'data:application/vnd.ms-excel;charset=utf-8,' +
        encodeURIComponent(excelFile)
      var link = document.createElement('a')
      link.href = uri
      link.style = 'visibility:hidden'
      link.download = FileName + '.xls'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }
}
</script>
<style lang="less" scoped>
// main面板的样式
.content {
  // 暂定900px
  min-width: 900px;
  min-height: 500px;
}
// 提示信息
.noticeContent {
  display: flex;
  flex-direction: column;
  // align-content: center;
  // align-items: center;
  text-align: center;
}
// tag宽度一致
.tagStyle {
  width: 90px;
}
// 包含搜索的div
.seach-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  position: relative;
  bottom: 5px;
  margin-right: 20px;
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
.paginationMove {
  position: relative;
  top: 10px;
}
.el-table {
  padding: 0px;
  color: #666690;
  font-size: 15px;
  border-radius: 4px;
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
