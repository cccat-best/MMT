<template>
  <div>
    <el-container class="home-container">
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <div class="aside-title">MMT</div>
        <div
          :class="['aside-item', asideShow == 1 ? 'asideactive' : '']"
          @click="asideShow = 1"
        >
          <i class="el-icon-s-home aside-item-icon"></i>
          面试面板
        </div>
        <div
          :class="['aside-item', asideShow == 2 ? 'asideactive' : '']"
          @click="asideShow = 2"
        >
          <i class="el-icon-picture aside-item-icon"></i>
          宣传信息设置
        </div>
        <div
          :class="['aside-item', asideShow == 3 ? 'asideactive' : '']"
          @click="
            asideShow = 3
            gotoPross()
          "
        >
          <i class="el-icon-takeaway-box aside-item-icon"></i>
          面试流程设置
        </div>
        <div
          :class="['aside-item', asideShow == 4 ? 'asideactive' : '']"
          @click="
            asideShow = 4
            goAccountManage()
          "
        >
          <i class="el-icon-s-custom aside-item-icon"></i>
          <!-- 待完善 -->
          组织管理
        </div>
      </el-aside>
      <el-container>
        <!-- 头部 -->
        <el-header>
          <div class="header-left">
            <i class="el-icon-s-unfold"></i>
            科技协会
          </div>
          <div class="header-right">
            <i class="el-icon-s-fold"></i>
            退出超级管理
          </div>
        </el-header>
        <!-- 主体 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //控制侧边栏激活样式
      asideShow: 1
    }
  },
  methods: {
    gotoPross() {
      this.$router.push({
        path: '/process'
      })
    },
    goAccountManage() {
      this.$router.push({ path: '/superAdmin/accountManage' })
    }
  }
}
</script>
<style lang="less" scoped>
.el-header {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(253, 255, 254);
  border-bottom: 1px solid #efefef;
}
.home-container {
  height: 100vh;
}
.el-aside {
  background-color: rgb(40, 48, 57);
  text-align: center;
  display: flex;
  flex-direction: column;
  .aside-title {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 18px;
    text-align: center;
    height: 60px;
  }
  .aside-item {
    cursor: pointer;
    display: flex;
    // justify-content: center;
    align-items: center;
    font-size: 14px;
    text-align: center;
    height: 40px;
    color: rgb(148, 151, 161);
    padding-top: 5px;
    padding-left: 15px;
    .aside-item-icon {
      padding-right: 10px;
    }
  }
  .asideactive {
    color: rgb(225, 120, 52);
    background-color: rgb(62, 68, 76);
  }
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
body > .el-container {
  margin-bottom: 40px;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}
.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
