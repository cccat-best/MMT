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
              v-if="isSuper"
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
              v-if="isSuper"
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
                        <el-dropdown-item command="学生创新创业实践中心"
                          >学生创新创业实践中心</el-dropdown-item
                        >
                        <el-dropdown-item command="b" divided
                          >学生会</el-dropdown-item
                        >
                        <el-dropdown-item command="c" divided
                          >团委</el-dropdown-item
                        >
                        <el-dropdown-item command="d" divided
                          >党建办</el-dropdown-item
                        >
                        <el-dropdown-item command="e" divided
                          >学生事务服务中心</el-dropdown-item
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
// 这里的bus是我为了从个人中心页面传值到home页面写的一个vue实例
import bus from '../../compentents/bus'
import axios from 'axios'
import myLayoutVue from '../../compentents/myLayout.vue'
export default {
  name: 'home',

  components: {
    myLayoutVue
  },
  data() {
    return {
      isSuper: true,

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
      studentId: '20212403',
      name: '古河渚',

      organizations: [
        { id: '2', name: '学生创新创业实践中心' },
        { id: '3', name: '学生会' }
      ],

      loginOrganizationName: '学生创新创业实践中心',
      loginOrganizationId: '',
      permission: '',
      cookie: '',
      organizationName: '',
      organizationId: '',
      // isSuper: false,
      isPersonal: false
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    goBack() {
      console.log('go back')
    },
    changePass(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const url = '/account/revise/password'
          this.$http
            .post(url, this.pwdForm)
            .then((res) => {
              console.log(res.message)
            })
            .catch((err) => {
              console.log(err, '密码错误')
            })
        } else {
          alert('验证不通过')
          return false
        }
      })
    },
    changePhone(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const url = '/account/revise/phone'
          this.$http
            .post(url, this.phoneForm)
            .then((res) => {
              console.log(res.message)
            })
            .catch((err) => {
              console.log(err, '手机号错误')
            })
        } else {
          alert('验证不通过')
          return false
        }
      })
    },
    joinClub(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const url = '/invitation-code/club'
          this.$http
            .post(url, this.jmoForm)
            .then((res) => {
              console.log(res.message)
            })
            .catch((err) => {
              console.log(err, '邀请码错误')
            })
        } else {
          alert('验证不通过')
          return false
        }
      })
    },
    changeOrganization(command) {
      alert(command)
      axios({
        method: 'post',
        baseURL: 'https://mmt-dev.sipcoj.com',
        url: '/login/change',
        data: command,
        headers: {
          'content-type': 'application/json'
        }
      }).then((val) => {
        this.loginOrganizationName = val.data.data.loginOrganizationName
        this.loginOrganizationId = val.data.data.loginOrganizationId
        this.organizations = val.data.data.organizations
        this.permission = val.data.data.permission
        this.phoneForm.phone = val.data.data.phone
        this.name = val.data.data.name
      })
    },
    quitLogin() {
      alert('按下退出登录')
      axios({
        method: 'delete',
        baseURL: 'https://mmt-dev.sipcoj.com',
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
        this.$router.push('/home/personalInfo')
      }
    },
    // 个人中心顶部左侧返回的实现，还没想到咋实现
    gotoBack() {
      console.log('go back')
    }
  },
  created() {
    if (this.permission == 'superAdmin') {
      this.isSuper = true
    }
    bus.$on('pass', (data) => {
      this.isPersonal = data.isPersonal
      this.isSuper = data.isSuper
      console.log(this.isPersonal)
    })
  }
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  width: 100%;
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
</style>
