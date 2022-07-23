<template>
  <div class="bigLeft">
    <!-- 面试次序 -->
    <div class="dingwei">
      <div>
        <div class="interviewOrder">
          <button class="btn btn1">一面</button>
          <button class="btn btn2">二面</button>
          <button class="btn btn3">三面</button>
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
      <template>
        <el-table
          :data="
            tableData.slice(
              (currentPage - 1) * pagesize,
              currentPage * pagesize
            )
          "
          height="50%"
          border
          style="width: 600px"
          :row-style="{ height: 0 + 'px' }"
          :cell-style="{ padding: 0 + 'px' }"
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
          <el-table-column prop="name" label="姓名" width="80">
          </el-table-column>
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
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'personList',
  data() {
    return {
      pagesize: 10,
      currentPage: 1,
      total: 100,
      tableData: [
        {
          // id: 1,
          xuehao: 20220000,
          name: '卢小布',
          class: '大数据1班',
          bumen: '学生事务中心',
          status: '已通知'
        },
        {
          // id: 1,
          xuehao: 20220000,
          name: '卢小布',
          class: '大数据1班',
          bumen: '学生事务中心',
          status: '已通知'
        },
        {
          // id: 1,
          xuehao: 20220000,
          name: '卢小布',
          class: '大数据1班',
          bumen: '学生事务中心',
          status: '已通知'
        },
        {
          // id: 1,
          xuehao: 20220000,
          name: '卢小布',
          class: '大数据1班',
          bumen: '学生事务中心',
          status: '已通知'
        },
        {
          // id: 1,
          xuehao: 20220000,
          name: '卢小布',
          class: '大数据1班',
          bumen: '学生事务中心',
          status: '已通知'
        },
        {
          // id: 1,
          xuehao: 20220000,
          name: '卢小布',
          class: '大数据1班',
          bumen: '学生事务中心',
          status: '已通知'
        },
        {
          // id: 1,
          xuehao: 20220000,
          name: '卢小布',
          class: '大数据1班',
          bumen: '学生事务中心',
          status: '已通知'
        },
        {
          // id: 1,
          xuehao: 20220000,
          name: '卢小布',
          class: '大数据1班',
          bumen: '学生事务中心',
          status: '已通知'
        },
        {
          // id: 1,
          xuehao: 20220000,
          name: '卢小布',
          class: '大数据1班',
          bumen: '学生事务中心',
          status: '已通知'
        },
        {
          // id: 1,
          xuehao: 20220000,
          name: '卢小布',
          class: '大数据1班',
          bumen: '学生事务中心',
          status: '已通知'
        },
        {
          // id: 1,
          xuehao: 20220000,
          name: '卢小布',
          class: '大数据1班',
          bumen: '学生事务中心',
          status: '已通知'
        }
      ],
      search: '',
      multipleSelection: []
    }
  },
  methods: {
    indexMethod(index) {
      return (this.currentPage - 1) * this.pagesize + index + 1
    },
    current_change(currentPage) {
      this.currentPage = currentPage
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
  margin-top: 30px;
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
}

.btn:focus {
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
