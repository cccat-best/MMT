<template>
  <div>
    <el-dialog
      title=""
      :visible.sync="resumeDialogVisible"
      width="60%"
      top="30px"
    >
      <!-- 弹窗主体内容 -->
      <div class="all">
        <div class="bigbig">用户简历</div>
        <!-- 报名表界面 -->
        <div class="bigTitle">报名表</div>
        <div class="registerTable">
          <!-- 基本问题模块 -->
          <div class="one">
            <div class="tit">基本问题</div>
            <el-form
              :model="ruleForm"
              ref="ruleForm"
              label-width="55px"
              class="demo-ruleForm form"
            >
              <el-form-item
                label="姓名"
                prop="studentName"
                v-if="ruleForm.studentName != null"
              >
                <el-input v-model="ruleForm.studentName" disabled></el-input>
              </el-form-item>
              <el-form-item
                label="学号"
                prop="studentId"
                v-if="ruleForm.studentId != null"
              >
                <el-input v-model="ruleForm.studentId" disabled></el-input>
              </el-form-item>
              <el-form-item
                label="电话"
                prop="phone"
                v-if="ruleForm.phone != null"
              >
                <el-input v-model="ruleForm.phone" disabled></el-input>
              </el-form-item>
              <el-form-item label="QQ" prop="qq" v-if="ruleForm.qq != null">
                <el-input v-model="ruleForm.qq" disabled></el-input>
              </el-form-item>
              <el-form-item
                label="学院"
                prop="academy"
                v-if="ruleForm.academy != null"
              >
                <el-input v-model="ruleForm.academy" disabled></el-input>
              </el-form-item>
              <el-form-item
                label="专业"
                prop="major"
                v-if="ruleForm.major != null"
              >
                <el-input v-model="ruleForm.major" disabled></el-input>
              </el-form-item>
              <el-form-item
                label="班级"
                prop="classNum"
                v-if="ruleForm.classNum != null"
              >
                <el-input v-model="ruleForm.classNum" disabled></el-input>
              </el-form-item>
              <el-form-item
                label="性别"
                prop="gender"
                v-if="ruleForm.gender != null"
              >
                <el-input v-model="ruleForm.gender" disabled></el-input>
              </el-form-item>
              <el-form-item
                label="邮箱"
                prop="email"
                v-if="ruleForm.email != null"
              >
                <el-input v-model="ruleForm.email" disabled></el-input>
              </el-form-item>
              <el-form-item
                label="身高"
                prop="height"
                v-if="ruleForm.height != null"
              >
                <el-input v-model="ruleForm.height" disabled></el-input>
              </el-form-item>

              <el-form-item
                label="体重"
                prop="weight"
                v-if="ruleForm.weight != null"
              >
                <el-input v-model="ruleForm.weight" disabled></el-input>
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
        <!-- 面试反馈 -->
        <div class="bigTitle">面试反馈</div>
        <div class="reply">
          <div class="replyItem" v-for="(item, index) in reply" :key="index">
            {{ item.time }}&nbsp;&nbsp;&nbsp;&nbsp;{{ item.answer }}
          </div>
        </div>
        <!-- 签到 -->
        <div class="bigTitle">签到</div>
        <div class="reply">
          <div class="replyItem" v-for="(item, index) in signData" :key="index">
            {{ item.time }}&nbsp;&nbsp;&nbsp;&nbsp;{{ item.status }}
          </div>
        </div>
        <!-- 面试安排 -->
        <div class="bigTitle">面试安排</div>
        <div class="arrange">
          <el-table
            :data="arrangeTable"
            style="width: 80%"
            class="table"
            border
          >
            <el-table-column prop="rounds" label="面试轮次" align="center">
            </el-table-column>
            <el-table-column prop="time" label="面试时间" align="center">
            </el-table-column>
            <el-table-column prop="address" label="面试地点" align="center">
            </el-table-column>
          </el-table>
        </div>
        <!-- 面试通知 -->
        <div class="bigTitle">面试通知</div>
        <div class="inform">
          <el-table :data="informTable" style="width: 80%" class="table" border>
            <el-table-column prop="time" label="通知发送时间" align="center">
            </el-table-column>
            <el-table-column prop="message" label="通知内容" align="center">
            </el-table-column>
          </el-table>
        </div>
        <!-- 面试评价 -->
        <div class="bigTitle">面试评价</div>
        <div class="evaluate">
          <!-- 表格 -->
          <el-table
            :data="evaluateTable"
            style="width: 80%"
            class="table"
            border
          >
            <el-table-column prop="rounds" label="面试次序" align="center">
            </el-table-column>
            <el-table-column prop="time" label="实际面试时间" align="center">
            </el-table-column>
            <el-table-column prop="address" label="实际面试地点" align="center">
            </el-table-column>
          </el-table>
          <!-- 打分表格 -->
          <div v-for="(item, index) in oldevaluateTable" :key="index">
            <!-- 一面二面 -->
            <div class="interview" @click="getDetail(item.rounds)">
              {{ item.rounds }}面 <i class="el-icon-thumb"></i>
            </div>
            <!-- 内部细节 -->
            <div class="detail" v-if="isShowdetail == item.rounds">
              <div class="score">
                <table border width="82%" cellspacing="0">
                  <!-- 首行 -->
                  <tr>
                    <th>面试问题/面试官</th>
                    <!-- 渲染名字 -->
                    <th v-for="(item, index) in evaluation" :key="index">
                      {{ item.name }}
                    </th>
                    <th>排名</th>
                  </tr>
                  <tr v-for="(item, index) in question" :key="index">
                    <td>{{ item.questionName }}</td>
                    <td v-for="(item, index) in item.evaluation" :key="index">
                      {{ item.score }}
                    </td>
                    <td>{{ item.rank }}</td>
                  </tr>
                </table>
              </div>
              <!-- 次标题 -->
              <div class="tit2">面试评价</div>
              <div class="comment">
                <table border width="82%" cellspacing="0">
                  <tr>
                    <th>面试问题</th>
                    <th>面试评价</th>
                  </tr>
                  <tr v-for="(item, index) in question" :key="index">
                    <td>{{ item.questionName }}</td>
                    <!-- <td v-for="(item, index) in item.evaluation" :key="index">{{item.name}}</td>
                    <td v-for="(item, index) in item.evaluation" :key="index">{{item.comment}}</td> -->
                    <td>
                      <span
                        v-for="(item, index) in item.evaluation"
                        :key="index"
                        ><strong>{{ item.name }}</strong
                        >:{{ item.comment }}<br
                      /></span>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
        <!-- 面试结果 -->
        <div class="bigTitle">面试结果</div>
        <div class="result">
          <el-table :data="resultTable" style="width: 80%" class="table" border>
            <el-table-column prop="rounds" label="面试轮次" align="center">
            </el-table-column>
            <el-table-column prop="result" label="面试结果" align="center">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!-- 底部按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="resumeDialogVisible = false"
          >关 闭</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'resumeDialog',
  data() {
    return {
      // 控制简历界面弹窗
      resumeDialogVisible: false,
      // 学号,由主页传过来
      studentId: '',
      admissionId: sessionStorage.getItem('homeAdmissionId'),
      round: 1,
      organizationId: sessionStorage.getItem('loginOrganizationId'),
      //选择问题的渲染
      radio: '选中且禁用',
      //简历表单数据
      ruleForm: {},
      //基本问题（填空）
      basicQuestions1: [],
      // 基本问题（选择）
      basicQuestions2: [],
      //部门问题数组（填空）
      departmentQuestion1: [],
      // 部门问题数组（选择）
      departmentQuestion2: [],
      //综合问题数组（填空）
      bigQuestion1: [],
      //综合问题数组（选择）
      bigQuestion2: [],
      //面试反馈数据
      reply: [
        {
          time: '暂无数据',
          answer: '暂无数据'
        }
      ],
      //签到
      signData: [
        {
          time: '暂无数据',
          status: '暂无数据'
        }
      ],
      // 面试安排的表格
      arrangeTable: [
        {
          rounds: '暂无数据',
          time: '暂无数据',
          address: '暂无数据'
        }
      ],
      //面试通知表格
      informTable: [
        {
          time: '暂无数据',
          message: '暂无数据'
        }
      ],
      // 面试结果表格数据
      resultTable: [
        {
          rounds: '暂无数据',
          result: '暂无数据'
        }
      ],
      //面试评价表格数据
      evaluateTable: [
        {
          rounds: '暂无数据',
          time: '暂无数据',
          address: '暂无数据'
        }
      ],
      oldevaluateTable: [
        {
          rounds: '暂无数据',
          time: '暂无数据',
          address: '暂无数据'
        }
      ],
      //面试评价个数
      roundnum: 0,
      //面试评价每一项的显示与隐藏
      isShowdetail: 0,
      // 面试官姓名评分和评价
      evaluation: [],
      //问题及评分评价
      question: []
    }
  },
  methods: {
    Mymounted() {
      this.isShowdetail = 0
      this.getReply()
      this.getSign()
      this.getArrange()
      this.getInform()
      this.getResult()
      this.getEvaluate()
      this.getResume()
    },
    //时间格式化函数(ok)
    time(dateTime) {
      dateTime = dateTime * 1000
      var time = parseInt(dateTime)
      var date = new Date(time)
      //获取年份
      var YY = date.getFullYear()
      //获取月份
      var MM =
        date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1
      //获取日期
      var DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      //获取小时
      var hh = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      //获取分
      var mm =
        date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      ///获取秒
      var ss =
        date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      //返回时间格式： 2020-11-09 13:14:52
      return YY + '-' + MM + '-' + DD + ' ' + hh + ':' + mm + ':' + ss
    },
    //获取面试反馈(ok)
    getReply() {
      let organizationId = this.organizationId
      let admissionId = this.admissionId
      let studentId = this.studentId
      let url = `api/resume/feedback?organizationId=${organizationId}&admissionId=${admissionId}&studentId=${studentId}`
      let get = this.$http.get(url)
      get
        .then((res) => {
          console.log(res, '获取面试反馈')
          // 模拟数据
          // let data = [
          //   {
          //     time: '1662949800',
          //     address: '7-223',
          //     answer: '0'
          //   },
          //   {
          //     time: '1662249800',
          //     address: '7-223',
          //     answer: '1'
          //   },
          //   {
          //     time: '1662449700',
          //     address: '7-223',
          //     answer: '2'
          //   },
          //   {
          //     time: '1682449700',
          //     address: '7-223',
          //     answer: '3'
          //   }
          // ]
          //真实数据
          let data = res.data.data
          data.forEach((item) => {
            item.time = this.time(item.time)
            if (item.answer == 0) {
              item.answer = '未回复'
            } else if (item.answer == 1) {
              item.answer = '已同意'
            } else if (item.answer == 2) {
              item.answer = '已拒绝'
            } else {
              item.answer = '待定'
            }
          })
          if (data.length == 0) {
            this.reply = [
              {
                time: '暂无数据',
                address: '暂无数据',
                answer: '暂无数据'
              }
            ]
          } else {
            this.reply = data
          }
        })
        .catch(() => {
          this.$message({
            showClose: true,
            message: '获取面试反馈失败',
            type: 'error',
            center: true,
            duration: 2000
          })
        })
    },
    //获取签到信息(ok)
    getSign() {
      let organizationId = this.organizationId
      let admissionId = this.admissionId
      let studentId = this.studentId
      let url = `api/resume/sign-in?organizationId=${organizationId}&admissionId=${admissionId}&studentId=${studentId}`
      let get = this.$http.get(url)
      get
        .then((res) => {
          console.log(res, '获取签到信息')
          // 模拟数据
          // let data = [
          //   {
          //     time: '1662949800',
          //     status: 1
          //   },
          //   {
          //     time: '1962249800',
          //     status: 1
          //   }
          // ]
          //真实数据
          let data = res.data.data
          data.forEach((item) => {
            item.time = this.time(item.time)
            if (item.status == 1) {
              item.status = '已签到'
            }
          })

          if (data.length == 0) {
            this.reply = [
              {
                time: '暂无数据',
                status: '暂无数据'
              }
            ]
          } else {
            this.signData = data
          }
        })
        .catch(() => {
          this.$message({
            showClose: true,
            message: '获取签到信息失败',
            type: 'error',
            center: true,
            duration: 2000
          })
        })
    },
    //获取面试安排(ok)
    getArrange() {
      let organizationId = this.organizationId
      let admissionId = this.admissionId
      let studentId = this.studentId
      let url = `api/resume/arrange?organizationId=${organizationId}&admissionId=${admissionId}&studentId=${studentId}`
      let get = this.$http.get(url)
      get
        .then((res) => {
          console.log(res, '获取面试安排')
          // 模拟数据
          // let data = [
          //   {
          //     rounds: 1,
          //     time: 1662249500,
          //     address: '7-223'
          //   },
          //   {
          //     rounds: 2,
          //     time: 1622949500,
          //     address: '7-223'
          //   },
          //   {
          //     rounds: 3,
          //     time: 1622956500,
          //     address: '7-223'
          //   }
          // ]
          //真实数据
          let data = res.data.data
          data.forEach((item) => {
            item.time = this.time(item.time)
            if (item.rounds == 1) {
              item.rounds = '一面'
            } else if (item.rounds == 2) {
              item.rounds = '二面'
            } else if (item.rounds == 3) {
              item.rounds = '三面'
            } else if (item.rounds == 4) {
              item.rounds = '四面'
            }
          })
          this.arrangeTable = data
        })
        .catch(() => {
          this.$message({
            showClose: true,
            message: '获取面试安排失败',
            type: 'error',
            center: true,
            duration: 2000
          })
        })
    },
    //获取面试通知(ok)
    getInform() {
      let organizationId = this.organizationId
      let admissionId = this.admissionId
      let studentId = this.studentId
      let url = `api/resume/message?organizationId=${organizationId}&admissionId=${admissionId}&studentId=${studentId}`
      let get = this.$http.get(url)
      get
        .then((res) => {
          console.log(res, '获取面试通知')
          // 模拟数据
          // let data = [
          //   {
          //     time: 1254449500,
          //     message:
          //       '欢迎选择并愿意加入协会，请于2022年8月31号 19:30在7-115参加第一轮面试。'
          //   },
          //   {
          //     time: 1625949500,
          //     message:
          //       '(≧^.^≦)欢迎选择并愿意加入协会，请于2022年8月31号 19:30在7-115参加第一轮面试。'
          //   },
          //   {
          //     time: 2622956500,
          //     message:
          //       '(≧^.^≦)欢迎选择并愿意加入协会，请于2022年8月31号 19:30在7-115参加第一轮面试。'
          //   }
          // ]
          //真实数据
          let data = res.data.data
          data.forEach((item) => {
            item.time = this.time(item.time)
          })
          this.informTable = data
        })
        .catch(() => {
          this.$message({
            showClose: true,
            message: '获取面试通知失败',
            type: 'error',
            center: true,
            duration: 2000
          })
        })
    },
    //获取面试结果(ok)
    getResult() {
      let organizationId = this.organizationId
      let admissionId = this.admissionId
      let studentId = this.studentId
      let url = `api/resume/result?organizationId=${organizationId}&admissionId=${admissionId}&studentId=${studentId}`
      let get = this.$http.get(url)
      get
        .then((res) => {
          console.log(res, '获取面试结果')
          // 模拟数据
          // let data = [
          //   {
          //     rounds: 1,
          //     result: 0
          //   },
          //   {
          //     rounds: 2,
          //     result: 1
          //   },
          //   {
          //     rounds: 3,
          //     result: 2
          //   },
          //   {
          //     rounds: 4,
          //     result: 3
          //   }
          // ]
          //真实数据
          let data = res.data.data
          data.forEach((item) => {
            if (item.rounds == 1) {
              item.rounds = '一面'
            }
            if (item.rounds == 2) {
              item.rounds = '二面'
            }
            if (item.rounds == 3) {
              item.rounds = '三面'
            }
            if (item.rounds == 4) {
              item.rounds = '四面'
            }
            if (item.result == 0) {
              item.result = '缺席'
            }
            if (item.result == 1) {
              item.result = '失败'
            }
            if (item.result == 2) {
              item.result = '通过'
            }
            if (item.result == 3) {
              item.result = '待定'
            }
          })
          this.resultTable = data
        })
        .catch(() => {
          this.$message({
            showClose: true,
            message: '获取面试结果失败',
            type: 'error',
            center: true,
            duration: 2000
          })
        })
    },
    //获取面试评价(ok)
    getEvaluate() {
      let organizationId = this.organizationId
      let admissionId = this.admissionId
      let studentId = this.studentId
      let url = `api/resume/evaluation/info?organizationId=${organizationId}&admissionId=${admissionId}&studentId=${studentId}`
      let get = this.$http.get(url)
      get
        .then((res) => {
          console.log(res, '获取面试评价1')
          // 模拟数据
          // let data = [
          //   {
          //     rounds: 1,
          //     time: 1614449500,
          //     address: '7-223'
          //   },
          //   {
          //     rounds: 2,
          //     time: 1622941110,
          //     address: '7-223'
          //   }
          // ]
          //真实数据
          let data = res.data.data
          // console.log(data,'111')
          this.oldevaluateTable = JSON.parse(JSON.stringify(data))
          data.forEach((item) => {
            item.time = this.time(item.time)
            if (item.rounds == 1) {
              item.rounds = '一面'
            } else if (item.rounds == 2) {
              item.rounds = '二面'
            } else if (item.rounds == 3) {
              item.rounds = '三面'
            } else if (item.rounds == 4) {
              item.rounds = '四面'
            }
          })
          this.evaluateTable = data
          this.roundnum = this.evaluateTable.length
        })
        .catch(() => {
          this.$message({
            showClose: true,
            message: '获取面试评价失败',
            type: 'error',
            center: true,
            duration: 2000
          })
        })
    },
    //面试评价详细信息(ok)
    getDetail(item) {
      // 每一项的显示与隐藏
      this.isShowdetail = item
      let round = item
      let organizationId = this.organizationId
      let admissionId = this.admissionId
      let studentId = this.studentId
      let url = `api/resume/evaluation/details?organizationId=${organizationId}&admissionId=${admissionId}&studentId=${studentId}&round=${round}`
      let get = this.$http.get(url)
      get
        .then((res) => {
          console.log(res, '获取面试详细信息')
          // 模拟数据
          // let data = [
          //   {
          //     questionId: 1,
          //     questionName: '问题1',
          //     evaluation: [
          //       {
          //         name: '张哈哈',
          //         comment: '该生很好哈哈哈哈该生很好哈哈哈哈该生很好哈哈哈哈',
          //         score: 90
          //       },
          //       {
          //         name: '李大壮',
          //         comment: '不错2！不错2！不错2！不错2！不错2！不错2！不错2！不错2！不错2！不错2！不错2！不错2！不错2！不错2！不错2！不错2！',
          //         score: 90
          //       },
          //       {
          //         name: '王小二',
          //         comment: '不错值得表扬表扬不错值得表扬表扬不错值得表扬表扬不错值得表扬表扬不错值得表扬表扬不错值得表扬表扬不错值得表扬表扬',
          //         score: 590
          //       }
          //     ],
          //     rank: 3
          //   },
          //   {
          //     questionId: 2,
          //     questionName: '问题2',
          //     evaluation: [
          //       {
          //         name: '张',
          //         comment: '字符数',
          //         score: 290
          //       },
          //       {
          //         name: '李',
          //         comment: ' 字符',
          //         score: 590
          //       },
          //       {
          //         name: 'w',
          //         comment: '个的！',
          //         score: 590
          //       }
          //     ],
          //     rank: 6
          //   },
          //   {
          //     questionId: 3,
          //     questionName: '问题3',
          //     evaluation: [
          //       {
          //         name: '张',
          //         comment: '出租车！',
          //         score: 920
          //       },
          //       {
          //         name: '李',
          //         comment: '正常！',
          //         score: 2
          //       },
          //       {
          //         name: 'w',
          //         comment: '额发！',
          //         score: 590
          //       }
          //     ],
          //     rank: 9
          //   }
          // ]
          //真实数据
          let data = res.data.data
          if (data.length == 0) {
            //渲染名字
            this.evaluation = [
              {
                name: '暂无数据',
                comment: '暂无数据',
                score: '暂无数据'
              }
            ]
            //问题评分评价
            this.question = [
              {
                questionId: 1,
                questionName: '暂无数据',
                evaluation: [
                  {
                    name: '暂无数据',
                    comment: '暂无数据',
                    score: '暂无数据'
                  }
                ],
                rank: '暂无数据'
              }
            ]
          } else {
            //渲染名字
            this.evaluation = data[0].evaluation
            //问题评分评价
            this.question = data
          }
        })
        .catch(() => {
          this.$message({
            showClose: true,
            message: '获取面试评价信息失败',
            type: 'error',
            center: true,
            duration: 2000
          })
        })
    },
    //获取简历数据(ok)
    getResume() {
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
          console.log(res, '简历数据')
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
          if (data.gender == 1) {
            data.gender = '男'
          }
          if (data.gender == 2) {
            data.gender = '女'
          }
          //赋值
          this.ruleForm = data
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
    }
  }
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
  .bigbig {
    font-size: 45px;
    text-align: left;
    font-weight: 700;
    color: rgba(0, 0, 0, 0.699);
  }
  //大标题样式
  .bigTitle {
    background-color: #fff;
    font-size: 35px;
    text-align: left;
    font-weight: 700;
    margin-top: 20px;
  }
  // 报名表样式
  .registerTable {
    border-left: 2px solid gray;
    padding-left: 13px;
    // .bigTitle{
    //   background-color: #fff;
    //   font-size: 50px;
    //   text-align: left;
    //   font-weight: 700;
    // }
    // 基本问题模块
    .one {
      // background-color: rgb(164, 199, 82);
      margin-top: 15px;
      .tit {
        font-size: 25px;
        // background-color: rgb(60, 170, 113);
        text-align: left;
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
        // margin-top: 0px;
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
        margin-top: 20px;
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
    //部门问题和综合问题模块
    .two {
      // background-color: rgb(82, 199, 154);
      margin-top: 20px;
      .tit {
        font-size: 25px;
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
  }
  // 面试反馈
  .reply {
    margin-top: 10px;
    border-left: 2px solid gray;
    .replyItem {
      font-size: 20px;
      text-align: left;
      padding-left: 13px;
      height: 40px;
      line-height: 40px;
      // background-color: rgb(102, 183, 142);
    }
  }
  // 面试安排
  .arrange,
  .inform,
  .evaluate,
  .result {
    margin-top: 10px;
    border-left: 2px solid gray;
    .table {
      margin-left: 20px;
    }
  }
  .evaluate {
    .interview {
      font-size: 25px;
      text-align: left;
      padding-left: 13px;
      margin: 13px 0;
    }
    .detail {
      padding-left: 20px;
      .tit2 {
        font-size: 18px;
        text-align: left;
        margin: 10px 0;
      }
    }
    .interview:hover {
      color: #66b1ff;
      cursor: pointer;
    }
  }
  .result {
    margin-bottom: 40px;
  }
}
tr {
  height: 40px;
}
table {
  border-collapse: collapse;
  text-align: center;
}
table td,
table th {
  padding: 5px;
  border: 1px solid rgb(232, 231, 231);
  color: rgb(132, 129, 129);
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
/deep/.el-input.is-disabled .el-input__inner {
  color: #606266;
}
</style>
