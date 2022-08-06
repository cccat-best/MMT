<template>
  <div class="all">
    <!-- 顶部进度条 -->
    <div class="one">
      <div class="progress">
        <el-progress
          :text-inside="true"
          :stroke-width="18"
          :percentage="100"
        ></el-progress>
        <div class="time">
          <span class="start">6:30</span>
          <span class="end">7:00</span>
        </div>
        <div class="surplus">剩余10人</div>
      </div>
      <div class="progress">
        <el-progress
          :text-inside="true"
          :stroke-width="18"
          :percentage="70"
        ></el-progress>
        <div class="time">
          <span class="start">7:00</span>
          <span class="end">7:30</span>
        </div>
        <div class="surplus">剩余10人</div>
      </div>
      <div class="progress">
        <el-progress
          :text-inside="true"
          :stroke-width="18"
          :percentage="70"
        ></el-progress>
        <div class="time">
          <span class="start">8:00</span>
          <span class="end">8:30</span>
        </div>
        <div class="surplus">剩余10人</div>
      </div>
      <div class="progress">
        <el-progress
          :text-inside="true"
          :stroke-width="18"
          :percentage="70"
        ></el-progress>
        <div class="time">
          <span class="start">8:30</span>
          <span class="end">9:00</span>
        </div>
        <div class="surplus">剩余10人</div>
      </div>
    </div>
    <!-- 改变面试地点 -->
    <div class="two">
      <el-select v-model="position" placeholder="选择面试地点" class="select">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <!-- 文字：待面试人员名单 -->
    <div class="three">当前时段待面试人员名单</div>
    <!-- 搜索框 二维码-->
    <div class="four">
      <div class="search">
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="search"
        >
        </el-input>
      </div>
      <el-button class="yes" type="primary" plain>搜索</el-button>
      <el-button type="primary" @click="dialogVisible1 = true"
        >点击生成签到二维码</el-button
      >
      <!-- 点击弹出的页面 -->
      <el-dialog title="签到二维码" :visible.sync="dialogVisible1" width="30%">
        <img style="width:300px;height:300px;margin:0 auto" src="./pic/R-C.jpg" />
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible1 = false">关 闭</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 表格数据 -->
    <div class="five">
      <el-table
        :data="tableData"
        border
        height="350"
        style="width: 95%; font-size: 16px; margin-left: 20px; overflow-y: auto"
        :cell-style="{ padding: '0' }"
        :row-style="{ height: '0' }"
      >
        <!-- id -->
        <el-table-column prop="id" label="ID" align="center" width="100">
        </el-table-column>
        <!-- 学号 -->
        <el-table-column prop="stdnum" label="学号" align="center">
        </el-table-column>
        <!-- 姓名 -->
        <el-table-column prop="name" label="姓名" align="center">
        </el-table-column>
        <!-- 班级 -->
        <el-table-column prop="class" label="班级" align="center">
        </el-table-column>
        <!-- 面试地点 -->
        <el-table-column prop="location" label="面试地点" align="center">
        </el-table-column>
        <!-- 面试状态 -->
        <el-table-column prop="status" label="面试状态" align="center">
        </el-table-column>
        <!-- 简历 -->
        <el-table-column prop="resume" label="简历" width="80" align="center">
          <template>
            <div class="resumeTable">
            <!-- 弹窗按钮 -->
            <el-button type="text" @click="dialogVisible2 = true">
              <i class="el-icon-s-order" style="font-size: 20px"></i>
            </el-button>
            <!-- 简历弹窗 -->
            <el-dialog title="" :visible.sync="dialogVisible2" width="65%" top="30px">
              <!-- 主体内容 -->
              <div class="resume">
                <!-- 标题 -->
                <div class="bigTitle">报名表</div>
                <!-- 内容 -->
                <div class="registerTable">
                  <!-- 基本问题模块 -->
                  <div class="base">
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
                  <div class="department">
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
                  <div class="department">
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
              </div>
              <!-- 底部按钮 -->
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible2 = false">关 闭</el-button>
              </span>
            </el-dialog>
            </div>
          </template>
        </el-table-column>
        <!-- 面试评价 -->
        <el-table-column
          prop="evaluate"
          label="面试评价"
          width="90"
          align="center"
        >
          <template>
            <el-button type="text" @click="dialogVisible3 = true">
              <i class="el-icon-s-custom" style="font-size: 20px"></i>
            </el-button>
            <!-- 面试评价弹窗 -->
            <el-dialog title="" :visible.sync="dialogVisible3" width="50%" top="30px">
              <div class="result">
                <div class="title">面试评价</div>
                <div class="content">
                  <el-input
                    type="textarea"
                    :rows="10"
                    placeholder="在这里写下面试评价"
                    v-model="estimate"
                    resize="none"
                  >
                  </el-input>
                </div>
                <div class="getscore">
                  <span style="font-size: 20px; margin-right: 10px"
                    >面试总得分:</span
                  >
                  <el-input
                    placeholder="请输入得分"
                    v-model="score"
                    clearable
                    style="width: 200px"
                  >
                  </el-input>
                </div>
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible3 = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible3 = false"
                  >确 定</el-button
                >
              </span>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 页脚 -->
    <div class="six">
      <div class="total">共有70条记录</div>
      <div class="page">
        <el-pagination background layout="prev, pager, next" :total="100">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //下拉框的选项
      options: [
        {
          value: '7-115',
          label: '7-115'
        },
        {
          value: '7-116',
          label: '7-116'
        },
        {
          value: '7-117',
          label: '7-117'
        },
        {
          value: '7-118',
          label: '7-118'
        },
        {
          value: '7-119',
          label: '7-119'
        }
      ],
      //下拉框选择的地点数据
      position: '',
      //搜索的文字
      search: '',
      //二维码弹出框的显示与隐藏
      dialogVisible1: false,
      //简历弹出框显示与隐藏
      dialogVisible2: false,
      //面试评价弹出框显示与隐藏
      dialogVisible3: false,
      //表格数据
      tableData: [
        {
          id: '01',
          stdnum: '20210001',
          name: '王小虎',
          class: '计算机科学与技术一班',
          location: '7-115',
          status: '已面试'
        },
        {
          id: '02',
          stdnum: '20210001',
          name: '王小虎',
          class: '一班',
          location: '7-115',
          status: '已面试'
        },
        {
          id: '03',
          stdnum: '20210001',
          name: '王小虎',
          class: '一班',
          location: '7-115',
          status: '已面试'
        },
        {
          id: '04',
          stdnum: '20210001',
          name: '王小虎',
          class: '一班',
          location: '7-115',
          status: '已面试'
        },
        {
          id: '05',
          stdnum: '20210001',
          name: '王小虎',
          class: '一班',
          location: '7-115',
          status: '已面试'
        },
        {
          id: '06',
          stdnum: '20210001',
          name: '王小虎',
          class: '一班',
          location: '7-115',
          status: '已面试'
        },
        {
          id: '07',
          stdnum: '20210001',
          name: '王小虎',
          class: '一班',
          location: '7-115',
          status: '已面试'
        },
        {
          id: '08',
          stdnum: '20210001',
          name: '王小虎',
          class: '一班',
          location: '7-115',
          status: '已面试'
        },
        {
          id: '09',
          stdnum: '20210001',
          name: '王小虎',
          class: '一班',
          location: '7-115',
          status: '已面试'
        },
        {
          id: '10',
          stdnum: '20210001',
          name: '王小虎',
          class: '一班',
          location: '7-115',
          status: '已面试'
        }
      ],
      //简历数据
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
      //面试评价文字
      estimate: '',
      //面试得分
      score: ''
    }
  },
  methods: {
    handleClick(row) {
      console.log(row)
    }
  }
}
</script>

