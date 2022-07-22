<template>
  <div class="big">
    <personList></personList>
    <div class="right">
      <taskProgress></taskProgress>
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
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.right {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
</style>
