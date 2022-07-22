<template>
  <div>
    <div class="figure">
      <el-progress
        type="circle"
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
      percentage: ''
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
