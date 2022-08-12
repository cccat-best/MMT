<template>
  <el-container>
    <el-header>
      <myhead
        :isPersonal="isPersonal"
        :isSuper="isSuper"
        :name="name"
        :organizations="organizations"
        :loginOrganizationName="loginOrganizationName"
        v-on:{update,home}="update"
      ></myhead>
    </el-header>
    <el-main v-loading="loading">
      <div class="border">
        <el-card class="box-card" shadow="always">
          <div slot="header" class="clearfix">
            <span style="font-size: 25px; font-weight: bold">所在组织</span>
          </div>
          <div class="organization-info" style="margin-top: 5%">
            <el-descriptions
              class="margin-top"
              title=""
              :column="1"
              :size="size"
              border
            >
              <el-descriptions-item :contentStyle="{ 'text-align': 'center' }">
                <template slot="label">
                  <i class="el-icon-school"></i>
                  当前所在组织
                </template>
                {{ loginOrganizationName }}
              </el-descriptions-item>
              <el-descriptions-item :contentStyle="{ 'text-align': 'center' }">
                <template slot="label">
                  <i class="el-icon-office-building"></i>
                  已加入组织
                </template>
                <span v-for="(item, index) in organizations" :key="index">
                  <el-tag
                    type="info"
                    style="
                      color: black;
                      background-color: #e9eef3;
                      margin-right: 20px;
                      margin-bottom: 20px;
                    "
                    >{{ item.name }}</el-tag
                  >
                </span>
                <el-button
                  type="primary"
                  icon="el-icon-plus"
                  circle
                  size="small"
                  style="margin-left: auto"
                  @click="joinClubVisible = true"
                ></el-button>
              </el-descriptions-item>
            </el-descriptions>
            <!-- 生成邀请码测试用 -->
            <!-- <el-button type="primary" @click="getInvitationCodeRequest()"
              >生成邀请码</el-button
            > -->
          </div>
        </el-card>
        <el-card class="box-card" shadow="always">
          <div slot="header" class="clearfix">
            <span style="font-size: 25px; font-weight: bold">基本信息</span>
          </div>
          <div
            class="personal-info"
            style="margin-left: 20%; text-align: left; margin-top: 5%"
          ></div>
          <el-descriptions
            class="margin-top"
            title=""
            :column="1"
            :size="size"
            border
          >
            <el-descriptions-item :contentStyle="{ 'text-align': 'center' }">
              <template slot="label">
                <i class="el-icon-user"></i>
                真实姓名
              </template>
              {{ name }}
            </el-descriptions-item>
            <el-descriptions-item :contentStyle="{ 'text-align': 'center' }">
              <template slot="label">
                <i class="el-icon-mobile-phone"></i>
                手机号
              </template>
              {{ phoneNuberConvert(phone) }}
              <el-button
                type="primary"
                icon="el-icon-edit"
                circle
                size="small"
                style="margin-left: auto"
                @click="changePhoneVisible = true"
              ></el-button>
            </el-descriptions-item>

            <el-descriptions-item :contentStyle="{ 'text-align': 'center' }">
              <template slot="label">
                <i class="el-icon-tickets"></i>
                学号
              </template>
              {{ studentId }}
            </el-descriptions-item>
            <el-descriptions-item :contentStyle="{ 'text-align': 'center' }">
              <template slot="label">
                <i class="el-icon-key"></i>
                密码
              </template>

              <el-button
                type="primary"
                icon="el-icon-edit"
                circle
                size="small"
                style="margin-left: auto"
                @click="changePassVisible = true"
              ></el-button>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
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
import myhead from '../../compentents/head.vue'
export default {
  name: 'personalInfo',
  components: {
    myhead
  },
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
      permission: '',
      changePassVisible: false,
      changePhoneVisible: false,
      joinClubVisible: false,
      isSuper: false,
      isPersonal: true,
      size: '',
      loading: true,
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
    this.loginOrganizationName = sessionStorage.getItem('loginOrganizationName')
  },
  updated() {
    this.loading = false
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
            this.organizationId = data.loginOrganizationId
            this.organizations = data.organizations
            this.permission = data.permission
            this.phone = data.phone
            this.name = data.name
            this.studentId = data.studentId
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

                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
              } else {
                this.changePassVisible = false

                this.$message.error(res.data.message)
              }
            })
            .catch((err) => {
              console.log('出错了', err.message)
              this.$message.error('当前未登录或登录已失效')
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

                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
              } else {
                this.changePhoneVisible = false

                this.$message.error(res.data.message)
              }
            })
            .catch((err) => {
              console.log('出错了', err.message)
              this.$message.error('当前未登录或登录已失效')
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

                this.$message({
                  message: '加入成功',
                  type: 'success'
                })
              } else {
                this.joinClubVisible = false

                this.$message.error(res.data.message)
              }
            })
            .catch((err) => {
              console.log('出错了', err.message)
              this.$message.error('当前未登录或登录已失效')
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
:deep(.is-bordered-label) {
  width: 125px;
}
.clearfix {
  display: flex;
  justify-content: center;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}

.box-card {
  margin: 50px;
  width: 480px;
}
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
  flex-direction: row;
  display: flex;
  justify-content: center;
}
.el-container {
  // min-width: 1200px;
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
