<template>
  <el-container>
    <el-header>
      <el-row
        type="flex"
        align="middle"
        justify="space-between"
        style="height: 100%; overflow: hidden"
      >
        <el-page-header @back="goBack" content="个人中心" class="back-botton">
        </el-page-header>

        <div class="rightTop" style="display: flex">
          <img
            v-if="this.isSuper"
            src="../home/icon/admin.png"
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
            v-if="this.isSuper"
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

                  <div style="font-size: 10px; margin-top: 10px; height: 20px">
                    {{ loginOrganizationName }}
                  </div>
                </div>

                <el-dropdown-item divided>
                  <el-dropdown
                    @command="changeOrganization"
                    style="width: 140px"
                  >
                    <span class="el-dropdown-link">
                      切换社团<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <!-- 贺节介建议这里的下拉框改成向左拉开，不过我不会 -->
                    <el-dropdown-menu slot="dropdown">
                      <!-- 单独取出第一个元素，销掉多出的分割线 -->
                      <!-- 防止name爆红 -->
                      <el-dropdown-item
                        v-if="this.organizations[0]"
                        style="width: 140px"
                        :command="this.organizations[0].name"
                        >{{ this.organizations[0].name }}</el-dropdown-item
                      >
                      <el-dropdown-item
                        style="width: 140px"
                        :command="item.name"
                        v-for="(item, index) in organizations.slice(
                          1,
                          organizations.length
                        )"
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
    </el-header>
    <el-main>
      <div class="border">
        <div
          class="organization-info"
          style="text-align: left; margin-left: 20%; margin-top: 5%"
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
              @click="joinClubVisible = true"
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
                ><div class="">{{ phoneNuberConvert(phone) }}</div></el-col
              >
              <el-col :span="6"
                ><div class="">
                  <el-button type="text" @click="changePhoneVisible = true"
                    >修改手机号</el-button
                  >
                </div></el-col
              ></el-col
            >
            <el-col :span="24"
              ><el-col :span="6"><div class="">密码</div></el-col>
              <el-col :span="6"
                ><div class="">
                  <el-button type="text" @click="changePassVisible = true"
                    >更改密码</el-button
                  >
                </div></el-col
              ></el-col
            >

            <!-- <el-button type="primary" @click="getInvitationCodeRequest()"
              >生成邀请码</el-button
            > -->
          </el-row>
        </div>

        <!-- 修改密码弹出框 -->
        <el-dialog
          title="更改密码"
          :visible.sync="changePassVisible"
          class="visible-box"
        >
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
            <el-button @click="changePassVisible = false">取 消</el-button>
            <el-button type="primary" @click="changePass('pwdForm')"
              >确 定</el-button
            >
          </div>
        </el-dialog>
        <!-- 更改手机号弹出框 -->
        <el-dialog title="修改手机号" :visible.sync="changePhoneVisible">
          <el-form :model="phoneForm" ref="phoneForm" :rules="rules2">
            <el-form-item label="原手机号" prop="phone">
              <el-input v-model="phoneForm.phone" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="新手机号" prop="newPhone">
              <el-input
                v-model="phoneForm.newPhone"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="changePhoneVisible = false">取 消</el-button>
            <el-button type="primary" @click="changePhone('phoneForm')"
              >确 定</el-button
            >
          </div>
        </el-dialog>
        <!-- 加入组织弹出框 -->
        <el-dialog title="加入更多组织" :visible.sync="joinClubVisible">
          <el-form :model="jmoForm" ref="jmoForm" :rules="rules3">
            <el-form-item label="组织邀请码" prop="invitationCode">
              <el-input
                v-model="jmoForm.invitationCode"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="joinClubVisible = false">取 消</el-button>
            <el-button type="primary" @click="joinClub('jmoForm')"
              >确 定</el-button
            >
          </div>
        </el-dialog>
      </div>
    </el-main>
  </el-container>
</template>

