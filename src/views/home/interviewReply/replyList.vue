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
          label="通知状态"
          width="100"
          :filters="[
            { text: '通过', value: 4 },
            { text: '失败', value: 2 },
            { text: '待定', value: 1 }
          ]"
          column-key="status"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
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
        <el-row> <b>通知状态:&nbsp;&nbsp;</b>{{ pd(detal.status) }} </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'replyList',
  data() {
    return {
      centerDialogVisible: false,
      detal: {},
      pagesize: 10,
      currentPage: 1,
      total: 11,
      multipleSelection: [],
      search: '',
      information: [
        {
          studentId: 20220001,
          name: '卢小1',
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
              score: 80
            },
            {
              questionName: '专业能力',
              score: 90
            }
          ],
          totalScore: 85,
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
    },
    //排序
    sortChange(column) {
      console.log('column', column)
      console.log(column.prop)
      console.log(column.order)
      // ascending 升序
    },
    filterChange(filters) {
      let status = filters.status
      const sum = eval(status.join('+'))
      console.log(sum)
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
      this.$bus.$emit('selectionName', selectionName)
      this.$bus.$emit('selectionStudentId', selectionStudentId)
    },
    resume(row) {
      this.detal = row
      this.centerDialogVisible = true
    }
  },
  created() {},
  computed: {}
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
