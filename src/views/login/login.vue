<template>
  <el-container class="father">
    <el-main class="content">
      <!-- 左侧icon和文本 -->
      <div class="left-icon">
        <el-image :src="url" class="icon-img"></el-image>
        <div class="icon-text">MMT</div>
      </div>
      <!-- 右侧信息框 -->
      <el-form
        class="right-box"
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        :hide-required-asterisk="hideRequired"
      >
        <p class="login-text">登录</p>
        <el-form-item label="账号" class="id" prop="studentId">
          <el-input
            placeholder="请输入学号/账号"
            v-model="loginForm.studentId"
            class="input-id"
          >
          </el-input>
        </el-form-item>
        <!-- <el-form-item label="密码" class="psw" prop="password" :error="err"> -->
        <el-form-item label="密码" class="psw" prop="password">
          <el-input
            placeholder="请输入密码"
            v-model="loginForm.password"
            class="input-psw"
            show-password
          >
          </el-input>
        </el-form-item>
        <div class="forget-text">忘记密码？</div>
        <el-button class="login-btn" @click="goLogin()">登录</el-button>
        <div class="footer">
          <div class="no-id">没有账号？</div>
          <div class="register" @click="goRegister()">注册</div>
        </div>
      </el-form>
    </el-main>
  </el-container>
</template>
<script>
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'
import loginData from './loginData'
export default {
  name: 'Login',
  data() {
    return {
      ...loginData.data()
    }
  },
  watch: {},
  computed: {
    ...mapState('transform', ['all'])
  },
  mounted() {
    this.loginForm.studentId = this.all.Id
    this.loginForm.password = this.all.psw
    this.clearData()
  },
  methods: {
    ...mapMutations('transform', ['clearData']),
    goRegister() {
      this.$router.push('/register')
    },
    goLogin() {
      if (this.loginForm.studentId === '') {
        this.$message({
              showClose: true,
              message: '请输入账号',
              type: 'error'
            })
      } else if (this.loginForm.password === '') {
        this.$message({
              showClose: true,
              message: '请输入密码',
              type: 'error'
            })
      } else {
        this.$http
          .post('api/login/b', this.loginForm)

          .then((res) => {
            if (res.data.code === '00000') {
              this.$message.success('恭喜你，登录成功')
              sessionStorage.setItem(
                'loginOrganizationName',
                res.data.data.loginOrganizationName
              )
              sessionStorage.setItem(
                'loginOrganizationId',
                res.data.data.loginOrganizationId
              )
              this.$router.push('/home')
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
              type: 'warning'
            })
          })
      }
    }
  },
  components: {}
}
</script>
<style lang="less" scoped>
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
  font-size: 50px;
  text-align: left;
  font-family: Arial-400;
  margin-top: 70px;
}
.right-box {
  margin-left: 150px;
  width: 364px;
  height: 368px;
  line-height: 18px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 100);
  text-align: center;
  border: 3px solid rgba(26, 113, 185, 100);
}
.login-text {
  margin-left: 30px;
  margin-top: 24px;
  width: 61px;
  height: 34px;
  color: rgba(26, 113, 185, 100);
  font-size: 30px;
  text-align: left;
  font-family: Arial-400;
}
.id,
.psw {
  width: 300px;
}
.id /deep/ .el-form-item__label,
.psw /deep/ .el-form-item__label {
  color: rgba(51, 51, 51, 100);
  font-size: 18px;
  font-family: Arial-400;
}

.input-id /deep/ .el-input__inner,
.input-psw /deep/ .el-input__inner {
  border: none;
  border-radius: 0;
  border-bottom: 1px solid #797979;
  padding: 0;
  margin-right: 10px;
  margin-left: 20px;
}
.forget-text {
  margin-top: 18px;
  margin-left: 250px;
  width: 85px;
  height: 14px;
  color: rgba(134, 116, 116, 100);
  font-size: 17px;
  font-family: Arial-400;
}
.el-form /deep/ .el-form-item__error {
  margin-left: 22px;
}
.login-btn {
  margin-top: 15px;
  font-family: Arial-400;
  color: rgba(255, 255, 255, 100);
  font-size: 25px;
  width: 289px;
  height: 40px;
  line-height: 18px;
  border-radius: 15px;
  background-color: rgba(26, 113, 185, 100);
  text-align: center;
}
.el-form-item {
  margin-top: 45px;
}
.footer {
  display: flex;
  margin-left: 111px;
  margin-top: 11px;
  font-size: 17px;
  font-family: Arial-400;
}
.no-id,
.register {
  color: rgba(134, 116, 116, 100);
}
.register:hover {
  color: rgba(26, 113, 185, 100);
  cursor: pointer;
}
</style>