<style lang="less" scoped>
.all {
  width: calc(100vw - 250px);
  height: calc(100vh - 120px);
  // background-color: rgb(46, 108, 183);
  background-color: white;
  min-width: 1100px;
  min-height: 620px;
  .one {
    // background-color: rgb(37, 189, 98);
    background-color: white;
    width: calc(100vw - 280px);
    min-width: 1070px;
    padding: 0 15px;
    height: 112px;
    display: flex;
    justify-content: space-between;
    overflow-x: auto;
    .progress {
      width: 180px;
      height: 74px;
      margin-top: 15px;
      margin-left: 5px;
      background-color: white;
    }
    .time {
      height: 18px;
      margin-top: 5px;
      width: 170px;
      margin-left: 5px;
      color: rgb(82, 82, 82);
      background-color: white;
      .start {
        float: left;
      }
      .end {
        float: right;
      }
    }
    .surplus {
      height: 23px;
      width: 160px;
      margin-left: 10px;
      margin-top: 8px;
      text-align: center;
      border: 1px solid rgb(213, 209, 209);
      color: rgb(82, 82, 82);
      border-radius: 5px;
      // background-color: rgb(233, 81, 81);
    }
  }
  .two {
    height: 40px;
    // background-color: rgb(211, 185, 68);
    background-color: white;
    .select {
      // margin-top: 15px;
      width: 200px;
      margin-left: 20px;
      float: left;
    }
  }
  .three {
    // background-color: rgb(110, 168, 207);
    background-color: white;
    width: 230px;
    text-align: left;
    margin-left: 20px;
    margin-top: 10px;
    font-size: 20px;
    color: rgb(82, 82, 82);
    border-bottom: 2px solid rgb(213, 211, 211);
  }
  .four {
    // background-color: rgb(196, 85, 107);
    background-color: white;
    height: 40px;
    margin-top: 8px;
    margin-bottom: 8px;
    position: relative;
    .search {
      display: inline-block;
      width: 200px;
      // margin-left: 20px;
      position: absolute;
      top: 0;
      left: 20px;
    }
    .yes {
      position: absolute;
      left: 230px;
    }
  }
  .five {
    .resumeTable{
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
      .resume{
          height: calc(100vh - 60px - 150px);
          min-width: 800px;
          min-height: 480px;
          // background-color: rgb(72, 143, 188);
          background-color: white;
          overflow: auto;
        .bigTitle{
          background-color: #fff;
          font-size: 35px;
          text-align: left;
          font-weight: 700;
          margin-top: 20px;
        }
        .registerTable{
          // border-left: 2px solid gray;
          padding-left: 18px;
          .base{
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
          .department{
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
      }
    }
      .result {
        width: 700px;
        height: 350px;
        // background-color: rgb(59, 137, 123);
        .title {
          font-size: 28px;
          color: rgb(82, 82, 82);
          font-weight: 700;
          width: 200px;
        }
        .content {
          margin-top: 15px;
          margin-left: 30px;
          width: 600px;
          height: 250px;
        }
        /deep/.el-dialog{
          height: calc(100vh - 180px);
          min-width: 840px;
          min-height: 610px;
          // min-height: calc(100vh - 150px);
          margin: 0 auto 30px;
        }
      }
  }
  .six {
    height: 45px;
    margin-top: 2px;
    // background-color: rgb(185, 86, 50);
    background-color: white;
    position: relative;
    .total {
      display: inline-block;
      position: absolute;
      top: 0;
      left: 20px;
      text-align: left;
      // background-color: rgb(149, 139, 213);
      background-color: white;
      margin-top: 10px;
    }
    .page {
      background-color: white;
      display: inline-block;
      position: absolute;
      top: 5px;
      left: 62%;
    }
  }
}
// /deep/.el-dialog__body{
//   padding: 20px 20px 0px 30px;
// }
// // 总大小
// /deep/.el-dialog{
//   height: calc(100vh - 80px);
//   min-width: 840px;
//   min-height: 610px;
//   // min-height: calc(100vh - 150px);
//   margin: 0 auto 30px;
// }
// /deep/.el-input{
//   width: 150px;
// }
// /deep/.el-radio__input.is-disabled+span.el-radio__label{
//   color: #606266;
// }
// /deep/.el-input.is-disabled .el-input__inner{
//   color: #606266;
// }
</style>
