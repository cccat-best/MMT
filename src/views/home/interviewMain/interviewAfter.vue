<template>
  <div class="interviewingMain">
    <div class="departmentNav">
      <div class="navBtn" @click="reNewData()">全部</div>
      <div
        class="navBtn"
        v-if="departmentNum.length > 0"
        @click="reNewData(departmentNum[0].departmentId)"
      >
        部门一 : {{ departmentNum[0].departmentName }}
      </div>
      <div
        class="navBtn"
        v-if="departmentNum.length > 1"
        @click="reNewData(departmentNum[1].departmentId)"
      >
        部门二 : {{ departmentNum[1].departmentName }}
      </div>
      <div
        class="navBtn"
        v-if="departmentNum.length > 2"
        @click="reNewData(departmentNum[2].departmentId)"
      >
        部门三 : {{ departmentNum[2].departmentName }}
      </div>
      <div
        class="navBtn"
        v-if="departmentNum.length > 3"
        @click="reNewData(departmentNum[3].departmentId)"
      >
        部门四 : {{ departmentNum[3].departmentName }}
      </div>
    </div>
    <div class="interviewingInner">
      <div class="interviewingLeft">
        <div class="upper">
          <div class="upperLeft">
            <div class="upperLeftInner">
              <div class="upperLeftInnerFlex">
                <span><i class="el-icon-s-data"></i> 通过人数 :</span>
                <span>{{ upperLeftData.passRegistrations }}人</span>
              </div>
              <div class="upperLeftInnerFlex">
                <span><i class="el-icon-user-solid"></i> 总人数 :</span>
                <span> {{ upperLeftData.totalRegistrations }}人 </span>
              </div>
              <div class="upperLeftButtomFont">
                第一志愿报名人数：{{ upperLeftData.firstChoiceNum }}
              </div>
            </div>
          </div>
          <div class="upperRight">
            <div class="upperRightInner">
              <div v-if="drawDone && pieUseData[0] != null">
                {{ pieUseData[0].name }}:{{ pieUseData[0].value }}人
              </div>
              <div v-if="drawDone && pieUseData[1] != null">
                {{ pieUseData[1].name }}:{{ pieUseData[1].value }}人
              </div>
              <div v-if="drawDone && pieUseData[2] != null">
                {{ pieUseData[2].name }}:{{ pieUseData[2].value }}人
              </div>
              <div v-if="drawDone && pieUseData[3] != null">
                {{ pieUseData[3].name }}:{{ pieUseData[3].value }}人
              </div>
            </div>
            <div style="width: 65%; height: 100%" ref="pie"></div>
          </div>
        </div>
        <div class="buttom">
          <div ref="line" style="width: 100%; height: 100%"></div>
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
                width="150"
                header-align="center"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="stuName"
                label="姓名"
                width="150"
                header-align="center"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="stuCore"
                label="成绩"
                width="150"
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
import * as echarts from 'echarts/core'
import { PieChart } from 'echarts/charts'
import { LineChart } from 'echarts/charts'

// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent
} from 'echarts/components'
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'
// 注册必须的组件
echarts.use([
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  PieChart,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
])

export default {
  data() {
    return {
      departmentNum: [],
      getDepartmentsDone: false,
      getRightDataDone: false,
      drawDone: false,
      upperLeftDone: false,
      rightData: [],
      pieUseData: [],
      pieData: [],
      upperLeftData: {},
      lineData: [],
      lineInnerData: [],
      lineLegend: []
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
          this.departmentNum = res.data.data
        })
        .then(() => {
          this.getDepartmentsDone = true
        })
    },
    getRightData(val) {
      this.$http
        .get('/api/interview-data/after/rank', {
          //debug
          organizationId: 1,
          admissionId: 1,
          departmentId: val
        })
        .then((res) => {
          //debug
          console.log('右边的数据', res)
          this.rightData = res.data.data
        })
    },
    reNewData(partId) {
      this.getRightData(partId)
      this.drawPie(partId)
      this.drawLine(partId)
    },
    drawPie(part) {
      this.$http
        .get('/api/interview-data/after/pass-num-pie', {
          //debug
          admissionId: 1,
          organizationId: 1,
          departmentId: part
        })
        .then((res) => {
          // console.log('饼图数据', res.data.data.pieData)
          this.pieData = res.data.data
          this.pieUseData = res.data.data.pieData.map((item) => {
            // console.log(item)
            return Object.assign(
              {},
              { value: item.wishPassNum, name: item.wishName }
            )
          })
        })
        .then(() => {
          var pieChart = echarts.init(this.$refs.pie)
          pieChart.setOption({
            series: [
              {
                type: 'pie',
                data: this.pieUseData,
                radius: '50%'
              }
            ]
          })
          this.drawDone = true
        })
    },
    getUpperLeft() {
      this.$http
        .get('/api/interview-data/after/registrations', {
          //debug
          admissionId: 1,
          organizationId: 1
        })
        .then((res) => {
          this.upperLeftData = res.data.data
        })
        .then(() => {
          this.upperLeftDone = true
        })
    },
    drawLine(part) {
      this.$http
        .get('/api/interview-data/after/line-graph', {
          //debug
          admissionId: 1,
          organizationId: 1,
          departmentId: part
        })
        .then((res) => {
          this.lineData = res.data.data
          this.lineInnerData = this.lineData.line.map((item) => {
            // console.log(item)
            return Object.assign(
              {},
              { data: item.numDate, type: 'line', stack: 'x', name: item.name }
            )
          })
        })
        .then(() => {
          var pieChart = echarts.init(this.$refs.line)
          pieChart.setOption(
            {
              legend: {
                orient: 'vertical',
                right: 5,
                top: 5
              },
              xAxis: {
                data: this.lineData.sequence
              },
              yAxis: {},
              series: this.lineInnerData
            },
            true
          )
        })
    }
  },
  mounted() {
    this.getDepartments()
    this.getRightData()
    this.drawPie()
    this.getUpperLeft()
    this.drawLine()
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
    margin: 20px 0px 0px 10px;
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .upperRight {
      width: 49%;
      height: 99%;
      background-color: rgb(255, 255, 255);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      border-radius: 20px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      .upperRightInner {
        width: 35%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    }
    .upperLeft {
      width: 49%;
      height: 99%;
      background-color: rgb(255, 255, 255);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      border-radius: 20px;
      .upperLeftInner {
        width: 65%;
        height: 110%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: flex-start;
        .upperLeftInnerFlex {
          width: 90%;
          font-size: 30px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
        .upperLeftButtomFont {
          color: #515151;
          align-self: flex-end;
        }
      }
    }
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
.interviewingRight {
  width: 29%;
  height: 97%;
  margin: 20px 0 0 0;
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
