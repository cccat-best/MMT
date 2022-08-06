<template>
  <div class="home">
    <my-layout-vue
      :isCollapse="isCollapse"
      ref="layout"
      :asideWidth="asideWidth"
      :menuItemList="menuList"
      menuItemColor="#fff"
      meunItemActiveColor="#0187fb"
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
import axios from 'axios'
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
      isCollapse: false,
      asideWidth: 200,
      menuList: [
        {
          index: '/home',
          iconClass: '',
          id: '1',
          title: '面试总看板',
          pagePath: '/home/interviewMain'
        },
        {
          index: '/home',
          iconClass: '',
          id: '2',
          title: '数据看板',
          pagePath: '/home'
        },
        {
          index: '/home/arrangement',
          iconClass: '',
          id: '3',
          title: '面试安排',
          pagePath: '/home/arrangement'
        },
        {
          index: '/home',
          iconClass: '',
          id: '4',
          title: '实时面试',
          pagePath: '/home'
        },
        {
          index: '/home/reply',
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
      studentId: '',
      name: '',
      organizations: [],
      loginOrganizationName: '',
      loginOrganizationId: '',
      permission: '',
      cookie: '',
      organizationName: '',
      organizationId: '',
      isSuper: false,
      isPersonal: false,
      phoneForm: {
        phone: '',
        newPhone: ''
      }
    }
  },
  async created() {
    await this.getLoginStatus()
    if (this.permission == 'super_admin') {
      this.isSuper = true
    }
  },
  methods: {
    update(newValue) {
      this.loginOrganizationName = newValue
    },
    async getLoginStatus() {
      const url = '/api/login-status'
      try {
        let { data: res } = await this.$http.get(url)
        switch (res.code) {
          case '00000': {
            let { data } = res
            this.loginOrganizationName = data.loginOrganizationName
            this.organizationId = data.loginOrganizationId
            this.organizations = data.organizations
            this.permission = data.permission
            this.phone = data.phone
            this.name = data.name
            this.studentId = data.studentId
            break
          }
          default: {
            throw new Error(JSON.stringify(res))
          }
        }
      } catch (err) {
        console.log('出错了', err.message)
        this.$message.error('当前未登录或登录已失效')
      }
    },
    changeOrganization(command) {
      const organization = {
        organization: command
      }
      const url = '/api/login/change'
      this.$http.post(url, organization).then((res) => {
        this.loginOrganizationName = res.data.data.loginOrganizationName
        this.loginOrganizationId = res.data.data.loginOrganizationId
        this.organizations = res.data.data.organizations
        this.permission = res.data.data.permission
        this.phoneForm.phone = res.data.data.phone
        this.name = res.data.data.name
        this.studentId = res.data.data.studentId
        sessionStorage.setItem(
          'loginOrganizationName',
          this.loginOrganizationName
        )
      })
    },

    quitLogin() {
      axios({
        method: 'delete',
        baseURL: 'http://114.132.71.147:38080',
        url: '/logout',
        headers: {
          'content-type': 'application/json'
        }
      }).then((val) => {
        alert(val.data.data.message)
      })
    },
    superAdmin() {
      this.$router.push('/superAdmin')
    },
    home() {
      if (this.isPersonal) {
        location.reload()
      } else {
        this.$router.push('/personalInfo')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;
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
</style>
