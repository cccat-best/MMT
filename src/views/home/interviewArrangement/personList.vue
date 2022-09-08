<template>
  <div class="bigLeft">
    <!-- 面试次序 -->
    <div class="dingwei">
      <div>
        <div class="btn-group" @click="pdBtn" style="border-radius: 50%">
          <button type="button" class="btn btn1 btn0" ref="btn1">一面</button>
          <button type="button" class="btn btn2" ref="btn2">二面</button>
          <button type="button" class="btn btn3" ref="btn3">三面</button>
        </div>
        <div class="text1"><b>待面试人员名单：</b></div>
      </div>
    </div>
    <!-- 数据表格 -->
    <div class="table">
      <!-- 筛选框 -->
      <div class="search">
        <el-input
          placeholder="请输入关键字"
          suffix-icon="el-icon-search"
          v-model="search"
          style="border-radius: 5px; box-shadow: 1px 1px 3px 1px #e5e9f2"
        >
        </el-input>
      </div>
      <el-table
        :data="tableData"
        :header-cell-style="{ 'text-align': 'center' }"
        height="291px"
        border
        ref="table"
        style="
          border-radius: 8px;
          box-shadow: 2px 2px 4px 2px #e5e9f2;
          width: 100%;
        "
        :row-style="{ height: 50 + 'px', 'vertical-align': 'middle' }"
        :cell-style="{
          padding: 0 + 'px',
          'text-align': 'center',
          'vertical-align': 'middle'
        }"
        @selection-change="handleSeclect"
        @filter-change="filterChange"
      >
        <el-table-column type="selection" width="50"> </el-table-column>
        <el-table-column
          prop="id"
          label="ID"
          width="60"
          type="index"
          :index="indexMethod"
        >
        </el-table-column>
        <el-table-column prop="studentId" label="学号"> </el-table-column>
        <el-table-column prop="studentName" label="姓名"> </el-table-column>
        <el-table-column prop="className" label="班级" width="140">
        </el-table-column>
        <el-table-column
          prop="departmentName"
          label="面试部门"
          width="120"
          :filters="filterDepartment"
          column-key="department"
          filter-placement="bottom-end"
        >
        </el-table-column>

        <el-table-column
          label="通知状态"
          width="120"
          :filters="[
            { text: '未安排', value: 2 },
            { text: '已通知未签到', value: 4 }
          ]"
          column-key="status"
        >
          <template slot-scope="scope">
            <!-- <span>{{ pd(scope.row.status) }} </span> -->
            <span v-if="scope.row.status == 2"
              ><el-tag type="warning" disable-transitions>未安排</el-tag></span
            >
            <span v-else-if="scope.row.status == 3"
              ><el-tag disable-transitions>已安排未通知</el-tag></span
            >
            <span v-else-if="scope.row.status == 4"
              ><el-tag type="success" disable-transitions
                >已通知未签到</el-tag
              ></span
            >
            <span v-else
              ><el-tag type="info" disable-transitions>其它</el-tag></span
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="foot">
        <div>共有{{ total }}条记录</div>
        <div>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :current-page="currentPage"
            @current-change="current_change"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'personList',
  data() {
    return {
      sameDepartment: true,
      departmentId: 0,
      filterDepartment: [],
      filterStatus: null,
      departmentName: '',
      round: 1,
      order: '',
      pagesize: 10,
      currentPage: 1,
      total: 0,
      search: '',
      timer: null,
      radio: '',
      tableData: [],
      filterDepartmentId: 0
    }
  },
  watch: {
    sameDepartment() {
      this.$bus.$emit('arrangeSameDepartment', this.sameDepartment)
    },
    search() {
      // 清除 timer 对应的延时器
      clearTimeout(this.timer)
      // 重新启动一个延时器，并把 timerId 赋值给 this.timer
      this.timer = setTimeout(() => {
        // console.log(this.search)
        let url = 'api/interview-arrangement/info/like'
        let params = {}
        if (this.filterStatus == null) {
          params = {
            admissionId: sessionStorage['homeAdmissionId'],
            round: this.round,
            keyword: this.search,
            departmentId: this.filterDepartmentId
          }
        } else {
          params = {
            admissionId: sessionStorage['homeAdmissionId'],
            round: this.round,
            keyword: this.search,
            departmentId: this.filterDepartmentId,
            status: this.filterStatus
          }
        }
        this.$http
          .get(url, params)
          .then((response) => {
            // console.log(response)
            if (response.data.code == '00000') {
              this.currentPage = 1
              this.tableData = []
              this.total = response.data.data.total
              this.tableData = response.data.data.infoBackParamList
            } else {
              this.$message.error(response.data.message)
            }
          })
          .catch((error) => {
            console.log(error)
            this.$message.error('获取表格信息失败！')
          })
      }, 600)
    }
  },
  computed: {
    // 模糊搜索
    // tables: function () {
    //   const search = this.search
    //   if (search) {
    //     // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
    //     return this.tableData.filter((data) => {
    //       // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
    //       // 如果没有满足条件的元素，则返回false。
    //       return Object.keys(data).some((key) => {
    //         // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
    //         // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
    //         return String(data[key]).toLowerCase().indexOf(search) > -1
    //       })
    //     })
    //   }
    //   return this.tableData
    // }
  },
  methods: {
    handleSeclect(val) {
      this.departmentName = []
      this.departmentId = []
      // console.log(val)
      this.departmentId = val[0].departmentId
      for (let i = 1; i < val.length; ++i) {
        if (val[i].departmentId != this.departmentId) {
          this.$alert('请选择相同面试部门进行通知操作！', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          })
          this.sameDepartment = false
          return 0
        }
      }
      this.sameDepartment = true
      this.departmentName = val[0].departmentName
      this.$bus.$emit('arrangeSelectionDepartmentName', this.departmentName)
      this.$bus.$emit('arrangeSelectionDepartmentId', this.departmentId)
      let selectionStudentId = []
      let selectionStudentName = []
      val.forEach((element) => {
        selectionStudentId.push(element.studentId)
      })
      val.forEach((element) => {
        selectionStudentName.push(element.studentName)
      })
      // console.log(selectionStudentId)
      this.$bus.$emit('arrangeSelectionStudentId1', selectionStudentId)
      this.$bus.$emit('arrangeSelectionStudentName', selectionStudentName)
    },
    filterChange(filters) {
      if (filters.department) {
        this.currentPage = 1
        let filterDepartment = []
        filterDepartment = filters.department
        let length = filterDepartment.length
        if (length > 1) {
          this.$alert('部门筛选不允许多选！', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          })
        } else {
          this.filterDepartmentId = filterDepartment[0]
          let url = 'api/interview-arrangement/info/like'
          let params = {}
          if (this.filterStatus == null) {
            params = {
              admissionId: sessionStorage['homeAdmissionId'],
              round: this.round,
              keyword: this.search,
              departmentId: this.filterDepartmentId
            }
          } else {
            params = {
              admissionId: sessionStorage['homeAdmissionId'],
              round: this.round,
              keyword: this.search,
              departmentId: this.filterDepartmentId,
              status: this.filterStatus
            }
          }

          this.$http
            .get(url, params)
            .then((response) => {
              console.log(response)
              if (response.data.code == '00000') {
                this.tableData = []
                this.total = response.data.data.total
                this.tableData = response.data.data.infoBackParamList
              } else {
                this.$message.error(response.data.message)
              }
            })
            .catch((error) => {
              console.log(error)
              this.$message.error('获取筛选信息失败！')
            })
        }
      } else if (filters.status) {
        console.log(filters.status)
        if (filters.status.length == 0 || filters.status.length == 2) {
          this.filterStatus = null
        } else if (filters.status.length == 1) {
          this.filterStatus = filters.status[0]
          this.currentPage = 1
          let url = 'api/interview-arrangement/info/like'
          let params = {
            pageNum: this.currentPage,
            admissionId: sessionStorage['homeAdmissionId'],
            round: this.round,
            departmentId: this.filterDepartmentId,
            keyword: this.search,
            status: this.filterStatus
          }
          this.$http
            .get(url, params)
            .then((response) => {
              // console.log(response)
              if (response.data.code == '00000') {
                this.tableData = []
                this.total = response.data.data.total
                this.tableData = response.data.data.infoBackParamList
              } else {
                this.$message.error(response.data.message)
              }
            })
            .catch((error) => {
              console.log(error)
              this.$message.error('获取表格信息失败！')
            })
        }
      }
    },
    indexMethod(index) {
      return (this.currentPage - 1) * this.pagesize + index + 1
    },
    current_change(currentPage) {
      this.currentPage = currentPage
      // console.log(currentPage)
      let params = {}
      let url = 'api/interview-arrangement/info/like'
      if (this.filterStatus == null) {
        params = {
          pageNum: this.currentPage,
          admissionId: sessionStorage['homeAdmissionId'],
          round: this.round,
          departmentId: this.filterDepartmentId,
          keyword: this.search
        }
      } else {
        params = {
          pageNum: this.currentPage,
          admissionId: sessionStorage['homeAdmissionId'],
          round: this.round,
          departmentId: this.filterDepartmentId,
          keyword: this.search,
          status: this.filterStatus
        }
      }

      this.$http
        .get(url, params)
        .then((response) => {
          // console.log(response)
          if (response.data.code == '00000') {
            this.tableData = []
            this.total = response.data.data.total
            this.tableData = response.data.data.infoBackParamList
          } else {
            this.$message.error(response.data.message)
          }
        })
        .catch((error) => {
          console.log(error)
          this.$message.error('获取表格信息失败！')
        })
    },
    pdBtn() {
      var btn0 = document.activeElement
      btn0.classList.add('btn0')
      if (btn0 == this.$refs.btn1) {
        this.$refs.btn2.classList.remove('btn0')
        this.$refs.btn3.classList.remove('btn0')
        this.order = '一面'
        this.round = 1

        //一面数据发送请求
        let url = 'api/interview-arrangement/info/like'
        let params = {
          admissionId: sessionStorage['homeAdmissionId'],
          round: this.round
        }
        this.$http
          .get(url, params)
          .then((response) => {
            // console.log(response)
            if (response.data.code == '00000') {
              this.tableData = []
              this.total = response.data.data.total
              this.tableData = response.data.data.infoBackParamList
            } else {
              this.$message.error(response.data.message)
            }
          })
          .catch((error) => {
            console.log(error)
            this.$message.error('获取一面信息失败！')
          })
      }
      if (btn0 == this.$refs.btn2) {
        this.$refs.btn1.classList.remove('btn0')
        this.$refs.btn3.classList.remove('btn0')
        this.order = '二面'
        this.round = 2

        //二面数据发送请求
        let url = 'api/interview-arrangement/info/like'
        let params = {
          admissionId: sessionStorage['homeAdmissionId'],
          round: this.round
        }
        this.$http
          .get(url, params)
          .then((response) => {
            // console.log(response)
            if (response.data.code == '00000') {
              this.tableData = []
              this.total = response.data.data.total
              this.tableData = response.data.data.infoBackParamList
            } else {
              this.$message.error(response.data.message)
            }
          })
          .catch((error) => {
            console.log(error)
            this.$message.error('获取二面信息失败！')
          })
      }
      if (btn0 == this.$refs.btn3) {
        this.$refs.btn1.classList.remove('btn0')
        this.$refs.btn2.classList.remove('btn0')
        this.order = '三面'
        this.round = 3

        //三面数据发送请求
        let url = 'api/interview-arrangement/info/like'
        let params = {
          admissionId: sessionStorage['homeAdmissionId'],
          round: this.round
        }
        this.$http
          .get(url, params)
          .then((response) => {
            // console.log(response)
            if (response.data.code == '00000') {
              this.tableData = []
              this.total = response.data.data.total
              this.tableData = response.data.data.infoBackParamList
            } else {
              this.$message.error(response.data.message)
            }
          })
          .catch((error) => {
            console.log(error)
            this.$message.error('获取三面信息失败！')
          })
      }
      this.$bus.$emit('arrangeOrder', this.order)
    }
  },
  beforeCreate() {
    let organizationId = sessionStorage['loginOrganizationId']
    let url1 = `api/interview-reply/department/${organizationId}`
    this.$http
      .get(url1)
      .then((response) => {
        // console.log(response)
        if (response.data.code == '00000') {
          this.department = []
          this.filterDepartment = []
          this.department = response.data.data.department
          this.department.forEach((element) => {
            this.filterDepartment.push({
              text: element.name,
              value: element.id
            })
          })
        } else {
          this.$message.error(response.data.message)
        }
      })
      .catch((error) => {
        console.log(error)
        // this.drawChar()
        this.$message.error('获取部门信息失败！')
      })
  },
  created() {
    //一面数据发送请求，初始页面渲染
    let url = 'api/interview-arrangement/info/like'
    let params = {
      admissionId: sessionStorage['homeAdmissionId'],
      round: this.round,
      departmentId: 0
    }
    this.$http
      .get(url, params)
      .then((response) => {
        // console.log(response)
        if (response.data.code == '00000') {
          this.tableData = []
          this.total = response.data.data.total
          this.tableData = response.data.data.infoBackParamList
        } else {
          this.$message.error(response.data.message)
        }
      })
      .catch((error) => {
        console.log(error)
        this.$message.error('获取表格信息失败！')
      })
  }
}
</script>

<style scoped>
.tag {
  color: white;
  padding: 3px;
}
.bigLeft {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.dingwei {
  margin-top: 20px;
  display: flex;
  justify-content: left;
}
.table {
  width: 100%;
}
.text1 {
  margin: 30px 0;
  width: auto;
}
.btn {
  color: gray;
  /* font-size: 20px; */
  background: white;
  padding: 10px 15px 10px 15px;
  border: solid gray 0.5px;
  text-decoration: none;
  border-color: rgb(192, 196, 204);
}

.btn0 {
  outline: 0;
  background: gray;
  color: white;
  text-decoration: none;
}
.btn1 {
  border-radius: 47% 0 0 47%;
  border-right: 0;
}
.btn3 {
  border-radius: 0 47% 47% 0;
  border-left: 0;
}
.search {
  width: 40%;
  margin-bottom: 10px;
}
.foot {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
