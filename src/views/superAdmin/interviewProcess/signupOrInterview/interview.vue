<template>
  <!-- 一面 -->
  <div class="one">
    <!-- 顶部编辑按钮及其弹出框 -->
    <div class="p" >
      <el-button type="text" class="p2" @click="dialogFormVisible = true"><i class="el-icon-edit-outline"></i> 编辑页面</el-button>
      <!-- 点击编辑按钮弹出的页面 -->
      <el-dialog title="" :visible.sync="dialogFormVisible" width="70%" top="50px">
        <div class="right1">
          <!-- 包个div使页面部分滚动，浏览器不会出现滚动条 -->
          <div class="el-dialog-div">

              <!-- 问题设置部分 -->
            <div class="problem11">
              <!-- 标题 -->
              <p class="tit1">面试问题设置</p>
                <!-- 下方可是增减问题的表格 -->
                <el-table :data="form.dynamicItem"  stripe border style="width: 85%">

                  <el-table-column label="序号" width="50px">
                    <template slot-scope="scope">
                      <span>{{scope.$index+1}}</span>
                    </template>
                  </el-table-column>

                  <el-table-column label="问题" width="200px">
                    <template slot-scope="scope">
                      <el-input type="textarea" :rows="2" resize="none"  maxlength="50" show-word-limit placeholder="请输入问题" v-model="scope.row.problem"></el-input>
                    </template>
                  </el-table-column>

                  <el-table-column label="分值" width="73px">
                    <template slot-scope="scope">
                      <el-input size="mini" type="textarea" :rows="1" resize="none" v-model="scope.row.score"></el-input>
                    </template>
                  </el-table-column>

                  <el-table-column label="评分标准" width="230px">
                    <template slot-scope="scope">
                      <el-input type="textarea"  :rows="2" resize="none"  maxlength="200" show-word-limit placeholder="请输入评分标准" v-model="scope.row.standard"></el-input>
                    </template>
                  </el-table-column>

                  <!-- 最后一栏操作按钮 -->
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <!-- 第一栏不可删除 -->
                      <el-button type="info" plain v-if="scope.$index !== 0" size="medium" @click="deleteItem(scope.$index)">删除</el-button>
                      <!-- 限制最多只能添加10个问题 -->
                      <el-button  v-if="scope.$index+1 === form.dynamicItem.length" type="primary" size="medium" plain @click="addItem(scope.$index)">增加</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>

            <div class="inform1">
              <p class="tit2">面试文案编辑</p>
              <div class="details">
                <p class="top">面试通知</p>
                <p class="concrete"><el-input width="20px" placeholder="请输入内容"  v-model="informEdit.a"></el-input>xxx同学,xxx部门邀请你进行x面面试。面试时间:xxx;面试场地:xxx;<el-input  placeholder="请输入内容"  v-model="informEdit.b" ></el-input></p>
              </div>
            </div>
            <div class="inform2">
              <p class="tit3">结果通知编辑</p>
              <el-tabs type="border-card" class="result">
                <el-tab-pane label="成功">
                  <p class="success"><el-input width="20px" placeholder="请输入内容"  v-model="successEdit.a"></el-input>xxx同学:<el-input width="20px" placeholder="请输入内容"  v-model="successEdit.b"></el-input>xxx部门,<el-input width="20px" placeholder="请输入内容"  v-model="successEdit.c"></el-input></p>
                </el-tab-pane>
                <el-tab-pane label="失败">
                  <p class="fail"><el-input width="20px" placeholder="请输入内容"  v-model="failEdit.a"></el-input>xxx同学:<el-input width="20px" placeholder="请输入内容"  v-model="failEdit.b"></el-input>xxx部门,<el-input width="20px" placeholder="请输入内容"  v-model="failEdit.c"></el-input></p>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 左边导航条 -->
    <div class="left1">
      <div :class="['nav1',isSelect1?'blue':'']">面试问题设置</div>
      <div :class="['nav1',isSelect2?'blue':'']">面试文案编辑</div>
      <div :class="['nav1',isSelect3?'blue':'']">结果通知编辑</div>
    </div>

    <!-- 右边内容部分 -->
    <div class="right1" @scroll="handleScroll($event)">
        <!-- 问题设置部分 -->
      <div class="problem11">
        <p class="tit1">面试问题设置</p>
        <el-table
          :data="tableData"
          stripe
          border
          style="width: 1000px">
          <el-table-column
            prop="number"
            label="序号"
            width="60px">
          </el-table-column>
          <el-table-column
            prop="problem"
            label="问题"
            width="358px">
          </el-table-column>
          <el-table-column
            prop="score"
            label="分值"
            width="100px">
          </el-table-column>
          <el-table-column
            prop="standard"
            label="打分标准"
            width="480px">
          </el-table-column>
        </el-table>
        <!-- <el-button type="primary" plain class="button">+添加问题</el-button> -->
      </div>
      <div class="inform1">
        <p class="tit2">面试文案编辑</p>
        <div class="details">
          <p class="top">面试通知</p>
          <div class="concrete">亲爱的xxx同学,xxx部门邀请你进行x面面试。面试时间:xxx;面试场地:xxx;请提前做好准备。</div>
        </div>
      </div>
      <div class="inform2">
        <p class="tit3">结果通知编辑</p>
        <el-tabs type="border-card" class="result">
          <el-tab-pane label="成功">
            <div class="success">亲爱的xxx同学:很感谢您报名xxx部门,恭喜你通过我们的面试。</div>
          </el-tab-pane>
          <el-tab-pane label="失败">
            <div class="fail">亲爱的xxx同学:很感谢您报名xxx部门,很抱歉您未通过我们的面试。</div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
    return {
      //接收到的面试轮次
        props:['round'],
        // 非编辑状态问题设置表格的数据
        tableData: [{
          number: '1',
          problem: '大学四年规划',
          score: '20',
          standard:'毫无规划0分，有大致规划50分，有清楚规划100分'
        },
         {
          number: '2',
          problem: '大学四年规划',
          score: '20',
          standard:'毫无规划0分，有大致规划50分，有清楚规划100分'
        },
         {
          number: '3',
          problem: '大学四年规划',
          score: '20',
          standard:'毫无规划0分，有大致规划50分，有清楚规划100分'
        }, {
          number: '4',
          problem: '大学四年规划',
          score: '20',
          standard:'毫无规划0分，有大致规划50分，有清楚规划100分'
        },{
          number: '5',
          problem: '大学四年规划',
          score: '20',
          standard:'毫无规划0分，有大致规划50分，有清楚规划100分'
        },
        ],
        // 控制编辑弹窗的显示隐藏
        dialogFormVisible: false,
        formLabelWidth: '120px',
        // 编辑状态问题设置的数据
        form: {
           dynamicItem: [{
              problem:'大学四年规划',
              score:'20',
              standard:'合理得分',
           },{
              problem:'一天吃什么睡多久',
              score:'50',
              standard:'合理得分',
           }]
        },
        // 面试通知文案
        informEdit:{
          a:'亲爱的',
          b:'请提前做好准备'
        },
        successEdit:{
          a:'亲爱的',
          b:'很感谢你报名',
          c:'恭喜你通过我们的面试'
        },
        failEdit:{
          a:'亲爱的',
          b:'很感谢你报名',
          c:'很遗憾你未通过我们的面试'
        },
        scrollHeigh: 0,
        // tableHeigh1:this.tableData.length*48+155,
        // tableHeigh1:this.tableData.length*48+155+300,
    }
  },
  mounted() {
  },
  computed:{
    //导航动态变化
    isSelect1(){
					if(this.scrollHeigh<350&&this.scrollHeigh>=0){
            return true
          }
				},
    isSelect2(){
        if(this.scrollHeigh>350&&this.scrollHeigh<600){
          return true
        }
    },
    isSelect3(){
        if(this.scrollHeigh>600){
          return true
        }
    }
  },
  methods: {
    // 随页面滚动触发事件，滚动高度
    handleScroll(e) {
      this.scrollHeigh=e.srcElement.scrollTop
    },
    // 问题表格增加
    addItem(index) {
        if(index==9){
          this.$message({
                  showClose: true,
                  message: '最多只能添加10个问题！！！',
                  type: 'error',
                  center: true
              });
        }
        else{
            this.form.dynamicItem.push({
            name: this.form.dynamicItem[index].name,
            phone: this.form.dynamicItem[index].phone,
            area: this.form.dynamicItem[index].area
          })
        }
      },
      // 面试问题表格删除
      deleteItem(index) {
        this.form.dynamicItem.splice(index, 1)
      },
  }
}
</script>

