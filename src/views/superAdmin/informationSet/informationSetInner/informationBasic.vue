<template>
  <div class="informationBasicMain">
    <div v-if="editable === false"
    class="editBtn"
    @click="
    editable = !editable
    gotoEdit()
    ">
      <i class="el-icon-edit-outline"></i>
      编辑页面
    </div>
    <div v-if="editable === true" class="editBtn"
    @click="
    editable = !editable
    gotoSaved()
    ">
      <i class="el-icon-document-checked"></i>
      保存页面
    </div>
    <!-- 下面是默认显示的信息（默认是不保存） -->
    <div class="saved">
      <div class="titleAndHeadImg">
        <div class="basicInformationTitle">基本信息</div>
        <div class="headImg"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  data() {
    return {
      //用于存储社团信息
      communityInformation:{},
      //切换编辑页面和保存页面
      editable:false,
    }
  },
  methods: {
    getInformation(){

    },
    gotoEdit(){
      this.$router.push({
        path:'/superAdmin/informationSet/basicInformation/informationBasicEdit'
      })
    },
    gotoSaved(){
      this.$router.push({
        path:'/superAdmin/informationSet/basicInformation/informationBasicSaved'
      })
    }
  },
}


</script>



<style scoped>
.informationBasicMain{
  min-height: 80vh;
  padding-left: 100px;
  padding-right: 100px;
}
.editBtn{
  width: 100px;
  height: 40px;
  line-height: 45px;
  color: rgb(49, 129, 255);
  margin-top: 35px;
  margin-left: auto;
  margin-right: 20px;
}
.basicInformationTitle{
  width: 150px;
  height: 50px;
  font-size: 30px;
  line-height: 45px;
}
.headImg{
  margin-top: 100px;
  width: 300px;
  height: 300px;
  background-color: rgb(98, 255, 0);
}
.titleAndHeadImg{
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
