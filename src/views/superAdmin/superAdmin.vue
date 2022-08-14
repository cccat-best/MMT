<template>
  <div class="super-content">
    <layout
      :menuItemList="menuItemList"
      asideBgColor="#282e38"
      menuItemColor="#a4a6aa"
      meunItemActiveColor="#f57d2d"
      :defaultActiveItem="defaultActiveItem"
    >
      <!-- 侧边栏标题 -->
      <div slot="asideTitle" class="aside-title">MMT</div>
      <!-- 头部 -->
      <template slot="header">
        <div class="header">
          <div class="header-left">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="25"
              height="25"
              style="
                border-color: rgba(187, 187, 187, 1);
                border-width: 0px;
                border-style: solid;
              "
              filter="none"
            >
              <g>
                <rect
                  width="48"
                  height="48"
                  fill="rgba(16.065,16.065,16.065,1)"
                  fill-opacity="0.01"
                  stroke="none"
                ></rect>
                <path
                  d="M8 10.5H40"
                  stroke="rgba(16.065,16.065,16.065,1)"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  fill="none"
                ></path>
                <path
                  d="M24 19.5H40"
                  stroke="rgba(16.065,16.065,16.065,1)"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  fill="none"
                ></path>
                <path
                  d="M24 28.5H40"
                  stroke="rgba(16.065,16.065,16.065,1)"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  fill="none"
                ></path>
                <path
                  d="M8 37.5H40"
                  stroke="rgba(16.065,16.065,16.065,1)"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  fill="none"
                ></path>
                <path
                  d="M8 19L16 24L8 29V19Z"
                  fill="none"
                  stroke="rgba(16.065,16.065,16.065,1)"
                  stroke-width="4"
                  stroke-linejoin="round"
                ></path>
              </g>
            </svg>
            <span class="header-tip-left">{{ organizationName }}</span>
          </div>
          <div class="header-right" @click="exitAdmin">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              width="25"
              height="25"
              style="
                border-color: rgba(187, 187, 187, 1);
                border-width: 0px;
                border-style: solid;
              "
              filter="none"
            >
              <g>
                <path
                  d="M14 26h-6v-20h10v-2h-12v24h12v-2h-2z"
                  fill="rgba(16.065,16.065,16.065,1)"
                ></path>
                <path
                  d="M22.8 9.2l-1.6 1.6 4.4 4.2h-13.6v2h13.6l-4.4 4.2 1.6 1.6 6.6-6.8z"
                  fill="rgba(16.065,16.065,16.065,1)"
                ></path>
              </g>
            </svg>
            <span class="header-tip-right">退出超级管理</span>
          </div>
        </div>
      </template>
      <!-- 主体 -->
      <template slot="main">
        <router-view></router-view>
      </template>
    </layout>
  </div>
</template>

<script>
import layout from '@/compentents/myLayout.vue'
export default {
  components: { layout },
  data() {
    return {
      defaultActiveItem: '1',
      menuItemList: [
        {
          iconClass: 'el-icon-s-home',
          id: '1',
          pagePath: '/superAdmin/interviewMain',
          title: '面试面板'
        },
        {
          iconClass: 'el-icon-picture',
          id: '2',
          pagePath: '/superAdmin/informationSet/informationSetSaved',
          title: '宣传信息设置'
        },
        {
          iconClass: 'el-icon-takeaway-box',
          id: '3',
          pagePath: '/superAdmin/process',
          title: '面试流程设置'
        },
        {
          iconClass: 'el-icon-s-custom',
          id: '4',
          pagePath: '/superAdmin/accountManage',
          title: '组织管理'
        }
      ],
      // 展示组织名
      organizationName: sessionStorage.getItem('loginOrganizationName')
    }
  },
  created() {
    // 解决defaultActiveItem 刷新问题
    if (this.$route.path === '/superAdmin/interviewMain')
      this.defaultActiveItem = '1'
    if (this.$route.path === '/superAdmin/informationSet/informationSetSaved')
      this.defaultActiveItem = '2'
    if (this.$route.path === '/superAdmin/process') this.defaultActiveItem = '3'
    if (this.$route.path === '/superAdmin/accountManage')
      this.defaultActiveItem = '4'
  },
  methods: {
    // 退出超级管理
    exitAdmin() {
      //弹窗判断
      this.$confirm('是否确认退出？', '退出', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$router.push('/home')
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          })
        })
    }
  },
  watch: {
    //解决直接在地址栏输入链接跳转 菜单栏激活位置不对问题
    // 监控路由变化
    $route(to) {
      if (to.path === '/superAdmin/interviewTable') this.defaultActiveItem = '1'
      if (to.path === '/superAdmin/informationSet/informationSetSaved')
        this.defaultActiveItem = '2'
      if (to.path === '/superAdmin/process') this.defaultActiveItem = '3'
      if (to.path === '/superAdmin/accountManage') this.defaultActiveItem = '4'
    }
  }
}
</script>

<style lang="less" scoped>
.super-content {
  min-width: 1200px;
  height: 100%;
  .aside-title {
    color: white;
    height: 65px;
    width: 200px;
    text-align: center;
    line-height: 65px;
    font-size: 20px;
  }
  .header {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgb(253, 255, 254);
    font-size: 16px;
    .header-left {
      display: flex;
      align-items: center;
      .header-tip-left {
        margin-left: 10px;
        line-height: 10px;
        font-size: 19px;
      }
    }
    .header-right {
      display: flex;
      align-items: center;
      .header-tip-right {
        margin-left: 10px;
        line-height: 10px;
        font-size: 17px;
      }
      &:hover {
        cursor: pointer;
        color: #4159fd;
      }
    }
  }
  /deep/.el-menu-item {
    display: flex;
    align-items: center;
  }
}
</style>
