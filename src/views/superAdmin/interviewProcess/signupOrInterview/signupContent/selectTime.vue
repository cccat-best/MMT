<template>
  <div class="time-content">
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
          value-format="yyyy-MM-dd hh:mm:ss"
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
      value1: ''
    }
  },
  methods: {
    ...mapMutations('problem', ['updateTime']),
    packge() {
      this.updateTime(this.value1)
    }
  }
}
</script>

<style lang="less" scoped>
.time-content {
  .time-title {
    margin-top: 10px;
    color: #838383;
    display: flex;
    flex-direction: column;
    .title-main {
      display: flex;
      font-size: 30px;
      color: #838383;
    }
    .title-in {
      margin-top: 20px;
      margin-left: 30px;
      display: flex;
      font-size: 16px;
    }
  }
  .block {
    width: 660px;
    margin-top: 10px;
    margin-left: 30px;
    display: flex;
    .time-select {
      height: 100%;
      width: 100%;
      margin-top: 60px;
    }
  }
}
</style>
