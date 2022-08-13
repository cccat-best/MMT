<template>
  <!-- 一面 -->
  <div class="one">
    <!-- 顶部编辑按钮及其弹出框 -->
    <div class="p">
      <el-button type="text" class="p2" @click="edit"
        ><i class="el-icon-edit-outline"></i> 编辑页面</el-button
      >
      <!-- 点击编辑按钮弹出的页面 -->
      <el-dialog
        title=""
        :visible.sync="dialogFormVisible"
        width="1080px"
        top="50px"
      >
        <div class="right1">
          <!-- 包个div使页面部分滚动，浏览器不会出现滚动条 -->
          <div class="el-dialog-div">
            <!-- 问题设置部分 -->
            <div class="problem11">
              <!-- 标题 -->
              <p class="tit1">面试问题设置</p>
              <!-- 下方可是增减问题的表格 -->
              <el-table
                :data="form.dynamicItem"
                stripe
                border
                style="width: 85%"
              >
                <el-table-column label="序号" width="50px" align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.row.orderNumber }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="问题" width="200px" align="center">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      :rows="2"
                      resize="none"
                      maxlength="50"
                      show-word-limit
                      placeholder="请输入问题"
                      v-model="scope.row.question"
                      required="required"
                    ></el-input>
                  </template>
                </el-table-column>

                <el-table-column label="分值" width="83px" align="center">
                  <template slot-scope="scope">
                    <el-input
                      size="mini"
                      type="textarea"
                      :rows="1"
                      resize="none"
                      v-model="scope.row.score"
                    ></el-input>
                  </template>
                </el-table-column>

                <el-table-column label="评分标准" width="220px" align="center">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      :rows="2"
                      resize="none"
                      maxlength="200"
                      show-word-limit
                      placeholder="请输入评分标准"
                      v-model="scope.row.standard"
                    ></el-input>
                  </template>
                </el-table-column>

                <!-- 最后一栏操作按钮 -->
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <!-- 第一栏不可删除 -->
                    <el-button
                      type="info"
                      plain
                      v-if="scope.$index !== 0"
                      size="medium"
                      @click="deleteItem(scope.$index)"
                      >删除</el-button
                    >
                    <!-- 限制最多只能添加10个问题 -->
                    <el-button
                      v-if="scope.$index + 1 === form.dynamicItem.length"
                      type="primary"
                      size="medium"
                      plain
                      @click="addItem(scope.$index)"
                      >增加</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div>

            <div class="inform1">
              <p class="tit2">面试文案编辑</p>
              <div class="details">
                <p class="top">面试通知</p>
                <p class="concrete">
                  <el-input
                    style="width: 123px"
                    placeholder="请输入内容"
                    v-model="informEdit.a"
                  ></el-input
                  >{name},{department}邀请你进行{number}面面试。面试时间:{time};面试场地:{location}<el-input
                    style="width: 450px"
                    placeholder="请输入内容"
                    v-model="informEdit.b"
                  ></el-input>
                </p>
              </div>
            </div>
            <div class="inform2">
              <p class="tit3">结果通知编辑</p>
              <el-tabs type="border-card" class="result">
                <el-tab-pane label="成功">
                  <p class="success">
                    <el-input
                      style="width: 123px"
                      placeholder="请输入内容(必填)"
                      v-model="successEdit.a"
                    ></el-input
                    >{name}<el-input
                      style="width: 250px"
                      placeholder="请输入内容(必填)"
                      v-model="successEdit.b"
                    ></el-input
                    >{department}<el-input
                      style="width: 315px"
                      placeholder="请输入内容(必填)"
                      v-model="successEdit.c"
                    ></el-input
                    >{round}面试<el-input
                      style="width: 325px"
                      placeholder="请输入内容(选填)"
                      v-model="successEdit.d"
                    ></el-input>
                  </p>
                </el-tab-pane>
                <el-tab-pane label="失败">
                  <p class="success">
                    <el-input
                      style="width: 123px"
                      placeholder="请输入内容(必填)"
                      v-model="failEdit.a"
                    ></el-input
                    >{name}<el-input
                      style="width: 250px"
                      placeholder="请输入内容(必填)"
                      v-model="failEdit.b"
                    ></el-input
                    >{department}<el-input
                      style="width: 315px"
                      placeholder="请输入内容(必填)"
                      v-model="failEdit.c"
                    ></el-input
                    >{round}面试<el-input
                      style="width: 325px"
                      placeholder="请输入内容(选填)"
                      v-model="failEdit.d"
                    ></el-input>
                  </p>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="resetData">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 左边导航条 -->
    <div class="left1">
      <div class="nav1">
        <a href="#one" :class="['text', isSelect1() ? 'blue' : '']"
          >面试问题设置</a
        >
      </div>
      <div class="nav1">
        <a href="#two" :class="['text', isSelect2() ? 'blue' : '']"
          >面试文案编辑</a
        >
      </div>
      <div class="nav1">
        <a href="#three" :class="['text', isSelect3() ? 'blue' : '']"
          >结果通知编辑</a
        >
      </div>
    </div>

    <!-- 右边内容部分 -->
    <div class="right1" @scroll="handleScroll($event)">
      <!-- 问题设置部分 -->
      <div class="problem11">
        <p class="tit1" id="one">面试问题设置</p>
        <el-table :data="tableData" stripe border style="width: 1000px">
          <el-table-column prop="orderNumber" label="序号" width="60px">
          </el-table-column>
          <el-table-column prop="question" label="问题" width="358px">
          </el-table-column>
          <el-table-column prop="score" label="分值" width="100px">
          </el-table-column>
          <el-table-column prop="standard" label="打分标准" width="480px">
          </el-table-column>
        </el-table>
        <!-- <el-button type="primary" plain class="button">+添加问题</el-button> -->
      </div>
      <div class="inform1">
        <p class="tit2" id="two">面试文案编辑</p>
        <div class="details">
          <p class="top">面试通知</p>
          <div class="concrete">{{ inform }}</div>
        </div>
      </div>
      <div class="inform2">
        <p class="tit3" id="three">结果通知编辑</p>
        <el-tabs type="border-card" class="result">
          <el-tab-pane label="成功">
            <div class="success">{{ success }}</div>
          </el-tab-pane>
          <el-tab-pane label="失败">
            <div class="fail">{{ fail }}</div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      organizationId: sessionStorage.getItem('loginOrganizationId'),
      //organizationId:2,
      // 判断输入问题是否为空
      questionEmpty: false,
      //判断分值是否为空
      scoreEmpty: false,
      //判断标准是否为空
      standardEmpty: false,
      //判断面试通知是否为空
      informEmpty: false,
      //判断成功通知是否为空
      successEmpty: false,
      //判断失败通知是否为空
      failEmpty: false,
      //编辑是否均发送成功
      allSuccess: 0,
      // 非编辑状态问题设置表格的数据
      tableData: [],
      // 面试通知信息
      inform: '',
      success: '',
      fail: '',
      // 控制编辑弹窗的显示隐藏
      dialogFormVisible: false,
      formLabelWidth: '120px',
      // 编辑状态问题设置的数据
      form: {
        dynamicItem: []
      },
      // 面试通知文案
      informEdit: {
        a: '',
        b: ''
      },
      successEdit: {
        a: '',
        b: '',
        c: '',
        d: ''
      },
      failEdit: {
        a: '',
        b: '',
        c: '',
        d: ''
      },
      // 鼠标滚动效果
      scrollHeigh: 0
    }
  },
  //接收到的面试轮次
  props: ['round'],
  mounted() {
    // 刚挂载向后端请求面试问题设置展示的数据
    this.getProblemList()
    // 获取面试通知
    this.getInterviewInform()
    // 获取面试成功通知
    this.getSuccessResult()
    // 获取面试失败通知
    this.getFaultResult()
  },
  watch: {
    dialogFormVisible(oldvalue, newvalue) {
      if (newvalue == false) this.allSuccess = 0
    }
  },
  methods: {
    // 随页面滚动触发事件，滚动高度
    handleScroll(e) {
      this.scrollHeigh = e.srcElement.scrollTop
    },
    //导航动态变化
    isSelect1() {
      if (this.scrollHeigh < 350 && this.scrollHeigh >= 0) {
        return true
      }
    },
    isSelect2() {
      if (this.scrollHeigh > 350 && this.scrollHeigh < 600) {
        return true
      }
    },
    isSelect3() {
      if (this.scrollHeigh > 600) {
        return true
      }
    },
    // 问题表格增加
    addItem(index) {
      if (index == 9) {
        this.$message({
          showClose: true,
          message: '最多只能添加10个问题！！！',
          type: 'error',
          center: true
        })
      } else {
        this.form.dynamicItem.push({
          orderNumber: this.form.dynamicItem.length + 1,
          question: '',
          score: '',
          standard: ''
        })
      }
    },
    // 面试问题表格删除
    deleteItem(index) {
      this.form.dynamicItem.splice(index, 1)
      this.form.dynamicItem.forEach((value, index) => {
        value.orderNumber = index + 1
      })
    },
    // 向后端请求面试问题设置展示的数据
    getProblemList() {
      let url1 = `api/organization/interview/n?organizationId=${this.organizationId}&round=${this.round}`
      let get1 = this.$http.get(url1)
      get1
        .then((res) => {
          this.tableData = res.data.data.interviewList
          // this.form.dynamicItem=res.data.data.interviewList;
        })
        .catch(() => {
          this.$message({
            showClose: true,
            message: '获取面试问题失败',
            type: 'error',
            center: true,
            duration: 2000
          })
        })
    },
    //进入编辑页面获取面试问题列表
    edit() {
      this.dialogFormVisible = true
      let url1 = `api/organization/interview/n?organizationId=${this.organizationId}&round=${this.round}`
      let get1 = this.$http.get(url1)
      get1
        .then((res) => {
          if (res.data.data.interviewList.length == 0) {
            this.form.dynamicItem = [
              {
                orderNumber: 1,
                question: '请编辑',
                score: '0',
                standard: '请编辑'
              }
            ]
          } else {
            this.form.dynamicItem = res.data.data.interviewList
          }
        })
        .catch(() => {
          this.$message({
            showClose: true,
            message: '获取面试问题失败',
            type: 'error',
            center: true,
            duration: 2000
          })
        })
    },
    // 获取并展示面试通知
    getInterviewInform() {
      let url2 = `api/organization/interview/message?organizationId=${this.organizationId}&round=${this.round}&type=1`
      let get2 = this.$http.get(url2)
      get2
        .then((res) => {
          if (res.data.data.interviewNoticeList.length == 0) {
            this.inform = '暂无数据'
          } else {
            this.inform = res.data.data.interviewNoticeList[0].message
            let a = res.data.data.interviewNoticeList[0].message
            let b = a
              .replace(/{name}/, '#&%$@/')
              .replace(/{location}/, '#&%$@/')
            let arr = b.split('#&%$@/')
            this.informEdit.a = arr[0]
            this.informEdit.b = arr[2]
          }
        })
        .catch(() => {
          this.inform = '获取数据失败'
          this.$message({
            showClose: true,
            message: '获取面试通知文案失败',
            type: 'error',
            center: true,
            duration: 2000
          })
        })
    },
    // 获取面试成功通知
    getSuccessResult() {
      let url3 = `api/organization/interview/message?organizationId=${this.organizationId}&round=${this.round}&type=2`
      let get3 = this.$http.get(url3)
      get3
        .then((res) => {
          // console.log(res,'面试成功')
          if (res.data.data.interviewNoticeList.length == 0) {
            this.success = '暂无数据'
          } else {
            this.success = res.data.data.interviewNoticeList[0].message
            //切割
            let a = res.data.data.interviewNoticeList[0].message
            let b = a
              .replace(/{name}/, '#&%$@/')
              .replace(/{department}/, '#&%$@/')
              .replace(/{round}面试/, '#&%$@/')
            let arr = b.split('#&%$@/')
            this.successEdit.a = arr[0]
            this.successEdit.b = arr[1]
            this.successEdit.c = arr[2]
            this.successEdit.d = arr[3]
          }
        })
        .catch(() => {
          this.success = '获取数据失败'
          this.$message({
            showClose: true,
            message: '获取面试成功文案失败',
            type: 'error',
            center: true,
            duration: 2000
          })
        })
    },
    // 获取面试失败通知
    getFaultResult() {
      let url4 = `api/organization/interview/message?organizationId=${this.organizationId}&round=${this.round}&type=3`
      let get4 = this.$http.get(url4)
      get4
        .then((res) => {
          // console.log(res,'面试失败')
          if (res.data.data.interviewNoticeList.length == 0) {
            this.fail = '暂无数据'
          } else {
            this.fail = res.data.data.interviewNoticeList[0].message
            let a1 = res.data.data.interviewNoticeList[0].message
            let b1 = a1
              .replace(/{name}/, '#&%$@/')
              .replace(/{department}/, '#&%$@/')
              .replace(/{round}面试/, '#&%$@/')
            let arr = b1.split('#&%$@/')
            this.failEdit.a = arr[0]
            this.failEdit.b = arr[1]
            this.failEdit.c = arr[2]
            this.failEdit.d = arr[3]
          }
        })
        .catch(() => {
          this.fail = '获取数据失败'
          this.$message({
            showClose: true,
            message: '获取面试失败文案失败',
            type: 'error',
            center: true,
            duration: 2000
          })
        })
    },
    // 发送编辑问题请求
    resetProblemList() {
      let sendData1 = {
        organizationId: this.organizationId,
        round: this.round,
        interviewList: this.form.dynamicItem
      }
      let url1 = `api/organization/interview/n`
      let post1 = this.$http.post(url1, sendData1)
      post1
        .then(() => {
          // console.log(res,'发送问题')
          this.getProblemList()
        })
        .catch(() => {
          this.$message({
            showClose: true,
            message: '编辑面试问题失败',
            type: 'error',
            center: true,
            duration: 2000
          })
        })
    },
    //发送编辑面试通知请求
    resetInterviewInform() {
      let sendData2 = {
        organizationId: this.organizationId,
        round: this.round,
        type: 1,
        messageTemplate:
          this.informEdit.a +
          '{name},{department}邀请你进行{number}面面试。面试时间:{time};面试场地:{location}' +
          this.informEdit.b
      }
      let url2 = `api/organization/interview/message`
      let post2 = this.$http.post(url2, sendData2)
      post2
        .then(() => {
          // console.log(res,'发送面试通知')
          this.getInterviewInform()
        })
        .catch(() => {
          this.$message({
            showClose: true,
            message: '编辑面试通知文案失败',
            type: 'error',
            center: true,
            duration: 2000
          })
        })
    },
    //发送编辑成功结果通知请求
    resetSuccessResult() {
      let sendData3 = {
        organizationId: this.organizationId,
        round: this.round,
        type: 2,
        messageTemplate:
          this.successEdit.a +
          '{name}' +
          this.successEdit.b +
          '{department}' +
          this.successEdit.c +
          '{round}面试' +
          this.successEdit.d
      }
      let url3 = `api/organization/interview/message`
      let post3 = this.$http.post(url3, sendData3)
      post3
        .then(() => {
          // console.log(res)
          this.getSuccessResult()
        })
        .catch(() => {
          this.$message({
            showClose: true,
            message: '编辑面试成功文案失败',
            type: 'error',
            center: true,
            duration: 2000
          })
        })
    },
    //发送编辑失败结果通知
    resetFaultResult() {
      let sendData4 = {
        organizationId: this.organizationId,
        round: this.round,
        type: 3,
        messageTemplate:
          this.failEdit.a +
          '{name}' +
          this.failEdit.b +
          '{department}' +
          this.failEdit.c +
          '{round}面试' +
          this.failEdit.d
      }
      let url4 = `api/organization/interview/message`
      let post4 = this.$http.post(url4, sendData4)
      post4
        .then(() => {
          // console.log(res)
          this.getFaultResult()
        })
        .catch(() => {
          this.$message({
            showClose: true,
            message: '编辑面试失败文案失败',
            type: 'error',
            center: true,
            duration: 2000
          })
        })
    },
    //点击编辑状态确定按钮发送数据
    resetData() {
      this.allSuccess = 0
      this.form.dynamicItem.forEach((value) => {
        if (value.question == '') {
          this.questionEmpty = true
        }
        if (value.score == '') {
          this.scoreEmpty = true
        }
        if (value.standard == '') {
          this.standardEmpty = true
        }
      })
      if (this.informEdit.a == '' || this.informEdit.b == '') {
        this.informEmpty = true
      }
      if (
        this.successEdit.a == '' ||
        this.successEdit.b == '' ||
        this.successEdit.c == ''
      ) {
        this.successEmpty = true
      }
      if (
        this.failEdit.a == '' ||
        this.failEdit.b == '' ||
        this.failEdit.c == ''
      ) {
        this.failEmpty = true
      }
      if (
        this.questionEmpty == true ||
        this.scoreEmpty == true ||
        this.standardEmpty == true
      ) {
        if (this.standardEmpty == true) {
          this.$message({
            showClose: true,
            message: '评分标准不能为空！！！',
            type: 'error',
            center: true,
            duration: 4000
          })
          this.standardEmpty = false
        }
        if (this.scoreEmpty == true) {
          this.$message({
            showClose: true,
            message: '问题分值不能为空！！！',
            type: 'error',
            center: true,
            duration: 3000
          })
          this.scoreEmpty = false
        }

        if (this.questionEmpty == true) {
          this.$message({
            showClose: true,
            message: '面试问题不能为空！！！',
            type: 'error',
            center: true,
            duration: 2000
          })
          this.questionEmpty = false
        }
      } else {
        this.allSuccess += 1
      }
      if (this.informEmpty == true) {
        this.$message({
          showClose: true,
          message: '请编辑面试通知！！！',
          type: 'error',
          center: true,
          duration: 2000
        })
        this.informEmpty = false
      } else {
        this.allSuccess += 1
      }
      if (this.successEmpty == true) {
        this.$message({
          showClose: true,
          message: '请编辑面试成功通知！！！',
          type: 'error',
          center: true,
          duration: 2000
        })
        this.successEmpty = false
      } else {
        this.allSuccess += 1
      }
      if (this.failEmpty == true) {
        this.$message({
          showClose: true,
          message: '请编辑面试失败通知！！！',
          type: 'error',
          center: true,
          duration: 2000
        })
        this.failEmpty = false
      } else {
        this.allSuccess += 1
      }
      if (this.allSuccess == 4) {
        this.resetProblemList()
        this.resetInterviewInform()
        this.resetSuccessResult()
        this.resetFaultResult()
        this.dialogFormVisible = false
        this.$message({
          showClose: true,
          message: '编辑成功',
          type: 'success',
          center: true,
          duration: 2000
        })
        this.allSuccess = 0
      }
    }
  }
}
</script>

