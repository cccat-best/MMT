<template>
  <div>
    <!-- 以下包括表单中的修改账号、修改密码、删除三个弹窗的内容 -->
    <!--修改账号弹窗-->
    <el-dialog
      title="修改账号"
      :visible.sync="DialogVisibleChangeAccount"
      width="30%"
      class="changeAccountDialog"
    >
      <el-form
        status-icon
        label-position="left"
        label-width="80px"
        :model="formLabelAlign"
        :rules="rulesAccount"
      >
        <el-form-item label="学号" prop="studentId">
          <el-input v-model="formLabelAlign.studentId"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <!-- 需要完善脱敏 -->
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="formLabelAlign.phone"></el-input>
        </el-form-item>
        <el-form-item label="用户权限">
          <el-radio-group v-model="formLabelAlign.permission">
            <el-radio label="committee"></el-radio>
            <el-radio label="member"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="DialogVisibleChangeAccount = false">取 消</el-button>
        <el-button type="primary" @click="handleDialogVisibleChangeAccount"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!--修改密码弹窗-->
    <el-dialog
      @close="clearPassWord"
      title="修改密码"
      :visible.sync="dialogVisibleKey"
      width="25%"
      class="changeAccountDialog"
    >
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rulesPassword"
        ref="ruleForm"
        label-position="left"
        label-width="77px"
        class="demo-ruleForm"
      >
        <el-form-item label="新密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
            size="small"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleKey = false">取 消</el-button>
        <el-button type="primary" @click="handleDialogVisibleKey"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 删除账号弹窗 -->
    <el-dialog
      title="删除账号"
      :visible.sync="dialogVisibleDeleteAlign"
      width="30%"
      class="changeAccountDialog"
    >
      <div style="font-size: 16px">确定删除吗?</div>
      <br />
      <div style="font-size: 16px">确定删除后的信息无法恢复</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleDeleteAlign = false">取 消</el-button>
        <el-button type="primary" @click="handleDialogVisibleDeleteAlign"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    //二次确认密码
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      // 弹窗判断
      dialogVisibleDeleteAlign: false, //删除账号
      dialogVisibleKey: false, //修改密码
      DialogVisibleChangeAccount: false, //修改账号
      // ？？？
      organizationId: 0, //组织名不知道，需要询问

      // 校验账号表单结果
      isError: false,
      // 校验密码表单结果
      isErrorPass: false,

      // 验证后，用来发修改账户或密码请求的数据
      postData: {},
      //当前行数据，修改账户，副本用于修改
      formLabelAlign: {},
      //当前行数据，修改账户，原数据的引用用于校验
      AccountFormCheck: {},
      // 删除当前行的索引
      deleteIndex: 0,

      // 修改密码，确认密码////////////////////////////////////////////
      ruleForm: {
        pass: '',
        checkPass: ''
      },
      //修改密码校验规则
      rulesPassword: {
        pass: [
          { validator: validatePass, trigger: ['blur', 'change'] },
          {
            min: 6,
            max: 16,
            message: '密码长度为6-16位',
            trigger: ['blur', 'change']
          }
        ],
        checkPass: [
          { validator: validatePass2, trigger: ['blur', 'change'] },
          {
            min: 6,
            max: 16,
            message: '密码长度为6-16位',
            trigger: ['blur', 'change']
          }
        ]
      },
      //修改账号校验规则
      rulesAccount: {
        studentId: [
          { required: true, message: '必填项', trigger: ['blur', 'change'] },
          {
            min: 8,
            max: 8,
            message: '学号长度为8',
            trigger: ['blur', 'change']
          }
        ],
        name: [
          { required: true, message: '必填项', trigger: ['blur', 'change'] },
          {
            min: 2,
            max: 5,
            message: '请填写真实姓名',
            trigger: ['blur', 'change']
          }
        ],
        phone: [
          { required: true, message: '必填项', trigger: ['blur', 'change'] },
          {
            min: 11,
            max: 11,
            message: '长度不符合规范',
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  methods: {
    // 删除当前行账号
    handleDialogVisibleDeleteAlign() {
      // console.log(this.formLabelAlign.studentId);
      this.$http
        .post('api/account/manage/delete', {
          organizationId: this.organizationId,
          studentList: [
            {
              studentId: this.formLabelAlign.studentId
            }
          ]
        })
        .then(
          (res) => {
            if (res.data.code == '00000') {
              this.$message.success('删除成功')
              // 单行删除同步，达到页面删除效果，仅靠发请求是没办法从视觉上删除的
              this.$emit('deleteAlign', this.deleteIndex)
            } else this.$message.error(res.data.message)
            // 关闭弹窗
            this.dialogVisibleDeleteAlign = false
          },
          (err) => {
            this.$message.error(err)
            // 关闭弹窗
            this.dialogVisibleDeleteAlign = false
          }
        )
    },
    // 验证已修改数据，放入postData中
    // 情况是有修改的记录修改，没有修改记录null,全部要发到请求中
    // checkPostData() {
    //   Object.keys(this.formLabelAlign).forEach((key) => {
    //     if (this.formLabelAlign[key] != this.AccountFormCheck[key]) {
    //       // 把修改项记录下来
    //       this.postData[key] = this.formLabelAlign[key]
    //     } else {
    //       // 未修改项置空
    //       this.postData[key] = null
    //     }
    //   })
    //   // 补上必传项studentNumber、permission
    //   this.postData.studentNumber = this.AccountFormCheck.studentId
    //   this.postData.permission = this.formLabelAlign.permission
    //   console.log(this.formLabelAlign.name)
    //   console.log(this.AccountFormCheck.name)
    //   console.log('-----------------')
    //   console.log(this.postData.name)
    // },

    // 提交密码修改
    handleDialogVisibleKey() {
      this.findErrorPass() //校验数据
      if (this.isErrorPass) {
        this.postAxios()
      }
      // 待完善
      // 共用一套密码pass来存储数据，存在问题，能否，每次都重置一下
      //////////////////////////////

      // 不太好，应该每次比较index，不同就重置
    },
    clearPassWord() {
      ;(this.ruleForm.pass = ''), (this.ruleForm.checkPass = '')
    },
    // 发提交修改请求,最后把isErrorPass重置
    postAxios() {
      this.$http
        .post('api/account/manage/revise', {
          organizationId: this.organizationId,
          studentList: [
            {
              name: this.formLabelAlign.name,
              password: this.ruleForm.checkPass,
              permission: this.formLabelAlign.permission,
              phone: this.formLabelAlign.phone,
              studentId: this.formLabelAlign.studentId,
              // 原学号，修改密码是不改变学号的
              studentNumber: this.formLabelAlign.studentId
            }
          ]
        })
        .then(
          (res) => {
            if (res.data.code == '00000') {
              this.$message.success('已修改密码')
              // 校验通过才能退出弹窗，写在异步里，防止影响观感
              this.dialogVisibleKey = false
            } else this.$message.error(res.data.message)
            this.isErrorPass = false
          },
          (err) => {
            this.$message.error(err)
            // 校验通过才能退出弹窗，写在异步里，防止影响观感
            this.dialogVisibleKey = false
            this.isErrorPass = false
          }
        )
    },
    // 提交账户修改
    handleDialogVisibleChangeAccount() {
      // 原来的方案是修改了就传，没修改的数据传null
      // this.checkPostData()

      this.findError() //校验数据
      // console.log(this.formLabelAlign.permission);
      if (this.isError) {
        // this.postAxios()
        // 相比于上面的修改密码，这里发请求没有传password参数
        // 避免checkPass数据污染，乱改密码
        this.$http
          .post('api/account/manage/revise', {
            organizationId: this.organizationId,
            studentList: [
              {
                // 可能修改后数据
                name: this.formLabelAlign.name,
                permission: this.formLabelAlign.permission,
                phone: this.formLabelAlign.phone,
                studentId: this.formLabelAlign.studentId,
                // 原学号，引用
                studentNumber: this.AccountFormCheck.studentId
              }
            ]
          })
          .then(
            (res) => {
              if (res.data.code == '00000') {
                // 如果修改成功，把修改内容同步到AccountFormCheck
                this.changeBackUpdateAlign()
                this.$message.success('修改成功')
              }
              // 写在if里没成功别退弹窗，写在异步里，防止影响观感
              this.DialogVisibleChangeAccount = false
              this.isError = false
            },
            (err) => {
              this.$message.error(err)
              // 写在if里没成功别退弹窗，写在异步里，防止影响观感
              this.DialogVisibleChangeAccount = false
              this.isError = false
            }
          )
      }
    },
    // 如果账号修改成功，把修改内容同步到AccountFormCheck
    changeBackUpdateAlign() {
      console.log(' 如果修改成功,把修改内容同步到AccountFormCheck')
      // AccountFormCheck从主页传过来的是原对象的引用，可以直接在这里同步
      this.AccountFormCheck.name = this.formLabelAlign.name
      this.AccountFormCheck.permission = this.formLabelAlign.permission
      this.AccountFormCheck.phone = this.formLabelAlign.phone
      this.AccountFormCheck.studentId = this.formLabelAlign.studentId
    },
    // 看看是不是修改了
    findSame() {
      if (this.AccountFormCheck.name == this.formLabelAlign.name) {
        if (
          this.AccountFormCheck.permission == this.formLabelAlign.permission
        ) {
          if (this.AccountFormCheck.phone == this.formLabelAlign.phone) {
            if (
              this.AccountFormCheck.studentId == this.formLabelAlign.studentId
            ) {
              return true
            }
          }
        }
      }
      return false
    },
    // 修改账号表单校验，待修改
    findError() {
      if (this.findSame()) {
        this.$message.error('您没有修改哦')
      } else if (
        !/^20[1-9][0-9][0-9]{4}$/.test(this.formLabelAlign.studentId)
      ) {
        this.$message.error('学号长度为8')
      } else if (!/^[\u4E00-\u9FA5]{2,5}$/.test(this.formLabelAlign.name)) {
        this.$message.error('请输入真实姓名')
      } else if (!/^(1[3-9][0-9])[0-9]{8}$/.test(this.formLabelAlign.phone)) {
        this.$message.error('电话不符合规范')
      } else this.isError = true
    },
    // 修改密码表单校验，待修改
    findErrorPass() {
      if (this.ruleForm.pass == '') {
        this.$message.error('密码不能为空')
      } else if (!/[\s\S]{6,16}$/.test(this.ruleForm.pass)) {
        this.$message.error('密码长度为6-16位')
      } else if (this.ruleForm.pass == this.ruleForm.checkPass) {
        this.isErrorPass = true
      } else {
        this.$message.error('两次输入密码不同')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.changeAccountDialog {
  min-width: 1100px;
}
</style>
