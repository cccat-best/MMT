<template>
  <div class="informationBasicSaved" v-if="showMain === true">
    <div class="basicInformationTitle" id="basicInformation">基本信息</div>
    <!-- 下面是基本信息 -->
    <div class="informationBasicSavedMid">
      <div class="titleAndHeadImg">
        <div class="headImg">
          <el-avatar :size="300" :src="circleUrl"></el-avatar>
        </div>
      </div>
      <div class="informationRight">
        <div>
          <span class="informationRightFont">社团名称：</span
          ><span>{{ communityData.name }}</span>
        </div>
        <div>
          <el-tag size="medium" class="tags" effect="dark">{{
            communityData.tag.tagA
          }}</el-tag>
          <el-tag size="medium" class="tags" type="success" effect="dark">{{
            communityData.tag.tagB
          }}</el-tag>
        </div>
        <div>
          <span class="informationRightFont">简介：</span>
          <span>{{ communityData.briefIntroduction }}</span>
        </div>
      </div>
    </div>
    <!-- 基本信息结束 -->
    <el-divider></el-divider>
    <div class="basicInformationTitle" id="associations">社团宣传</div>
    <!-- 下面是社团宣传 -->
    <div class="associations">
      <div class="associationsBox">
        <div
          class="associationsTitleFont"
          v-if="communityData.contactInfo != null"
        >
          联系方式
        </div>
        <div class="associationsTitleFontWhite">
          {{ communityData.contactInfo }}
        </div>
      </div>
      <div class="associationsBox" v-if="communityData.slogan != null">
        <div class="associationsTitleFont">纳新宣言</div>
        <div class="associationsTitleFontWhite">{{ communityData.slogan }}</div>
      </div>
      <div class="associationsBox" v-if="communityData.introduction != null">
        <div class="associationsTitleFont">社团介绍</div>
        <div class="associationsTitleFontWhite">
          {{ communityData.introduction }}
        </div>
      </div>
      <div class="associationsBox" v-if="communityData.feature != null">
        <div class="associationsTitleFont">社团特色</div>
        <div class="associationsTitleFontWhite">
          {{ communityData.feature }}
        </div>
      </div>
      <div class="associationsBox" v-if="communityData.daily != null">
        <div class="associationsTitleFont">社团日常</div>
        <div class="associationsTitleFontWhite">{{ communityData.daily }}</div>
      </div>
      <div class="associationsBox" v-if="communityData.more != null">
        <div class="associationsTitleFont">更多</div>
        <div class="associationsTitleFontWhite">{{ communityData.more }}</div>
      </div>
    </div>
    <!-- 社团宣传结束 -->
    <el-divider></el-divider>
    <div class="basicInformationTitle" id="departmentRecruiting">纳新部门</div>
    <!--  -->
  </div>
</template>

<script>
export default {
  name: 'informationBasicSaved',
  data() {
    return {
      circleUrl:
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      communityData: {},
      showMain: false,
      //用于测试触发多少次saveNeedData
      times: 0
    }
  },
  methods: {},
  mounted() {
    this.$bus.$on('sendCommunityDataToChild', (val) => {
      console.log('Saved收到了数据:', val)
      this.communityData = val.data
      this.showMain = true
    })
    this.$bus.$emit('savedNeedData')
  },
  beforeDestroy() {
    this.$bus.$off('sendCommunityDataToChild')
  }
}
</script>

<style scoped>
.informationBasicSaved {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin-top: 65px;
}
.informationBasicSavedMid {
  width: 70vw;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 80px;
  margin-top: 80px;
}
.associations {
  width: 70vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 80px;
  margin-top: 80px;
}
.basicInformationTitle {
  width: 150px;
  height: 50px;
  font-size: 30px;
  line-height: 45px;
  align-self: flex-start;
}
.headImg {
  margin-top: 100px;
  width: 300px;
  height: 300px;
}
.titleAndHeadImg {
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.informationRight {
  margin-top: 100px;
  width: 450px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
}
.tags {
  margin-right: 20px;
}
.informationRightFont {
  font-size: 26px;
}
.associationsTitleFont {
  font-size: 24px;
  margin: 60px 60px 60px 0px;
  text-align: left;
}
.associationsTitleFontWhite {
  font-size: 20px;
  color: rgba(64, 64, 64, 0.759);
  text-align: left;
}
.associationsBox {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 100px;
}
</style>
