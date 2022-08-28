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
              <div class="upperLeftInnerFlex" style="margin-top: 20px">
                <span><i class="el-icon-s-data"></i> 报名总人数 :</span>
                <span>{{ upperLeftData.totalRegistrations }}人</span>
              </div>
              <div class="upperLeftInnerFlex">
                <span
                  ><i class="el-icon-user-solid"></i> 今日新增报名人数 :</span
                >
                <span> {{ upperLeftData.todayRegistrations }}人 </span>
              </div>
              <div class="upperLeftButtomFont">
                第一志愿报名人数：{{ upperLeftData.firstChoiceNum }}人
              </div>
            </div>
          </div>
          <div class="upperRight">
            <div class="upperRightInner">
              <div
                class="upperRightInnerFlex"
                v-if="drawDone && pieUseData[0] != null"
              >
                <span>部门一: 总人数: {{ pieUseData[0].value }}人</span>
                <span> 今日新增：{{ pieData.pieData[0].todayNum }}人</span>
              </div>
              <div
                class="upperRightInnerFlex"
                v-if="drawDone && pieUseData[1] != null"
              >
                <span>部门二: 总人数: {{ pieUseData[1].value }}人</span>
                <span> 今日新增：{{ pieData.pieData[1].todayNum }}人</span>
              </div>
              <div
                class="upperRightInnerFlex"
                v-if="drawDone && pieUseData[2] != null"
              >
                <span>部门三: 总人数: {{ pieUseData[2].value }}人</span>
                <span> 今日新增：{{ pieData.pieData[2].todayNum }}人</span>
              </div>
              <div
                class="upperRightInnerFlex"
                v-if="drawDone && pieUseData[3] != null"
              >
                <span>部门四: 总人数: {{ pieUseData[3].value }}人</span>
                <span> 今日新增：{{ pieData.pieData[3].todayNum }}人</span>
              </div>
            </div>
            <div style="width: 50%; height: 100%" ref="pie"></div>
          </div>
        </div>
        <div class="buttom">
          <div ref="line" style="width: 100%; height: 100%"></div>
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

    reNewData(partId) {
      this.drawLine(partId)
    },
    drawPie() {
      this.$http
        .get('/api/interview-data/before/pie-chat', {
          //debug
          admissionId: 1,
          organizationId: 1
        })
        .then((res) => {
          console.log('饼图数据', res.data.data.pieData)
          this.pieData = res.data.data
          this.pieUseData = res.data.data.pieData.map((item, index) => {
            // console.log(item)
            let indexChinese = this.toChinese(index + 1)
            return Object.assign(
              {},
              { value: item.totalNum, name: '部门' + indexChinese }
            )
          })
        })
        .then(() => {
          var pieChart = echarts.init(this.$refs.pie)
          pieChart.setOption({
            tooltip: {
              trigger: 'item'
            },
            series: [
              {
                type: 'pie',
                data: this.pieUseData,
                radius: '50%',
                label: {
                  normal: {
                    show: true,
                    position: 'inner',
                    textStyle: {
                      color: 'white'
                    }
                  }
                }
              }
            ]
          })
          this.drawDone = true
        })
    },
    getUpperLeft() {
      this.$http
        .get('/api/interview-data/before/registrations', {
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
        .get('/api/interview-data/before/line-graph', {
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
          pieChart.setOption({
            legend: {
              orient: 'vertical',
              right: 5,
              top: 5
            },
            tooltip: {
              trigger: 'axis'
            },
            xAxis: {
              data: this.lineData.time
            },
            yAxis: {},
            series: this.lineInnerData
          })
        })
    },
    toChinese(val) {
      let chin = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
      if (val <= 10) {
        return chin[val - 1]
      } else if (val <= 100) {
        if (val < 20) {
          return '十' + chin[(val % 10) - 1]
        } else if (val % 10 === 0) {
          return chin[Math.floor(val / 10) - 1] + '十'
        } else {
          return chin[Math.floor(val / 10) - 1] + '十' + chin[(val % 10) - 1]
        }
      }
    }
  },
  mounted() {
    this.getDepartments()
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
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  // justify-content: center;
  .upper {
    width: 97%;
    height: 35%;
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
        letter-spacing: 2px;
        width: 60%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        margin-left: 10px;
        .upperRightInnerFlex {
          width: 80%;
          margin-top: -15px;
          margin-bottom: -15px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }
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
        height: 100%;
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
  height: 61%;
  background-color: rgb(255, 255, 255);
  margin: 20px 0px 0px 10px;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  .buttomInner {
    margin-top: 20px;
  }
}
</style>
