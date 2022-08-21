<template>
  <div class="content">
    <div class="top-content">
      <i class="el-icon-s-custom top-content-icon"></i>
      账号管理
    </div>
    <!-- 批量操作 -->
    <div class="seach-header">
      <div>
        <button
          :class="[showactive1 == 0 ? 'batchButton' : 'activeBatchButton']"
          @click="showDialogVisible"
          :disabled="this.multipleSelection.length == 0"
        >
          <div
            style="display: flex; justify-content: center"
            @mouseenter="changeColor"
            @mouseleave="changeColor"
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="23"
                height="23"
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
                    :stroke="this.batchColorChange1"
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    fill="none"
                  ></path>
                  <path
                    d="M14 26.7199V34H21.3172L42 13.3081L34.6951 6L14 26.7199Z"
                    fill="none"
                    :stroke="this.batchColorChange1"
                    stroke-width="4"
                    stroke-linejoin="round"
                  ></path>
                </g>
              </svg>
            </div>
            <div style="font-size: 17px; margin-left: 5px">批量修改</div>
          </div>
        </button>
      </div>
      <div>
        <button
          :class="[showactive2 == 0 ? 'batchButton' : 'activeBatchButton']"
          @click="deleteDialogVisible"
          :disabled="this.multipleSelection.length == 0"
        >
          <div
            style="display: flex; justify-content: center"
            @mouseenter="changeColor2"
            @mouseleave="changeColor2"
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                width="23"
                height="23"
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
                    :fill="this.batchColorChange2"
                    :stroke="none"
                  ></path>
                </g>
              </svg>
            </div>
            <div style="font-size: 17px; margin-left: 5px">批量删除</div>
          </div>
        </button>
      </div>

      <!-- 搜索区域 -->
      <el-input
        v-model="searchWord"
        type="search"
        @input="beforeSearchKeyWord"
        class="searchInput"
        size="small"
        prefix-icon="el-icon-search"
        placeholder="搜索学号、姓名"
      ></el-input>
    </div>
    <!-- 信息表单 -->
    <!-- @sort-change="sortChange"排序 -->
    <el-table
      stripe
      tooltip-effect="dark"
      style="
        color: #666690;
        font-size: 15px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      "
      height="76vh"
      :row-style="{ height: '0' }"
      :cell-style="{ padding: '0px' }"
      :header-cell-style="{ color: '#666666' }"
      ref="multipleTable"
      :data="tableList"
      @sort-change="sortTableFun"
      @filter-change="filterChange"
      :default-sort="
        ({ prop: 'studentId', order: 'ascending' },
        { prop: 'permission', order: 'ascending' })
      "
      @selection-change="handleSelectionChange"
    >
      <!-- 注意上面有tableList -->
      <el-table-column
        type="selection"
        align="center"
        fixed
        min-width="50px"
      ></el-table-column>
      <el-table-column
        prop="studentId"
        label="学号"
        sortable="custom"
        align="center"
        min-width="120px"
        fixed
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        min-width="120px"
        align="center"
      >
      </el-table-column>
      <!-- :filter-multiple="false"过滤器单选 -->
      <!-- :filter-method="filterPermission" 前端过滤 -->
      <el-table-column
        prop="permission"
        label="用户权限"
        align="center"
        min-width="120px"
        sortable="custom"
        :filters="[
          { text: 'committee', value: 'committee' },
          { text: 'member', value: 'member' }
        ]"
        column-key="permission"
        :filter-multiple="false"
      >
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号"
        min-width="120px"
        align="center"
      >
        <!-- 脱敏显示 -->
        <template slot-scope="scope">
          {{ scope.row.phone | replacestar }}
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="200px" align="center">
        <!-- 单次删除需要scope来传数据 -->
        <template slot-scope="scope">
          <el-button
            type="text"
            class="buttonMove"
            @click="DialogVisibleChangeAccount(scope.row)"
          >
            <el-tooltip content="修改账号" placement="top">
              <svg
                class="svgColor1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="23"
                height="23"
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
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    fill="none"
                  ></path>
                  <path
                    d="M14 26.7199V34H21.3172L42 13.3081L34.6951 6L14 26.7199Z"
                    fill="none"
                    stroke-width="4"
                    stroke-linejoin="round"
                  ></path>
                </g>
              </svg>
            </el-tooltip>
          </el-button>
          <el-button
            size="mini"
            type="text"
            class="buttonMove"
            @click="handleKeyEdit(scope.row)"
          >
            <el-tooltip content="修改密码" placement="top">
              <svg
                class="svgColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="64 64 896 896"
                width="23"
                height="23"
                style="
                  border-color: rgba(187, 187, 187, 1);
                  border-width: 0px;
                  border-style: solid;
                "
                filter="none"
              >
                <g>
                  <path
                    d="M832 464h-68V240c0-70.7-57.3-128-128-128H388c-70.7 0-128 57.3-128 128v224h-68c-17.7 0-32 14.3-32 32v384c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V496c0-17.7-14.3-32-32-32zM332 240c0-30.9 25.1-56 56-56h248c30.9 0 56 25.1 56 56v224H332V240zm460 600H232V536h560v304zM484 701v53c0 4.4 3.6 8 8 8h40c4.4 0 8-3.6 8-8v-53a48.01 48.01 0 1 0-56 0z"
                  ></path>
                </g>
              </svg>
            </el-tooltip>
          </el-button>
          <el-button
            size="medium"
            type="text"
            class="buttonMove"
            @click="handleDelete(scope.$index, scope.row)"
          >
            <div>
              <el-tooltip content="删除账号" placement="top">
                <svg
                  class="svgColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  width="23"
                  height="23"
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
                      stroke="none"
                    ></path>
                  </g>
                </svg>
              </el-tooltip>
            </div>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 生成邀请码 -->
    <el-button type="primary" class="makeJoinKey" @click="DialogVisibleJoin"
      >生成邀请码</el-button
    >
    <!-- 邀请码，可一键复制 -->
    <clipBoard ref="clipBoard" />
    <!-- 引入修改账号、修改密码、删除弹窗 -->
    <!-- deleteAlign自定义事件，单行删除同步 -->
    <manyDialog ref="manyDialog" @deleteAlign="deleteAlign" />
    <!-- 批量操作弹窗 -->
    <!-- 自定义事件，批量删除和修改同步 -->
    <!-- @myBatchOperateChange="batchOperateChange" -->
    <batchOperateDialog
      ref="batchOperateDialog"
      @myBatchOperateDelete="batchOperateDelete"
      @myClearMultipleSelect="ClearMultipleSelect"
    />
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
import data from './data.js'
// 引入clipBoard
import clipBoard from './dialog/clipboard.vue'
//引入弹窗
import manyDialog from './dialog/manyDialog.vue' //单行修改
import batchOperateDialog from './dialog/batchOperateDialog.vue' //批量修改
export default {
  data() {
    return {
      // 补一个未知报错bug,不知道哪来的none未定义
      none: 0,
      timeout: null,
      // 批量修改图标颜色
      batchColorChange1: '#666666', //第一个按钮
      batchColorChange2: '#666666', //第二个按钮
      showactive1: 0, //第一个按钮
      showactive2: 0, //第二个按钮

      // 关键字搜索
      organizationId: 3, ////组织名不知道，需要询问////////////////////////
      searchWord: '',
      data: '', //发请求的data
      order: 'asc', //排序顺序，默认升序
      column: 'permission', //排序变量，默认权限升序
      permissionSelect: null, //筛选变量

      // 页码
      tableList: [], //当前页展示数据
      currentPage: 1, // 当前页码
      pagesize: 10, // 每页条数，默认10
      total: 100,
      // 表格数据
      tableData: [...data], //模拟数据，发请求会获取数据覆盖它
      tableDataChange: [], //排序、筛选之后的数据
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
    // 获取organizationId
    this.organizationId = sessionStorage.getItem('loginOrganizationId')
    //获取数据
    this.searchKeyWord()
    //渲染并分页
    this.orderChange(this.tableData)
  },
  methods: {
    //图标变色,第一个
    changeColor() {
      if (this.batchColorChange1 == '#666666')
        this.batchColorChange1 = 'rgba(47.94,128.01,255,1)'
      else this.batchColorChange1 = '#666666'
      if (this.showactive1 == 0) this.showactive1 = 1
      else this.showactive1 = 0
    },
    // 第二个
    changeColor2() {
      if (this.batchColorChange2 == '#666666')
        this.batchColorChange2 = 'rgba(47.94,128.01,255,1)'
      else this.batchColorChange2 = '#666666'
      if (this.showactive2 == 0) this.showactive2 = 1
      else this.showactive2 = 0
    },
    // 批量删除同步
    batchOperateDelete(studentListData) {
      // 遍历要删除的数组名单
      // 看看要不要写箭头函数
      studentListData.forEach((element) => {
        // 找到每个名单元素对应index
        // console.log(element)
        const deleteIndex = this.tableData.findIndex((item) => {
          // 看看要不要写===
          // console.log(item.studentId === element.studentId)
          return item.studentId == element.studentId
        })
        // console.log(deleteIndex)
        // 如果是deleteIndex-1，会删掉最后一条
        // 所以注意要及时关闭弹窗，否则继续点确认会误删
        this.tableData.splice(deleteIndex, 1)
        // console.log(this.tableData[0])
      })
      // 对currentPage做一个判断
      // 如果整页没删完，保持在当前页，如果删完了返回上一页（除非删的是第一页）
      // console.log(studentListData.length)
      const totalPage = Math.ceil((this.total - 1) / this.pagesize) // 总页数
      let pagelength = this.pagesize
      if (this.currentPage == totalPage) {
        pagelength = this.total - (this.currentPage - 1) * this.pagesize
      }
      if (studentListData.length == pagelength) {
        this.currentPage = this.currentPage - 1
      }
      this.currentPage = this.currentPage < 1 ? 1 : this.currentPage

      // console.log(studentListData.length == this.pagesize)
      // console.log(this.currentPage)
      // 分页并根据已有order排序
      this.orderChange(this.tableData, this.currentPage)
      // 再来一次权限排序，顺序改回去，
      this.orderChange(this.tableData, this.currentPage)
      // 根据已有permissionSelect筛选
      this.filterChangeData(this.permissionSelect)
    },
    //单行删除同步,达到页面删除效果，仅靠发请求是没办法从视觉上删除的
    deleteAlign(index) {
      // console.log("单行删除同步")
      const deleteIndex = (this.currentPage - 1) * this.pagesize + index
      // 删一个
      this.tableData.splice(deleteIndex, 1)
      // console.log(deleteIndex)
      // 如果是deleteIndex保持着，会删掉下一个顶上这个位置的那一条
      // 所以要及时退出弹窗
      // 同步更新
      // 为了在删除最后一页的最后一条数据时能成功跳转回最后一页的上一页
      // const totalPage = Math.ceil((this.total - 1) / this.pagesize) // 总页数
      const frontOne = this.pagesize * (this.currentPage - 1)
      if (frontOne == this.total - 1) {
        this.currentPage--
      }
      // this.currentPage =
      //   this.currentPage > totalPage ? totalPage : this.currentPage
      this.currentPage = this.currentPage < 1 ? 1 : this.currentPage

      // 分页并根据已有order排序
      this.orderChange(this.tableData, this.currentPage)
      // 再来一次权限排序，顺序改回去，
      // 由于未知原因，权限排序是可以局部安学号排序的
      this.orderChange(this.tableData, this.currentPage)
      // 根据已有permissionSelect筛选
      this.filterChangeData(this.permissionSelect)
    },

    // 触发排序
    sortTableFun(column) {
      //用户点击这一列的上下排序按钮时，触发的函数
      this.column = column.prop //该方法获取到当前列绑定的prop字段名赋值给一个变量，之后这个变量做为入参传给后端
      if (column.prop) {
        //该列有绑定prop字段走这个分支
        if (column.order == 'ascending') {
          //当用户点击的是升序按钮，即ascending时
          this.order = 'asc' //将order这个变量赋值为后端接口文档定义的升序的字段名，之后作为入参传给后端
        } else if (column.order == 'descending') {
          //当用户点击的是升序按钮，即descending时
          this.order = 'desc' //将order这个变量赋值为后端接口文档定义的降序的字段名，之后作为入参传给后端
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
    //搜索框防抖搜索
    beforeSearchKeyWord() {
      // 防抖函数
      clearTimeout(this.timeout)
      this.timeout = setTimeout(this.searchKeyWord, 700)
    },
    //关键字搜索
    searchKeyWord() {
      // 判断字符串是否为空
      if (this.searchWord != '') {
        this.data = {
          organizationId: this.organizationId,
          searchWord: this.searchWord
        }
      } else {
        this.data = {
          organizationId: this.organizationId
        }
      }
      // 发请求
      this.$http.post('api/account/manage/all', this.data).then(
        (res) => {
          if (res.data.code == '00000') {
            this.tableData = res.data.data.studentList
            this.total = res.data.data.total
          } else {
            this.$message.error(res.data.message)
          }
          // 通知所有相关项更新数据，因为他们使用tableDataChange而不是tableData
          this.orderChange(this.tableData)
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
    ClearMultipleSelect() {
      // 自动去除选中效果
      this.$refs.multipleTable.clearSelection()
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
      // 直接获取选中数据
      // console.log(this.multipleSelection)
    },
    //修改账号弹窗
    DialogVisibleChangeAccount(data) {
      // console.log(data)
      //不够优雅，待改进
      this.$refs.manyDialog.DialogVisibleChangeAccount = true
      this.$refs.manyDialog.organizationId = this.organizationId
      // 传值,这里AccountFormCheck和formLabelAlign是反的
      this.$refs.manyDialog.AccountFormCheck = data
      // 深拷贝同步副本
      this.$refs.manyDialog.formLabelAlign = JSON.parse(
        JSON.stringify(this.$refs.manyDialog.AccountFormCheck)
      )
    },
    //修改密码弹窗
    handleKeyEdit(data) {
      this.$refs.manyDialog.dialogVisibleKey = true
      this.$refs.manyDialog.organizationId = this.organizationId
      this.$refs.manyDialog.formLabelAlign = data
    },
    //删除 弹窗
    handleDelete(index, data) {
      // console.log(data)
      // console.log(data.__ob__)
      // console.log(index)
      this.$refs.manyDialog.dialogVisibleDeleteAlign = true
      this.$refs.manyDialog.organizationId = this.organizationId
      this.$refs.manyDialog.deleteIndex = index
      this.$refs.manyDialog.formLabelAlign.studentId = data.studentId
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
// main面板的样式
.content {
  // 暂定900px
  min-width: 900px;
  min-height: 500px;
  .top-content {
    position: absolute;
    display: flex;
    height: 25px;
    margin-left: 15px;
    line-height: 25px;
    font-size: 20px;
    color: #f57d2d;
    background-color: #e9eef3;
    .top-content-icon {
      margin-top: 2px;
      margin-right: 7px;
    }
    .top-title {
      text-align: center;
      font-size: 20px;
      color: orange;
    }
  }
}
// 包含批量操作，搜索的div
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
//
.batchButton {
  margin: 0 10px;
  font-size: medium;
  color: #666666;
  border: none;
}
.activeBatchButton {
  margin: 0 10px;
  font-size: medium;
  color: rgba(47.94, 128.01, 255, 1);
  border: none;
}
// 图标hover变色
.svgColor {
  fill: currentColor;
  color: #666666;
}
.svgColor:hover {
  fill: currentColor;
  color: #069db8;
}
// 修改账号，特殊
.svgColor1 g {
  stroke: #666666;
}
.svgColor1:hover g {
  stroke: #069db8;
}
//
// 使图标对齐文字
.buttonMove {
  margin: 0 20px;
}
.search {
  width: 40vh;
  height: 100px;
}
.makeJoinKey {
  position: relative;
  right: 45%;
  top: 20px;
}
.yhqx {
  margin-right: 20px;
}
.el-table {
  padding: 0px;
  //修改表格的滚动条
  /deep/.el-table__body-wrapper::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  //滚动条的滑块
  /deep/.el-table__body-wrapper::-webkit-scrollbar-thumb {
    background-color: #a1a3a9;
    border-radius: 8px;
  }
  // 表格第一行
  /deep/ th {
    padding: 5px;
  }
  // 筛选图标替换
  /deep/ .el-icon-arrow-down {
    color: black;
  }
}
</style>