<style lang="less" scoped>
.one {
  position: relative;
  overflow: hidden;
  // height: 525px;
  height: calc(100vh - 60px - 40px - 25px - 70px);
  line-height: 40px;
  width: calc(100vw - 200px - 40px);
  background-color: white;
  min-width: 1000px;
  min-height: 450px;
}
.p {
  position: relative;
  // left: 1100px;
  left: 85%;
  height: 30px;
  margin-top: 7px;
  line-height: 30px;
  width: 121px;
  background-color: rgb(255, 255, 255);
  .p2 {
    position: absolute;
    left: 28px;
    font-size: 19px;
    top: 2px;
  }
}
.left1 {
  position: absolute;
  left: 32px;
  top: 50px;
  height: 156px;
  // width: 141px;
  width: 130px;
  min-width: 130px;
  // background-color: rgb(174, 96, 96);
  .text {
    text-decoration: none;
    font-size: 17px;
    color: black;
  }
  .blue {
    color: #409eff;
  }
  .nav1 {
    margin-left: 2px;
    padding-left: 10px;
    height: 30%;
    background-color: white;
    cursor: pointer;
    text-align: left;
    line-height: 58px;
    border-left: 2px solid rgb(213, 211, 211);
  }
  .text:hover {
    color: #409eff;
    // border-left: 2px solid #409eff;
  }
}
.right1 {
  position: relative;
  top: 10px;
  left: 162px;
  min-height: 420px;
  // min-width: 818px;
  // min-width: 200px;
  width: 86%;
  height: 88%;
  background-color: white;
  /* 滚动条 */
  -webkit-overflow-scrolling: touch;
  overflow-y: auto;
  white-space: nowrap;

  .problem11 {
    .tit1 {
      // background-color: rgb(63, 40, 40);
      margin-top: 10px;
      margin-bottom: 30px;
      height: 50px;
      line-height: 50px;
      font-size: 28px;
      width: 180px;
      font-weight: 700;
      margin-left: 32px;
      color: rgb(82, 82, 82);
    }
    .el-table {
      margin-left: 3%;
    }
    .button {
      margin-top: 16px;
      // margin-left: 735px;
      margin-left: 40%;
      width: 223px;
    }
  }
  .inform1 {
    margin-top: 30px;
    .tit2 {
      height: 50px;
      line-height: 50px;
      font-size: 28px;
      width: 180px;
      font-weight: 700;
      margin-left: 32px;
      color: rgb(82, 82, 82);
    }
    .details {
      width: 600px;
      height: 240px;
      background-color: white;
      margin-left: 3%;
      margin-top: 30px;
      // border-radius: 13px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      padding: 20px;
      .top {
        font-weight: 700;
        font-size: 26px;
        width: 110px;
      }
      .concrete {
        font-size: 22px;
        margin-top: 10px;
        height: 190px;
        line-height: 45px;
        text-align: left;
        width: 476px;
        margin-left: 62px;
        white-space: normal;
        word-break: break-all;
        overflow: hidden;
        /deep/.el-textarea__inner {
          padding: auto;
          width: 450px;
          // padding: 5px 27px 5px 10px;
        }
      }
    }
  }
}
.inform2 {
  margin-top: 30px;
  margin-bottom: 40px;
  .tit3 {
    height: 50px;
    line-height: 50px;
    font-size: 28px;
    width: 180px;
    font-weight: 700;
    margin-left: 32px;
    color: rgb(82, 82, 82);
  }
  .result {
    height: 280px;
    width: 640px;
    margin-left: 3%;
    margin-top: 30px;
    // border-radius: 13px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .success,
    .fail {
      font-size: 22px;
      margin-top: 10px;
      height: 170px;
      line-height: 45px;
      text-align: left;
      width: 450px;
      margin-left: 90px;
      white-space: normal;
      word-break: break-all;
      overflow: hidden;
    }
  }
}
/deep/.el-tabs__item {
  font-size: 17px !important;
  width: 321px !important;
  // background-color: rgb(80, 148, 169);
}
/deep/.el-tabs__nav {
  line-height: 0px !important;
  height: 40px !important;
  width: 320px !important;
  margin-left: 0px !important;
  // background-color: white  !important;
  text-align: center !important;
  font-size: 40px !important;
  border-bottom: none !important;
}
.el-dialog-div {
  height: 450px;
  overflow: auto;
}
/deep/.el-textarea__inner {
  padding: 5px 27px 5px 10px;
}
/deep/.el-input {
  font-size: 18px;
  width: 255px;
}
</style>
