<template>
  <div class="interviewingMain">
    <div class="departmentNav">
      <el-button @click="reNewData()" size="medium">全部</el-button>
      <el-button
        size="medium"
        v-if="departmentNum.length > 0"
        @click="reNewData(departmentNum[0].departmentId)"
      >
        部门一 : {{ departmentNum[0].departmentName }}
      </el-button>
      <el-button
        size="medium"
        v-if="departmentNum.length > 1"
        @click="reNewData(departmentNum[1].departmentId)"
      >
        部门二 : {{ departmentNum[1].departmentName }}
      </el-button>
      <el-button
        size="medium"
        v-if="departmentNum.length > 2"
        @click="reNewData(departmentNum[2].departmentId)"
      >
        部门三 : {{ departmentNum[2].departmentName }}
      </el-button>
      <el-button
        size="medium"
        v-if="departmentNum.length > 3"
        @click="reNewData(departmentNum[3].departmentId)"
      >
        部门四 : {{ departmentNum[3].departmentName }}
      </el-button>
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
              v-if="cardList.length === 4"
            ></i>
            <div
              class="card"
              v-for="card in cardList"
              :key="card.roomId"
              v-on:mouseover="
                card.showBack = true
                getNowRoomData(card.roomId)
              "
              v-on:mouseleave="
                card.showBack = false
                getCardDone = false
              "
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
              <template v-if="card.showBack === true && getCardDone === true">
                <div class="stdName topMargin">当前面试学生:</div>
                <div class="stdName">{{ nowRoomData.interviewerName }}</div>
                <div class="stdName">开始面试的时间:</div>
                <div class="stdName buttomMargin">{{ nowRoomData.time }}</div>
              </template>
            </div>
            <i
              class="el-icon-d-arrow-right arrowBtn"
              @click="addRenderCardList()"
              v-if="cardList.length === 4"
            ></i>
          </template>
          <template v-if="cardList.length == 0">
            <div>暂无房间数据</div>
          </template>
        </div>
        <div class="buttom">
          <div class="buttomInner">
            <template>
              <el-table
                tooltip-effect="dark"
                :data="leftButtomData"
                class="el-table"
                style="width: 1150px"
                height="350"
              >
                <el-table-column
                  prop="stuId"
                  label="学号"
                  width="280"
                  header-align="center"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="stuName"
                  label="姓名"
                  width="280"
                  header-align="center"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="stuTime"
                  label="时间"
                  width="280"
                  header-align="center"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="stuPlace"
                  label="房间"
                  width="280"
                  header-align="center"
                  align="center"
                >
                </el-table-column>
              </el-table>
            </template>
          </div>
        </div>
      </div>
      <div class="interviewingRight">
        <div class="rightInner">
          <template>
            <el-table
              tooltip-effect="dark"
              :data="rightData"
              class="el-table2"
              style="width: 30"
              height="720"
            >
              <el-table-column
                prop="stuRank"
                label="名次"
                width="135"
                header-align="center"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="stuName"
                label="姓名"
                width="135"
                header-align="center"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="stuCore"
                label="成绩"
                width="135"
                header-align="center"
                align="center"
              >
              </el-table-column>
            </el-table>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import debounce from 'lodash.debounce'
