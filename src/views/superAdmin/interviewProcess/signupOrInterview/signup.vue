<template>
  <div class="main">
    <div class="left">
      <div class="nav-title">
        <div
          :class="['nav-title-item', showactive == 1 ? 'active' : '']"
          @click="showactive = 1"
        >
          报名时间
        </div>
        <div
          :class="[
            'nav-title-item',
            'special',
            showactive > 2 ? 'active-sp' : ''
          ]"
        >
          报名表问题
        </div>
        <div
          :class="['nav-title-item', showactive == 3 ? 'active' : '']"
          @click="showactive = 3"
        >
          基本问题
        </div>
        <div
          :class="['nav-title-item', showactive == 4 ? 'active' : '']"
          @click="showactive = 4"
        >
          部门问题
        </div>
        <div
          :class="['nav-title-item', showactive == 5 ? 'active' : '']"
          @click="showactive = 5"
        >
          综合问题
        </div>
      </div>
    </div>
    <div class="right">
      <!-- 根据选择渲染组件 -->
      <selectTime v-show="showactive == 1" ref="time"></selectTime>
      <baseQues v-show="showactive == 3" ref="base"></baseQues>
      <sectionQues v-show="showactive == 4" ref="section"></sectionQues>
      <synth v-show="showactive == 5"></synth>
    </div>
  </div>
</template>
<script>
import baseQues from './signupContent/baseQuestion.vue'
import selectTime from './signupContent/selectTime.vue'
import synth from './signupContent/synthesisProblem.vue'
import sectionQues from './signupContent/sectoralissues.vue'
export default {
  components: { selectTime, baseQues, synth, sectionQues },
  data() {
    return {
      showactive: 1
    }
  },
  methods: {
    //最后一页点击取消回到第一页
    cancel() {
      this.showactive = 1
    }
  },
  watch: {
    //四个问题切换时 会暂存用户设置
    showactive(newv, oldv) {
      if (oldv == 1) {
        this.$refs.time.packge()
      }
      if (oldv == 3) {
        this.$refs.base.packgeBaseQue()
      }
      if (oldv == 4) {
        this.$refs.section.packgeSectionQue()
      }
    }
  }
}
</script>
<style lang="less" scoped>
.main {
  overflow: hidden;
  min-height: 600px;
  line-height: normal;
  padding-top: 50px;
  padding-left: 20px;
  height: 100%;
  width: 100%;
  display: flex;
  .left {
    margin-top: 10px;
    margin-left: 20px;
    width: 18%;
    .nav-title {
      display: flex;
      flex-direction: column;
      text-align: center;
      .nav-title-item {
        width: 100px;
        height: 30px;
        text-align: center;
        padding-bottom: 10px;
        border-left: 4px solid #a3a3a3;
        color: #a3a3a3;
        display: flex;
        align-items: center;
        padding-left: 10px;
        cursor: pointer;
      }
      .active {
        border-left: 4px solid #63afe2 !important;
        color: #63afe2;
      }
      .special {
        color: black;
        cursor: default !important;
      }
      .active-sp {
        color: #85c4ff;
        border-left: 4px solid #a3a3a3;
      }
    }
  }
  .right {
    width: 70%;
  }
}
</style>