<style lang="less" scoped>
  .one{
    position: relative;
    overflow: hidden;
    // height: 88%;
    height: 525px;
    line-height: 40px;
    // height: 100%;
    // width: 100%;
    width: 1250px;
    // background-color: #e9eef3;
    background-color: white;
    min-width: 1000px;
    min-height: 500px;
  }
    .p{
    position: relative;
    // left: 1100px;
    left:85%;
    height: 30px;
    margin-top: 7px;
    line-height: 30px;
    width: 121px;
    background-color: rgb(255, 255, 255);
    .p2{
      position: absolute;
      left: 28px;
      font-size: 19px;
      top: 2px;
    }
  }
  .blue{
    color: #409EFF;
    border-left: 2px solid #409EFF
  }
  .left1{
    position: absolute;
    left: 2%;
    top: 10%;
    // height: 156px;
    // width: 141px;
    width: 10%;
    height: 30%;
    min-width: 110px;
    // background-color: rgb(174, 96, 96);
      .nav1{
        margin-left: 2px;
        padding-left: 10px;
        height: 30%;
        background-color: white;
        cursor: pointer;
        text-align: left;
        line-height: 58px;
        border-left: 2px solid rgb(213, 211, 211)
      }
      .nav1:hover{
        color: #409EFF;
        // border-left: 2px solid #409EFF;
      }
  }
  .right1{
    position: relative;
    top: 1%;
    left: 12%;
    // width: 1089px;
    // height: 497px;
    width: 85%;
    height: 90%;
    background-color: white;
    // background-color: rgb(182, 134, 134);
    /* 滚动条 */
    -webkit-overflow-scrolling: touch;
    overflow-y: auto;
    white-space: nowrap;

    .problem11{
      .tit1{
        // background-color: rgb(63, 40, 40);
        margin-top: 10px;
        margin-bottom: 30px;
        height: 50px;
        line-height: 50px;
        font-size: 28px;
        width: 180px;
        font-weight: 700;
        margin-left: 32px;
        color: rgb(82, 82, 82);
      }
      .el-table{
        margin-left: 3%;
      }
      .button{
        margin-top: 16px;
        // margin-left: 735px;
        margin-left: 40%;
        width: 223px;
      }
    }
    .inform1{
      margin-top: 30px;
      .tit2{
        height: 50px;
        line-height: 50px;
        font-size: 28px;
        width: 180px;
        font-weight: 700;
        margin-left: 32px;
        color: rgb(82, 82, 82);
      }
      .details{
        width: 600px;
        height: 240px;
        background-color: white;
        margin-left: 3%;
        margin-top: 30px;
        // border-radius: 13px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        padding:20px;
        .top{
          font-weight: 700;
          font-size: 26px;
          width: 110px;
        }
        .concrete{
          font-size: 23px;
          margin-top: 32px;
          height: 190px;
          line-height: 45px;
          text-align: left;
          width: 476px;
          margin-left: 62px;
          white-space: normal;
          word-break:break-all;
          overflow: hidden;
          /deep/.el-textarea__inner{
            padding: auto;
            width: 450px;
            // padding: 5px 27px 5px 10px;
          }
        }
      }
    }
  }
    .inform2{
      margin-top: 30px;
      margin-bottom: 40px;
      .tit3{
        height: 50px;
        line-height: 50px;
        font-size: 28px;
        width: 180px;
        font-weight: 700;
        margin-left: 32px;
        color: rgb(82, 82, 82);
      }
      .result{
        height: 280px;
        width: 640px;
        margin-left: 3%;
        margin-top: 30px;
        // border-radius: 13px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        .success,.fail{
          font-size: 23px;
          margin-top: 36px;
          height: 170px;
          line-height: 45px;
          text-align: left;
          width: 450px;
          margin-left: 90px;
          white-space: normal;
          word-break:break-all;
          overflow: hidden;
        }
      }
    }
/deep/.el-tabs__item {
    font-size: 17px!important;
    width: 321px  !important;
    // background-color: rgb(80, 148, 169);
}
/deep/.el-tabs__nav{
  line-height: 0px  !important;
  height: 40px  !important;
  width: 320px  !important;
  margin-left: 0px  !important;
  // background-color: white  !important;
  text-align: center  !important;
  font-size: 40px  !important;
  border-bottom: none  !important;
}
.el-dialog-div{
  height: 450px;
    overflow: auto;
  }
/deep/.el-textarea__inner{
  padding: 5px 27px 5px 10px;
}
/deep/.el-input{
  font-size: 18px;
  width: 255px;
}
</style>
