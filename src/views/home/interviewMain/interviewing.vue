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
        <div class="upper">
          <template
            v-if="
              this.getDepartmentsDone === true && this.getRoomDataDone === true
            "
          >
            <i
              class="el-icon-d-arrow-left arrowBtn"
              @click="reduceRenderCardList()"
            ></i>
            <div
              class="card"
              v-for="card in cardList"
              :key="card.roomId"
              v-on:mouseover="
                card.showBack = true
                getNowRoomData(card.roomId)
              "
              v-on:mouseleave="card.showBack = false"
            >
              <template v-if="card.showBack === false">
                <el-progress
                  type="circle"
                  :stroke-width="12"
                  :format="format(card)"
                  :percentage="card.percentage"
                ></el-progress>
                <div>房间号：{{ card.roomName }}</div>
                <div>未面试：{{ card.unInterviewNum }}</div>
                <div>已面试：{{ card.interviewNum }}</div>
                <div>总计：{{ card.totalNum }}</div>
              </template>
              <template v-if="card.showBack === true">
                <div class="stdName topMargin">当前面试学生:</div>
                <div class="stdName">{{ nowRoomData.interviewerName }}</div>
                <div class="stdName">开始面试的时间:</div>
                <div class="stdName buttomMargin">{{ nowRoomData.time }}</div>
              </template>
            </div>
            <i
              class="el-icon-d-arrow-right arrowBtn"
              @click="addRenderCardList()"
            ></i>
          </template>
        </div>
        <div class="buttom"></div>
      </div>
      <div class="interviewingRight"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cardList: [],
      cardhead: 0,
      cardend: 4,
      getDepartmentsDone: false,
      getRoomDataDone: false,
      nowRoomData: {
        interviewerName: '大聪明',
        time: '12:50'
      },
      roomList: [
        {
          roomId: 1,
          roomName: '7-111',
          unInterviewNum: 15,
          interviewNum: 15,
          totalNum: 45
        },
        {
          roomId: 2,
          roomName: '7-112',
          unInterviewNum: 15,
          interviewNum: 15,
          totalNum: 76
        },
        {
          roomId: 3,
          roomName: '7-113',
          unInterviewNum: 17,
          interviewNum: 11,
          totalNum: 45
        },
        {
          roomId: 4,
          roomName: '7-114',
          unInterviewNum: 15,
          interviewNum: 15,
          totalNum: 57
        },
        {
          roomId: 5,
          roomName: '7-115',
          unInterviewNum: 15,
          interviewNum: 15,
          totalNum: 78
        },
        {
          roomId: 6,
          roomName: '7-116',
          unInterviewNum: 15,
          interviewNum: 15,
          totalNum: 31
        }
      ]
    }
  },
  methods: {
    getDepartments() {
      this.$http
        .get('/api/interview-data/time/getOrganizationAllDepartment', {
          organizationId: 1
        })
        .then((res) => {
          console.log('获得部门：', res)
        })
        .then(() => {
          this.getDepartmentsDone = true
        })
    },
    getRoomData() {
      this.$http
        .get('/api/interview-data/ongoing/room/all', {
          organizationId: 1,
          admissionId: 1
        })
        .then((res) => {
          console.log('获得roomData：', res.data.data.roomData)
          this.roomList = this.mergeObj(this.roomList, {
            showBack: false
          })
          this.cardList = this.roomList.slice(0, 4)
        })
        .then(() => {
          this.getRoomDataDone = true
        })
    },
    addRenderCardList() {
      if (this.cardend < this.roomList.length) {
        this.cardhead++
        this.cardend++
        this.cardList = this.roomList.slice(this.cardhead, this.cardend)
      }
    },
    reduceRenderCardList() {
      if (this.cardhead > 0) {
        this.cardhead--
        this.cardend--
        this.cardList = this.roomList.slice(this.cardhead, this.cardend)
      }
    },
    format(card) {
      card.percentage = Math.round((card.interviewNum / card.totalNum) * 100)
    },
    getNowRoomData(roomId) {
      console.log(roomId)
      this.$http
        .get('/api/interview-data/ongoing/room/back', {
          admissionId: 1,
          organizationId: 1,
          departmentId: 1,
          roomId: roomId
        })
        .then((res) => {
          console.log(res)
        })
    },
    //为数组中对象的每一项添加新的属性
    mergeObj(arr, obj) {
      return arr.map((item) => {
        return { ...item, ...obj }
      })
    }
  },
  mounted() {
    this.getDepartments()
    this.getRoomData()
  }
}
</script>

<style lang="less" scoped>
@blue: rgb(92, 182, 255);
.interviewingMain {
  width: 100%;
  height: 100%;
  min-height: 800px;
  min-width: 1400px;
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
  height: 97%;
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
    overflow-x: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;

    .card {
      width: 15%;
      height: 80%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      background-color: rgba(243, 243, 243, 0.27);
      border-radius: 15px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      transition: all 0.3s;
      .topMargin {
        margin-top: 65px;
      }
      .buttomMargin {
        margin-bottom: 65px;
      }
    }
    .card:hover {
      transform: scale(1.1) rotateY(180deg);
      transform-style: preserve-3d;
    }
  }
  .buttom {
    width: 97%;
    height: 48%;
    background-color: rgb(255, 255, 255);
    margin: 20px 0px 0px 10px;
    border-radius: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
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
.arrowBtn {
  font-size: 35px;
  color: @blue;
}
.arrowBtn:hover {
  color: rgb(14, 147, 255);
}
.stdName {
  transform: rotateY(-180deg);
  transform-style: preserve-3d;
}
</style>
