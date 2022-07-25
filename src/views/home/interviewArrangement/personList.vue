<template>
  <div class="bigLeft">
    <!-- 面试次序 -->
    <div class="dingwei">
      <div>
        <div class="interviewOrder" @click="pdBtn">
          <button class="btn btn1" ref="btn1" autofocus>一面</button>
          <button class="btn btn2" ref="btn2">二面</button>
          <button class="btn btn3" ref="btn3">三面</button>
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
        >
        </el-input>
      </div>
      <el-table
        :data="
          tables.slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
        height="50%"
        border
        style="width: 600px; border-radius: 8px"
        :row-style="{ height: 0 + 'px' }"
        :cell-style="{ padding: 0 + 'px' }"
        @selection-change="selectionLineChangeHandle"
      >
        >
        <el-table-column type="selection" width="50" />
        <el-table-column
          prop="id"
          label="ID"
          width="60"
          type="index"
          :index="indexMethod"
        >
        </el-table-column>
        <el-table-column prop="xuehao" label="学号" width="100">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="80"> </el-table-column>
        <el-table-column prop="class" label="班级" width="100">
        </el-table-column>
        <el-table-column prop="bumen" label="面试部门" width="110">
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
      selectionLine: [],
      tableData: [
        {
          xuehao: 20220001,
          name: '卢小1',
          class: '大数据1班',
          bumen: '学生事务中心',
          status: '已通知'
        },
        {
          xuehao: 20220002,
          name: '卢小2',
          class: '大数据1班',
          bumen: '学生事务中心',
          status: '已通知'
        },
        {
          xuehao: 20220003,
          name: '卢小3',
          class: '大数据1班',
          bumen: '学生事务中心',
          status: '已通知'
        },
        {
          xuehao: 20220004,
          name: '卢小4',
          class: '大数据1班',
          bumen: '学生事务中心',
          status: '已通知'
        },
        {
          xuehao: 20220005,
          name: '卢小5',
          class: '大数据1班',
          bumen: '学生事务中心',
          status: '已通知'
        },
        {
          xuehao: 20220006,
          name: '卢小6',
          class: '大数据1班',
          bumen: '学生事务中心',
          status: '已通知'
        },
        {
          xuehao: 20220007,
          name: '卢小7',
          class: '大数据1班',
          bumen: '学生事务中心',
          status: '已通知'
        },
        {
          xuehao: 20220008,
          name: '卢小8',
          class: '大数据1班',
          bumen: '学生事务中心',
          status: '已通知'
        },
        {
          xuehao: 20220009,
          name: '卢小9',
          class: '大数据1班',
          bumen: '学生事务中心',
          status: '已通知'
        },
        {
          xuehao: 20220010,
          name: '卢小10',
          class: '大数据1班',
          bumen: '学生事务中心',
          status: '已通知'
        },
        {
          xuehao: 20220011,
          name: '卢小11',
          class: '大数据1班',
          bumen: '学生事务中心',
          status: '未通知'
        }
      ]
    }
  },
  computed: {
    // 模糊搜索
    tables: function () {
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
      if (document.activeElement == this.$refs.btn1) {
        this.order = '一面'
      }
      if (document.activeElement == this.$refs.btn2) {
        this.order = '二面'
      }
      if (document.activeElement == this.$refs.btn3) {
        this.order = '三面'
      }
      this.$bus.$emit('order', this.order)
    },
    selectionLineChangeHandle(val) {
      this.selectionLine = val
      var length = this.selectionLine.length
      this.$bus.$emit('selectionName', this.selectionLine[length - 1].name)
      this.$bus.$emit('selectionBumen', this.selectionLine[length - 1].bumen)
    }
  }
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

.btn:focus {
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
