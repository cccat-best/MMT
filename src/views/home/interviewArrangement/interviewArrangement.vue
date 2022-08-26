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
  height: 100%;
  width: 100%;
  min-width: 1270px;
  min-height: 590px;
  display: flex;
  /* justify-content: center; */
  /* align-items: center; */
}
.left {
  padding-left: 3%;
  padding-right: 3%;
  width: 56%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 15px;
  margin-right: 1.5%;
}
.right {
  width: 42.5%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
