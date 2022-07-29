<template>
  <div class="big">
    <div class="left">
      <!-- 面试次序和主体数据 -->
      <personList></personList>
    </div>
    <div class="right">
      <!-- 任务进度表 -->
      <taskProgress></taskProgress>
      <!-- 面试通知 -->
      <interviewNotice></interviewNotice>
    </div>
  </div>
</template>

<script>
import personList from './personList.vue'
import taskProgress from './taskProgress.vue'
import interviewNotice from './interviewNotice.vue'

export default {
  name: 'arrangement',
  components: {
    personList,
    taskProgress,
    interviewNotice
  }
}
</script>

<style scoped>
.big {
  height: 600px;
  width: 1260px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.right {
  height: 100%;
  margin-left: 50px;
  margin-bottom: 20px;
}
</style>
