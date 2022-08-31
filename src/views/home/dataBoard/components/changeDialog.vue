<template>
  <div>
    <el-dialog
      title=""
      :visible.sync="changeDialogVisible"
      width="60%"
      top="30px"
    >
      <!-- 弹窗主体内容 -->
      <div class="all">
        <div class="bigTitle">报名表</div>
        <!-- 基本问题模块 -->
        <div class="one">
          <div class="tit">基本问题</div>
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="60px"
            class="demo-ruleForm form"
          >
            <el-form-item
              label="姓名"
              prop="studentName"
              v-if="ruleForm.studentName != null"
            >
              <el-input v-model="ruleForm.studentName"></el-input>
            </el-form-item>
            <el-form-item
              label="学号"
              prop="studentId"
              v-if="ruleForm.studentId != null"
            >
              <el-input v-model="ruleForm.studentId"></el-input>
            </el-form-item>
            <el-form-item
              label="电话"
              prop="phone"
              v-if="ruleForm.phone != null"
            >
              <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item
              label="学院"
              prop="academyId"
              v-if="ruleForm.academyId != null"
            >
              <el-select v-model="ruleForm.academyId" placeholder="请选择学院">
                <el-option
                  v-for="item in academyIds"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="专业"
              prop="majorId"
              v-if="ruleForm.majorId != null"
            >
              <el-select v-model="ruleForm.majorId" placeholder="请选择专业">
                <el-option
                  v-for="item in majorIds"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="班级"
              prop="classId"
              v-if="ruleForm.classId != null"
            >
              <el-select v-model="ruleForm.classId" placeholder="请选择班级">
                <el-option
                  v-for="item in classIds"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="QQ" prop="qq" v-if="ruleForm.qq != null">
              <el-input v-model="ruleForm.qq"></el-input>
            </el-form-item>
            <el-form-item
              label="性别"
              prop="gender"
              v-if="ruleForm.gender != null"
            >
              <el-select v-model="ruleForm.gender" placeholder="请选择性别">
                <el-option
                  v-for="item in sexs"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="邮箱"
              prop="email"
              v-if="ruleForm.email != null"
            >
              <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item
              label="身高"
              prop="height"
              v-if="ruleForm.height != null"
            >
              <el-input v-model="ruleForm.height"></el-input>
            </el-form-item>

            <el-form-item
              label="体重"
              prop="weight"
              v-if="ruleForm.weight != null"
            >
              <el-input v-model="ruleForm.weight"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <!-- 自定义基本问题 -->
        <div class="basequestion">
          <!-- 基本问题（填空） -->
          <div
            class="question1"
            v-for="(item, index) in basicQuestions1"
            :key="index"
          >
            <div class="problem">填空：{{ item.question }}</div>
            <div class="answer">{{ item.answer }}</div>
          </div>
          <!-- 基本问题（选择） -->
          <div class="question2">
            <div
              class="problem"
              v-for="(item, index) in basicQuestions2"
              :key="index"
            >
              <div style="margin-right: 40px">选择：{{ item.question }}</div>
              <div class="answer">
                <el-radio
                  disabled
                  v-model="item.answer"
                  :label="item1"
                  v-for="(item1, index) in item.choices"
                  :key="index"
                  >{{ item1 }}</el-radio
                >
              </div>
            </div>
          </div>
        </div>
        <!-- 部门问题模块 -->
        <div class="two">
          <div class="tit">部门问题</div>
          <!-- 自定义填空 -->
          <div
            class="question1"
            v-for="(item, index) in departmentQuestion1"
            :key="index"
          >
            <div class="problem">
              {{ item.department }}：{{ item.question }}
            </div>
            <div class="answer">{{ item.answer }}</div>
          </div>
          <!-- 自定义选择 -->
          <div class="question2">
            <div
              class="problem"
              v-for="(item, index) in departmentQuestion2"
              :key="index"
            >
              <div style="margin-right: 40px">
                {{ item.department }}：{{ item.question }}
              </div>
              <div class="answer">
                <el-radio
                  disabled
                  v-model="item.answer"
                  :label="item1"
                  v-for="(item1, index) in item.choices"
                  :key="index"
                  >{{ item1 }}</el-radio
                >
              </div>
            </div>
          </div>
        </div>
        <!-- 综合问题模块 -->
        <div class="two">
          <div class="tit">综合问题</div>
          <!-- 自定义填空 -->
          <div
            class="question1"
            v-for="(item, index) in bigQuestion1"
            :key="index"
          >
            <div class="problem">填空：{{ item.question }}</div>
            <div class="answer">{{ item.answer }}</div>
          </div>
          <!-- 自定义选择 -->
          <div class="question2">
            <div
              class="problem"
              v-for="(item, index) in bigQuestion2"
              :key="index"
            >
              <div style="margin-right: 40px">选择：{{ item.question }}</div>
              <div class="answer">
                <el-radio
                  disabled
                  v-model="item.answer"
                  :label="item1"
                  v-for="(item1, index) in item.choices"
                  :key="index"
                  >{{ item1 }}</el-radio
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 底部按钮 -->
      <span slot="footer" class="dialog-footer">
        <!-- 修改学号 -->
        <el-button
          @click="changeDialogVisible = false"
          style="margin-left: 10px"
          >退 出</el-button
        >
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提 交</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
//暂时注释掉,是有用的
import axios from 'axios'
export default {
  name: 'changeDialog',
  data() {
    return {
      organizationId: sessionStorage.getItem('loginOrganizationId'),
      // 控制修改界面弹窗
      changeDialogVisible: false,
      // 学号,由主页传过来
      studentId: '',
      admissionId: sessionStorage.getItem('homeAdmissionId'),
      //表单数据
      ruleForm: {
        studentId: '',
        studentName: '',
        phone: '',
        academyId: '',
        majorId: '',
        classId: '',
        gender: '',
        qq: '',
        email: '',
        height: '',
        weight: ''
      },
      //部门问题数组（填空）
      departmentQuestion1: [],
      // 部门问题数组（选择）
      departmentQuestion2: [],
      //综合问题数组（填空）
      bigQuestion1: [],
      //综合问题数组（选择）
      bigQuestion2: [],
      //基本问题（填空）
      basicQuestions1: [],
      // 基本问题（选择）
      basicQuestions2: [],
      //表单验证规则
      rules: {
        studentName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        studentId: [
          { required: true, message: '请输入学号', trigger: 'blur' },
          { pattern: /^20[12]\d{5}$/, message: '学号格式不对', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入电话号', trigger: 'blur' },
          {
            pattern: /^(13[0-9]|15[0-9]|17[013678]|18[0-9]|14[57])\d{8}$/,
            message: '手机号格式不对',
            trigger: 'blur'
          }
        ],
        academyId: [{ required: true, message: '请选择学院', trigger: 'blur' }],
        majorId: [{ required: true, message: '请选择专业', trigger: 'blur' }],
        classId: [{ required: true, message: '请选择班级', trigger: 'blur' }],
        qq: [
          { required: true, message: '请输入QQ', trigger: 'blur' },
          {
            pattern: /^[123456789]\d{4,9}$/,
            message: 'QQ格式不对',
            trigger: 'blur'
          }
        ],
        gender: [{ required: true, message: '请输入性别', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        height: [{ required: true, message: '请输入身高', trigger: 'blur' }],
        weight: [{ required: true, message: '请输入体重', trigger: 'blur' }]
      },
      sexs: [
        {
          id: 1,
          name: '男'
        },
        {
          id: 2,
          name: '女'
        }
      ],
      //学院选择项
      academyIds: [
        {
          id: 0,
          name: '暂无数据'
        }
      ],
      //专业选择项
      majorIds: [
        {
          id: 0,
          name: '暂无数据'
        }
      ],
      // 班级选择项
      classIds: [
        {
          id: 0,
          name: '暂无数据'
        }
      ]
    }
  },
  watch: {
    //监视学院改变
    'ruleForm.academyId': {
      handler() {
        if (this.ruleForm.majorId != null) {
          this.ruleForm.majorId = ''
          this.ruleForm.classId = ''
          this.classIds = []
          this.getMajor()
        }
      }
    },
    //监视专业改变
    'ruleForm.majorId': {
      handler() {
        if (this.ruleForm.majorId != '' && this.ruleForm.majorId != null) {
          this.ruleForm.classId = ''
          this.getClass()
        }
      }
    }
  },
  methods: {
    //类mounted函数
    Mymounted() {
      this.getAcdademy()
      this.getDetail()
    },
    // 获取学院列表(ok)
    getAcdademy() {
      let url = `api/major-info/academy`
      let get = this.$http.get(url)
      get
        .then((res) => {
          this.academyIds = res.data.data.academy
        })
        .catch(() => {
          this.$message({
            showClose: true,
            message: '获取学院列表失败',
            type: 'error',
            center: true,
            duration: 2000
          })
        })
    },
    // 获取专业列表(ok)
    getMajor() {
      //没有选择学院专业列表为空
      if (this.ruleForm.academyId == '') {
        this.majorIds = []
      } else {
        let academyId = this.ruleForm.academyId
        let url = `api/major-info/major/${academyId}`
        let get = this.$http.get(url)
        get
          .then((res) => {
            this.majorIds = res.data.data.major
          })
          .catch(() => {
            this.$message({
              showClose: true,
              message: '获取专业列表失败',
              type: 'error',
              center: true,
              duration: 2000
            })
          })
      }
    },
    // 获取班级列表(ok)
    getClass() {
      let academyId = this.ruleForm.academyId
      let majorId = this.ruleForm.majorId
      let url = `api/major-info/class-num/${academyId}/${majorId}`
      let get = this.$http.get(url)
      get
        .then((res) => {
          this.classIds = res.data.data.classNum
        })
        .catch(() => {
          this.$message({
            showClose: true,
            message: '获取班级列表失败',
            type: 'error',
            center: true,
            duration: 2000
          })
        })
    },
    // 获取个人信息(ok)
    getDetail() {
      // 清空
      // 部门问题数组（填空）
      this.departmentQuestion1 = []
      // 部门问题数组（选择）
      this.departmentQuestion2 = []
      //综合问题数组（填空）
      this.bigQuestion1 = []
      //综合问题数组（选择）
      this.bigQuestion2 = []
      //基本问题数组（填空）
      this.basicQuestions1 = []
      //基本问题数组（选择）
      this.basicQuestions2 = []
      let studentId = this.studentId
      let admissionId = this.admissionId
      let url = `api/student/info/show?studentId=${studentId}&admissionId=${admissionId}`
      let get = this.$http.get(url)
      get
        .then((res) => {
          // console.log(res, '简历数据')
          //模拟数据
          // let data = {
          //   studentId: 20222445,
          //   studentName: '张张张',
          //   phone: '13000000000',
          //   academy: '计算机学院',
          //   major: '计算机科学与技术',
          //   classNum: '1班',
          //   gender: 2,
          //   qq: '2310768059',
          //   email: '2310789@qq.com',
          //   height: 180.5,
          //   weight: 50,
          //   basicQuestions: [
          //     {
          //       multipleChoice: 0,
          //       question: '你的暑假安排',
          //       answer: '吃饭吃饭吃饭睡觉睡觉睡觉'
          //     },
          //     {
          //       multipleChoice: 0,
          //       question: '你的暑假安排',
          //       answer: '吃饭吃饭吃饭睡觉睡觉睡觉'
          //     },
          //     {
          //       multipleChoice: 1,
          //       choices: ['重庆火锅', '四川火锅', '北京火锅'],
          //       question: '喜欢重庆火锅还是四川火锅',
          //       answer: 'A'
          //     },
          //     {
          //       multipleChoice: 1,
          //       choices: ['吃饭', '睡觉', '都喜欢'],
          //       question: '喜欢吃饭还是睡觉',
          //       answer: 'B'
          //     }
          //   ],
          //   questions: [
          //     {
          //       department: '学习部',
          //       multipleChoice: 0,
          //       question: '生涯规划',
          //       answer: 'haohaohao'
          //     },
          //     {
          //       department: '体育部',
          //       multipleChoice: 0,
          //       question: '时间安排是什么样',
          //       answer: 'goodgood'
          //     },
          //     {
          //       department: '新媒体部',
          //       multipleChoice: 1,
          //       choices: ['吃饭', '睡觉', '都不喜欢', '都喜欢'],
          //       question: '喜欢吃饭还是睡觉',
          //       answer: 'D'
          //     },
          //     {
          //       department: '科技协会',
          //       multipleChoice: 1,
          //       choices: ['重庆火锅', '四川火锅', '北京火锅'],
          //       question: '喜欢重庆火锅还是四川火锅',
          //       answer: 'C'
          //     },
          //     {
          //       department: '综合问题',
          //       multipleChoice: 0,
          //       question: '综合问题1',
          //       answer: '哈哈哈哈哈哈哈哈哈'
          //     },
          //     {
          //       department: '综合问题',
          //       multipleChoice: 0,
          //       question: '综合问题1',
          //       answer: '哈哈哈哈哈哈哈哈哈'
          //     },
          //     {
          //       department: '综合问题',
          //       multipleChoice: 1,
          //       choices: ['选项A8574', '选项B785'],
          //       question: '综合问题2',
          //       answer: 'A'
          //     },
          //     {
          //       department: '综合问题',
          //       multipleChoice: 1,
          //       choices: ['选项A8574', '选项B785'],
          //       question: '综合问题2',
          //       answer: 'A'
          //     }
          //   ]
          // }
          //真实数据
          let data = res.data.data
          //赋值
          this.ruleForm.studentId = data.studentId
          this.ruleForm.studentName = data.studentName
          this.ruleForm.phone = data.phone
          //学院出现专业和班级才出现(三个绑定)
          if (data.academy == null) {
            this.ruleForm.academyId = null
            this.ruleForm.majorId = null
            this.ruleForm.classId = null
          }
          //专业出现班级才出现
          if (data.major == null) {
            this.ruleForm.academyId = null
            this.ruleForm.majorId = null
            this.ruleForm.classId = null
          }
          if (data.classNum == null) {
            this.ruleForm.academyId = null
            this.ruleForm.majorId = null
            this.ruleForm.classId = null
          }
          this.ruleForm.gender = data.gender
          this.ruleForm.qq = data.qq
          this.ruleForm.email = data.email
          this.ruleForm.height = data.height
          this.ruleForm.weight = data.weight
          //数据分类（basequestion）
          data.basicQuestions.forEach((item) => {
            if (item.multipleChoice == 0) {
              this.basicQuestions1.push(item)
            }
            if (item.multipleChoice == 1) {
              if (item.answer == 'A') {
                item.answer = item.choices[0]
              }
              if (item.answer == 'B') {
                item.answer = item.choices[1]
              }
              if (item.answer == 'C') {
                item.answer = item.choices[2]
              }
              if (item.answer == 'D') {
                item.answer = item.choices[3]
              }
              this.basicQuestions2.push(item)
            }
          })
          //数据分类（部门和综合问题）
          data.questions.forEach((item) => {
            if (item.department == '综合问题') {
              if (item.multipleChoice == 0) {
                this.bigQuestion1.push(item)
              }
              if (item.multipleChoice == 1) {
                if (item.answer == 'A') {
                  item.answer = item.choices[0]
                }
                if (item.answer == 'B') {
                  item.answer = item.choices[1]
                }
                if (item.answer == 'C') {
                  item.answer = item.choices[2]
                }
                if (item.answer == 'D') {
                  item.answer = item.choices[3]
                }
                this.bigQuestion2.push(item)
              }
            } else {
              if (item.multipleChoice == 0) {
                this.departmentQuestion1.push(item)
              }
              if (item.multipleChoice == 1) {
                if (item.answer == 'A') {
                  item.answer = item.choices[0]
                }
                if (item.answer == 'B') {
                  item.answer = item.choices[1]
                }
                if (item.answer == 'C') {
                  item.answer = item.choices[2]
                }
                if (item.answer == 'D') {
                  item.answer = item.choices[3]
                }
                this.departmentQuestion2.push(item)
              }
            }
          })
        })
        .catch(() => {
          this.$message({
            showClose: true,
            message: '获取简历失败',
            type: 'error',
            center: true,
            duration: 2000
          })
        })
    },
    //点击提交按钮(ok)
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitNumData()
        } else {
          return false
        }
      })
    },
    //提交修改学号数据(ok)
    submitNumData() {
      let sendData = {
        organizationId: Number(this.organizationId),
        studentId: Number(this.studentId),
        newStudentId: Number(this.ruleForm.studentId)
      }
      let url = `api/student/info/change-student-id`
      axios
        .put(url, sendData)
        .then((res) => {
          // console.log(res, '修改学号')
          if (res.data.code == 'A0400') {
            this.$message({
              showClose: true,
              message: res.data.message,
              type: 'error',
              center: true,
              duration: 2000
            })
          } else {
            this.submitData()
          }
        })
        .catch(() => {
          this.$message({
            showClose: true,
            message: '修改学号失败',
            type: 'error',
            center: true,
            duration: 2000
          })
        })
    },
    //修改个人信息(ok)
    submitData() {
      let sendData = {
        organizationId: this.organizationId,
        studentId: this.ruleForm.studentId,
        studentName: this.ruleForm.studentName,
        phone: this.ruleForm.phone,
        qq: this.ruleForm.qq,
        academyId: this.ruleForm.academyId,
        majorId: this.ruleForm.majorId,
        classId: this.ruleForm.classId,
        email: this.ruleForm.email,
        gender: this.ruleForm.gender,
        height: this.ruleForm.height,
        weight: this.ruleForm.weight
      }
      let url = `api/student/info/change-student-info`
      axios
        .put(url, sendData)
        .then((res) => {
          // console.log(res, '修改个人信息')
          if (res.data.code == 'A0400') {
            this.$message({
              showClose: true,
              message: res.data.message,
              type: 'error',
              center: true,
              duration: 2000
            })
          } else {
            this.changeDialogVisible = false
            this.$message({
              showClose: true,
              message: '修改成功',
              type: 'success',
              center: true,
              duration: 2000
            })
            this.$parent.reFreshWithoutSee()
          }
        })
        .catch(() => {
          this.$message({
            showClose: true,
            message: '修改失败',
            type: 'error',
            center: true,
            duration: 2000
          })
        })
    }
  }
  // mounted(){
  //   this.Mymounted()
  // }
}
</script>

