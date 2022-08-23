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
        :data="
          tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
        :header-cell-style="{ 'text-align': 'center' }"
        height="291px"
        border
        ref="table"
        style="
          border-radius: 8px;
          box-shadow: 2px 2px 4px 2px #e5e9f2;
          width: 632px;
        "
        :row-style="{ height: 0 + 'px', 'vertical-align': 'middle' }"
        :cell-style="{
          padding: 0 + 'px',
          'text-align': 'center',
          'vertical-align': 'middle'
        }"
      >
        <el-table-column label="" width="40">
          <template slot-scope="scope">
            <el-radio
              :label="scope.row.studentId"
              v-model="radio"
              @change.native="getCurrentRow(scope.row)"
              >&nbsp;</el-radio
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="id"
          label="ID"
          width="40"
          type="index"
          :index="indexMethod"
        >
        </el-table-column>
        <el-table-column prop="studentId" label="学号" width="90">
        </el-table-column>
        <el-table-column prop="studentName" label="姓名" width="90">
        </el-table-column>
        <el-table-column prop="className" label="班级" width="100">
        </el-table-column>
        <el-table-column prop="department" label="面试部门" width="140">
          <template slot-scope="scope" style="position: relative">
            <span>{{ scope.row.department[newDep].departmentName }}</span>
            <el-dropdown
              trigger="click"
              @command="handleCommand"
              style="position: absolute; right: 10px; margin-top: 8%"
            >
              <span
                style="
                  cursor: pointer;
                  width: 0;
                  border: 4px solid;
                  border-color: #333 transparent transparent transparent;
                  margin-left: 10px;
                  /* margin-top: 2px; */
                "
              ></span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  @click.native="changeDepartment(scope.row)"
                  v-for="(item, index) in scope.row.department"
                  :command="index"
                  :key="index"
                  >{{ item.departmentName }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
        <el-table-column label="通知状态" width="130">
          <template slot-scope="scope">
            <span
              >{{ pd(scope.row.department[newDep].status) }}
            </span></template
          >
        </el-table-column>
      </el-table>
      <div class="foot">
        <div>共有{{ total }}条记录</div>
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
  </div>
</template>

<script>
export default {
  name: 'personList',
  data() {
    return {
      statusList: [],
      newDep: 0,
      round: 1,
      order: '',
      pagesize: 10,
      currentPage: 1,
      total: 0,
      search: '',
      timer: null,
      multipleSelection: [],
      radio: '',
      tableData: []
    }
  },
  watch: {
    search() {
      this.currentPage = 1
      // 清除 timer 对应的延时器
      clearTimeout(this.timer)
      // 重新启动一个延时器，并把 timerId 赋值给 this.timer
      this.timer = setTimeout(() => {
        console.log(this.search)
        let url = 'api/interview-arrangement/info/like'
        let params = {
          admissionId: sessionStorage['homeAdmissionId'],
          round: this.round,
          keyword: this.search
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
    pd(t) {
      switch (t) {
        case 0:
          return '拒绝'
        case 1:
          return '待定'
        case 2:
          return '未安排'
        case 3:
          return '已安排未通知'
        case 4:
          return '已通知未签到'
        case 5:
          return '已签到'
        case 6:
          return '面试中'
        case 7:
          return '待定'
        case 8:
          return '失败'
        case 9:
          return '通过'
        default:
          return 0
      }
    },
    changeDepartment(e) {
      console.log(e)
    },
    handleCommand(command) {
      console.log('click on item ' + command)
      this.newDep = command
    },
    indexMethod(index) {
      return (this.currentPage - 1) * this.pagesize + index + 1
    },
    current_change(currentPage) {
      this.currentPage = currentPage
      console.log(currentPage)
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
            this.$message.error('获取三面信息失败！')
          })
      }
      this.$bus.$emit('arrangeOrder', this.order)
    },
    getCurrentRow(row) {
      console.log(row)
      this.$bus.$emit('arrangeSelectionName1', row.studentName)
      this.$bus.$emit('arrangeSelectionStudentId1', row.studentId)
      this.$bus.$emit(
        'arrangeSelectionDepartmentName',
        row.department[this.newDep].departmentName
      )
      this.$bus.$emit(
        'arrangeSelectiondepartmentId',
        row.department[this.newDep].id
      )
    }
  },
  created() {
    //一面数据发送请求，初始页面渲染
    let url = 'api/interview-arrangement/info/like'
    let params = {
      admissionId: sessionStorage['homeAdmissionId'],
      round: this.round
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
        this.$message.error('获取表格信息失败！')
      })
  }
}
</script>

<style scoped>
.dingwei {
  margin-top: 20px;
  display: flex;
  justify-content: left;
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
