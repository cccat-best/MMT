<template id="demo">
  <!-- 以下是邀请码弹窗的实现 -->
  <el-dialog title="邀请码" :visible.sync="DialogVisibleJoin" width="30%">
    <!-- <el-divider></el-divider> -->
    <div style="display: inline-flex">
      <div style="font-size: medium; margin: auto 1vw">邀请码：</div>
      <div :class="['invitationCode', asideShow == 1 ? 'asideactive' : '']">
        {{ invitationCode }}
      </div>
      <div
        v-clipboard:copy="invitationCode"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"
      >
        <svg
          @click="changeColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="27"
          height="27"
          style="
            border-color: rgba(187, 187, 187, 1);
            border-width: 0px;
            border-style: solid;
          "
          filter="none"
        >
          <g>
            <path
              d="M9.333 8v-4c0-0.736 0.597-1.333 1.333-1.333v0h16c0.736 0 1.333 0.597 1.333 1.333v0 18.667c0 0.736-0.597 1.333-1.333 1.333v0h-4v4c0 0.736-0.6 1.333-1.343 1.333h-15.981c-0.002 0-0.005 0-0.008 0-0.737 0-1.334-0.597-1.335-1.333v-0l0.004-18.667c0-0.736 0.6-1.333 1.343-1.333h3.987zM6.671 10.667l-0.004 16h13.333v-16h-13.329zM12 8h10.667v13.333h2.667v-16h-13.333v2.667z"
              :fill="this.color"
            ></path>
          </g>
        </svg>
      </div>
    </div>

    <br />
    <br />

    <span @click="hello">验证发请求是否正常</span>
    <br />
    <br />
    <div style="font-size: 1vw">
      有效期：{{ showStartTime }} ~ {{ showEndTime }}
    </div>
  </el-dialog>
</template>

<script>
//引入axios
import axios from 'axios'
export default {
  data() {
    return {
      //图标颜色
      color: 'rgba(51,51,51,1)',
      //邀请码
      invitationCode: 'ABCDEFGH',
      //邀请码弹窗判断
      DialogVisibleJoin: false,
      // 当前时间
      nowTime: '',
      nowTimeCheck: '',
      showStartTime: '2021',
      showEndTime: '2022',
      // 邀请码颜色
      asideShow: 0 //未激活
    }
  },

  methods: {
    //图标变色
    changeColor() {
      if (this.color == 'rgba(51,51,51,1)')
        this.color = 'rgba(47.94,128.01,255,1)'
      else this.color = 'rgba(51,51,51,1)'
    },
    // 有效时间需要和后端同步/////////////////////////////////要特别注意/
    // 获取当前的时间
    getNowTime() {
      this.nowTime = new Date()
      let y = this.nowTime.getFullYear()
      let mt = (this.nowTime.getMonth() + 1).toString().padStart(2, '0')
      let day = this.nowTime.getDate().toString().padStart(2, '0')
      let h = this.nowTime.getHours().toString().padStart(2, '0')
      let m = this.nowTime.getMinutes().toString().padStart(2, '0')
      this.showStartTime = y + '-' + mt + '-' + day + '-' + h + ':' + m
      //十分钟后
      m = Number(m) + 10
      this.showEndTime = y + '-' + mt + '-' + day + '-' + h + ':' + m
    },
    // 验证是否需要获取验证码
    beforeGetInvitationCode() {
      // if (this.nowTime == '') {
        // this.$message.success('第一次')
        this.getNowTime()
        this.getInvitationCodeRequest()
      // }
      // 10分钟之内不能重发
      // else {
      //   this.nowTimeCheck = new Date()
      //   // console.log(this.nowTimeCheck - this.nowTime)
      //   //600000是10分钟
      //   if (this.nowTimeCheck - this.nowTime < 600000) {
      //     this.$message.error('10分钟之内不能重发,记得删掉这个')
      //   } else {
      //     this.$message.success('在10分钟之外,可以发请求了,记得删掉这个')
      //     this.getNowTime()
      //     this.getInvitationCodeRequest()
        // }
      // }
    },
    // 实验HTTP请求，使用百度的随便一个接口,待删除
    hello() {
      axios({
        method: 'get',
        url: 'http://119.29.27.252:38080/organization/department-id?organizationId=2&userId=2'
      }).then(
        (res) => {
          this.$message.success('hello:   ' + res)
        },
        (err) => {
          this.$message.error(err)
        }
      )
    },
    //获取邀请码发请求
    getInvitationCodeRequest() {
      axios({
        method: 'get',
        url: 'https://mmt-dev.sipcoj.com/organization/invitation-code'
      }).then(
        (res) => {
          // this.$message.success(res.data.message)
          this.invitationCode = res.data.data.invitationCode
        },
        (err) => {
          this.$message.error(err)
        }
      )
    },
    // 获取邀请码
    getInvitationCode() {
      this.beforeGetInvitationCode()
    },
    // 复制成功
    onCopy: function (e) {
      this.$message.success('成功复制： ' + e.text)
      // 改变字体颜色
      // this.asideShow=1
    },
    // 复制失败
    onError: function () {
      this.$message.error('复制失败')
    }
  }
}
</script>
<style lang="less" scoped>
.invitationCode {
  margin: auto 1vw;
  font-size: medium;
  border-bottom: 1.8px solid #efeaea;
}
.asideactive {
  color: rgba(47.94, 128.01, 255, 1);
  // background-color: rgb(62, 68, 76);
}
</style>
