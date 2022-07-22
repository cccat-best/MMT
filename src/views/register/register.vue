<template>
  <div class="father">
    <el-container>
      <el-main class="content">
        <div class="left-icon">
          <el-image :src="url" :fit="fill" class="icon-img"></el-image>
          <div class="icon-text">SIPC-MMT</div>
        </div>
        <el-form class="right-box">
          <p class="register-text">注册</p>
          <div class="stuId">
            <p>学号：</p>
            <el-input
              placeholder="账号注册成功后，登录账号即为学号"
              v-model.number="registerForm.stuId"
              class="input-stuId"
            >
            </el-input>
          </div>
          <div class="name">
            <p>姓名：</p>
            <el-input
              placeholder="请输入真实姓名"
              v-model="registerForm.name"
              class="input-name"
            >
            </el-input>
          </div>
          <div class="psw">
            <p>密码：</p>
            <el-input
              placeholder="密码(密码为6-16个字符,注意大小写)"
              v-model.number="registerForm.psw"
              class="input-psw"
              show-password
            >
            </el-input>
          </div>
          <div class="psw2">
            <p>确认密码：</p>
            <el-input
              placeholder="再次输入密码"
              v-model.number="registerForm.psw2"
              class="input-psw"
              show-password
            >
            </el-input>
          </div>
          <div class="tel">
            <p>手机号：</p>
            <el-input
              placeholder="请输入手机号"
              v-model.number="registerForm.tel"
              class="input-tel"
            >
            </el-input>
          </div>
          <div class="inviteCode">
            <p>邀请码：</p>
            <el-input
              placeholder="登录后可到个人中心加入更多组织"
              v-model="registerForm.inviteCode"
              class="input-inviteCode"
            >
            </el-input>
          </div>
          <el-button class="register-btn">注册</el-button>
          <div class="footer">
            <div class="left-text">已有账号？</div>
            <div class="right-text" @click="goLogin()">登陆</div>
          </div>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'Register',
  data() {
    return {
      url: require('@../../../public/sipc.png'),
      registerForm:{
        stuId:'',
        name:'',
        tel:'',
        psw:'',
        psw2:'',
        inviteCode:'',
      }
    }
  },
  methods: {
    goLogin() {
      this.$router.push('/Login')
    }
  },
  components: {}
}
</script>
<style scoped>
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
.right-box {
  margin-left: 29px;
  /* margin-top: 53px; */
  width: 376px;
  height: 470px;
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
.stuId,
.name,
.psw {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-left: 37px;
}
.inviteCode,
.tel {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-left: 30px;
}
.psw2 {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-left: 17px;
}
.stuId p,
.name p,
.psw p {
  width: 100px;
  height: 23px;
  color: rgba(51, 51, 51, 100);
  font-size: 20px;
  text-align: left;
  font-family: Arial-400;
  margin-top: 10px;
}
.input-stuId >>> .el-input__inner,
.input-name >>> .el-input__inner,
.input-psw >>> .el-input__inner,
.input-psw2 >>> .el-input__inner,
.input-tel >>> .el-input__inner,
.input-inviteCode >>> .el-input__inner {
  margin-right: 22px;
  width: 240px;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid #797979;
  padding: 0;
}
.inviteCode p,
.tel p {
  width: 120px;
  height: 23px;
  color: rgba(51, 51, 51, 100);
  font-size: 20px;
  text-align: left;
  font-family: Arial-400;
  margin-top: 10px;
}
.psw2 p {
  text-align: left;
  width: 150px;
  font-size: 19px;
  height: 23px;
  color: rgba(51, 51, 51, 100);
  font-family: Arial-400;
  margin-top: 10px;
}
.register-btn {
  background-color: rgba(26, 113, 185, 100);
  color: rgba(255, 255, 255, 100);
  font-size: 25px;
  text-align: left;
  font-family: Arial-400;
  margin-top: 18px;
  width: 289px;
  height: 51px;
  line-height: 18px;
  border-radius: 15px;
  text-align: center;
}
.footer {
  display: flex;
  margin-left: 111px;
  margin-top: 11px;
  font-size: 17px;
  font-family: Arial-400;
}
.left-text {
  color: rgba(134, 116, 116, 100);
}
.right-text {
  color: rgba(26, 113, 185, 100);
}
</style>
