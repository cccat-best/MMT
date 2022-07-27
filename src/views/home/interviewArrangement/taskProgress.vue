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
      done: 10,
      total: 11,
      percentage: 0
    }
  },
  methods: {
    format() {
      this.percentage = (this.done / this.total) * 100
      return `任务进度条`
    }
  },

  //任务进度表发送请求，初始页面渲染
  created() {
    let url = '/interview-arrangement/data'
    let params = {
      admissionId: 20212803
    }
    this.$http
      .get(url, params)
      .then((response) => {
        console.log(response)
        this.total = response.data.data.totalStu
        this.done = response.data.data.informedStu
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>
<style scoped>
.figure {
  margin-bottom: 20px;
}
.dingwei {
  margin-top: 40px;
}
</style>
