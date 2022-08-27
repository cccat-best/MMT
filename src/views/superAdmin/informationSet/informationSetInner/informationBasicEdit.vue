<template>
  <div class="informationBasicSaved" v-if="editShowMain">
    <el-card style="margin-bottom: 70px">
      <span class="basicInformationTitle" id="basicInformation">基本信息</span>
      <!-- 下面是基本信息 -->
      <div class="informationBasicSavedMid">
        <div class="titleAndHeadImg">
          <div class="headImg">
            <el-avatar :size="200" :src="circleUrl"></el-avatar>
          </div>
        </div>
        <div class="informationRight">
          <div class="upperFlex">
            <span class="informationRightFont">社团名称：</span
            ><el-input
              v-model="editCommunityData.name"
              placeholder="社团名称"
              size="small"
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
              size="small"
            ></el-input>
          </div>
        </div>
      </div>
    </el-card>
    <!-- 基本信息结束 -->
    <el-card style="margin-bottom: 70px; padding-bottom: 70px">
      <span class="basicInformationTitle" id="associations">社团宣传</span>
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
            maxlength="100"
            show-word-limit
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
            maxlength="100"
            show-word-limit
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
            maxlength="100"
            show-word-limit
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
            maxlength="100"
            show-word-limit
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
            maxlength="100"
            show-word-limit
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
            maxlength="100"
            show-word-limit
            resize="none"
          >
          </el-input>
        </div>
      </div>
    </el-card>
    <!-- 社团宣传结束 -->
    <el-card>
      <span class="basicInformationTitle" id="departmentRecruiting">
        纳新部门
      </span>
      <!--  -->
      <div class="partDiv">
        <i
          class="el-icon-circle-plus-outline icons"
          @click="pushNewDepartment()"
        ></i>
        <Part
          id="partOne"
          serial="0"
          title="部门一"
          :data="editCommunityData.departmentList[0]"
        ></Part>
      </div>
      <div class="partDiv" v-if="editCommunityData.departmentList[1] != null">
        <i
          class="el-icon-remove-outline icons"
          @click="spliceDepartment(1, '部门二')"
        ></i>
        <Part
          id="partTwo"
          serial="1"
          title="部门二"
          :data="editCommunityData.departmentList[1]"
        ></Part>
      </div>
      <div class="partDiv" v-if="editCommunityData.departmentList[2] != null">
        <i
          class="el-icon-remove-outline icons"
          @click="spliceDepartment(2, '部门三')"
        ></i>
        <Part
          serial="2"
          title="部门三"
          :data="editCommunityData.departmentList[2]"
        ></Part>
      </div>
      <div class="partDiv" v-if="editCommunityData.departmentList[3] != null">
        <i
          class="el-icon-remove-outline icons"
          @click="spliceDepartment(3, '部门四')"
        ></i>
        <Part
          serial="3"
          title="部门四"
          :data="editCommunityData.departmentList[3]"
        ></Part>
      </div>
    </el-card>
  </div>
</template>

<script>
import Part from './part.vue'
export default {
  comments: {
    Part
  },
  data() {
    return {
      circleUrl:
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      editCommunityData: {},
      editShowMain: false
    }
  },
  methods: {
    async postData() {
      //取得part组件中的department数据
      this.$bus.$emit('getParts')
      //接收并合并department数据
      let { data: res } = await this.$http.post(
        '/api/organization/information',
        this.editCommunityData
      )
      if (res.code != '00000') {
        // if (JSON.stringify(res.message).split('').splice(-4, -1) == '100') {
        //   this.$message.error('不能超过一百个字')
        // }
        console.log('出错了', res.message)
        this.$message.error(res.message)
      }
    },

    successful(val) {
      this.$message({
        message: val,
        type: 'success'
      })
    },
    error(val) {
      this.$message.error({
        message: val
      })
    },
    pushNewDepartment() {
      if (this.editCommunityData.departmentList.length < 4) {
        this.editCommunityData.departmentList.push({
          name: '',
          briefIntroduction: '',
          introduction: '',
          standard: ''
        })
        this.successful('添加新部门成功~')
      } else {
        this.error('添加失败！已经满了四个部门了哦~')
      }
    },
    spliceDepartment(val, partId) {
      this.$confirm('是否删除' + partId + '?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.editCommunityData.departmentList.splice(val, 1)
          // console.log(this)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    goAnchor(selector) {
      /*参数selector是id选择器（#anchor14）*/
      document.querySelector(selector).scrollIntoView({
        behavior: 'smooth'
      })
    }
  },
  mounted() {
    this.$bus.$on('sendCommunityDataToChild', (val) => {
      // console.log('Edit收到了数据:', val)
      this.editCommunityData = val.data
      this.editShowMain = true
      // console.log(this.editCommunityData.departmentList[0])
    })
    this.$bus.$on('postData', () => {
      this.postData()
    })
    this.$bus.$on('department0', (val) => {
      console.log('监听到了0')
      this.editCommunityData.departmentList[0] = val
    })
    this.$bus.$on('department1', (val) => {
      console.log('监听到了1')
      this.editCommunityData.departmentList[1] = val
    })
    this.$bus.$on('department2', (val) => {
      console.log('监听到了2')
      this.editCommunityData.departmentList[2] = val
    })
    this.$bus.$on('department3', (val) => {
      console.log('监听到了3')
      this.editCommunityData.departmentList[3] = val
    })
    this.$bus.$emit('editNeedData')
  },
  beforeDestroy() {
    this.$bus.$off('sendCommunityDataToChild')
    this.$bus.$off('postData')
    this.$bus.$off('department0')
    this.$bus.$off('department1')
    this.$bus.$off('department2')
    this.$bus.$off('department3')
  },
  components: { Part }
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
  padding-bottom: 6vh;
  margin-top: 6vh;
}
.associations {
  width: 70vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.basicInformationTitle {
  width: 150px;
  height: 50px;
  font-size: 30px;
  line-height: 45px;
  align-self: flex-start;
}
.headImg {
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
  width: 450px;
  height: 220px;
  margin-left: -10vw;
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
  font-size: 21px;
}
.associationsTitleFont {
  font-size: 24px;
  margin: 60px 0px 20px 0px;
  text-align: left;
}
.associationsTitleFontWhite {
  font-size: 20px;
  color: rgba(64, 64, 64, 0.759);
}
.associationsBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.upperFlex {
  display: flex;
  flex-direction: row;
  margin-bottom: -10px;
}
.textIpt {
  width: 50vw;
}
.icons {
  font-size: 30px;
  color: rgb(92, 182, 255);
  margin: 80px;
}
.icons:hover {
  color: rgb(39, 158, 255);
}
.partDiv {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-evenly;
  width: 70vw;
}
</style>