<style lang="less" scoped>
// 主体内容
.all {
  height: calc(100vh - 60px - 150px);
  min-width: 800px;
  min-height: 480px;
  // background-color: rgb(72, 143, 188);
  background-color: #fff;
  overflow: auto;
  // 大标题
  .bigTitle {
    // background-color: rgb(167, 84, 84);
    background-color: #fff;
    font-size: 40px;
    text-align: left;
    font-weight: 700;
  }
  // 基本问题模块
  .one {
    // background-color: rgb(164, 199, 82);
    margin-top: 15px;
    .tit {
      font-size: 28px;
      // background-color: rgb(60, 170, 113);
      text-align: left;
      margin-bottom: 20px;
    }
    .form {
      // background-color: rgb(78, 200, 186);
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
    }
  }
  .basequestion {
    .question1 {
      // background-color: rgb(189, 112, 112);
      margin-bottom: 20px;
      .problem {
        font-size: 18px;
        text-align: left;
      }
      .answer {
        margin-top: 20px;
        text-align: left;
        margin-left: 30px;
        margin-right: 30px;
        font-size: 15px;
        background-color: #f5f7fa;
        padding: 17px;
      }
    }
    .question2 {
      // background-color: rgb(123, 207, 208);
      margin-top: 0px;
      .problem {
        font-size: 18px;
        text-align: left;
        margin-bottom: 15px;
      }
      .answer {
        margin-top: 20px;
        text-align: left;
        margin-left: 30px;
        margin-right: 30px;
        font-size: 15px;
        background-color: #f5f7fa;
        padding: 17px;
      }
    }
  }
  .two {
    // background-color: rgb(82, 199, 154);
    margin-top: 0px;
    .tit {
      font-size: 28px;
      // background-color: rgb(60, 170, 113);
      text-align: left;
    }
    .question1 {
      // background-color: rgb(189, 112, 112);
      margin-top: 20px;
      .problem {
        font-size: 18px;
        text-align: left;
      }
      .answer {
        margin-top: 20px;
        text-align: left;
        margin-left: 30px;
        margin-right: 30px;
        font-size: 15px;
        background-color: #f5f7fa;
        padding: 17px;
      }
    }
    .question2 {
      // background-color: rgb(123, 207, 208);
      margin-top: 20px;
      .problem {
        font-size: 18px;
        text-align: left;
        margin-bottom: 20px;
      }
      .answer {
        margin-top: 20px;
        text-align: left;
        margin-left: 30px;
        margin-right: 30px;
        font-size: 15px;
        background-color: #f5f7fa;
        padding: 17px;
      }
    }
  }
}
/deep/.el-dialog__body {
  padding: 20px 20px 0px 30px;
}
// 总大小
/deep/.el-dialog {
  height: calc(100vh - 80px);
  min-width: 840px;
  min-height: 610px;
  // min-height: calc(100vh - 150px);
  margin: 0 auto 30px;
}
/deep/.el-input {
  width: 150px;
}
/deep/.el-radio__input.is-disabled + span.el-radio__label {
  color: #606266;
}
</style>
