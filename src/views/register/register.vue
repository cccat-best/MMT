<template>
  <el-container class="father">
    <el-main class="content">
      <!-- 左侧icon和文本 -->
      <div class="left-icon">
        <el-image :src="url" class="icon-img"></el-image>
        <div class="icon-text">后台管理系统</div>
      </div>
      <!-- 右侧信息框 -->
      <el-form
        class="right-box"
        :model="registerForm"
        :rules="rules"
        ref="registerForm"
        label-width="100px"
        :hide-required-asterisk="hideRequired"
      >
        <p class="register-text">注册</p>
        <el-form-item label="学号" prop="studentId" class="stuId">
          <el-input
            placeholder="账号注册成功后，登录账号即为学号"
            v-model.number="registerForm.studentId"
            class="input-stuId"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="姓名" class="name" prop="name">
          <el-input
            placeholder="请输入真实姓名"
            v-model="registerForm.name"
            class="input-name"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="密码" class="psw" prop="password">
          <el-input
            placeholder="密码(密码为6-16个字符,注意大小写)"
            v-model="registerForm.password"
            class="input-psw"
            show-password
          >
          </el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword" class="psw2">
          <el-input
            placeholder="再次输入密码"
            v-model="registerForm.confirmPassword"
            class="input-psw2"
            show-password
          >
          </el-input>
        </el-form-item>
        <el-form-item label="电话号" class="tel" prop="phone">
          <el-input
            placeholder="请输入手机号"
            v-model.number="registerForm.phone"
            class="input-tel"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="邀请码" class="inviteCode" prop="invitationCode">
          <el-input
            placeholder="登录后可到个人中心加入更多组织"
            v-model="registerForm.invitationCode"
            class="input-stuId"
          >
          </el-input>
        </el-form-item>
        <el-button class="register-btn" @click="toRegister()">注册</el-button>
        <div class="footer">
          <div class="left-text">已有账号？</div>
          <div class="right-text" @click="goLogin()">登录</div>
        </div>
      </el-form>
      <!-- <el-button @click="creat()">生成邀请码test</el-button> -->
    </el-main>
  </el-container>
