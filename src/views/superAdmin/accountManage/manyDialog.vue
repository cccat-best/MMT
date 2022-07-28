<template>
  <div>
    <!-- 以下包括表单中的修改账号、修改密码、删除三个弹窗的内容 -->
    <!--修改账号弹窗-->
    <el-dialog
      title="修改账号"
      :visible.sync="DialogVisibleChangeAccount"
      width="30%"
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
            <el-radio label="commitee"></el-radio>
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
    <el-dialog title="修改密码" :visible.sync="dialogVisibleKey" width="30%">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rulesPassword"
        ref="ruleForm"
        label-position="left"
        label-width="100px"
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
    >
      <div>确定删除吗?</div>
      <div>确定删除后的信息无法恢复</div>
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
//引入axios
import axios from 'axios'
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
      //当前行数据，修改账户
      formLabelAlign: {},
      // 修改密码，确认密码////////////////////////////////////////////
      ruleForm: {
        pass: '',
        checkPass: ''
      },
      //修改密码校验规则
      rulesPassword: {
        pass: [{ validator: validatePass, trigger: ['blur', 'change'] }],
        checkPass: [{ validator: validatePass2, trigger: ['blur', 'change'] }]
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
            min: 1,
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
      axios({
        method: 'post',
        url: 'https://mmt-dev.sipcoj.com/account/manage/delete',
        data: {
          organizationId: this.organizationId,
          studentList: [
            {
              studentId: this.formLabelAlign.studentId
            }
          ]
        }
      }).then(
        (res) => {
          this.$message.success(res.data.message)
        },
        (err) => {
          this.$message.error(err)
        }
      )
    },
    // 提交密码修改
    handleDialogVisibleKey() {
      if (this.ruleForm.pass != '') {
        if (this.ruleForm.pass == this.ruleForm.checkPass) {
          this.postAxios()
        } else {
          this.$message.error('两次输入密码不同')
        }
      } else {
        this.$message.error('密码不能为空')
      }
      // 待完善
      // 共用一套密码pass来存储数据，存在问题，能否，每次都重置一下
      //////////////////////////////
      ;(this.ruleForm.pass = ''), (this.ruleForm.checkPass = '')
      // 不太好，应该每次比较index，不同就重置
    },
    // 发提交修改请求
    postAxios() {
      axios({
        method: 'post',
        url: 'https://mmt-dev.sipcoj.com/account/manage/revise',
        data: {
          organizationId: this.organizationId,
          studentList: [
            {
              name: this.formLabelAlign.name,
              password: this.ruleForm.checkPass,
              permission: this.formLabelAlign.permission,
              phone: this.formLabelAlign.phone,
              studentId: this.formLabelAlign.studentId
            }
          ]
        }
      }).then(
        (res) => {
          this.$message.success(res.data.message)
        },
        (err) => {
          this.$message.error(err)
        }
      )
    },
    // 提交账户修改
    handleDialogVisibleChangeAccount() {
      this.findError() //校验数据
      // console.log(this.formLabelAlign.permission);
      if (this.isError) {
        // this.postAxios()
        // 相比于上面的修改密码，这里发请求没有传password参数
        // 避免checkPass数据污染，乱改密码
        axios({
          method: 'post',
          url: 'https://mmt-dev.sipcoj.com/account/manage/revise',
          data: {
            organizationId: this.organizationId,
            studentList: [
              {
                name: this.formLabelAlign.name,
                permission: this.formLabelAlign.permission,
                phone: this.formLabelAlign.phone,
                studentId: this.formLabelAlign.studentId
              }
            ]
          }
        }).then(
          (res) => {
            this.$message.success(res.data.message)
            this.isError = false
          },
          (err) => {
            this.$message.error(err)
            this.isError = false
          }
        )
      }
    },
    // 修改账号表单校验，待修改
    findError() {
      if (!/^20[1-9][0-9][0-9]{4}$/.test(this.formLabelAlign.studentId)) {
        this.$message.error('学号长度为8')
      } else if (!/^[\u4E00-\u9FA5]{2,5}$/.test(this.formLabelAlign.name)) {
        this.$message.error('请输入真实姓名')
      } else if (!/^(1[3-9][0-9])[0-9]{8}$/.test(this.formLabelAlign.phone)) {
        this.$message.error('电话不符合规范')
      } else this.isError = true
    }
  }
}
</script>

<style scoped></style>
