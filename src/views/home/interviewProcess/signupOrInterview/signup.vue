<template>
  <div class="main">
    <div class="left">
        <div class="nav-title">
            <div :class="['nav-title-item',showactive==1? 'active' :'']" @click="showactive=1;gotoTIme()">报名时间</div>
            <div :class="['nav-title-item' ,'special',showactive>2? 'active-sp' :'']" @click="showactive=2">报名表问题</div>
            <div :class="['nav-title-item',showactive==3? 'active' :'']" @click="showactive=3;gotoBase()">基本问题</div>
            <div :class="['nav-title-item',showactive==4? 'active' :'']" @click="showactive=4;gotoSection()">部门问题</div>
            <div :class="['nav-title-item',showactive==5? 'active' :'']" @click="showactive=5;gotoSynth()">综合问题</div>
        </div>
    </div>
    <div class="right">
        <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        showactive:1,
    }
  },
  methods: {
    gotoTIme() {
    this.$router.push({
        path:'/time'
      })
    },
    gotoBase() {
    this.$router.push({
        path:'/base'
      })
    },
    gotoSection() {
    this.$router.push({
        path:'/section'
      })
    },
    gotoSynth() {
    this.$router.push({
        path:'/synth'
      })
    },
  }
}
</script>
<style lang="less" scoped>
.main {
    line-height: 15px;
    margin-top: 50px;
    margin-left: 20px;
    height: 100%;
    width: 100%;
    display: flex;
    .left{
        margin-top:10px ;
        margin-left:20px ;
        width: 18%;
      .nav-title {
        display: flex;
        flex-direction: column;
        text-align: center;
        .nav-title-item {
        width: 100px;
        height: 30px;
        text-align: center;
        padding-bottom: 10px;
        border-left: 4px solid #a3a3a3;
        color: #a3a3a3;
        display: flex;
        align-items: center;
        padding-left: 10px;
        cursor: pointer;
        }
        .active {
            border-left: 4px solid #63afe2 !important;
            color: #63afe2;
        }
        .special {
            color: black;
            cursor: default !important;
        }
        .active-sp {
           color: #2588ca;
            border-left: 4px solid #a3a3a3;
        }
      }
    }
    .right {
        width: 70%;
    }
}

</style>
