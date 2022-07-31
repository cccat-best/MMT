<template>
  <div class="bigLeft">
    <div class="text">
      <div class="partText">
        <div class="ttext">按部门查看 &nbsp; &nbsp;</div>
        <div class="udText" style="margin-bottom: 20px">
          <el-row style="margin-bottom: 10px">
            <el-button plain size="small" ref="partAll">全部</el-button
            ><el-button plain size="small">文艺部</el-button
            ><el-button plain size="small">文艺部</el-button
            ><el-button plain size="small">文艺部</el-button>
          </el-row>
          <el-row>
            <el-button plain size="small">文艺部</el-button>
            <el-button plain size="small">文艺部</el-button>
          </el-row>
        </div>
      </div>
      <div class="partText">
        <div class="ttext">按场地查看 &nbsp; &nbsp;</div>
        <div class="udText">
          <el-row style="margin-bottom: 10px">
            <el-button plain size="small">全部</el-button
            ><el-button plain size="small">7-115</el-button
            ><el-button plain size="small">7-115</el-button
            ><el-button plain size="small">7-115</el-button>
          </el-row>
          <el-row>
            <el-button plain size="small">7-115</el-button>
            <el-button plain size="small">7-115</el-button>
          </el-row>
        </div>
      </div>
    </div>
    <div class="bigChart">
      <div id="pie" ref="pie" style="width: 300px; height: 200px"></div>
      <div class="chartTotal">共{{ chartTotal }}人</div>
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
      pass: 20,
      fail: 10,
      pending: 30,
      undo: 25,
      chartTotal: 85
    }
  },
  mounted() {
    this.drawChar()
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
                value: this.pass,
                name: '通过'
              },
              {
                value: this.fail,
                name: '失败'
              },
              {
                value: this.pending,
                name: '待定'
              },
              {
                value: this.undo,
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
    }
  }
}
</script>

<style scoped>
.bigLeft {
  width: 940px;
  height: 100%;
  background-color: white;
  border-radius: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.text {
  height: 100%;
  width: 60%;
  margin-left: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
.bigChart {
  height: 100%;
  margin-right: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.udText {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.partText {
  display: flex;
  flex-direction: row;
}
.ttext {
  font-size: 14px;
  padding-top: 5px;
}
</style>