</template>
<script>
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'
export default {
  name: 'Register',
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      let reg = /^[0-9A-Za-z]{6,16}$/
      if (!reg.test(value)) {
        callback(new Error('密码必须是由6-16位字母或数字的任意组合'))
      } else {
        callback()
      }
    }
    return {
      url: require('@../../../public/sipc.png'),
      hideRequired: true,
      registerForm: {
        studentId: '',
        name: '',
        phone: '',
        password: '',
        confirmPassword: '',
        invitationCode: ''
      },
      rules: {
        studentId: [
          { required: true, message: '请输入学号' },
          { type: 'number', message: '学号必须为数字值' }
          // { min: 8, max: 8, message: '长度为8个数字',  }
        ],
        name: [
          { required: true, message: '请输入姓名' },
          { min: 2, max: 4, message: '长度为2-4个汉字' }
        ],
        password: [
          { required: true, message: '请输入密码' },
          { validator: validatePass }
        ],
        confirmPassword: [
          { required: true, message: '请确认密码' },
          { validator: validatePass2 }
        ],
        phone: [
          { required: true, message: '请输入手机号' },
          // { min: 11, max: 11, message: '长度为11个字符',  }
          { type: 'number', message: '手机号码必须为数字值' }
        ],
        invitationCode: [{ required: true, message: '请输入邀请码' }]
      }
    }
  },
  computed: {
    ...mapState('transform', ['all'])
  },
  methods: {
    ...mapMutations('transform', ['tranformAll']),
    goLogin() {
      this.$router.push('/Login').catch(() => {})
    },
    toRegister() {
      let nameRule = /^[a-zA-Z\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
      if (this.registerForm.studentId === '') {
        this.$message({
          showClose: true,
          message: '请输入账号',
          type: 'error'
        })
      } else if (
        this.registerForm.studentId < 20110000 ||
        this.registerForm.studentId > 20299999
      ) {
        this.$message({
          showClose: true,
          message: '账号为八位数字',
          type: 'error'
        })
      } else if (this.registerForm.name === '') {
        this.$message({
          showClose: true,
          message: '请输入姓名',
          type: 'error'
        })
      } else if (!nameRule.test(this.registerForm.name)) {
        this.$message({
          showClose: true,
          message: '姓名为2-4位汉字',
          type: 'error'
        })
      } else if (this.registerForm.password === '') {
        this.$message({
          showClose: true,
          message: '请输入密码',
          type: 'error'
        })
      } else if (this.registerForm.confirmPassword === '') {
        this.$message({
          showClose: true,
          message: '请确认密码',
          type: 'error'
        })
      } else if (this.registerForm.phone === '') {
        this.$message({
          showClose: true,
          message: '请输入手机号',
          type: 'error'
        })
      } else if (
        this.registerForm.phone < 10000000000 ||
        this.registerForm.phone > 20000000000
      ) {
        this.$message({
          showClose: true,
          message: '手机号为11位数字',
          type: 'error'
        })
      } else if (this.registerForm.invitationCode === '') {
        this.$message({
          showClose: true,
          message: '请输入邀请码',
          type: 'error'
        })
      } else {
        let registerPost = this.$http.post('api/register', this.registerForm)
        registerPost
          .then((res) => {
            console.log(res)
            if (res.data.code === '00000') {
              this.$message({
                showClose: true,
                message: '恭喜你，注册成功',
                type: 'success'
              })
              // 存储账号密码 跳转登陆以后自动填充
              // this.tranformAll(this.registerForm.studentId)
              this.tranformAll({
                //print 表示vuex的文件名
                Id: this.registerForm.studentId,
                psw: this.registerForm.password
              })
              this.$router.push('/login')
            } else {
              this.$message({
                showClose: true,
                message: res.data.message,
                type: 'error'
              })
            }
          })
          .catch((err) => {
            console.log(err)
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            })
          })
      }
    }
  },
  components: {}
}
</script>
<style lang="less" scoped>
::v-deep input::-webkit-input-placeholder {
  font-size: 4px;
}
::v-deep input::-moz-input-placeholder {
  font-size: 4px;
}
::v-deep input::-ms-input-placeholder {
  font-size: 4px;
}
.father {
  display: flex;
  width: 100%;
  height: 100%;
}
.content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.left-icon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.el-image icon-img {
  width: 206px;
  height: 206px;
}
.icon-img {
  width: 206px;
  height: 206px;
}
.icon-text {
  color: rgba(26, 113, 185, 100);
  font-size: 46px;
  text-align: left;
  font-family: Arial-400;
  margin-top: 70px;
}
.right-box {
  margin-left: 150px;
  width: 376px;
  height: 490px;
  line-height: 18px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 100);
  text-align: center;
  border: 3px solid rgba(26, 113, 185, 100);
}
.register-text {
  margin-left: 30px;
  margin-top: 24px;
  width: 61px;
  height: 34px;
  color: rgba(26, 113, 185, 100);
  font-size: 30px;
  text-align: left;
  font-family: Arial-400;
}
.stuId /deep/ .el-form-item__label,
.name /deep/ .el-form-item__label,
.psw /deep/ .el-form-item__label,
.psw2 /deep/ .el-form-item__label,
.tel /deep/ .el-form-item__label,
.inviteCode /deep/ .el-form-item__label {
  color: rgba(51, 51, 51, 100);
  font-size: 18px;
  font-family: Arial-400;
}
.input-stuId,
.input-name,
.input-psw,
.input-psw2,
.input-tel,
.input-inviteCode {
  padding: 0;
  width: 250px;
}
.input-stuId /deep/ .el-input__inner,
.input-name /deep/ .el-input__inner,
.input-psw /deep/ .el-input__inner,
.input-psw2 /deep/ .el-input__inner,
.input-tel /deep/ .el-input__inner,
.input-inviteCode /deep/ .el-input__inner {
  border: none;
  border-radius: 0;
  font-size: 15px;
  border-bottom: 1px solid #797979;
  padding: 0;
}
.el-form /deep/ .el-form-item__error {
  margin-left: 15px;
}
.el-form-item {
  margin-bottom: 15px;
  padding: 0;
}
.register-btn {
  background-color: rgba(26, 113, 185, 100);
  color: rgba(255, 255, 255, 100);
  font-size: 25px;
  text-align: left;
  font-family: Arial-400;
  margin-top: 10px;
  width: 289px;
  height: 45px;
  line-height: 18px;
  border-radius: 15px;
  text-align: center;
}
.footer {
  display: flex;
  justify-content: center;
  // align-items: center;
  margin-top: 13px;
  margin-bottom: 13px;
  font-size: 15px;
  font-family: Arial-400;
}
.left-text,
.right-text {
  color: rgba(134, 116, 116, 100);
  // margin-top: 3px;
  // margin-bottom: 3px;
}
.right-text:hover {
  color: rgba(26, 113, 185, 100);
  cursor: pointer;
}
</style>
