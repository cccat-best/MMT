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
            <i class="el-icon-s-unfold"></i>
            科技协会
          </div>
          <div class="header-right">
            <i class="el-icon-s-fold"></i>
            退出超级管理
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
          pagePath: '/superAdmin/interviewTable',
          title: '面试面板'
        },
        {
          iconClass: 'el-icon-picture',
          id: '2',
          pagePath: '/superAdmin/informationSet',
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
      ]
    }
  },
  created() {
    // 解决defaultActiveItem 刷新问题
    if (this.$route.path === '/superAdmin/interviewTable')
      this.defaultActiveItem = '1'
    if (this.$route.path === '/superAdmin/informationSet')
      this.defaultActiveItem = '2'
    if (this.$route.path === '/superAdmin/process') this.defaultActiveItem = '3'
    if (this.$route.path === '/superAdmin/accountManage')
      this.defaultActiveItem = '4'
  },
  methods:{
    getCookie() {
      this.$http.post('/login/b',{
studentId:"20200002",
password:"123456"
})
      .then((res)=>{
        console.log('cookie',res);
      })
      .catch((err) =>{
        console.log(err);
      })
    }
  },
  mounted() {
    this.getCookie()
  },
}
</script>

<style lang="less" scoped>
.super-content {
  min-width: 900px;
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
  }
  /deep/.el-menu-item {
    display: flex;
    align-items: center;
  }
}
</style>
