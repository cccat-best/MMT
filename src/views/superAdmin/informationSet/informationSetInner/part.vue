<template>
  <div class="part">
    <div class="title">{{ title }}</div>
    <div class="name">
      <span class="innerSpan">部门名:</span>
      <el-input
        type="text"
        placeholder="部门名称"
        v-model="data.name"
        maxlength="10"
        show-word-limit
      ></el-input>
    </div>
    <div class="briefIntroduction">
      <span class="innerSpan">部门简介:</span>
      <el-input
        type="text"
        placeholder="部门简介"
        v-model="data.briefIntroduction"
        maxlength="35"
        show-word-limit
      ></el-input>
    </div>
    <div class="departmentIntroduction">
      <span class="innerSpan">部门介绍:</span>
      <el-input
        type="textarea"
        placeholder="部门介绍"
        v-model="data.introduction"
        maxlength="200"
        show-word-limit
        resize="none"
        :rows="5"
      ></el-input>
    </div>
    <div class="need">
      <span class="innerSpan">纳新要求:</span>
      <el-input
        type="textarea"
        placeholder="纳新要求"
        v-model="data.standard"
        maxlength="200"
        show-word-limit
        resize="none"
        :rows="5"
      ></el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: 'part',
  data() {
    return {}
  },
  props: {
    serial: String,
    title: String,
    data: Object
  },
  mounted() {
    this.$bus.$on('getParts', () => {
      console.log('触发了getParts，关键字为：', 'department' + this.serial)
      this.$bus.$emit('department' + this.serial, this.data)
    })
  },
  beforeDestroy() {
    this.$bus.$off('getParts')
  }
}
</script>

<style scoped>
.part {
  margin-top: 80px;
  width: 900px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.title {
  font-size: 24px;
  margin: 0px 60px 40px 0px;
  text-align: left;
}
.innerSpan {
  width: 150px;
}
.name {
  width: 700px;
  display: flex;
  flex-direction: row;
  margin-top: 20px;
}
.briefIntroduction {
  width: 700px;
  display: flex;
  flex-direction: row;
  margin-top: 20px;
}
.departmentIntroduction {
  width: 700px;
  display: flex;
  flex-direction: row;
  margin-top: 20px;
}
.need {
  width: 700px;
  display: flex;
  flex-direction: row;
  margin-top: 20px;
}
</style>
