<template>
  <div class="big">
    <!-- 面试次序和主体数据 -->
    <personList></personList>
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
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.right {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
</style>
