<template>
  <div class="big">
    <div class="top">
      <filterFigure></filterFigure>
      <rightTop></rightTop>
    </div>
    <div class="bottom">
      <replyList></replyList>
    </div>
  </div>
</template>

<script>
import filterFigure from './filterFigure.vue'
import rightTop from './rightTop.vue'
import replyList from './replyList.vue'

export default {
  name: 'reply',
  components: {
    filterFigure,
    rightTop,
    replyList
  }
}
</script>

<style scoped>
.big {
  height: 100%;
  width: 100%;
  min-width: 1000px;
  min-height: 600px;
}
.top {
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 17px;
}
.bottom {
  width: 100%;
  height: 59%;
  background-color: white;
  border-radius: 10px;
}
</style>
