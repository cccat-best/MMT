<template>
  <div class="informationSetMain">
    <div class="informationSetUpFont">
      <i class="el-icon-delete"></i>
      宣传管理
    </div>
    <div class="informationSetDown">
      <div class="informationSetDownNav">
        <div
          :class="[
            'informationSetDownNavInner',
            blue === 1 ? 'informationSetDownNavInnerActive' : ''
          ]"
          @click="
            blue = 1
            goAnchor('#basicInformation')
          "
        >
          基本信息
        </div>
        <div
          :class="[
            'informationSetDownNavInner',
            blue === 2 ? 'informationSetDownNavInnerActive' : ''
          ]"
          @click="
            goAnchor('#associations')
            blue = 2
          "
        >
          社团宣传
        </div>
        <div
          :class="[
            'informationSetDownNavInner',
            blue === 3 ? 'informationSetDownNavInnerActive' : ''
          ]"
          @click="
            // gotoRecruiting()
            blue = 3
          "
        >
          纳新部门
        </div>
      </div>
      <div class="informationBasicMain">
        <!-- 编辑保存页面的按钮 -->
        <div
          v-if="editable === false"
          class="editBtn"
          @click="
            editable = !editable
            gotoEdit()
          "
        >
          <i class="el-icon-edit-outline"></i>
          编辑页面
        </div>
        <div
          v-if="editable === true"
          class="editBtn"
          @click="
            editable = !editable
            gotoSaved()
          "
        >
          <i class="el-icon-document-checked"></i>
          保存页面
        </div>
        <!-- 按钮到这里结束 -->

        <!-- 测试请求 -->
        <!-- <button @click="getCookie()">getCookie</button> -->

        <!-- 下面是默认显示的信息（默认是不保存） -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'informationSetMain',
  data() {
    return {
      //状态变蓝色
      blue: 1,
      //用于存储社团信息
      communityData: {},
      //切换编辑页面和保存页面
      editable: false,
      organizationId: sessionStorage.getItem('loginOrganizationId')
    }
  },
  methods: {
    getInformation() {},
    gotoEdit() {
      // console.log("执行了gotoEdit")
      this.$router.push({
        path: '/superAdmin/informationSet/informationSetEdit'
      })
    },
    gotoSaved() {
      this.$router.push({
        path: '/superAdmin/informationSet/informationSetSaved'
      })
    },
    //锚点跳转
    goAnchor(selector) {
      /*参数selector是id选择器（#anchor14）*/
      document.querySelector(selector).scrollIntoView({
        behavior: 'smooth'
      })
    },
    getCommunityData() {
      this.$http
        .get('/api/organization/information', {
          organizationId: 1
        })
        .then((response) => {
          this.communityData = JSON.parse(JSON.stringify(response.data))
          console.log('收到了服务器的响应:结果是', this.communityData)
          this.$bus.$emit('sendCommunityDataToChild', this.communityData)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    hearSaveNeedData() {
      this.$bus.$on('savedNeedData', () => {
        this.getCommunityData()
      })
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      // 仅在整个视图都被渲染之后才会运行的代码
    })
    this.hearSaveNeedData()
  }
}
</script>

<style scoped>
.informationSetMain {
  display: flex;
  flex-flow: column;
}
.informationSetUpFont {
  width: 100px;
  height: 30px;
  padding-top: 5px;
  line-height: 14px;
  color: #f57d2d;
}
.informationSetDownNav {
  display: flex;
  flex-direction: row;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.informationSetDownNavInner {
  padding: 15px;
  margin-right: 1px;
  font-size: 20px;
  line-height: 20px;
  color: rgb(118, 118, 118);
}
.informationSetDownNavInnerActive {
  color: rgb(49, 129, 255);
}
.informationSetDown {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.informationBasicMain {
  height: 80vh;
  padding-left: 100px;
  padding-right: 100px;
  overflow-y: auto;
}
.informationBasicMain::-webkit-scrollbar {
  width: 8px;
  border-radius: 4px;
  overflow-y: scroll;
}
.informationBasicMain::-webkit-scrollbar-thumb {
  background: rgba(158, 158, 158, 0.381);
}
.editBtn {
  position: fixed;
  right: 50px;
  top: 140px;
  width: 100px;
  height: 40px;
  line-height: 45px;
  color: rgb(49, 129, 255);
  margin-top: 35px;
  margin-left: auto;
  margin-right: 20px;
}
</style>
