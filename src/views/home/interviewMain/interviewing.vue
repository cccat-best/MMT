<template>
  <div class="interviewingMain">
    <div class="departmentNav">
      <div class="navBtn">全部</div>
      <div class="navBtn">部门一</div>
      <div class="navBtn">部门二</div>
      <div class="navBtn">部门三</div>
      <div class="navBtn">部门四</div>
    </div>
    <div class="interviewingInner">
      <div class="interviewingLeft">
        <div class="upper"></div>
        <div class="upper"></div>
      </div>
      <div class="interviewingRight"></div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    getDepartments() {
      this.$http
        .get('/api/interview-data/time/getOrganizationAllDepartment', {
          organizationId: 1
        })
        .then((res) => {
          console.log('获得部门：', res)
        })
    }
  },
  mounted() {
    this.getDepartments()
  }
}
</script>

<style lang="less" scoped>
.interviewingMain {
  min-width: 85vw;
  min-height: 89vh;
}
.departmentNav {
  width: 100%;
  height: 25px;
  display: flex;
  flex-direction: row;
  align-items: center;

  .navBtn {
    margin: 0 10px 0 10px;
    width: 100px;
    height: 25px;
    background: #ffffff;
    background-image: -webkit-linear-gradient(top, #ffffff, #ebf1f5);
    background-image: -moz-linear-gradient(top, #ffffff, #ebf1f5);
    background-image: -ms-linear-gradient(top, #ffffff, #ebf1f5);
    background-image: -o-linear-gradient(top, #ffffff, #ebf1f5);
    background-image: linear-gradient(to bottom, #ffffff, #ebf1f5);
    -webkit-border-radius: 10;
    -moz-border-radius: 10;
    border-radius: 10px;
    font-family: Arial;
    color: #000000;
    border: solid #e8e8e8 2px;
    text-decoration: none;
    text-align: center;
    line-height: 25px;
  }

  .navBtn:hover {
    background: #ffffff;
    text-decoration: none;
    color: rgb(92, 182, 255);
  }
}
.interviewingInner {
  width: 100%;
  height: 86vh;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.interviewingLeft {
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  .upper {
    width: 97%;
    height: 48%;
    background-color: rgb(255, 255, 255);
    margin: 20px 0px 0px 10px;
    border-radius: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }
  .buttom {
    width: 95%;
    height: 42%;
    background-color: rgb(255, 255, 255);
    margin: 20px;
  }
}
.interviewingRight {
  width: 29%;
  height: 97%;
  margin: 20px 0 0 0;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>
