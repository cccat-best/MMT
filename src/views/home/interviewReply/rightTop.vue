<template>
  <div class="rightTop">
    <div class="above" @click="resultInform">
      <i class="el-icon-s-promotion"></i>
      <div class="rightText">面试结果发送</div>
    </div>
    <div class="below">
      <div class="belowTop" @click="centerDialogVisible = true">
        <i class="el-icon-document-copy"></i>
        <div class="rightText">批量操作</div>
      </div>
      <div class="search">
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="input"
          size="mini"
          style="width: 75%"
        >
        </el-input>
      </div>
    </div>
    <el-dialog
      title="批量操作"
      :visible.sync="centerDialogVisible"
      width="350px"
      center
    >
      <el-select v-model="value" placeholder="请选择通过状态">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'rightTop',
  data() {
    return {
      departmentId: 0,
      roomId: 0,
      departmentName: '',
      centerDialogVisible: false,
      input: '',
      selectionStudentId: [],
      options: [
        {
          value: 2,
          label: '通过'
        },
        {
          value: 1,
          label: '失败'
        },
        {
          value: 3,
          label: '待定'
        }
      ],
      value: 2
    }
  },
  methods: {
    //更改通过状态
    submit() {
      this.centerDialogVisible = false
      let changeForm = {
        studentId: this.selectionStudentId,
        status: this.value
      }
      // console.log(changeForm)
      const url1 = 'api/interview-reply/status'
      let post3 = this.$http.post(url1, changeForm)
      post3
        .then((res) => {
          console.log(res)
          location.reload()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    resultInform() {
      //指定跳转地址
      this.$router.push('/home/resultInform')
    }
  },
  mounted() {
    this.$bus.$on('selectionStudentId', (data) => {
      this.selectionStudentId = data
    })
  },
  beforeDestroy() {
    this.$bus.$off('selectionStudentId')
  },
  watch: {
    input() {
      this.$bus.$emit('input', this.input)
    }
  }
}
</script>

<style scoped>
.rightTop {
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.above {
  width: 100%;
  height: 40%;
  background-color: white;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: left;
  cursor: pointer;
}
.el-icon-document-copy,
.el-icon-s-promotion {
  margin-left: 40px;
}
.below {
  width: 100%;
  height: 54%;
  background-color: white;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.belowTop {
  width: 100%;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: left;
  cursor: pointer;
}
.rightText {
  margin-left: 12px;
  font-size: 14px;
}
.above:hover {
  color: #409eff;
}
.belowTop:hover {
  color: #409eff;
}
.search {
  width: 100%;
}
:deep(.el-dialog .el-dialog__body) {
  display: flex;
  justify-content: center;
  align-items: center;
}
:deep(.el-dialog) {
  border-radius: 15px;
}
</style>
