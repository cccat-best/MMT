<template>
  <div class="ddingwei">
    <div class="dingwei">
      <div class="title">
        <el-date-picker
          v-model="dateTime"
          type="datetime"
          style="
            width: 200px;
            border-radius: 5px;
            box-shadow: 1px 1px 3px 1px #e5e9f2;
            margin-bottom: 0px;
          "
          size="small"
          @change="dateTimeValue"
          placeholder="请选择日期时间"
        >
        </el-date-picker>
      </div>
      <div class="text">
        <p
          class="p0"
          style="margin-bottom: 15px; padding-left: 50px; width: 100%"
        >
          <b>面试通知：</b>
        </p>
        <div class="littleText">
          <p class="p1">
            亲爱的<u>{{ name }}</u
            >, <u>{{ departmentName }}</u
            >邀请你进入<b>{{ order }}</b
            >面试。
          </p>
          <p class="p2">
            面试时间：<input
              type="text"
              style="
                border: none;
                border-bottom: 1px solid black;
                outline: none;
                width: 130px;
              "
              v-model="timeValue"
              class="line"
            />
          </p>
          <p class="p2">
            面试地点：<input
              type="text"
              style="
                border: none;
                border-bottom: 1px solid black;
                outline: none;
                width: 130px;
              "
              v-model="address"
              class="line"
            />
          </p>
          <p class="p1">请提前做好准备。</p>

          <div class="button">
            <el-button plain>取消</el-button>
            <el-button type="primary" @click="queding">确定</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'interviewNotice',
  data() {
    return {
      name: 'XXX',
      departmentName: sessionStorage['loginOrganizationName'],
      departmentId: 1,
      studentId: 20200001,
      order: '一面',
      round: 1,
      timestamp: 123500000,
      dateTime: '',
      dateValue0: '',
      timeValue0: '',
      timeValue: '',
      address: '',
      messageTemplate: ''
    }
  },
  methods: {
    dateTimeValue() {
      // this.timestamp = this.dateTime.getTime()
      this.timestamp = this.dateTime.getTime() / 1000
      var year = this.dateTime.getFullYear() //年
      var month = this.dateTime.getMonth() + 1 //月
      var day = this.dateTime.getDate() //日
      this.dateValue0 = year + '-' + month + '-' + day
      var hh = this.dateTime.getHours() //时
      var mm = this.dateTime.getMinutes() //分
      if (hh < 10) {
        hh = '0' + hh
      }
      if (mm < 10) {
        mm = '0' + mm
      }
      this.timeValue0 = hh + ':' + mm
      // console.log(this.timestamp)
      this.timeValue = this.dateValue0 + '   ' + this.timeValue0
    },
    queding() {
      // 确定安排面试
      var form3 = {
        studentId: this.studentId,
        startTime: this.timestamp,
        address: this.address,
        departmentId: this.departmentId,
        round: this.round,
        admissionId: sessionStorage['homeAdmissionId'] * 1
      }
      const url3 = 'api/interview-arrangement/arrangeNotice'
      let post3 = this.$http.post(url3, form3)
      post3
        .then((res) => {
          console.log('安排面试:', res)
          if (res.data.code == '00000') {
            // 确定获取模板
            const url1 = 'api/interview-arrangement/getNotice'
            let params = {
              type: 1,
              organizationId: sessionStorage['loginOrganizationId']
            }
            this.$http
              .get(url1, params)
              .then((response) => {
                console.log('获取模板:', response)
                if (res.data.code == '00000') {
                  this.messageTemplate = response.data.data.messageTemplate
                    .replace(/{name}/, this.name)
                    .replace(/{department}/, this.departmentName)
                    .replace(/{round}/, this.order)
                    .replace(/{time}/, this.dateValue0 + ' ' + this.timeValue0)
                    .replace(/{location}/, this.address)
                  console.log(this.messageTemplate)
                  // 确定发送通知
                  var form2 = {
                    message: this.messageTemplate,
                    organizationId: sessionStorage['loginOrganizationId'] * 1,
                    studentId: this.studentId,
                    admissionId: sessionStorage['homeAdmissionId'] * 1,
                    departmentId: this.departmentId,
                    round: this.round
                  }
                  // console.log(form2)
                  const url2 = 'api/interview-arrangement/postNotice'
                  let post2 = this.$http.post(url2, form2)
                  post2
                    .then((res) => {
                      console.log('发送通知:', res)
                      if (res.data.code == '00000') {
                        this.$message({
                          message: '通知成功！',
                          type: 'success'
                        })
                        // location.reload()
                      } else {
                        this.$message.error(res.data.message)
                      }
                    })
                    .catch((err) => {
                      console.log(err)
                      this.$message.error('通知失败！')
                    })
                } else {
                  this.$message.error(res.data.message)
                }
              })
              .catch((error) => {
                console.log(error)
                this.$message.error('获取模板失败！')
              })
          } else {
            this.$message.error(res.data.message)
          }
        })
        .catch((err) => {
          console.log(err)
          this.$message.error('安排面试失败！')
        })
    }
  },
  mounted() {
    this.$bus.$on('arrangeOrder', (data) => {
      this.order = data
      let that = this
      if (data == '一面') {
        that.round = 1
      } else if (data == '二面') {
        that.round = 2
      } else if (data == '三面') {
        that.round = 3
      }
    }),
      this.$bus.$on('arrangeSelectionName1', (data) => {
        this.name = data
      }),
      this.$bus.$on('arrangeSelectionStudentId1', (data) => {
        this.studentId = data
      }),
      this.$bus.$on('arrangeSelectionDepartmentName', (data) => {
        this.departmentName = data
      }),
      this.$bus.$on('arrangeSelectionDepartmentId', (data) => {
        this.departmentId = data
      })
  },
  beforeDestroy() {
    this.$bus.$off('arrangeOrder')
    this.$bus.$off('arrangeSelectionName1')
    this.$bus.$off('arrangeSelectionStudentId1')
    this.$bus.$off('arrangeSelectionDepartmentName')
    this.$bus.$off('arrangeSelectionDepartmentId')
  }
}
</script>

<style scoped>
.ddingwei {
  height: 57%;
  width: 100%;
  background-color: white;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.text {
  width: 440px;
  height: 220px;
  border: solid;
  border-width: 1px;
  border-color: #e5e9f2;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 1px 1px 3px 1px #e5e9f2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 7px;
}
.p0 {
  text-indent: 0em;
  text-align: left;
}
.p1 {
  text-indent: 0em;
  text-align: left;
}
.p2 {
  text-indent: 2em;
  text-align: left;
}
.title {
  display: flex;
  justify-content: left;
}
.button {
  margin-top: 30px;
  display: flex;
  justify-content: space-evenly;
}
input[type='text']:focus {
  border: none;
  border-bottom: 1px solid black;
}
</style>
