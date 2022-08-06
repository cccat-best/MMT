<template>
  <div>
    <el-dialog
      title=""
      :visible.sync="changeDialogVisible"
      width="60%"
      top="30px"
    >
      <!-- 弹窗主体内容 -->
      <div class="all">
        <div class="bigTitle">报名表</div>
        <!-- 基本问题模块 -->
        <div class="one">
          <div class="tit">基本问题</div>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm form" >
            <el-form-item label="姓名" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入名字"></el-input>
            </el-form-item>
            <el-form-item label="学号" prop="id">
              <el-input v-model="ruleForm.id" placeholder="请输入学号"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phone">
              <el-input v-model="ruleForm.phone" placeholder="请输入电话"></el-input>
            </el-form-item>
            <el-form-item label="QQ" prop="qq" v-if="true">
              <el-input v-model="ruleForm.qq" placeholder="请输入QQ"></el-input>
            </el-form-item>
            <el-form-item label="学院" prop="academyId" v-if="true">
              <el-select v-model="ruleForm.academyId" placeholder="请选择学院">
                <el-option
                  v-for="item in academyIds"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="专业" prop="majorId">
              <el-select v-model="ruleForm.majorId" placeholder="请选择专业">
                <el-option
                  v-for="item in majorIds"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="班级" prop="classId">
              <el-select v-model="ruleForm.classId" placeholder="请选择班级">
                <el-option
                  v-for="item in classIds"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-input v-model="ruleForm.sex" placeholder="请输入性别"></el-input>
            </el-form-item>
            <el-form-item label="生日" prop="birthday">
              <el-input v-model="ruleForm.birthday"  placeholder="请输入生日"></el-input>
            </el-form-item>
            <el-form-item label="身高" prop="length">
              <el-input v-model="ruleForm.length" placeholder="请输入身高"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <!-- 部门问题模块 -->
        <div class="two">
          <div class="tit">部门问题</div>
          <!-- 自定义填空 -->
          <div class="question1">
            <div class="problem">问题一：你暑假的规划</div>
            <div class="answer">吃饭睡觉饭睡觉觉吃饭睡觉吃饭睡饭睡觉吃饭睡觉</div>
          </div>
          <div class="question1">
            <div class="problem">问题三：你暑假的规划</div>
            <div class="answer">吃饭睡觉吃饭觉吃饭睡觉吃饭睡觉吃饭睡觉</div>
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
        <div class="two">
          <div class="tit">综合问题</div>
          <!-- 自定义填空 -->
          <div class="question1">
            <div class="problem">问题一：你暑假的规划</div>
            <div class="answer">吃饭睡觉吃饭觉吃饭饭睡觉吃饭睡觉吃饭睡觉</div>
          </div>
          <div class="question1">
            <div class="problem">问题三：你暑假的规划</div>
            <div class="answer">吃饭睡觉吃饭睡觉饭觉吃饭睡觉吃饭睡觉吃饭睡觉</div>
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
      <!-- 底部按钮 -->
      <span slot="footer" class="dialog-footer">
        <!-- 修改学号 -->
        <el-button @click="changeDialogVisible = false" style="margin-left:10px">退 出</el-button>
        <el-button type="primary" @click="changeDialogVisible = false">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'changeDialog',
  data() {
    return {
      // 控制修改界面弹窗
      changeDialogVisible: false,
      // 学号,由主页传过来
      studentId: '',
      //新学号
      newNum:'',
      //选择问题的渲染
      radio:'选中且禁用',
      //表单数据
      ruleForm: {
          name: '',
          id:'',
          phone:'',
          sex:'',
          qq:'',
          birthday:'',
          length:'',
          academyId:'',
          majorId:'',
          classId:''
      },
      //表单验证规则
       rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          id: [
            { required: true, message: '请输入学号', trigger: 'blur' },
          ],
          phone: [
            { required: true, message: '请输入电话号', trigger: 'blur' },
          ],
       },
       //学院选择项
      academyIds: [{
          value: '选项1',
          label: '计算机科学与工程'
        }, {
          value: '选项2',
          label: '理学院'
      }],
      //专业选择项
      majorIds: [{
          value: '选项1',
          label: '计算机'
        }, {
          value: '选项2',
          label: '信安'
      }],
      // 班级选择项
      classIds: [{
        value: '选项1',
        label: '一班'
      }, {
        value: '选项2',
        label: '二班'
      }],
    }
  },
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
  // 大标题
  .bigTitle{
    // background-color: rgb(167, 84, 84);
    background-color: #fff;
    font-size: 40px;
    text-align: left;
    font-weight: 700;
  }
  // 基本问题模块
  .one{
    // background-color: rgb(164, 199, 82);
    margin-top: 15px;
    .tit{
      font-size: 28px;
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
  .two{
    // background-color: rgb(82, 199, 154);
    margin-top: 20px;
    .tit{
      font-size: 28px;
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
</style>
