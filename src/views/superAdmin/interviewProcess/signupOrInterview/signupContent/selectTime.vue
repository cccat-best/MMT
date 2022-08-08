<template>
  <div class="time-content">
    <div class="organize-show">{{ organizeShow }}</div>
    <div class="time-title">
      <div class="title-main">报名时间</div>
      <div class="title-in">
        根据自身情况来设置报名开始时间和停止时间（结束时间尚未确定可以填一个相对靠后的时间）
      </div>
    </div>
    <div class="timer">
      <div class="block">
        <el-date-picker
          v-model="value1"
          type="datetimerange"
          range-separator="--"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          class="time-select"
          value-format="yyyy-MM-dd HH:mm:ss"
        >
        </el-date-picker>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      value1: [],
      organizeShow: '科技协会第一次纳新'
    }
  },
  methods: {
    ...mapMutations('problem', ['updateTime']),
    packge() {
      this.updateTime(this.value1)
    }
  },
  props: ['allQues'],
  watch: {
    // 如果用户设置过时间 展示
    allQues(newV) {
      if(newV.startTime != '') {
        let timeTemp = []
      timeTemp[0] = newV.startTime
      timeTemp[1] = newV.endTime
      this.value1 = timeTemp
      this.updateTime(timeTemp)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.time-content {
  margin-top: 25px;
  .time-title {
    margin-top: 10px;
    color: #838383;
    display: flex;
    flex-direction: column;
    .title-main {
      display: flex;
      font-size: 28px;
      color: #838383;
      margin-left: 30px;
      margin-top: 20px;
      margin-bottom: 7px;
    }
    .title-in {
      margin-top: 20px;
      margin-left: 30px;
      display: flex;
      font-size: 18px;
    }
  }
  .organize-show {
    margin: 10px 0;
    display: flex;
    align-items: center;
    font-size: 30px;
    color: #838383;
  }
  .block {
    width: 660px;
    margin-top: 10px;
    margin-left: 30px;
    display: flex;
    .time-select {
      height: 100%;
      width: 100%;
      margin-top: 40px;
    }
  }
}
</style>
