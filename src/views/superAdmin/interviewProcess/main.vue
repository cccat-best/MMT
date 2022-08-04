<template>
  <div class="content">
    <!-- 面试管理栏 -->
    <div class="top-content">
      <i class="el-icon-takeaway-box top-content-icon"></i>
      面试管理
    </div>
    <!-- 主题区域 -->
    <div class="main-content">
      <!-- 导航区（一面二面。。） -->
      <div class="nav">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="报名" name="first" class="body"
            ><signup></signup
          ></el-tab-pane>
          <el-tab-pane label="一面" name="second" class="body" v-if="true"
            ><interview round="1"></interview
          ></el-tab-pane>
          <el-tab-pane label="二面" name="third" class="body" v-if="true"
            ><interview round="2"></interview
          ></el-tab-pane>
          <el-tab-pane label="三面" name="fourth" class="body" v-if="true"
            ><interview round="3"></interview
          ></el-tab-pane>
          <el-tab-pane label="四面" name="fifth" class="body" v-if="true"
            ><interview round="4"></interview
          ></el-tab-pane>
        </el-tabs>
        <el-popover
          placement="bottom"
          width="280"
          trigger="click"
          class="select"
        >
          <el-input-number
            v-model="num"
            :min="1"
            :max="4"
            label="描述文字"
          ></el-input-number>
          <el-button type="primary" plain style="margin-left: 20px"
            >确定</el-button
          >
          <el-button slot="reference">选择面试总数</el-button>
        </el-popover>
      </div>

      <!-- 导航内容 -->
      <!-- <div class="body">
        <router-view></router-view>
      </div> -->
    </div>
  </div>
</template>

<script>
import signup from './signupOrInterview/signup.vue'
import interview from './signupOrInterview/interview.vue'
export default {
  data() {
    return {
      // 次导航选中的
      activeName: 'first',
      //计数器的数字
      num: 1
    }
  },
  components: { signup, interview },
  methods: {
    // 切换次导航触发事件
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  position: relative;
  height: 620px;
  // overflow: hidden;
  width: 1250px;
  min-width: 900px;
  //background-color: #3e6a96;
  // margin-left: 26px;
  margin: 0 auto;
  .top-content {
    display: flex;
    height: 25px;
    margin-left: 15px;
    line-height: 25px;
    font-size: 20px;
    color: #f57d2d;
    background-color: #e9eef3;
    .top-content-icon {
      margin-top: 2px;
      margin-right: 7px;
    }
    .top-title {
      text-align: center;
      font-size: 20px;
      color: orange;
    }
  }
  .main-content {
    // height: 115%;
    // width: 100%;
    // background-color: rgb(206, 127, 127);
    // border: 2px solid #969698;
    height: 595px;
    // overflow: hidden;
    width: 1250px;
    margin-top: 5px;
    .nav {
      width: 100%;
      height: 70px;
      background-color: white;
      // border-bottom: 2px solid rgb(100, 43, 43);

      /deep/.el-tabs__nav {
        line-height: 80px;
        height: 70px;
        width: 1100px;
        margin-left: 0px;
        // background-color: rgb(144, 63, 63);
        // text-align: left;
        // font-size: 40px;
        border-bottom: 1px solid #e4e7ed;
      }
      /deep/.el-tabs__item {
        font-size: 20px;
        width: 220px;
        text-align: center;
      }
      /deep/.el-tabs__active-bar {
        background-color: transparent !important;
      }
      /deep/.el-tabs__header {
        margin: 0 0 0 0;
      }
    }
    .select {
      position: absolute;
      top: 45px;
      left: 1110px;
      background-color: white;
      height: 60px;
      line-height: 60px;
    }
    .body {
      width: 1250px;
      height: 525px;
      background-color: white;
    }
  }
}
</style>
