<template>
  <div class="bbig">
    <div class="big">
      <div><b style="font-size: 20px">结果通知</b></div>
      <div class="circle">
        <span style="margin-right: 100px">
          <div class="num_style" @click="pass">{{ passNum }}</div>
          <div>失败</div>
        </span>
        <span>
          <div class="num_style" @click="win">{{ winNum }}</div>
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
      studentId: [],
      information: [],
      studentName: [],
      message: '',
      messageArrary: [],
      name: 'XXX',
      departmentName: '我部门',
      selectTotal: 20,
      passNum: 20,
      winNum: 30,
      status: '失败',
      departmentId: 0,
      roomId: 0
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
          message: this.messageArrary,
          organizationId: sessionStorage['loginOrganizationId'],
          studentId: this.studentId,
          admissionId: sessionStorage['homeAdmissionId'],
          departmentId: this.departmentId
        }
        this.$http
          .post(url8, data8)
          .then((response) => {
            console.log(response)
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    cancel() {
      //指定跳转地址
      this.$router.push('/home/reply')
    },
    pass() {
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
          this.information = response.data.data.information
          this.studentName = []
          this.studentId = []
          this.information.forEach((e) => {
            this.studentName.push(e.studentName)
            this.studentId.push(e.studentId)
          })
        })
        .catch((error) => {
          console.log(error)
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
          this.messageArrary = []
          let message0 = response.data.data.messageTemplate
            .replace(/{department}/, this.departmentName)
            .replace(/{round}/, '')
          this.message = message0.replace(/{name}/, this.name)
          for (let i = 0; i < this.passNum; ++i) {
            this.messageArrary.push(
              message0.replace(/{name}/, this.studentName[i])
            )
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    win() {
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
          this.information = response.data.data.information
          this.studentName = []
          this.studentId = []
          this.information.forEach((e) => {
            this.studentName.push(e.studentName)
            this.studentId.push(e.studentId)
          })
        })
        .catch((error) => {
          console.log(error)
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
          this.messageArrary = []
          let message0 = response.data.data.messageTemplate
            .replace(/{department}/, this.departmentName)
            .replace(/{round}/, '')
          this.message = message0.replace(/{name}/, this.name)
          for (let i = 0; i < this.winNum; ++i) {
            this.messageArrary.push(
              message0.replace(/{name}/, this.studentName[i])
            )
          }
        })
        .catch((error) => {
          console.log(error)
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
          this.winNum = response.data.data.win
          this.passNum = response.data.data.pass
          this.selectTotal = this.passNum
          this.status = '失败'
        })
        .catch((error) => {
          console.log(error)
        })
      this.$http
        .get(url0, params2)
        .then((response) => {
          console.log(response)
          this.information = response.data.data.information
          this.studentName = []
          this.studentId = []
          this.information.forEach((e) => {
            this.studentName.push(e.studentName)
            this.studentId.push(e.studentId)
          })
        })
        .catch((error) => {
          console.log(error)
        })
      const url1 = 'api/interview-arrangement/getNotice/'
      let params = {
        type: 3,
        organizationId: 1
      }
      this.$http
        .get(url1, params)
        .then((response) => {
          console.log(response)
          this.messageArrary = []
          let message0 = response.data.data.messageTemplate
            .replace(/{department}/, this.departmentName)
            .replace(/{round}/, '')
          this.message = message0.replace(/{name}/, this.name)
          for (let i = 0; i < this.passNum; ++i) {
            this.messageArrary.push(
              message0.replace(/{name}/, this.studentName[i])
            )
          }
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      this.winNum = 0
      this.passNum = 0
      this.selectTotal = 0
      setTimeout(() => {
        alert('请在面试复盘界面选择具体部门！')
      }, 600)
    }
  }
}
</script>
<style scoped>
.num_style {
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
  border: 3px solid #409eff;
  color: #409eff;
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
