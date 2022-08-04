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
        <el-tabs v-model="activeName">
          <!-- 报名页 -->
          <el-tab-pane label="报名" name="first" class="body"
            ><signup></signup
          ></el-tab-pane>
          <!-- 1-4面 -->
          <el-tab-pane
            label="一面"
            name="second"
            class="body"
            v-if="roundCount >= 1"
            ><interview round="1"></interview
          ></el-tab-pane>
          <el-tab-pane
            label="二面"
            name="third"
            class="body"
            v-if="roundCount >= 2"
            ><interview round="2"></interview
          ></el-tab-pane>
          <el-tab-pane
            label="三面"
            name="fourth"
            class="body"
            v-if="roundCount >= 3"
            ><interview round="3"></interview
          ></el-tab-pane>
          <el-tab-pane
            label="四面"
            name="fiveth"
            class="body"
            v-if="roundCount >= 4"
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
          <el-button
            type="primary"
            plain
            style="margin-left: 20px"
            @click="changeRound"
            >确定</el-button
          >
          <el-button slot="reference">选择面试总数</el-button>
        </el-popover>
      </div>
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
      num: 0,
      roundCount: 0
    }
  },
  components: { signup, interview },
  methods: {
    // 切换次导航触发事件
    // handleClick(tab, event) {
    //   console.log(tab, event)
    // },
    changeRound() {
      let obj = {
        organizationId: sessionStorage.getItem('loginOrganizationId'),
        rounds: this.num
      }
      this.$http
        .post('api/organization/interview/round', obj)
        .then(() => {
          this.getRound()
        })
        .catch((err) => err)
      //重新获取面试轮数
      // setTimeout(() => {
      //   this.getRound()
      // },1000)
      // this.roundCount = this.num
    },
    //得到几面
    async getRound() {
      const organizationId = sessionStorage.getItem('loginOrganizationId')
      const { data: res } = await this.$http
        .get(
          `api/organization/interview/round?organizationId=${organizationId}`
        )
        .catch((err) => err)
      // 判断是否拿到请求信息
      if (res.code != '00000') return this.$message.error(res.message)
      if (res.data.round === null) {
        this.roundCount = 0
      } else {
        this.roundCount = res.data.round
      }
    }
  },
  mounted() {
    this.getRound()
  }
}
</script>

<style lang="less" scoped>
.content {
  overflow: hidden;
  position: relative;
  height: calc(100vh - 60px - 50px);
  min-height: 550px;
  min-width: 1200px;
  width: calc(100vw - 200px - 40px);
  margin: 0 auto;

  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }

  ::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    //background-color: #8c8c8c;
    background-color: rgba(0, 0, 0, 0.25);
  }

  ::-webkit-scrollbar-track {
    background-color: #f6f6f6;
  }
  ::-webkit-scrollbar-thumb,
  ::-webkit-scrollbar-track {
    border: 0;
  }

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
    height: calc(100vh - 60px - 40px - 25px);
    width: calc(100vw - 200px - 40px);
    min-width: 1200px;
    margin-top: 5px;
    .nav {
      width: 100%;
      height: 70px;
      background-color: white;
      min-width: 1000px;
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
        width: 200px;
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
      left: 88%;
      background-color: white;
      height: 60px;
      line-height: 60px;
    }
    .body {
      // width: 1250px;
      width: calc(100vw - 200px - 40px);
      min-height: 450px;
      min-width: 1200px;
      height: calc(100vh - 60px - 40px - 25px - 70px);
      background-color: white;
    }
  }
}
</style>
