<template>
  <div class="bottomBig">
    <div style="width: 85%">
      <el-table
        :data="
          information.slice(
            (currentPage - 1) * pagesize,
            currentPage * pagesize
          )
        "
        height="auto"
        :header-cell-style="{ 'text-align': 'center', height: 0 + 'px' }"
        style="width: 100%; border-radius: 8px; overflow: hidden"
        :row-style="{ height: 0 + 'px' }"
        :cell-style="{ padding: 0 + 'px', 'text-align': 'center' }"
        @sort-change="sortChange"
        @filter-change="filterChange"
        @selection-change="handleSeclect"
      >
        <el-table-column type="selection" width="80"> </el-table-column>
        <el-table-column prop="id" label="ID" type="index" :index="indexMethod">
        </el-table-column>
        <el-table-column prop="studentId" label="学号" sortable="custom">
        </el-table-column>
        <el-table-column prop="studentName" label="姓名"> </el-table-column>
        <el-table-column prop="department" label="部门"> </el-table-column>
        <el-table-column
          prop="totalScore"
          label="面试得分"
          sortable="custom"
          width="120"
        >
        </el-table-column>
        <el-table-column label="简历">
          <template slot-scope="scope">
            <span style="cursor: pointer" @click="openResumeDialog(scope.row)"
              ><i class="el-icon-notebook-2"></i
            ></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="通过状态"
          :filters="[
            { text: '通过', value: 4 },
            { text: '失败', value: 2 },
            { text: '待定', value: 1 },
            { text: '未操作', value: 8 }
          ]"
          column-key="status"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope" style="position: relative">
            <span
              v-if="scope.row.status == 0"
              class="tag"
              style="background-color: #c3f4ff"
              >&nbsp;--&nbsp;&nbsp;--&nbsp;</span
            >
            <span
              v-else-if="scope.row.status == 1"
              class="tag"
              style="background-color: #fb9495"
              >&nbsp;失败&nbsp;</span
            >
            <span
              v-else-if="scope.row.status == 2"
              class="tag"
              style="background-color: #89e051"
              >&nbsp;通过&nbsp;</span
            >
            <span
              v-else-if="scope.row.status == 3"
              class="tag"
              style="background-color: #fbd53c"
              >&nbsp;待定&nbsp;</span
            >

            <el-dropdown trigger="click" style="position: absolute; top: 10px">
              <span
                style="
                  cursor: pointer;
                  width: 0;
                  border: 4px solid;
                  border-color: #333 transparent transparent transparent;
                  margin-left: 10px;
                  margin-top: 2px;
                "
              ></span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="changeStatus2(scope.row)"
                  >通过</el-dropdown-item
                >
                <el-dropdown-item @click.native="changeStatus1(scope.row)"
                  >失败</el-dropdown-item
                >
                <el-dropdown-item @click.native="changeStatus3(scope.row)"
                  >待定</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <div class="foot">
        <div>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            @current-change="current_change"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- 简历弹窗组件 -->
    <resume-dialog ref="resumeDialog"></resume-dialog>
  </div>
</template>

