<template>
  <div>
    <el-dialog
      title=""
      :visible.sync="resumeDialogVisible"
      width="60%"
      top="30px"
    >
    <!-- 弹窗主体内容 -->
      <div class="all">
        <div class="bigbig">用户简历</div>
        <!-- 报名表界面 -->
        <div class="bigTitle">报名表</div>
        <div class="registerTable">
          <!-- 基本问题模块 -->
          <div class="one">
            <div class="tit">基本问题</div>
            <el-form :model="ruleForm" ref="ruleForm" label-width="55px" class="demo-ruleForm form" >
              <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name" disabled></el-input>
              </el-form-item>
              <el-form-item label="学号" prop="id">
                <el-input v-model="ruleForm.id" disabled></el-input>
              </el-form-item>
              <el-form-item label="电话" prop="phone">
                <el-input v-model="ruleForm.phone" disabled></el-input>
              </el-form-item>
              <el-form-item label="QQ" prop="qq" v-if="true">
                <el-input v-model="ruleForm.qq" disabled></el-input>
              </el-form-item>
              <el-form-item label="学院" prop="academyId" v-if="true">
                <el-input v-model="ruleForm.academyId" disabled></el-input>
              </el-form-item>
              <el-form-item label="专业" prop="majorId">
                <el-input v-model="ruleForm.majorId" disabled></el-input>
              </el-form-item>
              <el-form-item label="班级" prop="classId">
                  <el-input v-model="ruleForm.classId" disabled></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="sex">
                <el-input v-model="ruleForm.sex" disabled></el-input>
              </el-form-item>
              <el-form-item label="生日" prop="birthday">
                <el-input v-model="ruleForm.birthday" disabled></el-input>
              </el-form-item>
              <el-form-item label="身高" prop="length">
                <el-input v-model="ruleForm.length" disabled></el-input>
              </el-form-item>
            </el-form>
          </div>
          <!-- 部门问题模块 -->
          <div class="two">
            <div class="tit">部门问题</div>
            <!-- 自定义填空 -->
            <div class="question1">
              <div class="problem">问题一：你暑假的规划</div>
              <div class="answer">吃饭睡觉吃饭哈哈哈嘻嘻嘻</div>
            </div>
            <div class="question1">
              <div class="problem">问题三：你暑假的规划</div>
              <div class="answer">吃饭睡觉吃饭睡觉吃饭睡觉吃饭睡觉吃饭睡觉吃饭睡觉吃饭睡觉吃饭睡觉吃饭睡觉吃饭睡觉吃饭睡觉吃饭睡觉吃饭睡觉吃饭睡觉吃饭睡觉吃饭睡觉吃饭睡觉吃饭睡觉吃饭睡觉吃饭睡觉</div>
            </div>
            <!-- 自定义选择 -->
            <div class="question2">
              <div class="problem">
                <span style="margin-right:40px">喜欢吃饭还是睡觉</span>
                  <el-radio disabled v-model="radio" label="禁用">吃饭</el-radio>
                  <el-radio disabled v-model="radio" label="选中且禁用">睡觉</el-radio>
              </div>
            </div>
            <div class="question2">
              <div class="problem">
                <span style="margin-right:40px">喜欢吃饭还是睡觉</span>
                  <el-radio disabled v-model="radio" label="禁用">吃饭</el-radio>
                  <el-radio disabled v-model="radio" label="选中且禁用">睡觉</el-radio>
              </div>
            </div>
          </div>
          <!-- 综合问题模块 -->
          <div class="two">
            <div class="tit">综合问题</div>
            <!-- 自定义填空 -->
            <div class="question1">
              <div class="problem">问题一：你暑假的规划</div>
              <div class="answer">吃饭睡觉吃饭睡觉吃饭睡觉吃饭睡觉吃饭睡觉吃饭睡觉吃饭睡觉吃饭睡觉吃饭睡觉吃饭睡觉吃饭睡觉吃饭睡觉吃饭睡觉吃饭睡觉吃饭睡觉吃饭睡觉吃饭睡觉吃饭睡觉吃饭睡觉吃饭睡觉</div>
            </div>
            <div class="question1">
              <div class="problem">问题三：你暑假的规划</div>
              <div class="answer">吃饭睡觉吃饭睡觉吃饭睡觉吃饭睡觉吃饭睡觉吃饭睡觉吃饭睡觉吃饭睡觉吃饭睡觉吃饭睡觉吃饭睡觉吃饭睡觉吃饭睡觉吃饭睡觉吃饭睡觉吃饭睡觉吃饭睡觉吃饭睡觉吃饭睡觉吃饭睡觉</div>
            </div>
            <!-- 自定义选择 -->
            <div class="question2">
              <div class="problem">
                <span style="margin-right:40px">喜欢吃饭还是睡觉</span>
                  <el-radio disabled v-model="radio" label="禁用">吃饭</el-radio>
                  <el-radio disabled v-model="radio" label="选中且禁用">睡觉</el-radio>
              </div>
            </div>
            <div class="question2">
              <div class="problem">
                <span style="margin-right:40px">喜欢吃饭还是睡觉</span>
                  <el-radio disabled v-model="radio" label="禁用">吃饭</el-radio>
                  <el-radio disabled v-model="radio" label="选中且禁用">睡觉</el-radio>
              </div>
            </div>
          </div>
        </div>
        <!-- 面试反馈 -->
        <div class="bigTitle">面试反馈</div>
        <div class="reply">
          <div class="replyItem">2021-8-29&nbsp;&nbsp;&nbsp;&nbsp; 19:00 &nbsp;&nbsp;&nbsp;&nbsp;已接受</div>
          <div class="replyItem">2021-8-29&nbsp;&nbsp;&nbsp;&nbsp; 19:00 &nbsp;&nbsp;&nbsp;&nbsp;已接受</div>
          <div class="replyItem">2021-8-29&nbsp;&nbsp;&nbsp;&nbsp; 19:00 &nbsp;&nbsp;&nbsp;&nbsp;已接受</div>
        </div>
        <!-- 签到 -->
        <div class="bigTitle">签到</div>
        <div class="reply">
          <div class="replyItem">2021-8-29&nbsp;&nbsp;&nbsp;&nbsp; 19:00 &nbsp;&nbsp;&nbsp;&nbsp;完成签到</div>
        </div>
        <!-- 面试安排 -->
        <div class="bigTitle">面试安排</div>
        <div class="arrange">
           <el-table
            :data="arrangeTable"
            style="width: 80%"
            class="table"
            border>
            <el-table-column
              prop="rounds"
              label="面试轮次"
              align="center">
            </el-table-column>
            <el-table-column
              prop="time"
              label="面试时间"
              align="center">
            </el-table-column>
            <el-table-column
              prop="address"
              label="面试地点"
              align="center">
            </el-table-column>
          </el-table>
        </div>
        <!-- 面试通知 -->
        <div class="bigTitle">面试通知</div>
        <div class="inform">
          <el-table
            :data="informTable"
            style="width: 80%"
            class="table"
            border>
            <el-table-column
              prop="time"
              label="通知发送时间"
              align="center">
            </el-table-column>
            <el-table-column
              prop="message"
              label="通知内容"
              align="center">
            </el-table-column>
          </el-table>
        </div>
        <!-- 面试评价 -->
        <div class="bigTitle">面试评价</div>
        <div class="evaluate">
          <!-- 表格 -->
          <el-table
            :data="evaluateTable"
            style="width: 80%"
            class="table"
            border>
            <el-table-column
              prop="rounds"
              label="面试次序"
              align="center">
            </el-table-column>
            <el-table-column
              prop="time"
              label="实际面试时间"
              align="center">
            </el-table-column>
            <el-table-column
              prop="address"
              label="实际面试地点"
              align="center">
            </el-table-column>
          </el-table>
          <!-- 打分表格 -->
          <div v-for="(item,index) in 2" :key="index">
            <!-- 一面二面 -->
            <div class="interview"> {{item}}面 <i class="el-icon-thumb"></i> </div>
            <!-- 内部细节 -->
            <div class="detail">
              <div class="score">
                <table  border width="82%" cellspacing="0">
                  <tr>
                    <th>面试问题/面试官</th>
                    <th v-for="(item,index) in 3" :key="index">zhang</th>
                    <th>排名</th>
                  </tr>
                  <tr v-for="(item,index) in 2" :key="index">
                    <td>专业能力</td>
                    <td>12</td>
                    <td>12</td>
                    <td>12</td>
                    <td>12</td>
                  </tr>
                </table>
              </div>
              <!-- 次标题 -->
              <div class="tit2">面试评价</div>
              <div class="comment">
                <table  border width="82%" cellspacing="0">
                  <tr>
                    <th>面试问题/面试官</th>
                    <th v-for="(item,index) in 3" :key="index">zhang</th>
                    <th>排名</th>
                  </tr>
                  <tr v-for="(item,index) in 2" :key="index">
                    <td>专业能力</td>
                    <td>12</td>
                    <td>12</td>
                    <td>12</td>
                    <td>12</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
        <!-- 面试结果 -->
        <div class="bigTitle">面试结果</div>
        <div class="result">
          <el-table
            :data="resultTable"
            style="width: 80%"
            class="table"
            border>
            <el-table-column
              prop="rounds"
              label="面试轮次"
              align="center">
            </el-table-column>
            <el-table-column
              prop="result"
              label="面试结果"
              align="center">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!-- 底部按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="resumeDialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'resumeDialog',
  data() {
    return {
      // 控制简历界面弹窗
      resumeDialogVisible: false,
      // 学号,由主页传过来
      studentId: '',
      //选择问题的渲染
      radio:'选中且禁用',
      //表单数据
      ruleForm: {
          name: '张三',
          id:'20210001',
          phone:'15845896582',
          sex:'女',
          qq:'2310768059',
          birthday:'2002-11-24',
          length:'180cm',
          academyId:'计算机科学与工程学院',
          majorId:'信息安全',
          classId:'一班'
      },
      // 面试安排的表格
      arrangeTable: [{
            "rounds": 1,
            "time": 1662949500,
            "address": "7-223"
      },{
            "rounds": 1,
            "time": 1662949500,
            "address": "7-223"
      }],
      //面试通知表格
      informTable:[{
         "time": 1662949500,
          "message": "(≧^.^≦)喵~，欢迎选择并愿意加入猫猫协会，请于2022年8月31号 19:30在7-115猫窝参加第一轮面试。"
      },{
         "time": 1662949500,
          "message": "(≧^.^≦)喵~，欢迎选择并愿意加入猫猫协会，请于2022年8月31号 19:30在7-115猫窝参加第一轮面试。"
      }],
      //面试评价表格数据
      evaluateTable:[{
            "rounds": 1,
            "time": 1662949500,
            "address": "7-223"
      },{
            "rounds": 1,
            "time": 1662949500,
            "address": "7-223"
      }],
      // 面试结果表格数据
      resultTable:[{
        "rounds": 1,
        "result": 1
      }]
    }
  },
  methods:{

  }
}
</script>

