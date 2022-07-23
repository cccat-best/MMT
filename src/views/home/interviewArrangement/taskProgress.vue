<template>
  <div>
    <!-- 环形图 -->
    <div class="figure">
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
      done: 388,
      total: 500,
      percentage: 0
    }
  },
  methods: {
    format() {
      this.percentage = (this.done * 100) / this.total
      return `任务进度条`
    }
  }
}
</script>
<style scoped>
.figure {
  margin-bottom: 20px;
}
</style>
