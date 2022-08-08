export default {
  data() {
    return {
      url: require('@../../../public/sipc.png'),
      hideRequired: true,
      // err: '',
      loginForm: {
        studentId: '',
        password: ''
      },
      rules: {
        studentId: [{ required: true, message: '请输入帐号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  }
}
