<template id="demo">
  <!-- 以下是邀请码弹窗的实现 -->
  <el-dialog
    title="邀请码"
    :visible.sync="DialogVisibleJoin"
    @close="clearColor"
    width="30%"
    class="leastWidth"
  >
    <div style="display: inline-flex">
      <div style="font-size: medium; margin: auto auto">邀请码：</div>
      <div :class="[asideShow == 1 ? 'asideactive' : 'invitationCode']">
        {{ invitationCode }}
      </div>
      <div
        v-clipboard:copy="invitationCode"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"
        style="margin-left: 8px"
      >
        <svg
          @click="changeColor"
          :class="[asideShow == 0 ? 'changeColor1' : 'changeColor2']"
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
            ></path>
          </g>
        </svg>
      </div>
    </div>

    <br />
    <br />
    <br />
    <br />
    <div style="font-size: 1vw">
      有效期：{{ showStartTime }} ~ {{ showEndTime }}
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      //邀请码
      invitationCode: 'ABCDEFG',
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
    // 清除颜色改变
    clearColor() {
      this.asideShow = 0
    },
    //图标变色
    changeColor() {
      // 改变图标\字体颜色
      if (this.asideShow == 1) {
        this.asideShow = 0
      } else {
        this.asideShow = 1
      }
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
    //获取邀请码发请求
    getInvitationCodeRequest() {
      this.$http.get('api/organization/invitation-code').then(
        (res) => {
          if (res.data.code == '00000') {
            this.invitationCode = res.data.data.invitationCode
          }
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
    },
    // 复制失败
    onError: function () {
      this.$message.error('复制失败')
    }
  }
}
</script>
<style lang="less" scoped>
.leastWidth {
  min-width: 1200px;
}
.invitationCode {
  margin: auto 1vw;
  width: 96px;
  font-size: medium;
  border-bottom: 1.8px solid #666666;
}
.asideactive {
  margin: auto 1vw;
  width: 96px;
  font-size: medium;
  border-bottom: 1.8px solid #069db8;
  color: rgba(47.94, 128.01, 255, 1);
}
.changeColor1 {
  fill: currentColor;
  color: #666666;
}
.changeColor2 {
  fill: currentColor;
  color: #069db8;
}
</style>
