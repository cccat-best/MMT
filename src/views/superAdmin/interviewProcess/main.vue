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
        <div
          :class="['common-nav', showactive == 1 ? 'active' : '']"
          @click="
            showactive = 1
            gotoSign()
          "
        >
          报名
        </div>

        <div
          :class="['common-nav', showactive == 2 ? 'active' : '']"
          @click="
            showactive = 2
            gotoInterview1()
          "
        >
          一面
        </div>

        <div
          :class="['common-nav', showactive == 3 ? 'active' : '']"
          @click="
            showactive = 3
            gotoInterview2()
          "
        >
          二面
        </div>

        <div
          :class="['common-nav', showactive == 4 ? 'active' : '']"
          @click="
            showactive = 4
            gotoInterview3()
          "
          v-show="changePage >= 3"
        >
          三面
          <!-- 删除按钮 -->
          <i
            :class="['el-icon-remove', 'icon-remove']"
            @click="removeInterviewPage3"
          ></i>
        </div>

        <div
          :class="['common-nav', showactive == 5 ? 'active' : '']"
          @click="
            showactive = 5
            gotoInterview4()
          "
          v-show="changePage === 4"
        >
          四面
          <!-- 删除按钮 -->
          <i
            :class="['el-icon-remove', 'icon-remove']"
            @click="removeInterviewPage4"
          ></i>
        </div>

        <!-- 添加面试按钮 -->
        <div class="add" @click="changePage++" v-if="changePage < 4">+</div>
      </div>
      <!-- 导航内容 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showactive: 1,
      changePage: 3,
      tabPosition: 'left',
      //当第四轮面试存在不允许删除第三轮
      isDelpage3: true
    }
  },
  methods: {
    //是否删除面试
    removeInterviewPage3() {
      if (confirm('确认要删除此轮面试吗') && this.isDelpage3) {
        this.changePage--
        this.showactive--
        console.log(this.showactive)
      }
    },
    removeInterviewPage4() {
      if (confirm('确认要删除此轮面试吗')) {
        this.changePage--
        this.showactive--
        console.log(this.showactive)
      }
    },
    //导航切换
    gotoSign() {
      this.$router.push({
        path: '/signup'
      })
    },
    gotoInterview1() {
      this.$router.push({
        path: '/interview1'
      })
    },
    gotoInterview2() {
      this.$router.push({
        path: '/interview2'
      })
    },
    gotoInterview3() {
      this.$router.push({
        path: '/interview3'
      })
    },
    gotoInterview4() {
      this.$router.push({
        path: '/interview4'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  // height: 100%;
  overflow: hidden;
  // width: 100%;
  background-color: #e9eef3;
  .top-content {
    display: flex;
    height: 30px;
    margin-left: 15px;
    padding-top: 5px;
    line-height: 14px;
    color: #f57d2d;
    .top-content-icon {
      margin-right: 10px;
    }
    .top-title {
      text-align: center;
      font-size: 14px;
      color: orange;
    }
  }
  .main-content {
    height: 115%;
    width: 100%;
    background-color: white;
    border: 2px solid #969698;

    margin-top: 5px;

    .nav {
      width: 100%;
      height: 70px;
      background-color: #efefefc4;
      border-bottom: 1px solid black;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 14px;
      .active {
        color: #86c1f9;
        border-top: 2px solid #7cbdf9;
      }
      .common-nav {
        height: 100%;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 70px;
        position: relative;
        cursor: pointer;
        .icon-remove {
          position: absolute;
          top: 17px;
          right: 7px;
          color: #3080ff;
        }
      }
      .add {
        font-size: 25px;
        color: #5a5858;
      }
    }
  }
}
</style>
