<template>
  <div class="bbig">
    <div class="big">
      <div><b style="font-size: 20px">结果通知</b></div>
      <div class="circle">
        <span style="margin-right: 100px">
          <div class="num_style" @click="fault">{{ faultNum }}</div>
          <div>失败</div>
        </span>
        <span>
          <div class="num_style" @click="pass">{{ passNum }}</div>
          <div>通过</div>
        </span>
      </div>
      <div class="content">
        <p style="margin-left: 40px; margin-top: 20px">
          <b>面试{{ status }}结果通知</b>
        </p>
        <p class="message">{{ message }}</p>
        <div class="bottom">
          <div class="leftBottom">
            <b>已选:&nbsp;&nbsp;{{ selectTotal }}人</b>
          </div>
          <div class="div">
            <el-row>
              <el-button type="primary">发送</el-button>
              <el-button type="info" class="cancel">取消</el-button>
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
      message: '',
      name: '同学',
      departmentName: '我部门',
      selectTotal: 20,
      faultNum: 20,
      passNum: 30,
      status: '通过'
    }
  },
  methods: {
    fault() {
      this.selectTotal = this.faultNum
      this.status = '失败'
      const url1 = '/interview-arrangement/getNotice'
      let params = {
        type: 2
      }
      this.$http
        .get(url1, params)
        .then((response) => {
          this.message = response.data.data.messageTemplate
            .replace(/{template}/, this.name)
            .replace(/{template}/, this.departmentName)
            .replace(/{template}/, '')
          console.log(this.message)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    pass() {
      this.selectTotal = this.passNum
      this.status = '通过'
      const url1 = '/interview-arrangement/getNotice'
      let params = {
        type: 3
      }
      this.$http
        .get(url1, params)
        .then((response) => {
          this.message = response.data.data.messageTemplate
            .replace(/{template}/, this.name)
            .replace(/{template}/, this.departmentName)
            .replace(/{template}/, '所有')
          console.log(this.message)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  created() {
    this.status = '失败'
    const url1 = '/interview-arrangement/getNotice'
    let params = {
      type: 2
    }
    this.$http
      .get(url1, params)
      .then((response) => {
        this.message = response.data.data.messageTemplate
          .replace(/{template}/, this.name)
          .replace(/{template}/, this.departmentName)
          .replace(/{template}/, '')
        console.log(this.message)
      })
      .catch((error) => {
        console.log(error)
      })
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
  height: 615px;
  width: 1250px;
  margin-left: 25px;
  background-color: white;
  border-radius: 10px;
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
  border-radius: 10px;
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
  margin-bottom: 15px;
}
.cancel {
  margin-right: 40px;
  margin-left: 60px;
}
.leftBottom {
  margin-left: 40px;
  margin-top: 7px;
}
.message {
  margin: 0 120px 0 120px;
  text-align: left;
  text-indent: 2em;
  line-height: 200%;
}
</style>
