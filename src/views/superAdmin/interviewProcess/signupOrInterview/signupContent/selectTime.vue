<template>
  <div class="time-content">
    <div class="time-title">
      <div class="title-main">
        <div class="title-main-left">报名时间</div>
        <!-- 编辑模式按钮 -->
        <div class="title-main-right" @click="changeEdit" v-show="!isEdit">
          <i class="el-icon-edit"></i>编辑页面
        </div>
      </div>
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
          @change="changeEditTime"
          :picker-options="pickerOptions"
          :disabled="!isEdit"
        >
        </el-date-picker>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {
      value1: [],
      // 不能选择过去时间
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7 //如果没有后面的-8.64e7就是不可以选择今天的
        }
      }
    }
  },
  methods: {
    ...mapMutations('problem', ['updateTime', 'updateIsEdit']),
    // packge() {
    //   this.updateTime(this.value1)
    // },
    changeEdit() {
      this.updateIsEdit()
      return this.$message.success('编辑模式')
    },
    changeEditTime() {
      // if (this.value1.length === 0) return
      // this.isEdit = false
      // return this.$message('非编辑模式')
      this.updateTime(this.value1)
    }
  },
  props: ['allQues'],
  watch: {
    // 如果用户设置过时间 展示
    allQues(newV) {
      if (newV.startTime != '') {
        let timeTemp = []
        timeTemp[0] = newV.startTime
        timeTemp[1] = newV.endTime
        this.value1 = timeTemp
        this.updateTime(timeTemp)
      }
    }
  },
  computed: {
    ...mapState('problem', ['isEdit'])
  }
}
</script>

<style lang="less" scoped>
.time-content {
  margin-top: 18px;
  margin-bottom: 50px;
  .time-title {
    margin-top: 10px;
    color: #989898;
    display: flex;
    flex-direction: column;
    .title-main {
      display: flex;
      justify-content: space-between;
      .title-main-left {
        font-size: 30px;
        color: #989898;
      }
      .title-main-right {
        cursor: pointer;
        color: #67b5fe;
        font-size: 20px;
        margin-right: 40px;
      }
    }
    .title-in {
      margin-top: 20px;
      margin-left: 30px;
      display: flex;
      font-size: 18px;
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
      margin-top: 30px;
      margin-bottom: 30px;
    }
  }
}
</style>
