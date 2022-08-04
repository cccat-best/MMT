<template>
  <div class="home">
    <my-layout-vue
      :isCollapse="isCollapse"
      ref="layout"
      :asideWidth="asideWidth"
      :menuItemList="menuList"
    >
      <template slot="header">
        <el-row
          type="flex"
          align="middle"
          justify="space-between"
          style="height: 100%; overflow: hidden"
        >
          <!-- 应江哥要求，个人中心页面需要加上顶部左上角的返回键，所以个人中心页面传了一个isPersonal的参数来判断是否是个人中心页面，通过这个参数来展示不同的顶部 -->
          <div
            v-if="!isPersonal"
            class="leftTop"
            style="height: 20px; overflow: hidden; margin-left: 20px"
          >
            {{ loginOrganizationName }}
          </div>
          <el-page-header
            v-if="isPersonal"
            @back="goBack"
            :content="this.loginOrganizationName"
            class="back-botton"
          >
          </el-page-header>
          <!-- 应江哥要求，顶部的超级管理按钮和icon只在有superadmin权限的账号显示，所以个人中心传了一个issuper来判断是否显示超级管理 -->
          <!-- 不过我感觉这个工作应该让登录进去后的第一个页面来做，似乎个人中心不是登录后的第一个页面？ -->
          <div class="rightTop" style="display: flex">
            <img
              v-if="permission === 'super_admin'"
              src="./icon/admin.png"
              alt=""
              style="height: 30px; width: 30px"
            />
            <el-button
              class="color-change"
              type="text"
              @click="superAdmin"
              style="
                color: black;
                margin-right: 30px;
                height: 40px;
                overflow: hidden;
              "
              @mouseover="this.style.color = blue"
              v-if="permission === 'super_admin'"
              >超级管理
            </el-button>
            <!-- 应江哥要求，其他页面点击头像进入个人中心，而个人中心点击头像刷新页面，home函数实现 -->
            <div class="block" style="height: 35px; overflow: hidden">
              <span @click="home"
                ><el-avatar
                  :size="35"
                  :src="circleUrl"
                  style="vertical-align: middle"
                  :click="home"
                ></el-avatar
              ></span>
              <el-dropdown trigger="click">
                <span
                  class="el-dropdown-link"
                  style="
                    color: black;
                    margin-left: 10px;
                    cursor: pointer;
                    height: 40px;
                    overflow: hidden;
                    margin-right: 10px;
                  "
                >
                  {{ name }}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <div style="text-align: center">
                    <el-avatar
                      :size="50"
                      :src="circleUrl"
                      style="vertical-align: middle"
                    ></el-avatar>

                    <div
                      style="font-size: 10px; margin-top: 10px; height: 20px"
                    >
                      {{ loginOrganizationName }}
                    </div>
                  </div>

                  <el-dropdown-item divided>
                    <el-dropdown
                      @command="changeOrganization"
                      style="width: 140px"
                    >
                      <span class="el-dropdown-link">
                        切换社团<i
                          class="el-icon-arrow-down el-icon--right"
                        ></i>
                      </span>
                      <!-- 贺节介建议这里的下拉框改成向左拉开，不过我不会 -->
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                          style="width: 140px"
                          :command="item.name"
                          v-for="(item, index) in organizations"
                          :key="index"
                          divided
                          >{{ item.name }}</el-dropdown-item
                        >
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-dropdown-item>

                  <el-dropdown-item divided>
                    <el-button
                      type="text"
                      @click="quitLogin"
                      class="el-dropdown-link"
                      style="padding: 0px; margin: 0px"
                      >退出登录</el-button
                    >
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </el-row>
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
export default {
  name: 'home',

  components: {
    myLayoutVue
  },
  data() {
    return {
      isCollapse: false,
      asideWidth: 200,
      menuList: [
        {
          iconClass: '',
          id: '1',
          title: '面试总看板',
          pagePath: '/home'
        },
        {
          iconClass: '',
          id: '2',
          title: '数据看板',
          pagePath: '/home'
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
          pagePath: '/home'
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
  methods: {
    getLoginStatus() {
      const url = '/api/login-status'
      this.$http
        .get(url)
        .then((res) => {
          this.loginOrganizationName = res.data.data.loginOrganizationName
          this.loginOrganizationId = res.data.data.loginOrganizationId
          this.organizations = res.data.data.organizations
          this.permission = res.data.data.permission
          this.phone = res.data.data.phone
          this.name = res.data.data.name
          this.studentId = res.data.data.studentId
        })
        .catch((err) => {
          console.log(err)
        })
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
      this.$router.push('/personalInfo')
    }
  },
  created() {
    this.getLoginStatus()
    if (this.permission == 'super_admin') {
      this.isSuper = true
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
.el-dropdown-link {
  cursor: pointer;
  color: black;
}
:deep(.el-menu-item .iconfont) {
  width: 0px;
}
.back-botton {
  color: black;
  ::v-deep .el-page-header__title {
    font-size: 14px;
    font-weight: 500;
    color: black;
    &:hover {
      color: #409eff !important;
    }
  }
  ::v-deep .el-icon-back {
    &:hover {
      color: #409eff !important;
    }
  }
}
</style>
