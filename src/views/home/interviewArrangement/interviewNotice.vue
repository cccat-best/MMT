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
            margin-right: 10px;
          "
          size="small"
          @change="dateTimeValue"
          placeholder="请选择开始日期时间"
        >
        </el-date-picker>
        <el-input-number
          v-model="partTimeNum"
          @change="handleChangeTime"
          :min="1"
          :max="60"
          placeholder="请选择每人面试分钟数"
          size="small"
          type="number"
          controls-position="right"
          style="
            width: 200px;
            border-radius: 5px;
            box-shadow: 1px 1px 1px 1px #e5e9f2;
          "
        ></el-input-number>
      </div>
      <div class="text">
        <p
          class="p0"
          style="
            margin-bottom: 10px;
            padding-left: 50px;
            width: 100%;
            padding-bottom: 0;
          "
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
      sameDepartment: true,
      partTimeNum: undefined,
      name: 'XXX',
      departmentName: sessionStorage['loginOrganizationName'],
      departmentId: 1,
      studentId: [],
      studentName: [],
      order: '一面',
      round: 1,
      timestamp: 0,
      dateTime: '',
      dateValue0: '',
      timeValue0: '',
      timeValue: '',
      address: '',
      messageTemplate: ''
    }
  },
  methods: {
    handleChangeTime() {},
    dateTimeValue() {
      this.timestamp2 = 0
      this.timestamp = this.dateTime.getTime() / 1000
      let year = this.dateTime.getFullYear() //年
      let month = this.dateTime.getMonth() + 1 //月
      let day = this.dateTime.getDate() //日
      this.dateValue0 = year + '-' + month + '-' + day
      let hh = this.dateTime.getHours() //时
      let mm = this.dateTime.getMinutes() //分
      if (hh < 10) {
        hh = '0' + hh
      }
      if (mm < 10) {
        mm = '0' + mm
      }
      this.timeValue0 = hh + ':' + mm
      this.timeValue = this.dateValue0 + '  ' + this.timeValue0
    },
    queding() {
      if (!this.sameDepartment) {
        this.$alert('请选择相同面试部门进行通知操作！', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      } else if (this.studentId.length == 0) {
        this.$alert('请选择待通知的学生！', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      } else if (this.timestamp == 0) {
        this.$alert('请选择正确的面试时间！', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      } else if (this.partTimeNum == undefined || this.partTimeNum == 0) {
        this.$alert('请选择或输入正确的每人面试分钟数！', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      } else if (this.address == '') {
        this.$alert('面试地点不能为空！', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      } else {
        this.$confirm('是否确定发送通知?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            let studentIds = []
            this.studentId.forEach((element) => {
              studentIds.push({
                studentId: element
              })
            })
            // 确定安排面试
            var form3 = {
              studentIds: studentIds,
              startTime: this.timestamp,
              partTime: this.partTimeNum * 60,
              organizationId: sessionStorage['loginOrganizationId'] * 1,
              admissionId: sessionStorage['homeAdmissionId'] * 1,
              departmentId: this.departmentId,
              round: this.round,
              address: this.address
            }
            const url3 = 'api/interview-arrangement/arrangeNotice'
            let post3 = this.$http.post(url3, form3)
            post3
              .then((res) => {
                // console.log('安排面试:', res)
                if (res.data.code == '00000') {
                  // 确定获取模板
                  const url1 = 'api/interview-arrangement/getNotice'
                  let params = {
                    type: 1,
                    organizationId: sessionStorage['loginOrganizationId']
                  }
                  this.$http
                    .get(url1, params)
                    .then((res) => {
                      // console.log('获取模板:', res)
                      if (res.data.code == '00000') {
                        this.messageTemplate = res.data.data.messageTemplate
                          .replace(/{department}/, this.departmentName)
                          .replace(/{round}/, this.order)
                          .replace(/{location}/, this.address)
                        let messages = []
                        this.studentName.forEach((element, index) => {
                          let timestampPersonal =
                            (this.partTimeNum * 60 * index + this.timestamp) *
                            1000
                          let timePersonal = new Date(timestampPersonal)
                          let year = timePersonal.getFullYear() //年
                          let month = timePersonal.getMonth() + 1 //月
                          let day = timePersonal.getDate() //日
                          let dateValuePersonal = year + '-' + month + '-' + day
                          let hh = timePersonal.getHours() //时
                          let mm = timePersonal.getMinutes() //分
                          if (hh < 10) {
                            hh = '0' + hh
                          }
                          if (mm < 10) {
                            mm = '0' + mm
                          }
                          let timeValuePersonal = hh + ':' + mm
                          let timeValuePersonal0 =
                            dateValuePersonal + '  ' + timeValuePersonal
                          // console.log(timeValuePersonal0)
                          messages.push(
                            this.messageTemplate
                              .replace(/{name}/, element)
                              .replace(/{time}/, timeValuePersonal0)
                          )
                        })
                        let postNoticeParams = []
                        messages.forEach((element, index) => {
                          postNoticeParams.push({
                            message: element,
                            studentId: this.studentId[index]
                          })
                        })
                        // 确定发送通知
                        var form2 = {
                          postNoticeParams: postNoticeParams,
                          organizationId:
                            sessionStorage['loginOrganizationId'] * 1,
                          admissionId: sessionStorage['homeAdmissionId'] * 1,
                          departmentId: this.departmentId,
                          round: this.round
                        }
                        // console.log(form2)
                        const url2 = 'api/interview-arrangement/postNotice'
                        let post2 = this.$http.post(url2, form2)
                        post2
                          .then((res) => {
                            // console.log('发送通知:', res)
                            if (res.data.code == '00000') {
                              this.$message({
                                message: '发送成功！',
                                type: 'success'
                              })
                              setTimeout(() => {
                                location.reload()
                              }, 1000)
                            } else {
                              this.$message.error(res.data.message)
                            }
                          })
                          .catch((err) => {
                            console.log(err)
                            this.$message.error('发送失败！')
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
          })
          .catch(() => {
            this.$message({
              type: 'warning',
              message: '已取消发送'
            })
          })
      }
    }
  },
  mounted() {
    this.$bus.$on('arrangeSameDepartment', (data) => {
      this.sameDepartment = data
    }),
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
      this.$bus.$on('arrangeSelectionStudentId1', (data) => {
        this.studentId = data
        console.log('hello' + this.departmentId)
      }),
      this.$bus.$on('arrangeSelectionStudentName', (data) => {
        this.studentName = data
        console.log('hello' + this.departmentId)
      }),
      this.$bus.$on('arrangeSelectionDepartmentName', (data) => {
        this.departmentName = data
        console.log('hello' + this.departmentId)
      }),
      this.$bus.$on('arrangeSelectionDepartmentId', (data) => {
        this.departmentId = data
        console.log('hello' + this.departmentId)
      })
  },
  beforeDestroy() {
    this.$bus.$off('arrangeSameDepartment')

    this.$bus.$off('arrangeOrder')
    this.$bus.$off('arrangeSelectionStudentId1')
    this.$bus.$off('arrangeSelectionStudentName')
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
p {
  padding-bottom: 5px;
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
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
}
input[type='text']:focus {
  border: none;
  border-bottom: 1px solid black;
}
</style>
