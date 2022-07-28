<template>
  <div class="homeWrap">
    <el-container class="main_container">
      <el-aside width="200px">
        <el-row class="tac">
          <el-col :span="24">
            <el-menu
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#282E38"
              text-color="#fff"
              active-text-color="#409eff"
            >
              <el-menu-item index="0">
                <span slot="title" style="font-size: 30px">MMT</span>
              </el-menu-item>
              <el-menu-item index="1">
                <!-- <i class="el-icon-house"></i> -->
                <span slot="title">面试总看板</span>
              </el-menu-item>
              <el-menu-item index="2">
                <!-- <i class="el-icon-picture"></i> -->
                <span slot="title">数据看板</span>
              </el-menu-item>
              <el-menu-item index="/arrangement">
                <!-- <i class="el-icon-takeaway-box"></i> -->
                <span slot="title">面试安排</span>
              </el-menu-item>
              <el-menu-item index="4">
                <!-- <i class="el-icon-user-solid"></i> -->
                <span slot="title">实时面试</span>
              </el-menu-item>
              <el-menu-item index="/reply">
                <!-- <i class="el-icon-user-solid"></i> -->
                <span slot="title">面试复盘</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <el-header>
          <el-row type="flex" align="middle" justify="space-between">
            <!-- <span style="color: black; font-size: 20px">{{
              loginOrganizationName
            }}</span> -->
            <el-page-header
              @back="goBack"
              :content="this.loginOrganizationName"
              class="back-botton"
            >
            </el-page-header>
            <svg
              t="1658546350823"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3304"
              width="30"
              height="30"
              style="margin-left: auto"
              v-if="isSuper"
            >
              <path
                d="M537.216 1003.776h-427.52c-27.072 0-52.8-11.456-70.592-31.296a76.352 76.352 0 0 1-19.904-58.88l-0.192-60.16a32 32 0 0 1 64 0v63.872c-0.384 5.44 0.576 8.832 3.968 12.608a30.656 30.656 0 0 0 22.72 9.856h427.52a32 32 0 0 1 0 64z"
                fill="#2c2c2c"
                p-id="3305"
              ></path>
              <path
                d="M50.752 934.144a32 32 0 0 1-32-32v-60.032a457.536 457.536 0 0 1 277.952-421.12 32.192 32.192 0 0 1 42.048 16.832 32.128 32.128 0 0 1-16.896 42.112 393.408 393.408 0 0 0-239.104 362.24v60.032a32 32 0 0 1-32 31.936z"
                fill="#2c2c2c"
                p-id="3306"
              ></path>
              <path
                d="M460.736 514.496a247.36 247.36 0 0 1-247.104-247.104A247.424 247.424 0 0 1 460.736 20.224a247.424 247.424 0 0 1 247.168 247.168 247.36 247.36 0 0 1-247.168 247.104z m0-430.272a183.36 183.36 0 0 0-183.104 183.168 183.296 183.296 0 0 0 183.104 183.104 183.36 183.36 0 0 0 183.168-183.104 183.36 183.36 0 0 0-183.168-183.168zM778.56 829.376c-42.944 0-77.888-34.944-77.888-77.888s34.944-77.888 77.888-77.888 77.888 34.944 77.888 77.888-34.944 77.888-77.888 77.888z m0-110.976a33.216 33.216 0 1 0 0.064 66.368 33.216 33.216 0 0 0-0.064-66.368z"
                fill="#2c2c2c"
                p-id="3307"
              ></path>
              <path
                d="M834.56 960.384a22.4 22.4 0 0 1-22.144-19.2 35.2 35.2 0 0 0-34.56-30.208c-17.152 0-32 12.864-34.624 30.016a22.272 22.272 0 0 1-28.736 17.984 217.536 217.536 0 0 1-84.352-49.344 22.4 22.4 0 0 1 1.28-33.728 35.136 35.136 0 0 0 8.32-44.864 35.84 35.84 0 0 0-42.88-15.04 22.4 22.4 0 0 1-29.76-15.936c-3.712-16.448-5.632-32.768-5.632-48.64s1.92-32.192 5.632-48.64a22.144 22.144 0 0 1 11.2-14.72 22.528 22.528 0 0 1 18.496-1.216 34.944 34.944 0 1 0 34.56-59.968 22.336 22.336 0 0 1-8.192-16.64 21.248 21.248 0 0 1 6.976-16.96 217.472 217.472 0 0 1 84.352-49.28 22.4 22.4 0 0 1 28.672 18.048 35.328 35.328 0 0 0 34.624 29.952 35.2 35.2 0 0 0 34.56-30.208 22.4 22.4 0 0 1 28.608-18.304 217.6 217.6 0 0 1 85.248 49.088 22.336 22.336 0 0 1-1.472 34.048 34.88 34.88 0 0 0-8.896 45.056 35.84 35.84 0 0 0 43.776 14.784 22.592 22.592 0 0 1 30.208 15.552 214.336 214.336 0 0 1 0 98.816 22.592 22.592 0 0 1-30.336 15.552 35.456 35.456 0 0 0-43.648 14.72 35.008 35.008 0 0 0 8.96 45.184 22.4 22.4 0 0 1 1.408 34.048 218.368 218.368 0 0 1-85.312 49.024 19.584 19.584 0 0 1-6.336 1.024z m-56.768-94.144c30.144 0 57.024 17.216 70.592 42.752 10.624-4.736 20.864-10.624 30.528-17.536a79.232 79.232 0 0 1-1.728-82.56 81.024 81.024 0 0 1 72.832-39.744 164.16 164.16 0 0 0 0-35.264 81.28 81.28 0 0 1-72.768-39.68 80.128 80.128 0 0 1 1.792-82.496 166.336 166.336 0 0 0-30.656-17.664c-13.504 25.6-40.448 42.816-70.592 42.816-29.824 0-56.64-17.024-70.336-42.304a179.072 179.072 0 0 0-30.336 17.792c15.104 24.384 16.256 55.68 1.28 81.792-14.528 25.216-43.008 42.432-71.296 39.872a147.776 147.776 0 0 0 0 35.008 83.84 83.84 0 0 1 71.296 39.744c15.04 26.24 13.888 57.536-1.216 81.92 9.472 6.976 19.648 12.928 30.336 17.792 13.696-25.216 40.512-42.24 70.272-42.24z"
                fill="#2c2c2c"
                p-id="3308"
              ></path>
            </svg>
            <el-button
              class="color-change"
              type="text"
              @click="superAdmin"
              style="color: black; margin-right: 10px"
              @mouseover="this.style.color = blue"
              v-if="isSuper"
              >超级管理</el-button
            >
            <div class="block" @click="home">
              <el-avatar
                :size="35"
                :src="circleUrl"
                style="vertical-align: middle"
              ></el-avatar>
              <el-dropdown :hide-timeout="1200">
                <span class="el-dropdown-link" style="color: black">
                  {{ name }}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <!-- <el-dropdown-item command="学生创新创业实践中心"
                    >学生创新创业实践中心</el-dropdown-item
                  >
                  <el-dropdown-item command="b">学生会</el-dropdown-item>
                  <el-dropdown-item command="c">团委</el-dropdown-item>
                  <el-dropdown-item command="d">党建办</el-dropdown-item>
                  <el-dropdown-item command="e"
                    >学生事务服务中心</el-dropdown-item
                  > -->
                  <div style="text-align: center">
                    <el-avatar
                      :size="50"
                      :src="circleUrl"
                      style="vertical-align: middle"
                    ></el-avatar>

                    <div style="font-size: 10px">
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
          </el-row>
        </el-header>
        <el-main>
          <div
            class="organization-info"
            style="text-align: left; margin-left: 20%"
          >
            <el-row>
              <el-col :span="24"
                ><div class="">
                  当前所在组织：{{ loginOrganizationName }}
                </div></el-col
              >
              <el-col :span="24"
                ><div class="">
                  已加入组织：
                  <span v-for="(item, index) in organizations" :key="index">
                    <el-tag
                      type="info"
                      style="
                        color: black;
                        background-color: #d7d7d7;
                        margin-right: 10px;
                      "
                      >{{ item.name }}</el-tag
                    >
                  </span>
                </div></el-col
              >
              <el-button
                type="primary"
                @click="dialogForm3Visible = true"
                style="margin-top: 10px"
                >加入更多组织</el-button
              >
            </el-row>
          </div>
          <el-divider></el-divider>
          <div class="personal-info" style="margin-left: 20%; text-align: left">
            <el-row>
              <el-col :span="24"
                ><el-row>
                  <el-col :span="6"><div class="">学号</div></el-col>
                  <el-col :span="6"
                    ><div class="">{{ studentId }}</div></el-col
                  >
                </el-row></el-col
              >
              <el-col :span="24"
                ><el-col :span="6"><div class="">真实姓名</div></el-col>
                <el-col :span="6"
                  ><div class="">{{ name }}</div></el-col
                ></el-col
              >
              <el-col :span="24"
                ><el-col :span="6"><div class="">手机号</div></el-col>
                <el-col :span="6"
                  ><div class="">{{ pwdForm.phone }}</div></el-col
                >
                <el-col :span="6"
                  ><div class="">
                    <el-button type="text" @click="dialogForm2Visible = true"
                      >修改手机号</el-button
                    >
                  </div></el-col
                ></el-col
              >
              <el-col :span="24"
                ><el-col :span="6"><div class="">密码</div></el-col>
                <el-col :span="6"
                  ><div class="">
                    <el-button type="text" @click="dialogForm1Visible = true"
                      >更改密码</el-button
                    >
                  </div></el-col
                ></el-col
              >
            </el-row>
          </div>

          <!-- 修改密码弹出框 -->
          <el-dialog title="更改密码" :visible.sync="dialogForm1Visible">
            <el-form :model="pwdForm" ref="pwdForm" :rules="rules1">
              <el-form-item label="原密码" prop="password">
                <el-input
                  type="password"
                  v-model="pwdForm.password"
                  autocomplete="off"
                ></el-input>
              </el-form-item>

              <el-form-item label="新密码" prop="newPassword">
                <el-input
                  type="password"
                  v-model="pwdForm.newPassword"
                  autocomplete="off"
                ></el-input>
              </el-form-item>

              <el-form-item label="确认密码" prop="confirmNewPassword">
                <el-input
                  type="password"
                  v-model="pwdForm.confirmNewPassword"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogForm1Visible = false">取 消</el-button>
              <el-button type="primary" @click="changePass('pwdForm')"
                >确 定</el-button
              >
            </div>
          </el-dialog>
          <!-- 更改手机号弹出框 -->
          <el-dialog title="修改手机号" :visible.sync="dialogForm2Visible">
            <el-form :model="phoneForm" ref="phoneForm" :rules="rules2">
              <el-form-item label="原手机号" prop="phone">
                <el-input
                  v-model="phoneForm.phone"
                  autocomplete="off"
                ></el-input>
              </el-form-item>

              <el-form-item label="新手机号" prop="newPhone">
                <el-input
                  v-model="phoneForm.newPhone"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogForm2Visible = false">取 消</el-button>
              <el-button type="primary" @click="changePhone('phoneForm')"
                >确 定</el-button
              >
            </div>
          </el-dialog>
          <!-- 加入组织弹出框 -->
          <el-dialog title="加入更多组织" :visible.sync="dialogForm3Visible">
            <el-form :model="jmoForm" ref="jmoForm" :rules="rules3">
              <el-form-item label="组织邀请码" prop="invitationCode">
                <el-input
                  v-model="jmoForm.invitationCode"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogForm3Visible = false">取 消</el-button>
              <el-button type="primary" @click="joinClub('jmoForm')"
                >确 定</el-button
              >
            </div>
          </el-dialog>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    var validatePass1 = (rules1, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        setTimeout(() => {
          if (this.pwdForm.newPassword !== '') {
            this.$refs.pwdForm.validateField('confirmNewPassword')
          }
          callback()
        }, 1000)
      }
    }
    var validatePass2 = (rules1, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.pwdForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      circleUrl:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      squareUrl:
        'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
      sizeList: ['large', 'medium', 'small'],
      studentId: '20212403',
      name: '李政东',

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
      isSuper: true,
      rules1: {
        password: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
          { message: '原密码不正确', trigger: 'blur' }
        ],
        newPassword: [{ validator: validatePass1, trigger: 'blur' }],
        confirmNewPassword: [{ validator: validatePass2, trigger: 'blur' }]
      },
      rules2: {
        phone: [
          { required: true, message: '请输入原手机号', trigger: 'blur' },
          { message: '原手机号不正确', trigger: 'blur' }
        ],
        newPhone: [
          { required: true, message: '请输入新手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '长度为11个字符', trigger: 'blur' }
        ]
      },
      rules3: {
        invitationCode: [
          { required: true, message: '请输入邀请码', trigger: 'blur' },
          { message: '邀请码不正确', trigger: 'blur' }
        ]
      },
      dialogForm1Visible: false,
      dialogForm2Visible: false,
      dialogForm3Visible: false,
      pwdForm: {
        password: '88888888',
        newPassword: '',
        confirmNewPassword: ''
      },
      phoneForm: {
        phone: '19179755936',

        newPhone: ''
      },
      jmoForm: {
        invitationCode: ''
      }
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
              console.log(err)
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
              console.log(err)
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
              console.log(err)
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
      location.reload()
    },
    getLoginStatus() {
      const url = '/login-status'
      this.$http
        .get(url)
        .then((res) => {
          this.loginOrganizationName = res.data.data.loginOrganizationName
          this.loginOrganizationId = res.data.data.loginOrganizationId
          this.organizations = res.data.data.organizations
          this.permission = res.data.data.permission
          this.phoneForm.phone = res.data.data.phone
          this.name = res.data.data.name
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  created() {
    this.getLoginStatus()
  }
}
</script>

<style lang="less" scoped>
.el-header {
  color: #ffffff;
  height: 100%;
}

.el-footer {
  background-color: #b3c0d1;
  color: #333;

  line-height: 60px;
}

.el-aside {
  background-color: #282e38;
  color: white;
  text-align: center;
  line-height: 100%;
}

.el-main {
  background-color: #f0f2f7;
  color: #333;
  padding: 5%;
  line-height: 40px;
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
.homeWrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.main_container {
  height: 100%;
}
.el-row {
  height: 100%;
}

.el-dropdown-link {
  cursor: pointer;
  color: black;
}
.el-dropdown-link:hover {
  color: #409eff !important;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.color-change:hover {
  color: #409eff !important;
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
.el-menu-item:hover {
  color: #409eff !important;
}
</style>
