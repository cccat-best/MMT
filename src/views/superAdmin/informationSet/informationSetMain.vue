<template>
  <div class="informationSetMain">
    <div class="informationSetUpFont">
      <i class="el-icon-delete"></i>
      宣传管理
    </div>
    <div class="informationSetDown">
      <div class="informationSetDownNav">
        <div :class="['informationSetDownNavInner', blue===1 ? 'informationSetDownNavInnerActive':'']"
          @click="gotoBasic()
          blue = 1
          "
        >基本信息</div>
        <div :class="['informationSetDownNavInner', blue===2 ? 'informationSetDownNavInnerActive':'']"
          @click="gotoAssociation()
          blue = 2
          "
        >社团宣传</div>
        <div :class="['informationSetDownNavInner', blue===3 ? 'informationSetDownNavInnerActive':'']"
          @click="gotoRecruiting()
          blue = 3
          "
        >纳新部门</div>
      </div>
      <router-view></router-view>
      <!-- <div class="informationSetDownMain">

      </div> -->
    </div>
  </div>
</template>


<script>

export default{
  data() {
    return {
      //状态变蓝色
      blue:1,
    }
  },
  methods: {
    gotoBasic(){
      this.$router.push({
        path:'/informationBasicSaved'
      })
    },
    gotoAssociation(){
      this.$router.push({
        path:'/association'
      })
    },
    gotoRecruiting(){
      this.$router.push({
        path:'/recruiting'
      })
    }
  },
}
</script>

<style scoped>
.informationSetMain{
  display: flex;
  flex-flow: column;
}
.informationSetUpFont{
  width: 100px;
  height: 30px;
  padding-top: 5px;
  line-height: 14px;
  color: #f57d2d;
}
.informationSetDownNav{
  display: flex;
  flex-direction: row;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.informationSetDownNavInner{
  padding: 15px;
  margin-right:1px;
  font-size:20px;
  line-height:20px;
  color: rgb(118, 118, 118);
}
.informationSetDownNavInnerActive{
  color: rgb(49, 129, 255);
}
.informationSetDown{
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
</style>
