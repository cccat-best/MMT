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
      <selectTime
        :allQues="allQues"
        v-show="showactive == 1"
        ref="time"
      ></selectTime>
      <baseQues
        :allQues="allQues"
        v-show="showactive == 3"
        ref="base"
      ></baseQues>
      <sectionQues
        :allQues="allQues"
        v-show="showactive == 4"
        ref="section"
      ></sectionQues>
      <synth :allQues="allQues" v-show="showactive == 5"></synth>
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
      showactive: 1,
      allQues: {}
    }
  },
  methods: {
    //最后一页点击取消回到第一页
    cancel() {
      this.showactive = 1
    },
    // 检测用户是否设置过问题
    getQues() {
      const organizationId = sessionStorage.getItem('loginOrganizationId')
      this.$http
        .get(`api/organization/interview/sign?organizationId=${organizationId}`)
        .then((res) => {
          // 只有00000 才是设置过问题 没有直接退出
          if (res.data.code != '00000') return
          this.allQues = res.data.data
        })
        .catch((err) => {
          console.log(err)
        })
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
  },
  mounted() {
    this.getQues()
  }
}
</script>
<style lang="less" scoped>
.main {
  // height: 100vh;
  overflow: hidden;
  width: calc(100vw - 200px - 40px);
  min-height: 450px;
  min-width: 1200px;
  line-height: normal;
  height: calc(100vh - 60px - 40px - 25px - 70px);
  display: flex;
  .left {
    height: 450px;
    margin-top: 30px;
    margin-left: 25px;
    width: 183px;
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
        border-left: 4px solid #2e98f9 !important;
        color: #63afe2;
      }
      .special {
        color: black;
        cursor: default !important;
      }
      .active-sp {
        color: #2e98f9;
        border-left: 4px solid #a3a3a3;
      }
    }
  }
  .right {
    width: 82%;
    /* 滚动条 */
    background-color: #fff;
    min-height: 438px;
    min-width: 817px;
    height: calc(100vh - 60px - 40px - 25px - 70px - 30px);
    margin-top: 12px;
    -webkit-overflow-scrolling: touch;
    overflow-y: auto;
    white-space: nowrap;
  }
}
</style>
