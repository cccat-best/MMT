<template>
  <div class="informationBasicSaved" v-if="editShowMain">
    <div class="basicInformationTitle" id="basicInformation">基本信息</div>
    <!-- 下面是基本信息 -->
    <div class="informationBasicSavedMid">
      <div class="titleAndHeadImg">
        <div class="headImg">
          <el-avatar :size="300" :src="circleUrl"></el-avatar>
        </div>
      </div>
      <div class="informationRight">
        <div class="upperFlex">
          <span class="informationRightFont">社团名称：</span
          ><el-input
            v-model="editCommunityData.name"
            placeholder="社团名称"
          ></el-input>
        </div>
        <div>
          <el-tag size="medium" class="tags" effect="dark">校级组织</el-tag>
          <el-tag size="medium" class="tags" type="success" effect="dark"
            >学术科技</el-tag
          >
        </div>
        <div class="upperFlex">
          <span class="informationRightFont">简介：</span>
          <el-input
            v-model="editCommunityData.briefIntroduction"
            placeholder="社团名称"
          ></el-input>
        </div>
      </div>
    </div>
    <!-- 基本信息结束 -->
    <el-divider></el-divider>
    <div class="basicInformationTitle" id="associations">社团宣传</div>
    <!-- 下面是社团宣传 -->
    <div class="associations">
      <div class="associationsBox">
        <div class="associationsTitleFont">联系方式</div>
        <el-input
          type="textarea"
          :rows="7"
          class="textIpt"
          placeholder="联系方式"
          v-model="editCommunityData.contactInfo"
          resize="none"
        >
        </el-input>
      </div>
      <div class="associationsBox">
        <div class="associationsTitleFont">纳新宣言</div>
        <el-input
          type="textarea"
          :rows="7"
          class="textIpt"
          placeholder="纳新宣言"
          v-model="editCommunityData.slogan"
          resize="none"
        >
        </el-input>
      </div>
      <div class="associationsBox">
        <div class="associationsTitleFont">社团介绍</div>
        <el-input
          type="textarea"
          :rows="7"
          class="textIpt"
          placeholder="社团介绍"
          v-model="editCommunityData.introduction"
          resize="none"
        >
        </el-input>
      </div>
      <div class="associationsBox">
        <div class="associationsTitleFont">社团特色</div>
        <el-input
          type="textarea"
          :rows="7"
          class="textIpt"
          placeholder="社团特色"
          v-model="editCommunityData.feature"
          resize="none"
        >
        </el-input>
      </div>
      <div class="associationsBox">
        <div class="associationsTitleFont">社团日常</div>
        <el-input
          type="textarea"
          :rows="7"
          class="textIpt"
          placeholder="社团日常"
          v-model="editCommunityData.daily"
          resize="none"
        >
        </el-input>
      </div>
      <div class="associationsBox">
        <div class="associationsTitleFont">更多</div>
        <el-input
          type="textarea"
          :rows="7"
          class="textIpt"
          placeholder="更多"
          v-model="editCommunityData.more"
          maxlength="30"
          resize="none"
        >
        </el-input>
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
  data() {
    return {
      circleUrl:
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      editCommunityData: {},
      editShowMain: false
    }
  },
  methods: {
    postData() {
      this.$http.post('/api/organization/information', this.editCommunityData)
    }
  },
  mounted() {
    this.$bus.$on('sendCommunityDataToChild', (val) => {
      console.log('Edit收到了数据:', val)
      this.editCommunityData = val.data
      this.editShowMain = true
    })
    this.$bus.$on('postData', () => {
      this.postData()
    })
    this.$bus.$emit('editNeedData')
  },
  beforeDestroy() {
    this.$bus.$off('sendCommunityDataToChild')
    this.$bus.$off('postData')
  }
}
</script>

<style scoped>
.informationBasicSaved {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
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
  width: 200px;
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
}
.associationsBox {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 100px;
}
.upperFlex {
  display: flex;
  flex-direction: row;
}
.textIpt {
  width: 75vw;
}
</style>
