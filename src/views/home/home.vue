<template>
  <div class="home">
    <my-layout-vue
      :isCollapse="isCollapse"
      ref="layout"
      :asideWidth="asideWidth"
      :menuItemList="menuList"
      menuItemColor="#fff"
      meunItemActiveColor="#0187fb"
      :defaultActiveItem="defaultActiveItem"
    >
      <template slot="header">
        <myhead
          :isPersonal="isPersonal"
          :isSuper="isSuper"
          :name="name"
          :organizations="organizations"
          :loginOrganizationName="loginOrganizationName"
          v-on:update="update"
        ></myhead>
      </template>
      <template slot="asideTitle">
        <div class="menuTitle">MMT</div>
      </template>
      <template slot="main">
        <router-view></router-view>
      </template>
    </my-layout-vue>
  </div>
</template>

<script>
import myLayoutVue from '../../compentents/myLayout.vue'
import myhead from '../../compentents/head.vue'
export default {
  name: 'home',
  components: {
    myLayoutVue,
    myhead
  },
  data() {
    return {
      defaultActiveItem: '1',
      isCollapse: false,
      asideWidth: 200,
      menuList: [
        {
          iconClass: '',
          id: '1',
          title: '面试总看板',
          pagePath: '/home/interviewMain'
        },
        {
          iconClass: '',
          id: '2',
          title: '数据看板',
          pagePath: '/home/dataBoard'
        },
        {
          iconClass: '',
          id: '3',
          title: '面试安排',
          pagePath: '/home/arrangement'
        },
        {
          iconClass: '',
          id: '4',
          title: '实时面试',
          pagePath: '/home/onInterviewing'
        },
        {
          iconClass: '',
          id: '5',
          title: '面试复盘',
          pagePath: '/home/reply'
        }
      ],
      circleUrl:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      squareUrl:
        'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
      sizeList: ['large', 'medium', 'small'],
      name: '',
      organizations: [],
      loginOrganizationName: '',
      permission: '',
      isSuper: false,
      isPersonal: false
    }
  },
  async created() {
    await this.getLoginStatus()
    if (this.permission == 'super_admin') {
      this.isSuper = true
    }
    this.loginOrganizationName = sessionStorage.getItem('loginOrganizationName')
  },
  mounted() {
    // 解决defaultActiveItem 刷新问题
    if (this.$route.path == '/home/interviewMain') this.defaultActiveItem = '1'
    if (this.$route.path == '/home/dataBoard') this.defaultActiveItem = '2'
    if (this.$route.path == '/home/arrangement') this.defaultActiveItem = '3'
    if (this.$route.path == '/home/onInterviewing') this.defaultActiveItem = '4'
    if (this.$route.path == '/home/reply') this.defaultActiveItem = '5'
    if (this.$route.path == '/home/resultInform') this.defaultActiveItem = '5'
    let url = 'api/organization/interview/id-all'
    let params = {
      organizationId: sessionStorage['loginOrganizationId']
    }
    this.$http
      .get(url, params)
      .then((response) => {
        // console.log(response)
        sessionStorage['homeAdmissionId'] =
          response.data.data.admissionIdList[0].admissionId
      })
      .catch((error) => {
        console.log(error)
      })
  },
  methods: {
    update(newValue) {
      this.loginOrganizationName = newValue
    },
    async getLoginStatus() {
      const url = 'api/login-status'
      try {
        let { data: res } = await this.$http.get(url)
        switch (res.code) {
          case '00000': {
            let { data } = res
            this.loginOrganizationName = data.loginOrganizationName
            this.organizations = data.organizations
            this.permission = data.permission
            this.name = data.name
            break
          }
          default: {
            // this.$message.error(res.message)
            throw new Error(JSON.stringify(res))
          }
        }
      } catch (err) {
        console.log('出错了', err.message)
        this.$message.error('当前未登录或登录已失效')
      }
    }
  },
  watch: {
    //解决直接在地址栏输入链接跳转 菜单栏激活位置不对问题
    // 监控路由变化
    $route(to) {
      if (to.path == '/home/interviewMain') this.defaultActiveItem = '1'
      if (to.path == '/home/dataBoard') this.defaultActiveItem = '2'
      if (to.path == '/home/arrangement') this.defaultActiveItem = '3'
      if (to.path == '/home/onInterviewing') this.defaultActiveItem = '4'
      if (to.path == '/home/reply') this.defaultActiveItem = '5'
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  height: 100vh;
}
.menuTitle {
  color: white;
  font-size: 28px;
  height: 60px;
  line-height: 60px;
  text-align: center;
}
.color-change:hover {
  color: #409eff !important;
}
.el-dropdown-link:hover {
  color: #409eff !important;
}
:deep(.el-menu-item .iconfont) {
  width: 0px;
}
.el-dropdown-link:hover {
  color: #409eff !important;
}
.el-dropdown-link {
  cursor: pointer;
  color: black;
}
:deep(.el-menu-item .iconfont) {
  width: 0px;
}
.el-dropdown-link {
  cursor: pointer;
  color: black;
}

:deep(.el-menu-item .iconfont) {
  width: 0px;
}
:deep(.el-menu) {
  text-align: left;
}
</style>
