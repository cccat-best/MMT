<template>
  <div class="bigLeft">
    <!-- 面试次序 -->
    <div class="dingwei">
      <div>
        <div class="btn-group" @click="pdBtn" style="border-radius: 40%">
          <button type="button" class="btn btn1 btn0" ref="btn1" autofocus>
            一面
          </button>
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
          tables.slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
        :header-cell-style="{ 'text-align': 'center' }"
        height="50%"
        border
        ref="table"
        style="
          width: 600px;
          border-radius: 8px;
          box-shadow: 2px 2px 4px 2px #e5e9f2;
        "
        :row-style="{ height: 0 + 'px' }"
        :cell-style="{ padding: 0 + 'px', 'text-align': 'center' }"
      >
        <el-table-column label="" width="50">
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
          width="60"
          type="index"
          :index="indexMethod"
        >
        </el-table-column>
        <el-table-column prop="studentId" label="学号" width="100">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="80"> </el-table-column>
        <el-table-column prop="class" label="班级" width="100">
        </el-table-column>
        <el-table-column prop="departmentName" label="面试部门" width="110">
        </el-table-column>
        <el-table-column prop="status" label="通知状态" witch="80">
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
      order: '',
      pagesize: 10,
      currentPage: 1,
      total: 11,
      search: '',
      multipleSelection: [],
      radio: '',
      tableData: [
        {
          studentId: 20220001,
          name: '卢小1',
          class: '大数据1班',
          departmentName: '学生事务中心',
          status: '已通知'
        },
        {
          studentId: 20220002,
          name: '卢小2',
          class: '大数据1班',
          departmentName: '学生事务中心',
          status: '已通知'
        },
        {
          studentId: 20220003,
          name: '卢小3',
          class: '大数据1班',
          departmentName: '学生事务中心',
          status: '已通知'
        },
        {
          studentId: 20220004,
          name: '卢小4',
          class: '大数据1班',
          departmentName: '学生事务中心',
          status: '已通知'
        },
        {
          studentId: 20220005,
          name: '卢小5',
          class: '大数据1班',
          departmentName: '学生事务中心',
          status: '已通知'
        },
        {
          studentId: 20220006,
          name: '卢小6',
          class: '大数据1班',
          departmentName: '学生事务中心',
          status: '已通知'
        },
        {
          studentId: 20220007,
          name: '卢小7',
          class: '大数据1班',
          departmentName: '学生事务中心',
          status: '已通知'
        },
        {
          studentId: 20220008,
          name: '卢小8',
          class: '大数据1班',
          departmentName: '学生事务中心',
          status: '已通知'
        },
        {
          studentId: 20220009,
          name: '卢小9',
          class: '大数据1班',
          departmentName: '学生事务中心',
          status: '已通知'
        },
        {
          studentId: 20220010,
          name: '卢小10',
          class: '大数据1班',
          departmentName: '学生事务中心',
          status: '已通知'
        },
        {
          studentId: 20220011,
          name: '卢小11',
          class: '大数据1班',
          departmentName: '学生事务中心',
          status: '未通知'
        }
      ]
    }
  },
  watch: {
    search() {
      console.log(this.$refs.table)
      // this.total = this.$refs.table.data.length
    }
  },
  computed: {
    // 模糊搜索
    tables: function () {
      this.currentPage = 1
      const search = this.search
      if (search) {
        // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
        return this.tableData.filter((data) => {
          // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
          // 如果没有满足条件的元素，则返回false。
          return Object.keys(data).some((key) => {
            // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
            // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
            return String(data[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }
      return this.tableData
    }
  },
  methods: {
    indexMethod(index) {
      return (this.currentPage - 1) * this.pagesize + index + 1
    },
    current_change(currentPage) {
      this.currentPage = currentPage
    },
    pdBtn() {
      var btn0 = document.activeElement
      btn0.classList.add('btn0')
      if (btn0 == this.$refs.btn1) {
        this.$refs.btn2.classList.remove('btn0')
        this.$refs.btn3.classList.remove('btn0')
        this.order = '一面'

        //一面数据发送请求
        let url = '/interview-arrangement/info/like'
        let params = {
          admissionId: 20212803
        }
        this.$http
          .get(url, params)
          .then((response) => {
            // console.log(response)
            this.tableData = []
            this.total = response.data.data.total
            this.student0 = response.data.data.infoBackParamList
            for (let i = 0; i < this.total; i++) {
              this.tableData.push({
                key: i.toString(),
                studentId: ` ${this.student0[i].studentId}`,
                name: ` ${this.student0[i].studentName}`,
                class: ` ${this.student0[i].className}`,
                departmentName: ` ${this.student0[i].departmentName}`,
                status: ` ${this.student0[i].status}`
              })
            }
          })
          .catch((error) => {
            console.log(error)
          })
      }
      if (btn0 == this.$refs.btn2) {
        this.$refs.btn1.classList.remove('btn0')
        this.$refs.btn3.classList.remove('btn0')
        this.order = '二面'

        //二面数据发送请求
        let url = '/interview-arrangement/info/like'
        let params = {
          admissionId: 20212803,
          round: 2
        }
        this.$http
          .get(url, params)
          .then((response) => {
            // console.log(response)
            this.tableData = []
            this.total = response.data.data.total
            this.student0 = response.data.data.infoBackParamList
            for (let i = 0; i < this.total; i++) {
              this.tableData.push({
                key: i.toString(),
                studentId: ` ${this.student0[i].studentId}`,
                name: ` ${this.student0[i].studentName}`,
                class: ` ${this.student0[i].className}`,
                departmentName: ` ${this.student0[i].departmentName}`,
                status: ` ${this.student0[i].status}`
              })
            }
          })
          .catch((error) => {
            console.log(error)
          })
      }
      if (btn0 == this.$refs.btn3) {
        this.$refs.btn1.classList.remove('btn0')
        this.$refs.btn2.classList.remove('btn0')
        this.order = '三面'

        //三面数据发送请求
        let url = '/interview-arrangement/info/like'
        let params = {
          admissionId: 20212803,
          round: 3
        }
        this.$http
          .get(url, params)
          .then((response) => {
            // console.log(response)
            this.tableData = []
            this.total = response.data.data.total
            this.student0 = response.data.data.infoBackParamList
            for (let i = 0; i < this.total; i++) {
              this.tableData.push({
                key: i.toString(),
                studentId: ` ${this.student0[i].studentId}`,
                name: ` ${this.student0[i].studentName}`,
                class: ` ${this.student0[i].className}`,
                departmentName: ` ${this.student0[i].departmentName}`,
                status: ` ${this.student0[i].status}`
              })
            }
          })
          .catch((error) => {
            console.log(error)
          })
      }
      this.$bus.$emit('order', this.order)
    },
    getCurrentRow(row) {
      this.$bus.$emit('selectionName', row.name)
      this.$bus.$emit('selectionStudentId', row.studentId)
      this.$bus.$emit('selectiondepartmentName', row.departmentName)
    }
  }
  // created() {
  //   //一面数据发送请求，初始页面渲染
  //   let url = '/interview-arrangement/info/like'
  //   let params = {
  //     admissionId: 20212803
  //   }
  //   this.$http
  //     .get(url, params)
  //     .then((response) => {
  //       // console.log(response)
  //       this.tableData = []
  //       this.total = response.data.data.total
  //       this.student0 = response.data.data.infoBackParamList
  //       for (let i = 0; i < this.total; i++) {
  //         this.tableData.push({
  //           key: i.toString(),
  //           studentId: ` ${this.student0[i].studentId}`,
  //           name: ` ${this.student0[i].studentName}`,
  //           class: ` ${this.student0[i].className}`,
  //           departmentName: ` ${this.student0[i].departmentName}`,
  //           status: ` ${this.student0[i].status}`
  //         })
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // }
}
</script>

<style scoped>
.bigLeft {
  position: relative;
  height: 100%;
}
.dingwei {
  margin-top: 40px;
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
  border-radius: 40% 0 0 40%;
  border-right: 0;
}
.btn3 {
  border-radius: 0 40% 40% 0;
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
