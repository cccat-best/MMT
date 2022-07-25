<template>
  <el-container class="father">
    <el-main class="content">
      <!-- 左侧icon和文本 -->
      <div class="left-icon">
        <el-image :src="url" :fit="fill" class="icon-img"></el-image>
        <div class="icon-text">SIPC-MMT</div>
      </div>
      <!-- 右侧信息框 -->
      <el-form
        class="right-box"
        :model="registerForm"
        :rules="rules"
        ref="registerForm"
        label-width="100px"
        hide-required-asterisk="true"
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
            v-model.number="registerForm.name"
            class="input-name"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="密码" class="psw" prop="password">
          <el-input
            placeholder="密码(密码为6-16个字符,注意大小写)"
            v-model.number="registerForm.password"
            class="input-psw"
            show-password
          >
          </el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword" class="psw2">
          <el-input
            placeholder="再次输入密码"
            v-model.number="registerForm.confirmPassword"
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
            v-model.number="registerForm.invitationCode"
            class="input-stuId"
          >
          </el-input>
        </el-form-item>
        <el-button class="register-btn" @click="toRegister()">注册</el-button>
        <div class="footer">
          <div class="left-text">已有账号？</div>
          <div class="right-text" @click="goLogin()">登陆</div>
        </div>
      </el-form>
    </el-main>
  </el-container>
</template>
<script>
export default {
  name: 'Register',
  data() {

    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.psw) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var validatePass = (rule,value,callback) => {
      let reg= /^[0-9A-Za-z]{6,16}$/
      if(!reg.test(value)){callback(new Error('密码必须是由6-16位字母或数字的任意组合'))
      }else{
          callback()
      }
    }
    return {
      url: require('@../../../public/sipc.png'),
      registerForm: {
        studentId: '',
        name: '',
        phone: '',
        password: '',
        confirmPassword: '',
        invitationCode: ''
      },
      rules: {
        studentId: [{ required: true, message: '请输入学号', trigger: 'blur' }],
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator:validatePass, trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ],
        phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        invitationCode: [
          { required: true, message: '请输入邀请码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    goLogin() {
      this.$router.push('/Login')
      this.$http.post('http://127.0.0.1:38080/register')
    },
    toRegister(){
      this.$http.post('http://127.0.0.1:38080/register/b',
      this.registerForm
      ).then(res=>{
        console.log(res.data.code);
      }).catch(function(error){
        console.log(error);
      })
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
  font-size: 64px;
  text-align: left;
  font-family: Arial-400;
  margin-top: 38px;
}
.right-box {
  margin-left: 29px;
  width: 376px;
  height: 480px;
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
.stuId >>> .el-form-item__label,
.name >>> .el-form-item__label,
.psw >>> .el-form-item__label,
.psw2 >>> .el-form-item__label,
.tel >>> .el-form-item__label,
.inviteCode >>> .el-form-item__label {
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
}
.input-stuId >>> .el-input__inner,
.input-name >>> .el-input__inner,
.input-psw >>> .el-input__inner,
.input-psw2 >>> .el-input__inner,
.input-tel >>> .el-input__inner,
.input-inviteCode >>> .el-input__inner {
  border: none;
  border-radius: 0;
  border-bottom: 1px solid #797979;
  padding: 0;
  width: 240px;
}
.el-form >>> .el-form-item__error {
  margin-left: 20px;
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
  margin-top: 1px;
  width: 289px;
  height: 51px;
  line-height: 18px;
  border-radius: 15px;
  text-align: center;
}
.footer {
  display: flex;
  align-items: center;
  margin-left: 127px;
  margin-top: 8px;
  font-size: 15px;
  font-family: Arial-400;
}
.left-text,
.right-text {
  color: rgba(134, 116, 116, 100);
}
.right-text:hover {
  color: rgba(26, 113, 185, 100);
  cursor: pointer;
}
</style>

