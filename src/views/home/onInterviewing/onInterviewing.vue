<template>
  <div class="all">
    <!-- 顶部进度条 -->
    <div class="one">
      <div class="progress" v-for="(item, index) in barData" :key="index">
        <el-progress
          :text-inside="true"
          :stroke-width="18"
          :percentage="item.proportion"
        ></el-progress>
        <div class="time">
          <span class="start">{{ item.startTime }}</span>
          <span class="end">{{ item.endTime }}</span>
        </div>
        <div class="surplus" v-show="item.total != 0">
          剩余{{ item.total }}人
        </div>
      </div>
    </div>
    <!-- <hr /> -->
    <div style="height: 1px; background-color: #b4a3ae"></div>
    <!-- 改变面试地点 -->
    <div class="two">
      <span class="address">面试地点:</span>
      <el-select v-model="position" placeholder="面试地点" class="select">
        <el-option
          v-for="(item, index) in options"
          :key="index"
          :label="item.address"
          :value="item.address"
        >
        </el-option>
      </el-select>
    </div>
    <!-- 文字：待面试人员名单 -->
    <!-- <div class="three">当前时段待面试人员名单</div> -->
    <!-- 搜索框 二维码-->
    <div class="four">
      <div class="search">
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="search"
        >
        </el-input>
      </div>
      <!-- <el-button class="yes" type="primary" plain @click="getSearch"
        >搜索</el-button
      > -->
      <el-button type="primary" @click="displayCode" class="qrcode"
        >点击生成签到二维码</el-button
      >
      <!-- 点击弹出的页面 -->
      <el-dialog title="签到二维码" :visible.sync="dialogVisible1" width="30%">
        <div v-loading="loadingtwo">
          <img
            style="width: 300px; height: 300px; margin: 0 auto"
            :src="code"
          />
        </div>
        <div class="tips">请于面试开始前<strong>三十分钟</strong>之内扫码</div>
        <!-- <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible1 = false"
            >关 闭</el-button
          >
        </span> -->
      </el-dialog>
    </div>
    <!-- 表格数据 -->
    <div class="five">
      <el-table
        :data="tableData"
        border
        class="table"
        style="width: 95%; font-size: 16px; margin-left: 20px; overflow-y: auto"
        :cell-style="{ padding: '0' }"
        :row-style="{ height: '0' }"
        v-loading="loading"
        height="50vh"
      >
        <!-- id -->
        <el-table-column label="ID" align="center" width="100" prop="num">
        </el-table-column>
        <!-- 学号 -->
        <el-table-column prop="studentId" label="学号" align="center">
        </el-table-column>
        <!-- 姓名 -->
        <el-table-column prop="studentName" label="姓名" align="center">
        </el-table-column>
        <!-- 班级 -->
        <el-table-column prop="className" label="班级" align="center">
        </el-table-column>
        <!-- 面试地点 -->
        <el-table-column prop="address" label="面试地点" align="center">
        </el-table-column>
        <!-- 面试状态 -->
        <el-table-column prop="status" label="面试状态" align="center">
        </el-table-column>
        <!-- 简历 -->
        <el-table-column prop="resume" label="简历" width="80" align="center">
          <template slot-scope="scope">
            <div class="resumeTable">
              <!-- 弹窗按钮 -->
              <el-button type="text" @click="openResume(scope.row)">
                <i class="el-icon-s-order" style="font-size: 20px"></i>
              </el-button>
              <!-- 简历弹窗 -->
              <el-dialog
                title=""
                :visible.sync="dialogVisible2"
                width="65%"
                top="30px"
              >
                <!-- 主体内容 -->
                <div class="resume">
                  <!-- 标题 -->
                  <div class="bigTitle">报名表</div>
                  <!-- 内容 -->
                  <div class="registerTable">
                    <!-- 基本问题模块 -->
                    <div class="base">
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
                          <el-input
                            v-model="ruleForm.studentName"
                            disabled
                          ></el-input>
                        </el-form-item>
                        <el-form-item
                          label="学号"
                          prop="studentId"
                          v-if="ruleForm.studentId != null"
                        >
                          <el-input
                            v-model="ruleForm.studentId"
                            disabled
                          ></el-input>
                        </el-form-item>
                        <el-form-item
                          label="电话"
                          prop="phone"
                          v-if="ruleForm.phone != null"
                        >
                          <el-input
                            v-model="ruleForm.phone"
                            disabled
                          ></el-input>
                        </el-form-item>
                        <el-form-item
                          label="QQ"
                          prop="qq"
                          v-if="ruleForm.qq != null"
                        >
                          <el-input v-model="ruleForm.qq" disabled></el-input>
                        </el-form-item>
                        <el-form-item
                          label="学院"
                          prop="academy"
                          v-if="ruleForm.academy != null"
                        >
                          <el-input
                            v-model="ruleForm.academy"
                            disabled
                          ></el-input>
                        </el-form-item>
                        <el-form-item
                          label="专业"
                          prop="major"
                          v-if="ruleForm.major != null"
                        >
                          <el-input
                            v-model="ruleForm.major"
                            disabled
                          ></el-input>
                        </el-form-item>
                        <el-form-item
                          label="班级"
                          prop="classNum"
                          v-if="ruleForm.classNum != null"
                        >
                          <el-input
                            v-model="ruleForm.classNum"
                            disabled
                          ></el-input>
                        </el-form-item>
                        <el-form-item
                          label="性别"
                          prop="gender"
                          v-if="ruleForm.gender != null"
                        >
                          <el-input
                            v-model="ruleForm.gender"
                            disabled
                          ></el-input>
                        </el-form-item>
                        <el-form-item
                          label="邮箱"
                          prop="email"
                          v-if="ruleForm.email != null"
                        >
                          <el-input
                            v-model="ruleForm.email"
                            disabled
                          ></el-input>
                        </el-form-item>

                        <el-form-item
                          label="身高"
                          prop="height"
                          v-if="ruleForm.height != null"
                        >
                          <el-input
                            v-model="ruleForm.height"
                            disabled
                          ></el-input>
                        </el-form-item>

                        <el-form-item
                          label="体重"
                          prop="weight"
                          v-if="ruleForm.weight != null"
                        >
                          <el-input
                            v-model="ruleForm.weight"
                            disabled
                          ></el-input>
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
                          <div style="margin-right: 40px">
                            选择：{{ item.question }}
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
                    <!-- 部门问题模块 -->
                    <div class="department">
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
                    <div class="department">
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
                          <div style="margin-right: 40px">
                            选择：{{ item.question }}
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
                  </div>
                </div>
                <!-- 底部按钮 -->
                <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="dialogVisible2 = false"
                    >关 闭</el-button
                  >
                </span>
              </el-dialog>
            </div>
          </template>
        </el-table-column>
        <!-- 面试评价 -->
        <el-table-column
          prop="evaluate"
          label="面试评价"
          width="100"
          align="center"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="openEvaluate(scope.row)">
              <i class="el-icon-s-custom" style="font-size: 20px"></i>
            </el-button>
            <!-- 面试评价弹窗 -->
            <el-dialog title="" :visible.sync="dialogVisible3" width="50%">
              <div class="result">
                <div class="title">面试评价</div>
                <div class="content">
                  <el-input
                    type="textarea"
                    :rows="10"
                    placeholder="在这里写下面试评价"
                    v-model="estimate"
                    resize="none"
                  >
                  </el-input>
                </div>
                <div class="getscore">
                  <span style="font-size: 20px; margin-right: 10px"
                    >面试总得分:</span
                  >
                  <el-input
                    placeholder="请输入得分"
                    v-model="score"
                    clearable
                    style="width: 200px"
                  >
                  </el-input>
                </div>
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible3 = false">取 消</el-button>
                <el-button type="primary" @click="clicksendEvaluation"
                  >确 定</el-button
                >
              </span>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 页脚 -->
    <div class="six">
      <div class="total">共有{{ totalNum }}条记录</div>
      <div class="page">
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page="currentPage"
          @current-change="handleCurrentChange"
          :total="totalNum"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      admissionId: sessionStorage.getItem('homeAdmissionId'),
      organizationId: sessionStorage.getItem('loginOrganizationId'),
      //待拿取
      departmentId: 0,
      round: 1,
      //进度条定时器
      timer: '',
      //定时获取表格数据
      timer2: '',
      //进度条数据
      barData: [],
      //下拉框的选项
      options: [],
      //下拉框选择的地点数据
      position: '',
      //当前页
      currentPage: 1,
      //总个数
      totalNum: 0,
      //搜索的文字
      search: '',
      //二维码图片的链接
      code: '',
      //二维码弹出框的显示与隐藏
      dialogVisible1: false,
      //二维码的loading效果
      loadingtwo: true,
      //简历弹出框显示与隐藏
      dialogVisible2: false,
      //面试评价弹出框显示与隐藏
      dialogVisible3: false,
      //点击的学生学号
      stdId: '',
      //表格数据
      tableData: [],
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
      //面试评价文字
      estimate: '',
      //面试得分
      score: '',
      //加载
      loading: true
    }
  },
  mounted() {
    this.getLocation()
    this.getProgressBar()
    //定时获取进度条数据(60s)
    this.timer = setInterval(this.getProgressBar, 60000)
  },
  watch: {
    //监视地点改变
    position() {
      this.currentPage = 1
      this.search=''
      this.getTableData()
    },
    search() {
      this.currentPage = 1
      if (this.position != '') {
        this.getTableData()
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
    clearInterval(this.timer2)
  },
  methods: {
    //获取departmentid(ok)
    getDepartmentId() {
      let studentId = this.stdId
      let organizationId = this.organizationId
      // console.log(studentId, '学号')
      let url = `api/real-time-interview/info/department-id?studentId=${studentId}&organizationId=${organizationId}`
      let get = this.$http.get(url)
      get
        .then((res) => {
          // console.log(res, '获取departmentid')
          if (res.data.code == 'A0400') {
            this.$message({
              showClose: true,
              message: res.data.message,
              type: 'error',
              center: true,
              duration: 2000
            })
          } else {
            // this.dialogVisible3 = true
            // let data = 1
            //真实数据
            let data = res.data.data
            this.departmentId = data
            this.getRound()
          }
        })
        .catch(() => {
          this.$message({
            showClose: true,
            message: '获取departmentid失败',
            type: 'error',
            center: true,
            duration: 2000
          })
        })
    },
    //获取面试轮次(ok)
    getRound() {
      let admissionId = this.admissionId
      let departmentId = this.departmentId
      let url = `api/interview-data/time/getDepartmentRound?admissionId=${admissionId}&departmentId=${departmentId}`
      let get = this.$http.get(url)
      get
        .then((res) => {
          if (res.data.code == 'A0400') {
            this.$message({
              showClose: true,
              message: res.data.message,
              type: 'error',
              center: true,
              duration: 2000
            })
          } else {
            // console.log(res, '获取面试轮次')
            this.round = res.data.data.round
            this.dialogVisible3 = true
            this.getEvaluation()
          }
        })
        .catch(() => {
          this.$message({
            showClose: true,
            message: '获取面试轮次失败',
            type: 'error',
            center: true,
            duration: 2000
          })
        })
    },
    //获取地点（ok）
    getLocation() {
      let sendData = {
        admissionId: this.admissionId
      }
      let url = `api/real-time-interview/info/address`
      let post = this.$http.post(url, sendData)
      post
        .then((res) => {
          // console.log(res, '获取地点信息')
          // 模拟数据
          // let data = [
          //   {
          //     address: '7-115'
          //   },
          //   {
          //     address: '6号楼206'
          //   }]
          if (res.data.code == 'A0400') {
            this.$message({
              showClose: true,
              message: res.data.message,
              type: 'warning',
              center: true,
              duration: 4000
            })
            this.loading = false
          } else {
            //真实数据
            let data = res.data.data.addressAndDataBackParamList
            let reldata = []
            //去掉null项
            data.forEach((item) => {
              if (item != null) {
                reldata.push(item)
              }
            })
            // this.options = reldata
            //默认展示第一个地点的数据
            if (reldata.length != 0) {
              this.options = reldata
              this.position = reldata[0].address
              //在此获取表格数据 添加定时器
              this.timer2 = setInterval(this.getTableData, 60000)
            } else {
              this.loading = false
            }
          }
        })
        .catch(() => {
          this.loading = false
          this.$message({
            showClose: true,
            message: '获取面试地点失败',
            type: 'error',
            center: true,
            duration: 2000
          })
        })
    },
    //获取进度条数据(ok)
    getProgressBar() {
      let sendData = {
        admissionId: this.admissionId,
        organizationId: this.organizationId
      }
      let url = `api/real-time-interview/info/remain`
      let post = this.$http.post(url, sendData)
      post
        .then((res) => {
          // console.log(res, '获取进度条数据')
          // 模拟数据
          // let data = [
          //   {
          //     total: 0,
          //     startTime: '00:00',
          //     endTime: '01:00',
          //     proportion: 100
          //   },
          //   {
          //     total: 12,
          //     startTime: '01:00',
          //     endTime: '02:00',
          //     proportion: 50
          //   },
          //   {
          //     total: 18,
          //     startTime: '02:00',
          //     endTime: '03:00',
          //     proportion: 80
          //   },
          //   {
          //     total: 20,
          //     startTime: '03:00',
          //     endTime: '04:00',
          //     proportion: 20
          //   }
          // ]
          if (res.data.code == 'A0400') {
            this.barData = [
              {
                total: '{暂无数据}',
                startTime: res.data.message,
                endTime: '',
                proportion: 0
              }
            ]
          } else {
            //真实数据
            let data = res.data.data.remainStuResults
            this.barData = data
          }
        })
        .catch(() => {
          this.$message({
            showClose: true,
            message: '获取进度条数据失败',
            type: 'error',
            center: true,
            duration: 2000
          })
        })
    },
    //点击生成二维码按钮(ok)
    displayCode() {
      if (this.position == '') {
        this.$message({
          showClose: true,
          message: '请先选择面试地点',
          type: 'error',
          center: true,
          duration: 2000
        })
      } else {
        this.dialogVisible1 = true
        //生成二维码
        let sendData = {
          admissionId: this.admissionId,
          address: this.position,
          organizationId: this.organizationId
        }
        let url = `api/real-time-interview/qr-code-base64`
        let post = this.$http.post(url, sendData)
        post
          .then((res) => {
            if (res.data.code == 'A0400') {
              this.$message({
                showClose: true,
                message: res.data.message,
                type: 'error',
                center: true,
                duration: 2000
              })
            } else {
              // console.log(res, '获取二维码')
              this.loadingtwo = false
              //模拟数据
              // let data = {
              //     "code":"0000",
              //     "message" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAYAAAB5fY51AAAVy0lEQVR4Xu3UwW7sOhZD0ff/P909yCi7ALqYK+FQMhewJwEIy0rB//2vquoQ//EPVVWp+sGqqmP0g1VVx+gHq6qO0Q9WVR2jH6yqOkY/WFV1jH6wquoY/WBV1TH6waqqY/SDVVXH6Aerqo7RD1ZVHaMfrKo6Rj9YVXWMfrCq6hj9YFXVMfrBqqpj9INVVcfoB6uqjtEPVlUdox+sqjpGP1hVdYx+sKrqGP1gVdUx+sGqqmP0g1VVx+gHq6qO0Q9WVR2jH6yqOkY/WFV1jH6wquoY/WBV1TFiPlj//fdfM3NwuyoHt6pd+Jz2XJKY0/CS2nMOblfl4Fa1C5/TnksScxpeUnvOwe2qHNyqduFz2nNJYk7DS2rPObhdlYNb1S58TnsuScxpeEntOQe3q3Jwq9qFz2nPJYk5DS+pPefgdlUOblW78DntuSQxp+Eltecc3K7Kwa1qFz6nPZck5jS8pPacg9tVObhV7cLntOeSxJyGl9Sec3C7Kge3ql34nPZckpjT8JLacw5uV+XgVrULn9OeSxJzGl5Se87B7aoc3Kp24XPac0liTsNLUt2M76pycKtKwDOpHNyqbsZ3VSWJOQ0vSXUzvqvKwa0qAc+kcnCruhnfVZUk5jS8JNXN+K4qB7eqBDyTysGt6mZ8V1WSmNPwklQ347uqHNyqEvBMKge3qpvxXVVJYk7DS1LdjO+qcnCrSsAzqRzcqm7Gd1UliTkNL0l1M76rysGtKgHPpHJwq7oZ31WVJOY0vCTVzfiuKge3qgQ8k8rBrepmfFdVkpjT8JJUN+O7qhzcqhLwTCoHt6qb8V1VSWJOw0tS3YzvqnJwq0rAM6kc3KpuxndVJYk5DS9JdTO+q8rBrSoBz6RycKu6Gd9VlSTmNLwk1c34rioHt6oEPJPKwa3qZnxXVZKY0/CSVA5uJ3Jwq3Jwq9qFz1mVg1uVg9uJHNyqksSchpekcnA7kYNblYNb1S58zqoc3Koc3E7k4FaVJOY0vCSVg9uJHNyqHNyqduFzVuXgVuXgdiIHt6okMafhJakc3E7k4Fbl4Fa1C5+zKge3Kge3Ezm4VSWJOQ0vSeXgdiIHtyoHt6pd+JxVObhVObidyMGtKknMaXhJKge3Ezm4VTm4Ve3C56zKwa3Kwe1EDm5VSWJOw0tSObidyMGtysGtahc+Z1UOblUObidycKtKEnMaXpLKwe1EDm5VDm5Vu/A5q3Jwq3JwO5GDW1WSmNPwklQObidycKtycKvahc9ZlYNblYPbiRzcqpLEnIaXpHJwO5GDW5WDW9UufM6qHNyqHNxO5OBWlSTmNLwklYPbiRzcqhzcqnbhc1bl4Fbl4HYiB7eqJDGn4SWpHNxO5OBWlYBnUjm4VTm4VTm4ncjBrSpJzGl4SSoHtxM5uFUl4JlUDm5VDm5VDm4ncnCrShJzGl6SysHtRA5uVQl4JpWDW5WDW5WD24kc3KqSxJyGl6RycDuRg1tVAp5J5eBW5eBW5eB2Ige3qiQxp+ElqRzcTuTgVpWAZ1I5uFU5uFU5uJ3Iwa0qScxpeEkqB7cTObhVJeCZVA5uVQ5uVQ5uJ3Jwq0oScxpeksrB7UQOblUJeCaVg1uVg1uVg9uJHNyqksSchpekcnA7kYNbVQKeSeXgVuXgVuXgdiIHt6okMafhJakc3E7k4FaVgGdSObhVObhVObidyMGtKknMaXhJKge3Ezm4VSXgmVQOblUOblUObidycKtKEnMaXpLKwe1EDm5VCXgmlYNblYNblYPbiRzcqpLEnIaXpHJwO5GDW5WD25tycKtycDuRg1tVkpjT8JJUDm4ncnCrcnB7Uw5uVQ5uJ3Jwq0oScxpeksrB7UQOblUObm/Kwa3Kwe1EDm5VSWJOw0tSObidyMGtysHtTTm4VTm4ncjBrSpJzGl4SSoHtxM5uFU5uL0pB7cqB7cTObhVJYk5DS9J5eB2Ige3Kge3N+XgVuXgdiIHt6okMafhJakc3E7k4Fbl4PamHNyqHNxO5OBWlSTmNLwklYPbiRzcqhzc3pSDW5WD24kc3KqSxJyGl6RycDuRg1uVg9ubcnCrcnA7kYNbVZKY0/CSVA5uJ3Jwq3Jwe1MOblUObidycKtKEnMaXpLKwe1EDm5VDm5vysGtysHtRA5uVUliTsNLUt2M76rahc9RnYbnV92M76pKEnMaXpLqZnxX1S58juo0PL/qZnxXVZKY0/CSVDfju6p24XNUp+H5VTfju6qSxJyGl6S6Gd9VtQufozoNz6+6Gd9VlSTmNLwk1c34rqpd+BzVaXh+1c34rqokMafhJaluxndV7cLnqE7D86tuxndVJYk5DS9JdTO+q2oXPkd1Gp5fdTO+qypJzGl4Saqb8V1Vu/A5qtPw/Kqb8V1VSWJOw0tS3YzvqtqFz1GdhudX3YzvqkoScxpekupmfFfVLnyO6jQ8v+pmfFdVkpjT8JJUN+O7qnbhc1Sn4flVN+O7qpLEnIaX1J5zcKtycKtycKtycNueSxJzGl5Se87BrcrBrcrBrcrBbXsuScxpeEntOQe3Kge3Kge3Kge37bkkMafhJbXnHNyqHNyqHNyqHNy255LEnIaX1J5zcKtycKtycKtycNueSxJzGl5Se87BrcrBrcrBrcrBbXsuScxpeEntOQe3Kge3Kge3Kge37bkkMafhJbXnHNyqHNyqHNyqHNy255LEnIaX1J5zcKtycKtycKtycNueSxJzGl5Se87BrcrBrcrBrcrBbXsuScxpeEntOQe3Kge3Kge3Kge37bkkWaepCPzBrqrqX/VXVB/4oVlV1b/qr6g+8EOzqqp/1V9RfeCHZlVV/6q/ovrAD82qqv5Vf0X1gR+aVVX9q/6K6gM/NKuq+lf9FdUHfmhWVfWv+iuqD/zQrKrqX/VXVB/4oVlV1b/qr6g+8EOzqqp/FfMr4o9btQuf89Z24XNUDm5Vu/A5Kge3EyWJOQ0vSbULn/PWduFzVA5uVbvwOSoHtxMliTkNL0m1C5/z1nbhc1QOblW78DkqB7cTJYk5DS9JtQuf89Z24XNUDm5Vu/A5Kge3EyWJOQ0vSbULn/PWduFzVA5uVbvwOSoHtxMliTkNL0m1C5/z1nbhc1QOblW78DkqB7cTJYk5DS9JtQuf89Z24XNUDm5Vu/A5Kge3EyWJOQ0vSbULn/PWduFzVA5uVbvwOSoHtxMliTkNL0m1C5/z1nbhc1QOblW78DkqB7cTJYk5DS9JtQuf89Z24XNUDm5Vu/A5Kge3EyWJOQ0vSbULn/PWduFzVA5uVbvwOSoHtxMliTkNL2lVCXgm1Wl4fpWD24l24XMmOlXMyXmhq0rAM6lOw/OrHNxOtAufM9GpYk7OC11VAp5JdRqeX+XgdqJd+JyJThVzcl7oqhLwTKrT8PwqB7cT7cLnTHSqmJPzQleVgGdSnYbnVzm4nWgXPmeiU8WcnBe6qgQ8k+o0PL/Kwe1Eu/A5E50q5uS80FUl4JlUp+H5VQ5uJ9qFz5noVDEn54WuKgHPpDoNz69ycDvRLnzORKeKOTkvdFUJeCbVaXh+lYPbiXbhcyY6VczJeaGrSsAzqU7D86sc3E60C58z0aliTs4LXVUCnkl1Gp5f5eB2ol34nIlOdeTJefkqB7cqB7cT7cLnTOTgVnUann9VSbJO8yVeqMrBrcrB7US78DkTObhVnYbnX1WSrNN8iReqcnCrcnA70S58zkQOblWn4flXlSTrNF/ihaoc3Koc3E60C58zkYNb1Wl4/lUlyTrNl3ihKge3Kge3E+3C50zk4FZ1Gp5/VUmyTvMlXqjKwa3Kwe1Eu/A5Ezm4VZ2G519VkqzTfIkXqnJwq3JwO9EufM5EDm5Vp+H5V5Uk6zRf4oWqHNyqHNxOtAufM5GDW9VpeP5VJck6zZd4oSoHtyoHtxPtwudM5OBWdRqef1VJsk7zJV6oysGtysHtRLvwORM5uFWdhudfVZKs03yJF6pycKtycDvRLnzORA5uVafh+VeVJOs0X+KFTuTgVrULnzORg9tVObhdlYPbiZJkneZLvNCJHNyqduFzJnJwuyoHt6tycDtRkqzTfIkXOpGDW9UufM5EDm5X5eB2VQ5uJ0qSdZov8UIncnCr2oXPmcjB7aoc3K7Kwe1ESbJO8yVe6EQOblW78DkTObhdlYPbVTm4nShJ1mm+xAudyMGtahc+ZyIHt6tycLsqB7cTJck6zZd4oRM5uFXtwudM5OB2VQ5uV+XgdqIkWaf5Ei90Ige3ql34nIkc3K7Kwe2qHNxOlCTrNF/ihU7k4Fa1C58zkYPbVTm4XZWD24mSZJ3mS7zQiRzcqnbhcyZycLsqB7ercnA7UZKs03yJFzqRg1vVLnzORA5uV+XgdlUObidKknWaL/FCJ3JwuyoHt6u6Gd9VdRqeX5Uk6zRf4oVO5OB2VQ5uV3UzvqvqNDy/KknWab7EC53Iwe2qHNyu6mZ8V9VpeH5VkqzTfIkXOpGD21U5uF3VzfiuqtPw/KokWaf5Ei90Ige3q3Jwu6qb8V1Vp+H5VUmyTvMlXuhEDm5X5eB2VTfju6pOw/OrkmSd5ku80Ikc3K7Kwe2qbsZ3VZ2G51clyTrNl3ihEzm4XZWD21XdjO+qOg3Pr0qSdZov8UIncnC7Kge3q7oZ31V1Gp5flSTrNF/ihU7k4HZVDm5XdTO+q+o0PL8qSdZpvsQLncjB7aoc3K7qZnxX1Wl4flWSrNPUNvwRTpSAZ1I5uJ3oDd7xlvXx454oAc+kcnA70Ru84y3r48c9UQKeSeXgdqI3eMdb1sePe6IEPJPKwe1Eb/COt6yPH/dECXgmlYPbid7gHW9ZHz/uiRLwTCoHtxO9wTvesj5+3BMl4JlUDm4neoN3vGV9/LgnSsAzqRzcTvQG73jL+vhxT5SAZ1I5uJ3oDd7xlvXx454oAc+kcnA70Ru84y3r48c9UQKeSeXgdqI3iHlLXn57zsHtTSXgmVZVv8XcCP9R7TkHtzeVgGdaVf0WcyP8R7XnHNzeVAKeaVX1W8yN8B/VnnNwe1MJeKZV1W8xN8J/VHvOwe1NJeCZVlW/xdwI/1HtOQe3N5WAZ1pV/RZzI/xHtecc3N5UAp5pVfVbzI3wH9Wec3B7Uwl4plXVbzE3wn9Ue87B7U0l4JlWVb/F3Aj/Ue05B7c3lYBnWlX9FnMj/Ee15xzc3lQCnmlV9VvMjfAfpboZ31Xl4Fbl4HZVu/A5Ezm4nShJzGl4Saqb8V1VDm5VDm5XtQufM5GD24mSxJyGl6S6Gd9V5eBW5eB2VbvwORM5uJ0oScxpeEmqm/FdVQ5uVQ5uV7ULnzORg9uJksSchpekuhnfVeXgVuXgdlW78DkTObidKEnMaXhJqpvxXVUOblUOble1C58zkYPbiZLEnIaXpLoZ31Xl4Fbl4HZVu/A5Ezm4nShJzGl4Saqb8V1VDm5VDm5XtQufM5GD24mSxJyGl6S6Gd9V5eBW5eB2VbvwORM5uJ0oScxpeEmqm/FdVQ5uVQ5uV7ULnzORg9uJksSchpekuhnfVeXgVuXgdlW78DkTObidKEnMaXhJKge3Ezm4VTm4VdUP3ovKwa3Kwa3qVDEn54WqHNxO5OBW5eBWVT94LyoHtyoHt6pTxZycF6pycDuRg1uVg1tV/eC9qBzcqhzcqk4Vc3JeqMrB7UQOblUOblX1g/eicnCrcnCrOlXMyXmhKge3Ezm4VTm4VdUP3ovKwa3Kwa3qVDEn54WqHNxO5OBW5eBWVT94LyoHtyoHt6pTxZycF6pycDuRg1uVg1tV/eC9qBzcqhzcqk4Vc3JeqMrB7UQOblUOblX1g/eicnCrcnCrOlXMyXmhKge3Ezm4VTm4VdUP3ovKwa3Kwa3qVDEn54WqHNxO5OBW5eBWVT94LyoHtyoHt6pTxZycF6pycDuRg1uVg1tV/eC9qBzcqhzcqk4Vc3JeqMrB7UQOblUObtNzcLuqyhPzX+GPReXgdiIHtyoHt+k5uF1V5Yn5r/DHonJwO5GDW5WD2/Qc3K6q8sT8V/hjUTm4ncjBrcrBbXoObldVeWL+K/yxqBzcTuTgVuXgNj0Ht6uqPDH/Ff5YVA5uJ3Jwq3Jwm56D21VVnpj/Cn8sKge3Ezm4VTm4Tc/B7aoqT8x/hT8WlYPbiRzcqhzcpufgdlWVJ+a/wh+LysHtRA5uVQ5u03Nwu6rKE/Nf4Y9F5eB2Ige3Kge36Tm4XVXlifmv8MeicnA7kYNblYPb9BzcrqryxPxX+GNRObidyMGtKgHPpHJwu6pd+JxVObhdVZKY0/CSVA5uJ3Jwq0rAM6kc3K5qFz5nVQ5uV5Uk5jS8JJWD24kc3KoS8EwqB7er2oXPWZWD21UliTkNL0nl4HYiB7eqBDyTysHtqnbhc1bl4HZVSWJOw0tSObidyMGtKgHPpHJwu6pd+JxVObhdVZKY0/CSVA5uJ3Jwq0rAM6kc3K5qFz5nVQ5uV5Uk5jS8JJWD24kc3KoS8EwqB7er2oXPWZWD21UliTkNL0nl4HYiB7eqBDyTysHtqnbhc1bl4HZVSWJOw0tSObidyMGtKgHPpHJwu6pd+JxVObhdVZKY0/CSVA5uJ3Jwq0rAM6kc3K5qFz5nVQ5uV5Uk5jS8JJWD24kc3KoS8EwqB7er2oXPWZWD21UliTkNL0l1M76rahc+Z6Jd+ByVg9ubShJzGl6S6mZ8V9UufM5Eu/A5Kge3N5Uk5jS8JNXN+K6qXficiXbhc1QObm8qScxpeEmqm/FdVbvwORPtwueoHNzeVJKY0/CSVDfju6p24XMm2oXPUTm4vakkMafhJaluxndV7cLnTLQLn6NycHtTSWJOw0tS3YzvqtqFz5loFz5H5eD2ppLEnIaXpLoZ31W1C58z0S58jsrB7U0liTkNL0l1M76rahc+Z6Jd+ByVg9ubShJzGl6S6mZ8V9UufM5Eu/A5Kge3N5Uk5jS8JNXN+K6qXficiXbhc1QObm8qScxpeEntOQe3qgQ8003V38XcHv+p7TkHt6oEPNNN1d/F3B7/qe05B7eqBDzTTdXfxdwe/6ntOQe3qgQ8003V38XcHv+p7TkHt6oEPNNN1d/F3B7/qe05B7eqBDzTTdXfxdwe/6ntOQe3qgQ8003V38XcHv+p7TkHt6oEPNNN1d/F3B7/qe05B7eqBDzTTdXfxdwe/6ntOQe3qgQ8003V38XcHv+p7TkHt6oEPNNN1d/19qrqGP1gVdUx+sGqqmP0g1VVx+gHq6qO0Q9WVR2jH6yqOkY/WFV1jH6wquoY/WBV1TH6waqqY/SDVVXH6Aerqo7RD1ZVHaMfrKo6Rj9YVXWMfrCq6hj9YFXVMfrBqqpj9INVVcfoB6uqjtEPVlUdox+sqjpGP1hVdYx+sKrqGP1gVdUx+sGqqmP0g1VVx+gHq6qO0Q9WVR2jH6yqOkY/WFV1jH6wquoY/WBV1TH6waqqY/wf/xhRmMbh1c0AAAAASUVORK5CYII=",
              // }
              //真实数据
              let data = res.data
              this.code = data.message
            }
          })
          .catch(() => {
            this.$message({
              showClose: true,
              message: '获取二维码失败',
              type: 'error',
              center: true,
              duration: 2000
            })
          })
      }
    },
    //点击面试评价按钮获取学号和评价(ok)
    openEvaluate(row) {
      // this.dialogVisible3 = true
      this.stdId = row.studentId
      this.estimate = ''
      this.score = ''
      this.getDepartmentId()
      // this.getEvaluation()
    },
    // 获取面试评价(ok)
    getEvaluation() {
      let sendData = {
        studentId: this.stdId,
        admissionId: this.admissionId,
        departmentId: this.departmentId,
        round: this.round
      }
      let url = `api/real-time-interview/view-appraise`
      let post = this.$http.post(url, sendData)
      post
        .then((res) => {
          if (res.data.code == 'A0400') {
            this.$message({
              showClose: true,
              message: '暂无面试评价数据',
              type: 'error',
              center: true,
              duration: 2000
            })
          } else {
            // this.dialogVisible3 = true
            // console.log(res, '面试评价数据')
            // 模拟数据
            // let data = {
            //   data: 'good',
            //   score: '80'
            // }
            //真实数据
            let data = res.data.data
            if (data.data == null) {
              data.data = ''
            }
            if (data.score == null) {
              data.score = ''
            }
            this.estimate = data.data
            this.score = data.score
          }
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
    // 点击发送评价按钮(ok)
    clicksendEvaluation() {
      if (this.estimate == '') {
        this.$message({
          showClose: true,
          message: '评价不能为空',
          type: 'error',
          center: true,
          duration: 2000
        })
      } else {
        if (this.score == '') {
          this.$message({
            showClose: true,
            message: '得分不能为空',
            type: 'error',
            center: true,
            duration: 2000
          })
        } else {
          this.sendEvaluation()
        }
      }
    },
    //发送评价(ok)
    sendEvaluation() {
      // this.dialogVisible3 = false
      //发送面试评价
      let sendData = {
        studentId: this.stdId,
        admissionId: this.admissionId,
        departmentId: this.departmentId,
        score: this.score,
        round: this.round,
        data: this.estimate
      }
      console.log(sendData)
      let url = `api/real-time-interview/appraise`
      let post = this.$http.post(url, sendData)
      post
        .then(() => {
          // console.log(res, '发送面试评价')
          this.dialogVisible3 = false
          this.$message({
            showClose: true,
            message: '评价成功',
            type: 'success',
            center: true,
            duration: 2000
          })
        })
        .catch(() => {
          this.$message({
            showClose: true,
            message: '评价失败',
            type: 'error',
            center: true,
            duration: 2000
          })
        })
    },
    //当前页发生改变(ok)
    handleCurrentChange(val) {
      this.currentPage = val
      this.getTableData()
    },
    //获取表格数据（ok）
    getTableData() {
      // console.log('地点'+this.position,'页数'+this.currentPage,'搜索'+this.search)
      let pageNum = this.currentPage
      let address = this.position
      let admissionId = this.admissionId
      let keyword = this.search
      let url = `api/real-time-interview/info/all?pageNum=${pageNum}&address=${address}&admissionId=${admissionId}&keyword=${keyword}`
      let get = this.$http.get(url)
      get
        .then((res) => {
          // console.log(res, '获取表格数据')
          this.loading = false
          // 模拟数据
          // let data = {
          //   realTimeInfoParamList: [
          //     {
          //       studentId: 20200001,
          //       studentName: '张1',
          //       className: '计算机科学与技术一班',
          //       address: '7-115',
          //       status: 4
          //     },
          //     {
          //       studentId: 20200002,
          //       studentName: '张2',
          //       className: '计算2',
          //       address: '7-115',
          //       status: 4
          //     },
          //     {
          //       studentId: 20200003,
          //       studentName: '张3',
          //       className: '计算机科学与技术3班',
          //       address: '7-115',
          //       status: 5
          //     },
          //     {
          //       studentId: 20200004,
          //       studentName: '张4',
          //       className: '计算机科学与技术4班',
          //       address: '7-118',
          //       status: 5
          //     },
          //     {
          //       studentId: 20200005,
          //       studentName: '张5',
          //       className: '计算机科学与技术5班',
          //       address: '7-119',
          //       status: 4
          //     },
          //     {
          //       sysId: 1,
          //       studentId: 20200006,
          //       studentName: '张6',
          //       className: '信息安全4班',
          //       address: '7-117',
          //       status: 4
          //     },
          //     {
          //       sysId: 1,
          //       studentId: 20200007,
          //       studentName: '张7',
          //       className: '计算机科学与技术7班',
          //       address: '7-117',
          //       status: 5
          //     },
          //     {
          //       sysId: 1,
          //       studentId: 20200008,
          //       studentName: '张8',
          //       className: '大数据科学与技术2班',
          //       address: '7-114',
          //       status: 4
          //     },
          //     {
          //       sysId: 1,
          //       studentId: 20200009,
          //       studentName: '张9',
          //       className: '物联网1班',
          //       address: '7-116',
          //       status: 4
          //     },
          //     {
          //       sysId: 1,
          //       studentId: 20200010,
          //       studentName: '张0',
          //       className: '计算0',
          //       address: '7-114',
          //       status: 5
          //     }
          //   ],
          //   total: 12
          // }
          //真实
          let data = res.data.data
          data.realTimeInfoParamList.forEach((item, index) => {
            if (item.status == 4) {
              item.status = '未签到'
            }
            if (item.status == 5) {
              item.status = '已签到'
            }
            item.num = (this.currentPage - 1) * 10 + index + 1
          })
          this.totalNum = data.total
          this.tableData = data.realTimeInfoParamList
        })
        .catch(() => {
          this.$message({
            showClose: true,
            message: '获取表格数据失败',
            type: 'error',
            center: true,
            duration: 2000
          })
        })
    },
    //点击搜索(ok)
    // getSearch() {
    //   this.currentPage = 1
    //   if (this.position != '') {
    //     this.getTableData()
    //   }
    // },
    //点击简历按钮获取学号清空数组(ok)
    openResume(row) {
      this.dialogVisible2 = true
      this.stdId = row.studentId
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
      this.getResume()
    },
    //获取简历数据(ok)
    getResume() {
      let studentId = this.stdId
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
            //填空
            if (item.multipleChoice == 0) {
              this.basicQuestions1.push(item)
            }
            //选择
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
.all {
  width: calc(100vw - 250px);
  height: calc(100vh - 102px);
  // background-color: rgb(46, 108, 183);
  background-color: white;
  min-width: 1000px;
  min-height: 620px;
  .one {
    // background-color: rgb(37, 189, 98);
    background-color: white;
    width: calc(100vw - 280px);
    min-width: 1070px;
    padding: 0 15px;
    height: 112px;
    display: flex;
    justify-content: space-between;
    overflow-x: auto;
    .progress {
      width: 180px;
      height: 74px;
      margin-top: 15px;
      // margin-left: 20px;
      padding: 0 20px;
      background-color: white;
    }
    .time {
      height: 18px;
      margin-top: 5px;
      width: 170px;
      margin-left: 5px;
      color: rgb(82, 82, 82);
      background-color: white;
      .start {
        float: left;
      }
      .end {
        float: right;
      }
    }
    .surplus {
      height: 23px;
      width: 160px;
      margin-left: 10px;
      margin-top: 8px;
      text-align: center;
      border: 1px solid rgb(213, 209, 209);
      color: rgb(82, 82, 82);
      border-radius: 5px;
      // background-color: rgb(233, 81, 81);
    }
  }
  .two {
    height: 40px;
    // background-color: rgb(211, 185, 68);
    background-color: white;
    margin-top: 20px;
    .select {
      // margin-top: 15px;
      width: 110px;
      margin-left: 4px;
      float: left;
    }
    /deep/.el-select .el-input__inner {
      text-align: center;
    }
    .address {
      margin-left: 20px;
      float: left;
      font-size: 20px;
      margin-top: 5px;
      color: rgb(82, 82, 82);
      // border-bottom: 2px solid rgb(213, 211, 211);
    }
  }
  .three {
    // background-color: rgb(110, 168, 207);
    background-color: white;
    width: 280px;
    text-align: left;
    // margin-left: 20px;
    margin: 0 auto;
    margin-top: 9px;
    font-size: 22px;
    color: rgb(82, 82, 82);
    // border-bottom: 2px solid rgb(213, 211, 211);
  }
  .four {
    // background-color: rgb(196, 85, 107);
    background-color: white;
    height: 40px;
    margin-top: 8px;
    margin-bottom: 8px;
    position: relative;
    .search {
      display: inline-block;
      width: 200px;
      // margin-left: 20px;
      position: absolute;
      top: 0;
      left: 20px;
    }
    .qrcode {
      float: right;
      margin-right: 3vw;
    }
    .yes {
      position: absolute;
      left: 230px;
    }
    .tips {
      font-size: 17px;
    }
    /deep/.el-dialog {
      height: calc(100vh - 250px);
      // background-color: rgb(58, 145, 129);
      min-width: 400px;
      min-height: 485px;
      // min-height: calc(100vh - 150px);
      margin: 0 auto 30px;
    }
  }
  .five {
    .table {
      // height: calc(100vh - 379px);

      min-height: 330px;
    }
    .resumeTable {
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
      .resume {
        height: calc(100vh - 60px - 150px);
        min-width: 800px;
        min-height: 480px;
        // background-color: rgb(72, 143, 188);
        background-color: white;
        overflow: auto;
        .bigTitle {
          background-color: #fff;
          font-size: 35px;
          text-align: left;
          font-weight: 700;
          margin-top: 20px;
          margin-bottom: 30px;
        }
        .registerTable {
          // border-left: 2px solid gray;
          padding-left: 18px;
          .base {
            // background-color: rgb(164, 199, 82);
            margin-top: 15px;
            .tit {
              font-size: 25px;
              // background-color: rgb(60, 170, 113);
              text-align: left;
            }
            .form {
              // background-color: rgb(78, 200, 186);
              margin-top: 20px;
              display: flex;
              flex-wrap: wrap;
              justify-content: flex-start;
            }
          }
          .department {
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
              margin-top: 0px;
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
      }
    }
    .result {
      width: 700px;
      height: 350px;
      min-width: 400px;
      background-color: white;
      .title {
        font-size: 28px;
        color: rgb(82, 82, 82);
        font-weight: 700;
        width: 200px;
      }
      .content {
        margin-top: 15px;
        margin-left: 43px;
        width: 600px;
        // width: 90%;
        height: 250px;
      }
    }
    /deep/.el-dialog {
      height: calc(100vh - 242px);
      // background-color: rgb(58, 145, 129);
      min-width: 750px;
      min-height: 500px;
      // min-height: calc(100vh - 150px);
      margin: 0 auto 30px;
    }
  }
  .six {
    height: 45px;
    margin-top: 2px;
    // background-color: rgb(185, 86, 50);
    background-color: white;
    position: relative;
    .total {
      display: inline-block;
      position: absolute;
      top: 0;
      left: 20px;
      text-align: left;
      // background-color: rgb(149, 139, 213);
      background-color: white;
      margin-top: 10px;
    }
    .page {
      background-color: white;
      display: inline-block;
      position: absolute;
      top: 5px;
      left: 70%;
    }
  }
}
</style>
