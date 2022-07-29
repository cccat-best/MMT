<template>
  <el-main>
    <div class="organization-info" style="text-align: left; margin-left: 20%">
      <el-row>
        <el-col :span="24"
          ><div class="">当前所在组织：{{ loginOrganizationName }}</div></el-col
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
            ><div class="">{{ phoneNuberConvert(phone) }}</div></el-col
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
          <el-input v-model="phoneForm.phone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="新手机号" prop="newPhone">
          <el-input v-model="phoneForm.newPhone" autocomplete="off"></el-input>
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
        <el-button type="primary" @click="joinClub('jmoForm')">确 定</el-button>
      </div>
    </el-dialog>
  </el-main>
</template>

<script>
import axios from 'axios'
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
      studentId: '20212403',
      name: '李政东',
      phone: '18296723193',
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
      isSuper: false,
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
        phone: '',
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
        this.phone = val.data.data.phone
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
          this.phone = res.data.data.phone
          this.name = res.data.data.name
        })
        .catch((err) => {
          console.log(err)
        })
    },
    phoneNuberConvert(number) {
      if (!number) return ''
      let pat = /(\d{3})\d*(\d{4})/
      let result = number.replace(pat, '$1***$2')
      return result
    }
  },
  created() {
    this.getLoginStatus()
    if (this.permission == 'superAdmin') {
      this.isSuper = true
    }
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
