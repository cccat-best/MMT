<template>
  <div class="big">
    <div>
      <el-table
        :data="
          information.slice(
            (currentPage - 1) * pagesize,
            currentPage * pagesize
          )
        "
        :header-cell-style="{ 'text-align': 'center' }"
        style="width: 100%; border-radius: 8px"
        :row-style="{ height: 0 + 'px' }"
        :cell-style="{ padding: 0 + 'px', 'text-align': 'center' }"
        @sort-change="sortChange"
        @filter-change="filterChange"
        @selection-change="handleSeclect"
      >
        <el-table-column type="selection" width="60"> </el-table-column>
        <el-table-column
          prop="id"
          label="ID"
          width="60"
          type="index"
          :index="indexMethod"
        >
        </el-table-column>
        <el-table-column
          prop="studentId"
          label="学号"
          sortable="custom"
          width="120"
        >
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="100">
        </el-table-column>
        <el-table-column
          width="100"
          v-for="(item, index) in information[0].questionScore"
          :key="index"
        >
          <!-- solt="header"是为了插入表头的，这里遍历listStudent[0],是因为表头都一样，所以取第一行数据的字段做为表头即可 -->
          <template slot="header"> {{ item.questionName }} </template>
          <!-- index对应下面动态列（answerList）的索引，取出值渲染 -->
          <template slot-scope="scope">{{
            scope.row.questionScore[index].score
          }}</template>
        </el-table-column>
        <el-table-column
          prop="totalScore"
          label="面试总得分"
          sortable="custom"
          width="120"
        >
        </el-table-column>
        <el-table-column label="简历" width="100">
          <template slot-scope="scope">
            <span style="cursor: pointer" @click="resume(scope.row)"
              ><i class="el-icon-notebook-2"></i
            ></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="通过状态"
          width="100"
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
              v-if="scope.row.status == 1"
              class="tag"
              style="background-color: #fb9495"
              >&nbsp;失败&nbsp;</span
            >
            <span
              v-if="scope.row.status == 2"
              class="tag"
              style="background-color: #89e051"
              >&nbsp;通过&nbsp;</span
            >
            <span
              v-if="scope.row.status == 3"
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
    <el-dialog
      title="简历"
      :visible.sync="centerDialogVisible"
      width="350px"
      center
    >
      <div class="detal">
        <el-row> <b>姓名:&nbsp;&nbsp;</b>{{ detal.name }} </el-row>
        <el-row> <b>学号:&nbsp;&nbsp;</b>{{ detal.studentId }} </el-row>
        <el-row v-for="(item, index) in detal.questionScore" :key="index">
          <b>{{ item.questionName }}:&nbsp;&nbsp;</b>{{ item.score }}
        </el-row>
        <el-row> <b>面试总得分:&nbsp;&nbsp;</b>{{ detal.totalScore }} </el-row>
        <el-row> <b>通过状态:&nbsp;&nbsp;</b>{{ pd(detal.status) }} </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'replyList',
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
      roomId: 0,
      keyWord: '',
      page: 1,
      win: 4,
      pass: 3,
      wait: 3,
      nedit: 1,
      information: [
        {
          studentId: 20220001,
          name: '卢小1',
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
          name: '卢小2',
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
          name: '卢小3',
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
          name: '卢小4',
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
          name: '卢小5',
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
          studentId: 20220006,
          name: '卢小6',
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
          name: '卢小7',
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
        },
        {
          studentId: 20220008,
          name: '卢小8',
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
          name: '卢小9',
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
          name: '卢小10',
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
          name: '卢小11',
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
      if (e == 0) {
        return '- -'
      }
      if (e == 1) {
        return '失败'
      }
      if (e == 2) {
        return '通过'
      }
      if (e == 3) {
        return '待定'
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
          organizationId: 1,
          departmentId: this.departmentId,
          roomId: this.roomId,
          page: this.currentPage,
          filterStatus: this.filterStatus
        }
      } else {
        if (this.sortProp == 'studentId') {
          params = {
            organizationId: 1,
            departmentId: this.departmentId,
            roomId: this.roomId,
            idSort: 1,
            page: this.currentPage,
            filterStatus: this.filterStatus
          }
        } else if (this.sortProp == 'totalScore') {
          params = {
            organizationId: 1,
            departmentId: this.departmentId,
            roomId: this.roomId,
            scoreSort: 1,
            page: this.currentPage,
            filterStatus: this.filterStatus
          }
        } else {
          params = {
            organizationId: 1,
            departmentId: this.departmentId,
            roomId: this.roomId,
            page: this.currentPage,
            filterStatus: this.filterStatus
          }
        }
      }
      let url = 'http://118.195.251.126:38080/interview-reply/stu-info'
      // let url = 'api/interview-reply/stu-info'

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
      let studentId = []
      studentId[0] = row.studentId
      let sinForm = {
        studentId: studentId,
        status: 2
      }
      const url1 = 'api/interview-reply/status'
      let post3 = this.$http.post(url1, sinForm)
      post3
        .then((res) => {
          console.log(res.data.code)
          if (res.data.code == '00000') {
            row.status = 2
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    changeStatus1(row) {
      let studentId = []
      studentId[0] = row.studentId
      let sinForm = {
        studentId: studentId,
        status: 1
      }
      console.log(sinForm)
      const url1 = 'api/interview-reply/status'
      let post3 = this.$http.post(url1, sinForm)
      post3
        .then((res) => {
          console.log(res.data.code)
          if (res.data.code == '00000') {
            row.status = 1
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    changeStatus3(row) {
      let studentId = []
      studentId[0] = row.studentId
      let sinForm = {
        studentId: studentId,
        status: 3
      }
      console.log(sinForm)
      const url1 = 'http://118.195.251.126:38080/interview-reply/status'
      // const url1 = 'api/interview-reply/status'
      let post3 = this.$http.post(url1, sinForm)
      post3
        .then((res) => {
          console.log(res.data.code)
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
      // sessionStorage['sortProp'] = column.prop
      // sessionStorage['sortOrder'] = column.order
      this.sortProp = column.prop
      this.sortOrder = column.order
      // ascending 升序/
      let params1 = {}
      if (this.sortOrder == 'descending') {
        params1 = {
          organizationId: 1,
          departmentId: this.departmentId,
          roomId: this.roomId,
          filterStatus: this.filterStatus
        }
      } else {
        if (this.sortProp == 'studentId') {
          params1 = {
            organizationId: 1,
            departmentId: this.departmentId,
            roomId: this.roomId,
            idSort: 1,
            filterStatus: this.filterStatus
          }
        } else if (this.sortProp == 'totalScore') {
          params1 = {
            organizationId: 1,
            departmentId: this.departmentId,
            roomId: this.roomId,
            scoreSort: 1,
            filterStatus: this.filterStatus
          }
        } else {
          params1 = {
            organizationId: 1,
            departmentId: this.departmentId,
            roomId: this.roomId,
            filterStatus: this.filterStatus
          }
        }
      }
      let url = 'http://118.195.251.126:38080/interview-reply/stu-info'
      // let url = 'api/interview-reply/stu-info'

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
        organizationId: 1,
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
      this.multipleSelection.forEach((element) => {
        selectionName.push(element.name)
        selectionStudentId.push(element.studentId)
      })
      // console.log('name:', selectionName)
      // console.log('id:', selectionStudentId)
      // this.$bus.$emit('selectionName', selectionName)
      this.$bus.$emit('selectionStudentId', selectionStudentId)
    },
    resume(row) {
      this.detal = row
      this.centerDialogVisible = true
    }
  },
  mounted() {
    // let url = 'http://118.195.251.126:38080/interview-reply/stu-info'
    // // let url = 'api/interview-reply/stu-info'
    // let params = {
    //   organizationId: 1,
    //   departmentId: this.departmentId,
    //   roomId: this.roomId,
    //   page: 1
    // }
    // this.$http
    //   .get(url, params)
    //   .then((response) => {
    //     console.log(response)
    //     this.win = response.data.data.win
    //     this.pass = response.data.data.pass
    //     this.wait = response.data.data.wait
    //     this.nedit = response.data.data.nedit
    //     this.total = this.win + this.pass + this.wait + this.nedit
    //     this.$bus.$emit('win', this.win)
    //     this.$bus.$emit('pass', this.pass)
    //     this.$bus.$emit('wait', this.wait)
    //     this.$bus.$emit('nedit', this.nedit)
    //     this.$bus.$emit('total', this.total)
    //     this.information = response.data.data.information
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })
  },
  created() {
    this.$bus.$on('departmentId', (data) => {
      this.departmentId = data
    }),
      this.$bus.$on('roomId', (data) => {
        this.roomId = data
      }),
      this.$bus.$on('input', (data) => {
        this.keyWord = data
      })
  },
  beforeDestroy() {
    this.$bus.$off('departmentId')
    this.$bus.$off('roomId')
    this.$bus.$off('input')
  },
  computed: {},
  watch: {
    departmentId() {
      let url = 'api/interview-reply/stu-info'
      let params = {
        organizationId: 1,
        departmentId: this.departmentId,
        roomId: this.roomId
      }
      this.$http
        .get(url, params)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    roomId() {
      let url = 'api/interview-reply/stu-info'
      let params = {
        organizationId: 1,
        departmentId: this.departmentId,
        roomId: this.roomId
      }
      this.$http
        .get(url, params)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    keyWord() {
      console.log(this.keyWord)
      let url3 = 'http://118.195.251.126:38080/interview-reply/stu-search'
      // let url3 = 'api/interview-reply/stu-search'
      let params3 = {
        keyWord: this.keyWord,
        organizationId: 1,
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
    }
  }
}
</script>

<style scoped>
.big {
  height: 100%;
  width: 100%;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.foot {
  margin-top: 10px;
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
  border-radius: 10px;
}
:deep(.el-row) {
  margin-bottom: 20px;
}
</style>
