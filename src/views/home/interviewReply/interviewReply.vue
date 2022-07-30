<template>
  <div class="bbig">
    <div class="big">
      <div class="top">
        <filterFigure></filterFigure>
        <rightTop></rightTop>
      </div>
      <div class="bottom">
        <replyList></replyList>
      </div>
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
.bbig {
  display: flex;
  justify-content: center;
}
.big {
  height: 100%;
  width: 1260px;
}
.top {
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 25px;
}
.bottom {
  width: 100%;
  height: 350px;
}
</style>