<script>
// import axios from 'axios'
export default {
  name: 'personalInfo',

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
      studentId: '',
      name: '',
      phone: '',
      organizations: [],
      loginOrganizationName: '',
      loginOrganizationId: '',
      permission: '',
      cookie: '',
      organizationName: '',
      organizationId: '',
      changePassVisible: false,
      changePhoneVisible: false,
      joinClubVisible: false,
      isSuper: false,
      pwdForm: {
        password: '',
        newPassword: '',
        confirmNewPassword: ''
      },
      phoneForm: {
        phone: '',
        newPhone: ''
      },
      jmoForm: {
        invitationCode: ''
      },
      rules1: {
        password: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
          { message: '原密码不正确', trigger: 'blur' }
        ],
        newPassword: [
          { validator: validatePass1, trigger: 'blur' },
          { required: true, message: '请输入原密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度为6-16个字符', trigger: 'blur' }
        ],
        confirmNewPassword: [
          { validator: validatePass2, trigger: 'blur' },
          { min: 6, max: 16, message: '长度为6-16个字符', trigger: 'blur' }
        ]
      },
      rules2: {
        phone: [
          { required: true, message: '请输入原手机号', trigger: 'blur' },
          { message: '原手机号不正确', trigger: 'blur' },
          { min: 11, max: 11, message: '长度为11个字符', trigger: 'blur' }
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
      }
    },
    async changeOrganization(command) {
      const organization = {
        organization: command
      }
      const url = '/api/login/change'
      try {
        let { data: res } = await this.$http.post(url, organization)
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
      }
    },
    async quitLogin() {
      const url = '/api/logout'
      try {
        let { data: res } = await this.$http.get(url)
        switch (res.code) {
          case '00000': {
            alert('退出登录成功')
            this.$router.push('/login')
            break
          }
          default: {
            throw new Error(JSON.stringify(res))
          }
        }
      } catch (err) {
        console.log('出错了', err.message)
      }
    },

    superAdmin() {
      this.$router.push('/superAdmin')
    },
    home() {
      location.reload()
    },
    // 个人中心顶部左侧返回的实现
    goBack() {
      this.$router.go(-1)
    },
    // 获取邀请码，为了方便测试写的
    // getInvitationCodeRequest() {
    //   this.$http.get('api/organization/invitation-code').then(
    //     (res) => {
    //       if (res.data.code == '00000') {
    //         this.invitationCode = res.data.data.invitationCode
    //       }
    //     },
    //     (err) => {
    //       this.$message.error(err)
    //     }
    //   )
    // },
    changePass(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const url = '/api/account/revise/password'
          this.$http
            .post(url, this.pwdForm)
            .then((res) => {
              if (res.data.code == '00000') {
                location.reload()
                alert('修改成功')
              } else {
                this.changePassVisible = false
                alert(res.data.message)
              }
            })
            .catch((err) => {
              console.log('出错了', err.message)
            })
        } else {
          return false
        }
      })
    },
    changePhone(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const url = '/api/account/revise/phone'
          this.$http
            .post(url, this.phoneForm)
            .then((res) => {
              if (res.data.code == '00000') {
                location.reload()
                alert('修改成功')
              } else {
                this.changePhoneVisible = false
                alert(res.data.message)
              }
            })
            .catch((err) => {
              console.log('出错了', err.message)
            })
        } else {
          return false
        }
      })
    },
    joinClub(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const url = '/api/invitation-code/club'
          this.$http
            .post(url, this.jmoForm)
            .then((res) => {
              if (res.data.code == '00000') {
                location.reload()
                alert('加入成功')
              } else {
                this.joinClubVisible = false
                alert(res.data.message)
              }
            })
            .catch((err) => {
              console.log('出错了', err.message)
            })
        } else {
          return false
        }
      })
    },

    phoneNuberConvert(number) {
      if (!number) return ''
      let pat = /(\d{3})\d*(\d{4})/
      let result = number.replace(pat, '$1***$2')
      return result
    }
  }
}
</script>

<style lang="less" scoped>
:deep(.el-dialog__footer) {
  text-align: center;
}
:deep(.el-dialog) {
  width: 400px;
}
.el-input {
  width: 250px;
}
.visible-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
.border {
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 10px;
}
.el-container {
  height: 100%;
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

.el-main {
  display: flex;
  background-color: #e9eef3;
  color: #333;
  padding: 3%;
  line-height: 40px;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}

body > .el-container {
  margin-bottom: 40px;
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
</style>
