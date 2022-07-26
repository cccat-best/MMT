<template id="demo">
  <!-- 以下是邀请码弹窗的实现 -->
  <el-dialog title="邀请码" :visible.sync="DialogVisibleJoin" width="30%">
    <!-- <el-divider></el-divider> -->
    <span>{{ invitationCode }}</span>
    <span style="margin: 20px"></span>
    <span
      v-clipboard:copy="invitationCode"
      v-clipboard:success="onCopy"
      v-clipboard:error="onError"
    >
      <svg
        @click="changeColor"
        @dblclick="changeBack"
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
    </span>
    <br />
    <button @click="hello">验证发请求是否正常</button>
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
      DialogVisibleJoin: false
    }
  },

  methods: {
    //图标变色
    changeColor() {
      this.color = 'rgba(47.94,128.01,255,1)'
    },
    changeBack() {
      this.color = 'rgba(51,51,51,1)'
    },

    // 实验HTTP请求，使用百度的随便一个接口
    hello() {
      axios({
        method: 'get',
        url: 'http://119.29.27.252:38080/organization/department-id?organizationId=2&userId=2',
      }).then(
        (res) => {
          this.$message.success('hello:   ' + res)
        },
        (err) => {
          this.$message.error(err)
        }
      )
    },
    //获取邀请码
    getInvitationCode() {
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
    // 复制成功
    onCopy: function (e) {
      this.$message.success('成功复制： ' + e.text)
      // console.log(e)
    },
    // 复制失败
    onError: function () {
      this.$message.error('复制失败')
    }
  }
}
</script>
<style lang="less" scoped></style>