export default {
  data() {
    return {
      cardList: [],
      cardhead: 0,
      cardend: 4,
      departmentNum: [],
      getDepartmentsDone: false,
      getRoomDataDone: false,
      getCardDone: false,
      getRightDataDone: false,
      rightData: [],
      leftButtomData: [],
      nowRoomData: {},
      departmentId: 1,
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
          organizationId: sessionStorage.getItem('loginOrganizationId')
        })
        .then((res) => {
          console.log('获得部门：', res)
          this.departmentNum = res.data.data
        })
        .then(() => {
          this.getDepartmentsDone = true
        })
    },
    getRoomData(val) {
      this.$http
        .get('/api/interview-data/ongoing/room/all', {
          organizationId: sessionStorage.getItem('loginOrganizationId'),
          admissionId: sessionStorage.getItem('homeAdmissionId'),
          departmentId: val
        })
        .then((res) => {
          this.roomList = this.mergeObj(res.data.data.roomData, {
            showBack: false
          })
          this.cardList = this.roomList.slice(0, 4)
        })
        .then(() => {
          this.getRoomDataDone = true
        })
    },
    getLeftButtomData(val) {
      this.$http
        .get('/api/interview-data/ongoing/broadcast', {
          organizationId: sessionStorage.getItem('loginOrganizationId'),
          admissionId: sessionStorage.getItem('homeAdmissionId'),
          departmentId: val
        })
        .then((res) => {
          this.leftButtomData = res.data.data
        })
    },
    getRightData(val) {
      this.$http
        .get('/api/interview-data/ongoing/rank', {
          organizationId: sessionStorage.getItem('loginOrganizationId'),
          admissionId: sessionStorage.getItem('homeAdmissionId'),
          departmentId: val
        })
        .then((res) => {
          this.rightData = res.data.data
        })
    },
    reNewData(partId) {
      this.getRightData(partId)
      this.getLeftButtomData(partId)
      this.getRoomData(partId)
      this.departmentId = partId
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
    getNowRoomData: debounce(function (roomId) {
      this.$http
        .get('/api/interview-data/ongoing/room/back', {
          organizationId: sessionStorage.getItem('loginOrganizationId'),
          admissionId: sessionStorage.getItem('homeAdmissionId'),
          departmentId: this.departmentId,
          roomId: roomId
        })
        .then((res) => {
          console.log(res.data.data)
          this.nowRoomData = res.data.data
          return res
        })
        .then((res) => {
          if (res.data.code === '00000') {
            this.getCardDone = true
          }
        })
    }, 250),
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
    this.getLeftButtomData()
    this.getRightData()
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
  margin-left: 20px;

  display: flex;
  flex-direction: row;
  align-items: center;

  .navBtn {
    margin: 0 10px 0 10px;
    padding: 0 20px 0 20px;
    // width: 100px;
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
      transition: all 1s;
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
    .buttomInner {
      margin-top: 20px;
    }
  }
}
.interviewingRight {
  width: 29%;
  height: 97%;
  margin: 20px 0 0 10px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

  .rightInner {
    width: 100%;
  }
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
.el-table {
  padding: 0px;
  color: #252525;
  font-size: 15px;
  border-radius: 15px;
  margin: 0 auto;
  // 滚动条，暂时只兼容chrome
  /deep/ .el-table__body-wrapper::-webkit-scrollbar {
    width: 15px; /*滚动条宽度*/
    height: 14px; /*滚动条高度*/
  }
  /deep/ .el-table__body-wrapper::-webkit-scrollbar-track {
    border-radius: 8px; /*滚动条的背景区域的圆角*/
    background-color: #ffffff; /*滚动条的背景颜色*/
  }
  /deep/ .el-table__body-wrapper::-webkit-scrollbar-corner {
    background-color: #ffffff;
  }
  /deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
    border-radius: 8px; /*滚动条的圆角*/
    background-color: #a1a3a9; /*滚动条的背景颜色*/
    // rgba(24,144,255,0.50)
  }
}
.el-table2 {
  padding: 0px;
  color: #252525;
  font-size: 15px;
  border-radius: 15px;
  margin: 0 auto;
  // 滚动条，暂时只兼容chrome
  /deep/ .el-table__body-wrapper::-webkit-scrollbar {
    width: 15px; /*滚动条宽度*/
    height: 14px; /*滚动条高度*/
  }
  /deep/ .el-table__body-wrapper::-webkit-scrollbar-track {
    border-radius: 8px; /*滚动条的背景区域的圆角*/
    background-color: #ffffff; /*滚动条的背景颜色*/
  }
  /deep/ .el-table__body-wrapper::-webkit-scrollbar-corner {
    background-color: #ffffff;
  }
  /deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
    border-radius: 8px; /*滚动条的圆角*/
    background-color: #a1a3a9; /*滚动条的背景颜色*/
    // rgba(24,144,255,0.50)
  }
}
</style>
