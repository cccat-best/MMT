<template>
  <div class="dingwei">
    <div class="title">
      <span class="date">
        <el-date-picker
          v-model="date"
          style="width: 150px"
          type="date"
          placeholder="请选择日期"
          size="small"
          @change="dateValue"
        >
        </el-date-picker>
      </span>
      <span class="time">
        <el-time-picker
          arrow-control
          v-model="time"
          style="width: 150px"
          :picker-options="{
            selectableRange: '00:00:00 - 23:59:59'
          }"
          placeholder="请选择时间"
          size="small"
          @change="timeValue"
        >
        </el-time-picker>
      </span>
    </div>
    <div class="text">
      <p class="p0">面试通知：</p>
      <p class="p1">
        亲爱的<u>{{ name }}</u
        >, <u>{{ bumen }}</u
        >邀请你进入<b>{{ order }}</b
        >面试。
      </p>
      <p class="p2">
        面试时间：<u>{{ dateValue0 }} {{ timeValue0 }}</u>
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
        <el-button type="primary">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'interviewNotice',
  data() {
    return {
      name: '卢小布',
      bumen: '学生事务中心',
      order: '一面',
      date: '',
      time: '',
      dateValue0: '',
      timeValue0: '',
      address: ''
    }
  },
  methods: {
    dateValue() {
      var year = this.date.getFullYear() //年
      var month = this.date.getMonth() + 1 //月
      var day = this.date.getDate() //日
      this.dateValue0 = year + '-' + month + '-' + day
    },
    timeValue() {
      var hh = this.time.getHours() //时
      var mm = this.time.getMinutes() //分
      if (hh < 10) {
        hh = '0' + hh
      }
      if (mm < 10) {
        mm = '0' + mm
      }
      this.timeValue0 = hh + ':' + mm
    }
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
