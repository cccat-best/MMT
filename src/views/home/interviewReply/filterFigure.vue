<template>
  <div class="bigLeft">
    <div class="text">
      <div class="partText">
        <div class="ttext">按部门查看 &nbsp; &nbsp;</div>
        <div class="udText" style="margin-bottom: 20px">
          <el-row
            type="flex"
            justify="start"
            style="flex-wrap: wrap; margin-left: 3px"
          >
            <el-button
              @click="clDepartment"
              style="margin: 0 10px 10px 0"
              ref="depBtn"
              class="depBtn"
              plain
              size="small"
              v-for="item in department"
              :key="item.id"
              :id="item.id"
              >{{ item.name }}</el-button
            >
          </el-row>
        </div>
      </div>
      <div class="partText">
        <div class="ttext">按场地查看 &nbsp; &nbsp;</div>
        <div class="udText">
          <el-row
            type="flex"
            justify="start"
            style="flex-wrap: wrap; margin-left: 3px"
          >
            <el-button
              @click="clRoom"
              style="margin: 0 10px 10px 0"
              plain
              class="roomBtn"
              size="small"
              ref="roomBtn"
              v-for="item in room"
              :key="item.id"
              :id="item.id"
              >{{ item.name }}</el-button
            >
          </el-row>
        </div>
      </div>
    </div>
    <div class="bigChart">
      <div id="pie" ref="pie" style="width: 285px; height: 190px"></div>
      <div class="total" style="padding-bottom: 16px">共{{ total }}人</div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts/core'
import { PieChart } from 'echarts/charts'
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
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
])

export default {
  name: 'filterFigure',
  data() {
    return {
      win: 3,
      pass: 3,
      wait: 3,
      nedit: 2,
      total: 11,
      department: [],
      room: [],
      departmentId: 0,
      departmentName: '',
      roomId: 0
    }
  },
  methods: {
    drawChar() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(this.$refs.pie)
      // 绘制图表
      myChart.setOption({
        legend: {
          orient: 'vertical', //图例的布局，水平布局、垂直布局
          data: ['通过', '失败', '待定', '未操作'],
          right: 'right',
          top: 'middle',
          icon: 'circle',
          itemWidth: 8, //图例宽度
          itemHeight: 8, //图例高度
          //图例字体样式
          color: '#000',
          fontSize: 12,
          fontFamily: '微软雅黑'
        },

        series: [
          {
            type: 'pie',
            label: {
              //饼图图形上的文本标签
              show: true,
              position: 'inner', //标签的位置
              fontWeight: 300,
              fontSize: 12, //文字的字体大小
              formatter: '{c}人'
            },
            data: [
              {
                value: this.win,
                name: '通过'
              },
              {
                value: this.pass,
                name: '失败'
              },
              {
                value: this.wait,
                name: '待定'
              },
              {
                value: this.nedit,
                name: '未操作'
              }
            ],
            itemStyle: {
              color: function (colors) {
                var colorList = ['#c1ebdd', '#fb9495', '#fddd9b', '#b2def7']
                return colorList[colors.dataIndex]
              }
            }
          }
        ]
      })
    },
    clDepartment() {
      let depBtn = document.querySelectorAll('.depBtn')
      depBtn.forEach((e) => {
        e.classList.remove('clBtn')
      })
      document.activeElement.classList.add('clBtn')
      this.departmentId = document.activeElement.id
      this.departmentName = document.activeElement.innerText
      console.log(this.departmentId)
      console.log(this.departmentName)
      sessionStorage['replyDepartmentId'] = this.departmentId
      sessionStorage['replyDepartmentName'] = this.departmentName
      this.$bus.$emit('replyDepartmentId', this.departmentId)
      this.$bus.$emit('replyDepartmentName', this.departmentName)
    },
    clRoom() {
      let roomBtn = document.querySelectorAll('.roomBtn')
      roomBtn.forEach((e) => {
        e.classList.remove('clBtn')
      })
      document.activeElement.classList.add('clBtn')
      this.roomId = document.activeElement.id
      console.log(this.roomId)
      this.$bus.$emit('replyRoomId', this.roomId)
    }
  },
  created() {
    this.$bus.$on('replyWin', (data) => {
      this.win = data
    }),
      this.$bus.$on('replyPass', (data) => {
        this.pass = data
      }),
      this.$bus.$on('replyWait', (data) => {
        this.wait = data
      }),
      this.$bus.$on('replyNedit', (data) => {
        this.nedit = data
      }),
      this.$bus.$on('replyTotal', (data) => {
        this.total = data
      })
  },
  mounted() {
    this.drawChar()
    let admissionId = 2
    let url1 = `api/interview-reply/department/${admissionId}`
    this.$http
      .get(url1)
      .then((response) => {
        console.log(response)
        let department = response.data.data.department
        department.forEach((element) => {
          this.department.push(element)
        })
      })
      .catch((error) => {
        console.log(error)
      })

    let url2 = `api/interview-reply/room/${admissionId}`
    this.$http
      .get(url2)
      .then((response) => {
        console.log(response)

        let room = response.data.data.room
        room.forEach((element) => {
          this.room.push(element)
        })
        // console.log(this.room)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  beforeDestroy() {
    this.$bus.$off('replyWin')
    this.$bus.$off('replyPass')
    this.$bus.$off('replyWait')
    this.$bus.$off('replyNedit')
    this.$bus.$off('replyTotal')
  }
}
</script>

<style scoped>
.bigLeft {
  width: 78%;
  height: 100%;
  background-color: white;
  border-radius: 15px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
}
.text {
  height: 100%;
  width: 65%;
  margin-left: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
.bigChart {
  height: 100%;
  margin-right: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.ttext {
  font-size: 14px;
  padding-top: 5px;
  padding-left: 0;
  width: 110px;
  height: 30px;
  margin-right: 2px;
  position: absolute;
}
.udText {
  margin-left: 100px;
}
.clBtn {
  border-color: #40a9ff;
  color: #40a9ff;
}
</style>
