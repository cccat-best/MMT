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
          <div
            class="leftTop"
            style="height: 20px; overflow: hidden; margin-left: 20px"
          >
            {{ loginOrganizationName }}
          </div>
          <div class="rightTop" style="display: flex">
            <img
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
              >超级管理
            </el-button>
            <div class="block" style="height: 35px; overflow: hidden">
              <el-avatar
                :size="35"
                :src="circleUrl"
                style="vertical-align: middle"
              ></el-avatar>
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
      isSuper: true
    }
  },
  methods: {
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
    }
  },
  created() {}
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
</style>
