<template>
  <div class="bbig">
    <div class="big">
      <div><b style="font-size: 20px">结果通知</b></div>
      <div class="circle">
        <span style="margin-right: 100px">
          <div class="pass_num_style cl_num_style" @click="pass">
            {{ passNum }}
          </div>
          <div>失败</div>
        </span>
        <span>
          <div class="win_num_style" @click="win">{{ winNum }}</div>
          <div>通过</div>
        </span>
      </div>
      <div class="content">
        <p style="margin-left: 6%; margin-top: 4%">
          <b>面试{{ status }}结果通知</b>
        </p>
        <p class="message">{{ message }}</p>
        <div class="bottom">
          <div class="leftBottom">
            <b>已选:&nbsp;&nbsp;{{ selectTotal }}人</b>
          </div>
          <div style="margin-right: 6%">
            <el-row>
              <el-button type="primary" @click="submit">发送</el-button>
              <el-button type="info" class="cancel" @click="cancel"
                >取消</el-button
              >
            </el-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'resultInform',
  data() {
    return {
      list: [],
      studentId: [],
      information: [],
      studentName: [],
      message: '',
      messageArrary: [],
      name: 'XXX',
      departmentName: '',
      selectTotal: 0,
      passNum: 0,
      winNum: 0,
      status: '失败',
      departmentId: 0,
      roomId: 0,
      round: 1,
      order: ''
    }
  },
  methods: {
    submit() {
      if (
        !sessionStorage['replyDepartmentName'] ||
        sessionStorage['replyDepartmentName'] == '全部'
      ) {
        alert('发送失败！请在面试复盘界面选择具体部门！')
      } else {
        let url8 = 'api/interview-arrangement/postNotice'
        let data8 = {
          postNoticeParams: this.list,
          organizationId: sessionStorage['loginOrganizationId'],
          admissionId: sessionStorage['homeAdmissionId'],
          departmentId: this.departmentId,
          round: this.round
        }
        this.$http
          .post(url8, data8)
          .then((response) => {
            console.log(response)
            if (response.data.code == '00000') {
              this.$message({
                message: '发送成功！',
                type: 'success'
              })
            } else {
              this.$message.error(response.data.message)
            }
          })
          .catch((error) => {
            console.log(error)
            this.$message.error('发送失败！')
          })
      }
    },
    cancel() {
      //指定跳转地址
      this.$router.push('/home/reply')
    },
    pass() {
      let win = document.querySelector('.win_num_style')
      win.classList.remove('cl_num_style')
      let pass = document.querySelector('.pass_num_style')
      pass.classList.add('cl_num_style')
      this.selectTotal = this.passNum
      this.status = '失败'
      let url0 = 'api/interview-reply/stu-info'
      let params2 = {
        organizationId: sessionStorage['loginOrganizationId'],
        departmentId: this.departmentId,
        roomId: 0,
        filterStatus: 2
      }
      this.$http
        .get(url0, params2)
        .then((response) => {
          console.log(response)
          if (response.data.code == '00000') {
            this.information = response.data.data.information
            this.studentName = []
            this.studentId = []
            this.information.forEach((e) => {
              this.studentName.push(e.studentName)
              this.studentId.push(e.studentId)
            })
          } else {
            this.$message.error(response.data.message)
          }
        })
        .catch((error) => {
          console.log(error)
          this.$message.error('获取信息失败！')
        })
      const url1 = 'api/interview-arrangement/getNotice'
      let params = {
        type: 3,
        organizationId: sessionStorage['loginOrganizationId']
      }
      this.$http
        .get(url1, params)
        .then((response) => {
          console.log(response)
          if (response.data.code == '00000') {
            this.messageArrary = []
            let message0 = response.data.data.messageTemplate
              .replace(/{department}/, this.departmentName)
              .replace(/{round}/, this.order)
            this.message = message0.replace(/{name}/, this.name)
            for (let i = 0; i < this.passNum; ++i) {
              this.messageArrary.push(
                message0.replace(/{name}/, this.studentName[i])
              )
            }
            this.list = []
            for (let i = 0; i < this.passNum; ++i) {
              this.list.push({
                message: this.messageArrary[i],
                studentId: this.studentId[i]
              })
            }
          } else {
            this.$message.error(response.data.message)
          }
        })
        .catch((error) => {
          console.log(error)
          this.$message.error('获取失败模板失败！')
        })
    },
    win() {
      let pass = document.querySelector('.pass_num_style')
      pass.classList.remove('cl_num_style')
      let win = document.querySelector('.win_num_style')
      win.classList.add('cl_num_style')
      this.selectTotal = this.winNum
      this.status = '通过'
      let url0 = 'api/interview-reply/stu-info'
      let params4 = {
        organizationId: sessionStorage['loginOrganizationId'],
        departmentId: this.departmentId,
        roomId: 0,
        filterStatus: 4
      }
      this.$http
        .get(url0, params4)
        .then((response) => {
          console.log(response)
          if (response.data.code == '00000') {
            this.information = response.data.data.information
            this.studentName = []
            this.studentId = []
            this.information.forEach((e) => {
              this.studentName.push(e.studentName)
              this.studentId.push(e.studentId)
            })
          } else {
            this.$message.error(response.data.message)
          }
        })
        .catch((error) => {
          console.log(error)
          this.$message.error('获取信息失败！')
        })
      const url1 = 'api/interview-arrangement/getNotice'
      let params = {
        type: 2,
        organizationId: sessionStorage['loginOrganizationId']
      }
      this.$http
        .get(url1, params)
        .then((response) => {
          console.log(response)
          if (response.data.code == '00000') {
            this.messageArrary = []
            let message0 = response.data.data.messageTemplate
              .replace(/{department}/, this.departmentName)
              .replace(/{round}/, this.order)
            this.message = message0.replace(/{name}/, this.name)
            for (let i = 0; i < this.winNum; ++i) {
              this.messageArrary.push(
                message0.replace(/{name}/, this.studentName[i])
              )
            }
            this.list = []
            for (let i = 0; i < this.passNum; ++i) {
              this.list.push({
                message: this.messageArrary[i],
                studentId: this.studentId[i]
              })
            }
          } else {
            this.$message.error(response.data.message)
          }
        })
        .catch((error) => {
          console.log(error)
          this.$message.error('获取通过模板失败！')
        })
    }
  },
  mounted() {
    if (
      sessionStorage['replyDepartmentName'] &&
      sessionStorage['replyDepartmentName'] != '全部'
    ) {
      this.departmentName = sessionStorage['replyDepartmentName']
      this.departmentId = sessionStorage['replyDepartmentId']

      let url0 = 'api/interview-reply/stu-info'
      let params0 = {
        organizationId: sessionStorage['loginOrganizationId'],
        departmentId: this.departmentId,
        roomId: 0
      }
      let params2 = {
        organizationId: sessionStorage['loginOrganizationId'],
        departmentId: this.departmentId,
        roomId: 0,
        filterStatus: 2
      }
      this.$http
        .get(url0, params0)
        .then((response) => {
          console.log(response)
          if (response.data.code == '00000') {
            this.winNum = response.data.data.win
            this.passNum = response.data.data.pass
            if (response.data.data.round) {
              this.round = response.data.data.round
            }
            if (this.round == 0) {
              this.order = ''
            } else if (this.round == 1) {
              this.order = '一面'
            } else if (this.round == 2) {
              this.order = '二面'
            } else if (this.round == 3) {
              this.order = '三面'
            }
            this.selectTotal = this.passNum
            this.status = '失败'
          } else {
            this.$message.error(response.data.message)
          }
        })
        .catch((error) => {
          console.log(error)
          this.$message.error('获取人数信息失败！')
        })
      this.$http
        .get(url0, params2)
        .then((response) => {
          console.log(response)
          if (response.data.code == '00000') {
            this.information = response.data.data.information
            this.studentName = []
            this.studentId = []
            this.information.forEach((e) => {
              this.studentName.push(e.studentName)
              this.studentId.push(e.studentId)
            })
          } else {
            this.$message.error(response.data.message)
          }
        })
        .catch((error) => {
          console.log(error)
          this.$message.error('获取信息失败！')
        })
      const url1 = 'api/interview-arrangement/getNotice'
      let params = {
        type: 3,
        organizationId: 1
      }
      this.$http
        .get(url1, params)
        .then((response) => {
          console.log(response)
          if (response.data.code == '00000') {
            this.messageArrary = []
            let message0 = response.data.data.messageTemplate
              .replace(/{department}/, this.departmentName)
              .replace(/{round}/, this.order)
            this.message = message0.replace(/{name}/, this.name)
            for (let i = 0; i < this.passNum; ++i) {
              this.messageArrary.push(
                message0.replace(/{name}/, this.studentName[i])
              )
            }
            this.list = []
            for (let i = 0; i < this.passNum; ++i) {
              this.list.push({
                message: this.messageArrary[i],
                studentId: this.studentId[i]
              })
            }
          } else {
            this.$message.error(response.data.message)
          }
        })
        .catch((error) => {
          console.log(error)
          this.$message.error('获取模板信息失败！')
        })
    } else {
      this.winNum = 0
      this.passNum = 0
      this.selectTotal = 0
      setTimeout(() => {
        alert('请在面试复盘界面选择具体部门！')
        window.history.go(-1)
      }, 600)
    }
  },
  watch: {
    round() {
      if (this.round == 0) {
        this.order = ''
      }
      if (this.round == 1) {
        this.order = '一面'
      }
      if (this.round == 2) {
        this.order = '二面'
      }
      if (this.round == 3) {
        this.order = '三面'
      }
    }
  }
}
</script>
<style scoped>
.cl_num_style {
  border-color: #409eff !important;
  color: #409eff !important;
}
.pass_num_style {
  cursor: pointer;
  border-radius: 50%;
  height: 70px;
  width: 70px;
  display: inline-block;
  background: #ffffff;
  line-height: 13px;
  text-align: center;
  display: table-cell; /*显示形式为 表格*/
  vertical-align: middle; /*垂直居中*/
  border: 3px solid #909399;
  color: #909399;
  white-space: nowrap;
  /*给外边框内距限制数字的位置*/
  padding: 1px 1px 1px 1px;
  font-size: 30px;
  transform: scale(0.8);
}
.win_num_style {
  cursor: pointer;
  border-radius: 50%;
  height: 70px;
  width: 70px;
  display: inline-block;
  background: #ffffff;
  line-height: 13px;
  text-align: center;
  display: table-cell; /*显示形式为 表格*/
  vertical-align: middle; /*垂直居中*/
  border: 3px solid #909399;
  color: #909399;
  white-space: nowrap;
  /*给外边框内距限制数字的位置*/
  padding: 1px 1px 1px 1px;
  font-size: 30px;
  transform: scale(0.8);
}
.bbig {
  height: 100%;
  width: 100%;
  min-width: 1000px;
  min-height: 600px;
  background-color: white;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.big {
  width: 60%;
  height: 85%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
}

.circle {
  display: flex;
}
.content {
  height: 55%;
  width: 100%;
  background-color: #f4f4f4;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
}
.bottom {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 4%;
}
.cancel {
  margin-left: 60px;
}
.leftBottom {
  margin-left: 6%;
  margin-top: 7px;
}
.message {
  margin: 0 18% 0 18%;
  text-align: left;
  text-indent: 2em;
  line-height: 200%;
}
</style>
