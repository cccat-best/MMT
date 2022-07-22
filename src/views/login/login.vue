<template>
  <div class="content">
    <div class="left-icon">
      <el-image :src="url" :fit="fill" class="icon-img"></el-image>
      <div class="icon-text">SIPC-MMT</div>
    </div>
    <div class="right-info">
      <p class="login-text">登录</p>
      <div class="id">
        <p>账号：</p>
        <el-input placeholder="请输入学号/账号" v-model="loginForm.id" class="input-id">
        </el-input>
      </div>
      <div class="psw">
        <p>密码：</p>
        <el-input
          placeholder="请输入密码"
          v-model="loginForm.psw"
          class="input-psw"
          show-password
        >
        </el-input>
      </div>
      <div class="forget-text">忘记密码？</div>
      <el-button class="login-btn">登陆</el-button>
      <div class="footer">
        <div class="no-id">没有账号？</div>
        <div class="register" @click="goRegister()">注册</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data() {
    return {
      url: require('@../../../public/sipc.png'),
      loginForm: {
        id: '',
        psw: ''
      }
    }
  },
  methods: {
    goRegister() {
      this.$router.push('/register')
    }
  },
  components: {}
}
</script>
<style scoped>
.content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
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
  /* left: 135px;
  top: 370px;
  width: 321px;
  height: 84px; */
  color: rgba(26, 113, 185, 100);
  font-size: 64px;
  text-align: left;
  font-family: Arial-400;
  margin-top: 38px;
}
.right-info {
  margin-left: 56px;
  left: 512px;
  top: 103px;
  width: 364px;
  height: 368px;
  line-height: 18px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 100);
  text-align: center;
  border: 3px solid rgba(26, 113, 185, 100);
}
.login-text {
  color: rgba(26, 113, 185, 100);
  font-size: 30px;
  text-align: left;
  font-family: Arial-400;
  margin-top: 38px;
  margin-left: 27px;
}
/* 改变el-input原有样式 */
.input-id >>> .el-input__inner {
  margin-right: 48px;
  width: 200px;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid #797979;
}
.input-psw >>> .el-input__inner {
  margin-right: 48px;
  width: 200px;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid #797979;
}
.id {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 35px;
  margin-top: 40px;
}
.id p {
  width: 100px;
  height: 23px;
  color: rgba(51, 51, 51, 100);
  font-size: 20px;
  text-align: left;
  font-family: Arial-400;
  text-align: center;
  vertical-align: middle;
  line-height: 23px;
}
.psw {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 35px;
  margin-top: 40px;
}
.psw p {
  width: 100px;
  height: 23px;
  color: rgba(51, 51, 51, 100);
  font-size: 20px;
  text-align: left;
  font-family: Arial-400;
  line-height: 23px;
  text-align: center;
  vertical-align: middle;
}
.forget-text {
  margin-top: 18px;
  margin-left: 236px;
  width: 85px;
  height: 14px;
  color: rgba(134, 116, 116, 100);
  font-size: 17px;
  /* text-align: right; */
  font-family: Arial-400;
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
.footer {
  display: flex;
  margin-left: 111px;
  margin-top: 11px;
  font-size: 17px;
  font-family: Arial-400;
}
.no-id {
  color: rgba(134, 116, 116, 100);
}
.register {
  color: rgba(26, 113, 185, 100);
}
</style>
