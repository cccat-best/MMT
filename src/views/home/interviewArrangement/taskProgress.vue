<template>
  <div class="dingwei">
    <!-- 环形图 -->
    <div class="figure">
      <!-- 当percentage为0,时控制台会报错,加上  v-if = "percentage",就不会有错误,但页面也不会有空进度条 -->
      <el-progress
        type="circle"
        :height="160"
        :width="160"
        :percentage="percentage"
        :format="format"
        style="box-shadow: 1px 1px 3px 1px #e5e9f2; border-radius: 50%"
      ></el-progress>
    </div>
    <div>已通知/总人数：{{ done }} / {{ total }}</div>
  </div>
</template>

<script>
export default {
  name: 'taskProgress',
  data() {
    return {
      round: 1,
      done: 0,
      total: 0,
      percentage: 0
    }
  },
  methods: {
    format() {
      if (this.total == 0) {
        this.percentage = 0
      } else {
        this.percentage = (this.done / this.total) * 100
      }
      return `任务进度条`
    }
  },
  watch: {
    round() {
      let url = 'api/interview-arrangement/data'
      let params = {
        admissionId: sessionStorage['homeAdmissionId'],
        round: this.round
      }
      this.$http
        .get(url, params)
        .then((response) => {
          // console.log(response)
          if (response.data.code == '00000') {
            this.total = response.data.data.totalStu
            this.done = response.data.data.informedStu
          } else {
            this.$message.error(response.data.message)
          }
        })
        .catch((error) => {
          console.log(error)
          this.$message.error('获取进度条信息失败！')
        })
    }
  },
  created() {
    this.$bus.$on('arrangeOrder', (data) => {
      let that = this
      if (data == '一面') {
        that.round = 1
      } else if (data == '二面') {
        that.round = 2
      } else if (data == '三面') {
        that.round = 3
      }
    })
    //任务进度表发送请求，初始页面渲染
    let url = 'api/interview-arrangement/data'
    let params = {
      admissionId: sessionStorage['homeAdmissionId'],
      round: this.round
    }
    this.$http
      .get(url, params)
      .then((response) => {
        // console.log(response)
        if (response.data.code == '00000') {
          this.total = response.data.data.totalStu
          this.done = response.data.data.informedStu
        } else {
          this.$message.error(response.data.message)
        }
      })
      .catch((error) => {
        console.log(error)
        this.$message.error('获取进度条信息失败！')
      })
  },
  beforeDestroy() {
    this.$bus.$off('arrangeOrder')
  }
}
</script>
<style scoped>
.dingwei {
  width: 100%;
  height: 40%;
  margin-bottom: 4%;
  background-color: white;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.figure {
  margin-bottom: 20px;
}
</style>
