<template>
  <div class="dingwei">
    <div class="title">
      <el-date-picker
        v-model="dateTime"
        type="datetime"
        style="width: 230px"
        size="small"
        @change="dateTimeValue"
        placeholder="请选择日期时间"
      >
      </el-date-picker>
    </div>
    <div class="text">
      <p class="p0">面试通知：</p>
      <p class="p1">
        亲爱的<u>{{ name }}</u
        >, <u>{{ departmentName }}</u
        >邀请你进入<b>{{ order }}</b
        >面试。
      </p>
      <p class="p2">
        面试时间：<u>{{ dateValue0 }} &nbsp; {{ timeValue0 }}&nbsp; </u>
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
          class="address"
        />
      </p>
      <p class="p1">请提前做好准备。</p>
      <div class="button">
        <el-button plain>取消</el-button>
        <el-button type="primary" @click="queding">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'interviewNotice',
  data() {
    return {
      name: 'Hanry',
      departmentName: '学生事务中心',
      order: '一面',
      timestamp: '',
      dateTime: '',
      dateValue0: '',
      timeValue0: '',
      address: '',
      messageTemplate: ''
    }
  },
  methods: {
    dateTimeValue() {
      this.timestamp = this.dateTime.getTime()
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
    },
    queding() {
      //确定获取模板
      const url1 = '/interview-arrangement/getNotice'
      let params = {
        type: 1
      }
      this.$http
        .get(url1, params)
        .then((response) => {
          // console.log(response)
          this.messageTemplate = response.data.data.messageTemplate
          console.log(this.messageTemplate)
          // 确定发送请求
          var form2 = {
            message: this.messageTemplate,
            studentId: 20229989,
            organizationId: 2
          }
          const url2 = '/interview-arrangement/postNotice'
          let post = this.$http.post(url2, form2)
          post
            .then((res) => {
              console.log(res)
            })
            .catch((err) => {
              console.log(err)
            })
        })
        .catch((error) => {
          console.log(error)
        })
      // 确定保存message
    }
  },
  mounted() {
    this.$bus.$on('order', (data) => {
      this.order = data
    }),
      this.$bus.$on('selectionName', (data) => {
        this.name = data
      }),
      this.$bus.$on('selectiondepartmentName', (data) => {
        this.departmentName = data
      })
  },
  beforeCreate() {
    this.$bus.$off('order')
    this.$bus.$off('selectionName')
    this.$bus.$off('selectiondepartmentName')
  }
}
</script>

<style scoped>
.dingwei {
  margin-top: 80px;
}
.text {
  width: 440px;
  height: 220px;
  border: solid;
  border-width: 1px;
  border-color: rgb(192, 196, 204);
  background-color: #fff;
  border-radius: 5px;
}
.p0 {
  text-indent: 0em;
  text-align: left;
}
.p1 {
  text-indent: 2em;
  text-align: left;
}
.p2 {
  text-indent: 4em;
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
