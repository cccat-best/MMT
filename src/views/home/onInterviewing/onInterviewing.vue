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
            <!-- 弹窗按钮 -->
            <el-button type="text" @click="openResumeDialog(scope.row)">
              <i class="el-icon-s-order" style="font-size: 20px"></i>
            </el-button>
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
                <el-tabs
                  tab-position="left"
                  style="height: 44vh; margin-top: 20px; min-height: 322px"
                  v-model="activeName"
                >
                  <el-tab-pane label="我的评价" name="first">
                    <div class="top1">
                      <div class="selectdepartmentid">选择评价部门:</div>
                      <el-select
                        v-model="departmentId"
                        placeholder="请选择评价部门"
                      >
                        <el-option
                          v-for="item in departmentIds"
                          :key="item.departmentId"
                          :label="item.departmentName"
                          :value="item.departmentId"
                        >
                        </el-option>
                      </el-select>
                    </div>
                    <div class="content">
                      <el-input
                        type="textarea"
                        :rows="10"
                        placeholder="在这里写下面试评价"
                        v-model="estimate"
                        resize="none"
                        style="display: block; min-height: 220px"
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
                        type="number"
                        style="width: 200px"
                      >
                      </el-input>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="全部评价" name="second">
                    <el-table
                      :data="evaluationTable"
                      border
                      height="44vh"
                      style="width: 100%; min-height: 300px"
                    >
                      <el-table-column
                        prop="interviewer"
                        label="姓名"
                        align="center"
                        width="120"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="score"
                        label="评分"
                        align="center"
                        width="100"
                      >
                      </el-table-column>
                      <el-table-column prop="data" align="center" label="评价">
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                </el-tabs>
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible3 = false">取 消</el-button>
                <el-button
                  type="primary"
                  @click="clicksendEvaluation"
                  :disabled="send"
                  >确 定</el-button
                >
              </span>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <resume-dialog ref="resumeDialog"></resume-dialog>
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
import resumeDialog from '../dataBoard/components/resumeDialog.vue'
export default {
  components: {
    resumeDialog
  },
  data() {
    return {
      admissionId: sessionStorage.getItem('homeAdmissionId'),
      organizationId: sessionStorage.getItem('loginOrganizationId'),
      send: false,
      //待拿取
      departmentId: '',
      departmentIds: [],
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
      //面试评价弹出框显示与隐藏
      dialogVisible3: false,
      //点击的学生学号
      stdId: '',
      //表格数据
      tableData: [],
      //面试评价文字
      estimate: '',
      //面试得分
      score: '',
      //防抖
      timeout: null,
      //面试总评
      evaluationTable: [],
      // 面试评价默认打开
      activeName: 'first',
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
      this.search = ''
      this.getTableData()
    },
    search() {
      this.currentPage = 1
      if (this.position != '') {
        this.getTableDataDelay()
      }
    },
    departmentId() {
      this.estimate = ''
      this.score = ''
      if (this.departmentId != '') {
        this.getRound()
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
            this.send = true
            this.$message({
              showClose: true,
              message: res.data.message,
              type: 'error',
              center: true,
              duration: 2000
            })
          } else {
            this.send = false
            let rellist = []
            let data = res.data.data.list
            data.forEach((item) => {
              if (item != null) {
                rellist.push(item)
              }
            })
            this.departmentIds = rellist
            this.departmentId = rellist[0].departmentId
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
            this.send = true
            this.$message({
              showClose: true,
              message: res.data.message,
              type: 'error',
              center: true,
              duration: 2000
            })
          } else {
            this.send = false
            // console.log(res, '获取面试轮次')
            this.round = res.data.data.round
            // this.dialogVisible3 = true
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
              //     "message" : "data:image/png;base64,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",
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
      this.dialogVisible3 = true
      this.send = false
      this.stdId = row.studentId
      this.departmentId = ''
      this.estimate = ''
      this.score = ''
      this.activeName = 'first'
      this.getDepartmentId()
      // this.getEvaluation()
    },
    // 获取面试评价(ok)
    getEvaluation() {
      let sendData = {
        studentId: this.stdId,
        admissionId: this.admissionId,
        organizationId: this.organizationId,
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
            //   let data = [
            //   {
            //    interviewer:'张科',
            //    data:'good',
            //    score:'50',
            //    isPresent:false
            //   }, {
            //     interviewer:'张科fs ',
            //    data:'good',
            //    score:'50',
            //    isPresent:false
            //   }, {
            //     interviewer:'张科0',
            //     data:'good1111',
            //     score:'100',
            //     isPresent:false
            //   }, {
            //     interviewer:'张sfdfe科',
            //     data:'good',
            //     score:'5055',
            //     isPresent:true
            //   },{
            //     interviewer:'张科sf',
            //     data:'good',
            //     score:'50',
            //     isPresent:false
            //   },{
            //     interviewer:'张efsw科',
            //     data:'good',
            //     score:'50',
            //     isPresent:false
            //   },{
            //     interviewer:'张科',
            //     data:'good',
            //     score:'50',
            //     isPresent:false
            //   },
            // ]
            //真实数据
            let data = res.data.data.paramList
            if (data == [] || data == null) {
              this.estimate = ''
              this.score = ''
              this.evaluationTable = []
            } else {
              this.evaluationTable = data
              data.forEach((item) => {
                if (item.isPresent == true) {
                  this.estimate = item.data
                  this.score = item.score
                }
              })
            }
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
      if (this.departmentId == '') {
        this.$message({
          showClose: true,
          message: '请选择评价部门',
          type: 'error',
          center: true,
          duration: 2000
        })
      } else if (this.estimate == '') {
        this.$message({
          showClose: true,
          message: '评价不能为空',
          type: 'error',
          center: true,
          duration: 2000
        })
      } else if (this.score == '') {
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
    },
    //发送评价(ok)
    sendEvaluation() {
      // this.dialogVisible3 = false
      //发送面试评价
      let sendData = {
        studentId: this.stdId,
        admissionId: this.admissionId,
        organizationId: this.organizationId,
        departmentId: this.departmentId,
        score: this.score,
        round: this.round,
        data: this.estimate
      }
      console.log(sendData)
      let url = `api/real-time-interview/appraise`
      let post = this.$http.post(url, sendData)
      post
        .then((res) => {
          // console.log(res, '发送面试评价')
          if (res.data.code == 'A0400') {
            this.$message({
              showClose: true,
              message: res.data.message,
              type: 'error',
              center: true,
              duration: 2000
            })
          } else {
            this.dialogVisible3 = false
            this.$message({
              showClose: true,
              message: '评价成功',
              type: 'success',
              center: true,
              duration: 2000
            })
          }
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
            if (item.status == 6) {
              item.status = '面试中'
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
    //点击简历，引入简历组件
    openResumeDialog(data) {
      this.$refs.resumeDialog.resumeDialogVisible = true
      this.$refs.resumeDialog.studentId = data.studentId
      this.$refs.resumeDialog.Mymounted()
    },
    //防抖
    getTableDataDelay() {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(this.getTableData, 700)
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
    justify-content: flex-start;
    overflow-x: auto;
    .progress {
      width: 180px;
      height: 74px;
      margin-top: 15px;
      // margin-left: 20px;
      padding: 0 35px;
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
    .result {
      width: 47vw;
      height: 49vh;
      min-width: 400px;
      min-height: 370px;
      background-color: white;
      .title {
        font-size: 28px;
        color: rgb(82, 82, 82);
        font-weight: 700;
        width: 150px;
      }
      .top1 {
        min-width: 400px;
      }
      .content {
        margin-top: 12px;
        margin-left: 1.5vw;
        min-width: 400px;
        width: 95%;
        // height: 31.4vh;
        // min-height: 220px;
        // min-width: 800px;
        // background-color: blue;
        /deep/.el-textarea__inner {
          // height: 30vh;
          min-width: 400px;
          min-height: 400px;
        }
      }
      .getscore {
        margin-top: 10px;
        min-width: 400px;
      }
    }
    /deep/.el-input__inner {
      height: 39px;
    }
    /deep/.el-dialog {
      // height: calc(100vh - 242px);
      // background-color: rgb(58, 145, 129);
      min-width: 600px;
      min-height: 500px;
      // min-height: calc(100vh - 150px);
      // margin: 0 auto 30px;
      // margin-top: 20vh;
    }

    /deep/.el-dialog__body {
      min-width: 600px;
      padding: 30px 20px 10px 20px;
      // min-height: 300px;
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
  .selectdepartmentid {
    display: inline-block;
    width: 140px;
    height: 30px;
    // background-color: rgb(175, 162, 162);
    font-size: 20px;
    // margin-top: 20px;
    /deep/.el-select {
      width: 200px;
    }
  }
}
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 8px;
}

::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  //background-color: #8c8c8c;
  background-color: rgba(127, 126, 126, 0.25);
}

::-webkit-scrollbar-track {
  background-color: #f6f6f6;
}
::-webkit-scrollbar-thumb,
::-webkit-scrollbar-track {
  border: 0;
}
</style>