<script>
import resumeDialog from '../dataBoard/components/resumeDialog.vue'
export default {
  name: 'replyList',
  components: {
    resumeDialog
  },
  data() {
    return {
      filterStatus: 0,
      sortProp: '',
      sortOrder: '',
      centerDialogVisible: false,
      detal: {},
      pagesize: 10,
      currentPage: 1,
      total: 11,
      multipleSelection: [],
      search: '',
      departmentId: 0,
      departmentName: '',
      roomId: 0,
      timer: null,
      keyWord: '',
      page: 1,
      win: 3,
      pass: 3,
      wait: 3,
      nedit: 2,
      information: [
        {
          studentId: 20220001,
          studentName: '卢小1',
          departmentId: 1,
          department: '部门1',
          questionScore: [
            {
              questionName: '规划能力',
              score: 60
            },
            {
              questionName: '专业能力',
              score: 100
            }
          ],
          totalScore: 80,
          status: 0
        },
        {
          studentId: 20220002,
          studentName: '卢小2',
          departmentId: 1,
          department: '部门1',
          questionScore: [
            {
              questionName: '规划能力',
              score: 80
            },
            {
              questionName: '专业能力',
              score: 90
            }
          ],
          totalScore: 85,
          status: 3
        },
        {
          studentId: 20220003,
          studentName: '卢小3',
          departmentId: 1,
          department: '部门1',
          questionScore: [
            {
              questionName: '规划能力',
              score: 60
            },
            {
              questionName: '专业能力',
              score: 100
            }
          ],
          totalScore: 80,
          status: 3
        },
        {
          studentId: 20220004,
          studentName: '卢小4',
          departmentId: 1,
          department: '部门1',
          questionScore: [
            {
              questionName: '规划能力',
              score: 80
            },
            {
              questionName: '专业能力',
              score: 90
            }
          ],
          totalScore: 85,
          status: 3
        },
        {
          studentId: 20220005,
          studentName: '卢小5',
          departmentId: 1,
          department: '部门1',
          questionScore: [
            {
              questionName: '规划能力',
              score: 60
            },
            {
              questionName: '专业能力',
              score: 100
            }
          ],
          totalScore: 80,
          status: 0
        },
        {
          studentId: 20220006,
          studentName: '卢小6',
          departmentId: 1,
          department: '部门1',
          questionScore: [
            {
              questionName: '规划能力',
              score: 80
            },
            {
              questionName: '专业能力',
              score: 90
            }
          ],
          totalScore: 85,
          status: 1
        },
        {
          studentId: 20220007,
          studentName: '卢小7',
          departmentId: 1,
          department: '部门1',
          questionScore: [
            {
              questionName: '规划能力',
              score: 60
            },
            {
              questionName: '专业能力',
              score: 100
            }
          ],
          totalScore: 80,
          status: 1
        },
        {
          studentId: 20220008,
          studentName: '卢小8',
          departmentId: 1,
          department: '部门1',
          questionScore: [
            {
              questionName: '规划能力',
              score: 80
            },
            {
              questionName: '专业能力',
              score: 90
            }
          ],
          totalScore: 85,
          status: 2
        },
        {
          studentId: 20220009,
          studentName: '卢小9',
          departmentId: 1,
          department: '部门1',
          questionScore: [
            {
              questionName: '规划能力',
              score: 60
            },
            {
              questionName: '专业能力',
              score: 100
            }
          ],
          totalScore: 80,
          status: 1
        },
        {
          studentId: 20220010,
          studentName: '卢小10',
          departmentId: 1,
          department: '部门1',
          questionScore: [
            {
              questionName: '规划能力',
              score: 80
            },
            {
              questionName: '专业能力',
              score: 90
            }
          ],
          totalScore: 85,
          status: 2
        },
        {
          studentId: 20220011,
          studentName: '卢小11',
          departmentId: 1,
          department: '部门1',
          questionScore: [
            {
              questionName: '规划能力',
              score: 60
            },
            {
              questionName: '专业能力',
              score: 100
            }
          ],
          totalScore: 80,
          status: 2
        }
      ]
    }
  },
  methods: {
    pd(e) {
      switch (e) {
        case 0:
          return '- -'
        case 1:
          return '失败'

        case 2:
          return '通过'

        case 3:
          return '待定'

        default:
          return '- -'
      }
    },
    indexMethod(index) {
      return (this.currentPage - 1) * this.pagesize + index + 1
    },
    current_change(currentPage) {
      this.currentPage = currentPage
      console.log(currentPage)
      let params = {}
      if (this.sortOrder == 'descending') {
        params = {
          organizationId: sessionStorage['loginOrganizationId'],
          departmentId: this.departmentId,
          roomId: this.roomId,
          page: this.currentPage,
          filterStatus: this.filterStatus
        }
      } else {
        if (this.sortProp == 'studentId') {
          params = {
            organizationId: sessionStorage['loginOrganizationId'],
            departmentId: this.departmentId,
            roomId: this.roomId,
            idSort: 1,
            page: this.currentPage,
            filterStatus: this.filterStatus
          }
        } else if (this.sortProp == 'totalScore') {
          params = {
            organizationId: sessionStorage['loginOrganizationId'],
            departmentId: this.departmentId,
            roomId: this.roomId,
            scoreSort: 1,
            page: this.currentPage,
            filterStatus: this.filterStatus
          }
        } else {
          params = {
            organizationId: sessionStorage['loginOrganizationId'],
            departmentId: this.departmentId,
            roomId: this.roomId,
            page: this.currentPage,
            filterStatus: this.filterStatus
          }
        }
      }
      let url = 'api/interview-reply/stu-info'

      this.$http
        .get(url, params)
        .then((response) => {
          console.log(response)
          this.information = response.data.data.information
        })
        .catch((error) => {
          console.log(error)
        })
    },
    changeStatus2(row) {
      let studentInfo = []
      studentInfo[0] = {
        departmentId: row.departmentId,
        studentId: row.studentId
      }
      let sinForm = {
        status: 2,
        organizationId: sessionStorage['loginOrganizationId'],
        studentInfo: studentInfo
      }
      const url1 = 'api/interview-reply/status'
      let post3 = this.$http.post(url1, sinForm)
      post3
        .then((res) => {
          console.log(res)
          if (res.data.code == '00000') {
            row.status = 2
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    changeStatus1(row) {
      let studentInfo = []
      studentInfo[0] = {
        departmentId: row.departmentId,
        studentId: row.studentId
      }
      let sinForm = {
        status: 1,
        organizationId: sessionStorage['loginOrganizationId'],
        studentInfo: studentInfo
      }
      const url1 = 'api/interview-reply/status'
      let post3 = this.$http.post(url1, sinForm)
      post3
        .then((res) => {
          console.log(res)
          if (res.data.code == '00000') {
            row.status = 1
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    changeStatus3(row) {
      let studentInfo = []
      studentInfo[0] = {
        departmentId: row.departmentId,
        studentId: row.studentId
      }
      let sinForm = {
        status: 3,
        organizationId: sessionStorage['loginOrganizationId'],
        studentInfo: studentInfo
      }
      const url1 = 'api/interview-reply/status'
      let post3 = this.$http.post(url1, sinForm)
      post3
        .then((res) => {
          console.log(res)
          if (res.data.code == '00000') {
            row.status = 3
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    //排序
    sortChange(column) {
      this.sortProp = column.prop
      this.sortOrder = column.order
      // ascending 升序/
      let params1 = {}
      if (this.sortOrder == 'descending') {
        params1 = {
          organizationId: sessionStorage['loginOrganizationId'],
          departmentId: this.departmentId,
          roomId: this.roomId,
          filterStatus: this.filterStatus
        }
      } else {
        if (this.sortProp == 'studentId') {
          params1 = {
            organizationId: sessionStorage['loginOrganizationId'],
            departmentId: this.departmentId,
            roomId: this.roomId,
            idSort: 1,
            filterStatus: this.filterStatus
          }
        } else if (this.sortProp == 'totalScore') {
          params1 = {
            organizationId: sessionStorage['loginOrganizationId'],
            departmentId: this.departmentId,
            roomId: this.roomId,
            scoreSort: 1,
            filterStatus: this.filterStatus
          }
        } else {
          params1 = {
            organizationId: sessionStorage['loginOrganizationId'],
            departmentId: this.departmentId,
            roomId: this.roomId,
            filterStatus: this.filterStatus
          }
        }
      }
      let url = 'api/interview-reply/stu-info'

      this.$http
        .get(url, params1)
        .then((response) => {
          console.log(response)
          this.information = response.data.data.information
        })
        .catch((error) => {
          console.log(error)
        })
    },
    filterChange(filters) {
      let status = filters.status
      const sum = eval(status.join('+'))
      this.filterStatus = sum
      console.log(sum)
      let url = 'api/interview-reply/stu-info'
      let params2 = {
        organizationId: sessionStorage['loginOrganizationId'],
        departmentId: this.departmentId,
        roomId: this.roomId,
        filterStatus: this.filterStatus,
        page: 1
      }
      this.$http
        .get(url, params2)
        .then((response) => {
          console.log(response)
          this.win = response.data.data.win
          this.pass = response.data.data.pass
          this.wait = response.data.data.wait
          this.nedit = response.data.data.nedit
          this.total = this.win + this.pass + this.wait + this.nedit
          this.information = response.data.data.information
        })
        .catch((error) => {
          console.log(error)
        })
    },
    handleSeclect(val) {
      this.multipleSelection = val
      let selectionName = []
      let selectionStudentId = []
      let selectionDepartmentId = []
      this.multipleSelection.forEach((element) => {
        selectionName.push(element.name)
        selectionStudentId.push(element.studentId)
        selectionDepartmentId.push(element.departmentId)
      })
      // console.log('name:', selectionName)
      // console.log('id:', selectionStudentId)
      // console.log('departmentId:', selectionDepartmentId)
      this.$bus.$emit('replySelectionStudentId', selectionStudentId)
      this.$bus.$emit('replySelectionDepartmentId', selectionDepartmentId)
    },
    openResumeDialog(data) {
      this.$refs.resumeDialog.resumeDialogVisible = true
      this.$refs.resumeDialog.studentId = data.studentId
      this.$refs.resumeDialog.Mymounted()
      console.log(data.stuNum + '记得删')
    }
  },
  created() {
    let url = 'api/interview-reply/stu-info'
    let params = {
      organizationId: sessionStorage['loginOrganizationId'],
      departmentId: this.departmentId,
      roomId: this.roomId,
      page: 1
    }
    this.$http
      .get(url, params)
      .then((response) => {
        console.log(response)
        this.win = response.data.data.win
        this.pass = response.data.data.pass
        this.wait = response.data.data.wait
        this.nedit = response.data.data.nedit
        this.total = this.win + this.pass + this.wait + this.nedit
        this.$bus.$emit('replyWin', this.win)
        this.$bus.$emit('replyPass', this.pass)
        this.$bus.$emit('replyWait', this.wait)
        this.$bus.$emit('replyNedit', this.nedit)
        this.$bus.$emit('replyTotal', this.total)
        // this.information = response.data.data.information
      })
      .catch((error) => {
        console.log(error)
      })
  },
  mounted() {
    this.$bus.$on('replyDepartmentId', (data) => {
      this.departmentId = data
    }),
      this.$bus.$on('replyDepartmentName', (data) => {
        this.departmentName = data
      }),
      this.$bus.$on('replyRoomId', (data) => {
        this.roomId = data
      }),
      this.$bus.$on('replyInput', (data) => {
        this.keyWord = data
      })
  },
  beforeDestroy() {
    this.$bus.$off('replyDepartmentId')
    this.$bus.$off('replyDepartmentName')
    this.$bus.$off('replyRoomId')
    this.$bus.$off('replyInput')
  },
  computed: {},
  watch: {
    departmentId() {
      let url = 'api/interview-reply/stu-info'
      let params = {
        organizationId: sessionStorage['loginOrganizationId'],
        departmentId: this.departmentId,
        roomId: this.roomId
      }
      this.$http
        .get(url, params)
        .then((response) => {
          console.log(response)
          this.win = response.data.data.win
          this.pass = response.data.data.pass
          this.wait = response.data.data.wait
          this.nedit = response.data.data.nedit
          this.total = this.win + this.pass + this.wait + this.nedit
          this.information = response.data.data.information
        })
        .catch((error) => {
          console.log(error)
        })
    },
    roomId() {
      let url = 'api/interview-reply/stu-info'
      let params = {
        organizationId: sessionStorage['loginOrganizationId'],
        departmentId: this.departmentId,
        roomId: this.roomId
      }
      this.$http
        .get(url, params)
        .then((response) => {
          console.log(response)
          this.win = response.data.data.win
          this.pass = response.data.data.pass
          this.wait = response.data.data.wait
          this.nedit = response.data.data.nedit
          this.total = this.win + this.pass + this.wait + this.nedit
          this.information = response.data.data.information
        })
        .catch((error) => {
          console.log(error)
        })
    },
    keyWord() {
      // 清除 timer 对应的延时器
      clearTimeout(this.timer)
      // 重新启动一个延时器，并把 timerId 赋值给 this.timer
      this.timer = setTimeout(() => {
        console.log(this.keyWord)
        let url3 = 'api/interview-reply/stu-search'
        let params3 = {
          keyWord: this.keyWord,
          organizationId: sessionStorage['loginOrganizationId'],
          departmentId: this.departmentId,
          roomId: this.roomId
        }
        this.$http
          .get(url3, params3)
          .then((response) => {
            console.log(response)
            this.win = response.data.data.win
            this.pass = response.data.data.pass
            this.wait = response.data.data.wait
            this.nedit = response.data.data.nedit
            this.total = this.win + this.pass + this.wait + this.nedit
            // this.information = response.data.data.information
          })
          .catch((error) => {
            console.log(error)
          })
      }, 600)
    }
  }
}
</script>

<style scoped>
.bottomBig {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.foot {
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: right;
  align-items: center;
  /* margin-right: 500px; */
}
.tag {
  color: white;
}
.el-icon-notebook-2:hover {
  color: #409eff;
}
:deep(.el-dialog .el-dialog__body) {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
:deep(.el-dialog) {
  border-radius: 15px;
}
:deep(.el-row) {
  margin-bottom: 20px;
}
</style>
