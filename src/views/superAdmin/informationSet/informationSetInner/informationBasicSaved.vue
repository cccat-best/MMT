<template>
  <div class="informationBasicSaved" v-if="showMain === true">
    <el-card shadow="always" style="margin-bottom: 70px">
      <div slot="header" class="clearfix">
        <span class="basicInformationTitle" id="basicInformation"
          >基本信息</span
        >
      </div>
      <!-- <div class="basicInformationTitle" id="basicInformation">基本信息</div> -->
      <!-- 下面是基本信息 -->
      <div class="informationBasicSavedMid">
        <div class="titleAndHeadImg">
          <div class="headImg">
            <el-avatar :size="200" :src="circleUrl"></el-avatar>
          </div>
        </div>
        <div class="informationRight">
          <div style="margin-bottom: 30px">
            <span class="informationRightFont">社团名称：</span
            ><span style="font-size: 22px">{{ communityData.name }}</span>
          </div>
          <div style="margin-bottom: 30px">
            <el-tag size="medium" class="tags" effect="dark">{{
              communityData.tag.tagA
            }}</el-tag>
            <el-tag size="medium" class="tags" type="success" effect="dark">{{
              communityData.tag.tagB
            }}</el-tag>
          </div>
          <div style="margin-bottom: 30px">
            <span class="informationRightFont">简介：</span>
            <span>{{ communityData.briefIntroduction }}</span>
          </div>
        </div>
      </div>
    </el-card>
    <!-- 基本信息结束 -->
    <el-card shadow="always">
      <div slot="header" class="clearfix">
        <span class="basicInformationTitle" id="associations">社团宣传</span>
      </div>
      <!-- <div class="basicInformationTitle" id="associations">社团宣传</div> -->
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
          <div class="associationsTitleFontWhite">
            {{ communityData.slogan }}
          </div>
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
          <div class="associationsTitleFontWhite">
            {{ communityData.daily }}
          </div>
        </div>
        <div class="associationsBox" v-if="communityData.more != null">
          <div class="associationsTitleFont">更多</div>
          <div class="associationsTitleFontWhite">{{ communityData.more }}</div>
        </div>
      </div>
    </el-card>
    <!-- 社团宣传结束 -->
    <el-card shadow="always" style="margin-top: 70px">
      <div slot="header" class="clearfix">
        <span class="basicInformationTitle" id="departmentRecruiting"
          >纳新部门</span
        >
      </div>
      <!-- <div class="basicInformationTitle" id="departmentRecruiting">纳新部门</div> -->
      <!-- 纳新部门 -->
      <div class="departmentMain">
        <div
          class="departmentBlock"
          v-if="communityData.departmentList[0] != null"
        >
          <div class="departmentTitle">部门一</div>
          <div class="departmentFourInner">
            <div class="fourTitleFont">部门名称：</div>
            <div class="fourInnerFont">
              {{ communityData.departmentList[0].name }}
            </div>
          </div>
          <div class="departmentFourInner">
            <div class="fourTitleFont">部门简介：</div>
            <div class="fourInnerFont">
              {{ communityData.departmentList[0].briefIntroduction }}
            </div>
          </div>
          <div class="departmentFourInner">
            <div class="fourTitleFont">部门介绍：</div>
            <div class="fourInnerFont">
              {{ communityData.departmentList[0].introduction }}
            </div>
          </div>
          <div class="departmentFourInner">
            <div class="fourTitleFont">部门要求：</div>
            <div class="fourInnerFont">
              {{ communityData.departmentList[0].standard }}
            </div>
          </div>
        </div>
        <div class="departmentBlock">
          <div
            class="departmentTitle"
            v-if="communityData.departmentList[1] != null"
          >
            部门二
          </div>
          <div class="departmentFourInner">
            <div class="fourTitleFont">部门名称：</div>
            <div class="fourInnerFont">
              {{ communityData.departmentList[1].name }}
            </div>
          </div>
          <div class="departmentFourInner">
            <div class="fourTitleFont">部门简介：</div>
            <div class="fourInnerFont">
              {{ communityData.departmentList[1].briefIntroduction }}
            </div>
          </div>
          <div class="departmentFourInner">
            <div class="fourTitleFont">部门介绍：</div>
            <div class="fourInnerFont">
              {{ communityData.departmentList[1].introduction }}
            </div>
          </div>
          <div class="departmentFourInner">
            <div class="fourTitleFont">部门要求：</div>
            <div class="fourInnerFont">
              {{ communityData.departmentList[1].standard }}
            </div>
          </div>
        </div>
        <div
          class="departmentBlock"
          v-if="communityData.departmentList[2] != null"
        >
          <div class="departmentTitle">部门三</div>
          <div class="departmentFourInner">
            <div class="fourTitleFont">部门名称：</div>
            <div class="fourInnerFont">
              {{ communityData.departmentList[2].name }}
            </div>
          </div>
          <div class="departmentFourInner">
            <div class="fourTitleFont">部门简介：</div>
            <div class="fourInnerFont">
              {{ communityData.departmentList[2].briefIntroduction }}
            </div>
          </div>
          <div class="departmentFourInner">
            <div class="fourTitleFont">部门介绍：</div>
            <div class="fourInnerFont">
              {{ communityData.departmentList[2].introduction }}
            </div>
          </div>
          <div class="departmentFourInner">
            <div class="fourTitleFont">部门要求：</div>
            <div class="fourInnerFont">
              {{ communityData.departmentList[2].standard }}
            </div>
          </div>
        </div>
        <div
          class="departmentBlock"
          v-if="communityData.departmentList[3] != null"
        >
          <div class="departmentTitle">部门四</div>
          <div class="departmentFourInner">
            <div class="fourTitleFont">部门名称：</div>
            <div class="fourInnerFont">
              {{ communityData.departmentList[3].name }}
            </div>
          </div>
          <div class="departmentFourInner">
            <div class="fourTitleFont">部门简介：</div>
            <div class="fourInnerFont">
              {{ communityData.departmentList[3].briefIntroduction }}
            </div>
          </div>
          <div class="departmentFourInner">
            <div class="fourTitleFont">部门介绍：</div>
            <div class="fourInnerFont">
              {{ communityData.departmentList[3].introduction }}
            </div>
          </div>
          <div class="departmentFourInner">
            <div class="fourTitleFont">部门要求：</div>
            <div class="fourInnerFont">
              {{ communityData.departmentList[3].standard }}
            </div>
          </div>
        </div>
      </div>
    </el-card>
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
      // console.log('Saved收到了数据:', val)
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
.title {
  font-size: 30px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}
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
  padding-bottom: 6vh;
  /* margin-bottom: 80px; */
  /* margin-top: 80px; */
}
.associations {
  width: 70vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
.basicInformationTitle {
  width: 150px;
  height: 50px;
  font-size: 30px;
  line-height: 45px;
  align-self: flex-start;
}
.headImg {
  /* margin-top: 100px; */
  width: 200px;
  height: 200px;
}
.titleAndHeadImg {
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.informationRight {
  /* margin-top: 40px;
  margin-bottom: 40px; */

  width: 550px;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
.tags {
  margin-right: 20px;
}
.informationRightFont {
  margin-bottom: 20px;
  font-size: 22px;
}
.associationsTitleFont {
  font-size: 24px;
  /* margin: 60px 60px 60px 0px; */
  margin-left: 6vw;
  margin-top: 6vh;
  text-align: left;
}
.associationsTitleFontWhite {
  margin-left: 6vw;
  margin-top: 2vw;
  font-size: 20px;
  color: rgba(64, 64, 64, 0.759);
  text-align: left;
}
.associationsBox {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 20px;
}
.departmentMain {
  padding-left: 6vw;
  padding-bottom: 6vw;
  width: 65vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.departmentBlock {
  margin-top: 40px;
  width: 900px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.departmentFourInner {
  width: 900px;
  display: flex;
  flex-direction: row;
  margin-top: 20px;
}
.departmentTitle {
  font-size: 24px;
  /* margin-bottom: 20px; */
  text-align: left;
}
.fourTitleFont {
  width: 150px;
  font-size: 20px;
}
.fourInnerFont {
  width: 700px;
  color: rgba(64, 64, 64, 0.759);
  text-align: left;
}
</style>