<style lang="less" scoped>
// 主体内容
.all{
  height: calc(100vh - 60px - 150px);
  min-width: 800px;
  min-height: 480px;
  // background-color: rgb(72, 143, 188);
  background-color: #fff;
  overflow: auto;
  .bigbig{
    font-size: 45px;
    text-align: left;
    font-weight: 700;
    color: rgba(0, 0, 0, 0.699);
  }
  //大标题样式
  .bigTitle{
    background-color: #fff;
    font-size: 35px;
    text-align: left;
    font-weight: 700;
    margin-top: 20px;
  }
  // 报名表样式
  .registerTable{
    border-left: 2px solid gray;
    padding-left: 13px;
    // .bigTitle{
    //   background-color: #fff;
    //   font-size: 50px;
    //   text-align: left;
    //   font-weight: 700;
    // }
  // 基本问题模块
    .one{
      // background-color: rgb(164, 199, 82);
      margin-top: 15px;
      .tit{
        font-size: 25px;
        // background-color: rgb(60, 170, 113);
        text-align: left;
      }
      .form{
        // background-color: rgb(78, 200, 186);
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
      }
    }
    //部门问题和综合问题模块
    .two{
      // background-color: rgb(82, 199, 154);
      margin-top: 20px;
      .tit{
        font-size: 25px;
        // background-color: rgb(60, 170, 113);
        text-align: left;
      }
      .question1{
        // background-color: rgb(189, 112, 112);
        margin-top: 20px;
        .problem{
          font-size: 18px;
          text-align: left;
        }
        .answer{
          margin-top: 20px;
          text-align: left;
          margin-left: 30px;
          margin-right: 30px;
          font-size: 15px;
          background-color: #f5f7fa;
          padding: 17px;
        }
      }
      .question2{
        // background-color: rgb(123, 207, 208);
        margin-top: 20px;
        .problem{
          font-size: 18px;
          text-align: left;
        }
      }
    }
  }
  // 面试反馈
  .reply{
    margin-top: 10px;
    border-left: 2px solid gray;
    .replyItem{
      font-size: 20px;
      text-align: left;
      padding-left: 13px;
      height: 40px;
      line-height: 40px;
      // background-color: rgb(102, 183, 142);
    }
  }
  // 面试安排
  .arrange,.inform,.evaluate,.result{
    margin-top: 10px;
    border-left: 2px solid gray;
    .table{
      margin-left: 20px;
    }
  }
  .evaluate{
    .interview{
      font-size: 25px;
      text-align: left;
      padding-left: 13px;
      margin: 13px 0;
    }
    .detail{
        padding-left: 20px;
        .tit2{
          font-size: 18px;
          text-align: left;
          margin: 10px 0;
        }
      }
    .interview:hover{
        color: #66b1ff;
        cursor: pointer;
    }
  }
  .result{
    margin-bottom: 40px;
  }
}
tr{
  height: 40px;
}
table
{
    border-collapse: collapse;
    text-align: center;
}
table td, table th
{
    border: 1px solid rgb(232, 231, 231);
    color: rgb(132, 129, 129);
}
/deep/.el-dialog__body{
  padding: 20px 20px 0px 30px;
}
// 总大小
/deep/.el-dialog{
  height: calc(100vh - 80px);
  min-width: 840px;
  min-height: 610px;
  // min-height: calc(100vh - 150px);
  margin: 0 auto 30px;
}
/deep/.el-input{
  width: 150px;
}
/deep/.el-radio__input.is-disabled+span.el-radio__label{
  color: #606266;
}
/deep/.el-input.is-disabled .el-input__inner{
  color: #606266;
}
</style>

