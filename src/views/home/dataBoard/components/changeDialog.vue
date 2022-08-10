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
            <el-form-item label="姓名" prop="studentName" v-if="ruleForm.studentName!=null">
              <el-input v-model="ruleForm.studentName" ></el-input>
            </el-form-item>
            <el-form-item label="学号" prop="studentId" v-if="ruleForm.studentId!=null">
              <el-input v-model="ruleForm.studentId" ></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phone" v-if="ruleForm.phone!=null">
              <el-input v-model="ruleForm.phone" ></el-input>
            </el-form-item>
            <el-form-item label="学院" prop="academyId" v-if="ruleForm.academyId!=null">
              <el-select v-model="ruleForm.academyId" placeholder="请选择学院">
                <el-option
                  v-for="item in academyIds"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="专业" prop="majorId" v-if="ruleForm.majorId!=null">
              <el-select v-model="ruleForm.majorId" placeholder="请选择专业">
                <el-option
                  v-for="item in majorIds"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="班级" prop="classId" v-if="ruleForm.classId!=null">
              <el-select v-model="ruleForm.classId" placeholder="请选择班级">
                <el-option
                  v-for="item in classIds"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="QQ" prop="qq" v-if="ruleForm.qq!=null">
              <el-input v-model="ruleForm.qq"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="gender" v-if="ruleForm.gender!=null">
              <el-select v-model="ruleForm.gender" placeholder="请选择性别">
                <el-option
                  v-for="item in sexs"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="邮箱" prop="email" v-if="ruleForm.email!=null">
                <el-input v-model="ruleForm.email"></el-input>
              </el-form-item>
          </el-form>
        </div>
        <!-- 部门问题模块 -->
        <div class="two">
          <div class="tit">部门问题</div>
          <!-- 自定义填空 -->
            <div class="question1" v-for="(item,index) in departmentQuestion1" :key="index">
              <div class="problem">填空：{{item.question}}</div>
              <div class="answer">{{item.answer}}</div>
            </div>
          <!-- 自定义选择 -->
          <div class="question2">
            <div class="problem" v-for="(item,index) in departmentQuestion2" :key="index">
              <div style="margin-right:40px">选择：{{item.question}}</div>
              <div class="answer">
                <el-radio disabled v-model="item.answer" :label="item1" v-for="(item1,index) in item.choices" :key="index">{{item1}}</el-radio>
              </div>
            </div>
          </div>
        </div>
        <!-- 综合问题模块 -->
        <div class="two">
          <div class="tit">综合问题</div>
          <!-- 自定义填空 -->
          <div class="question1" v-for="(item,index) in bigQuestion1" :key="index">
            <div class="problem">填空：{{item.question}}</div>
            <div class="answer">{{item.answer}}</div>
          </div>
          <!-- 自定义选择 -->
          <div class="question2">
              <div class="problem" v-for="(item,index) in bigQuestion2" :key="index">
                <div style="margin-right:40px">选择：{{item.question}}</div>
                <div class="answer">
                  <el-radio disabled v-model="item.answer" :label="item1" v-for="(item1,index) in item.choices" :key="index">{{item1}}</el-radio>
                </div>
              </div>
            </div>
        </div>
      </div>
      <!-- 底部按钮 -->
      <span slot="footer" class="dialog-footer">
        <!-- 修改学号 -->
        <el-button @click="changeDialogVisible = false" style="margin-left:10px">退 出</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">提 交</el-button>
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
      //表单数据
      ruleForm: {
          studentId: '',
          studentName: '',
          phone: '',
          academyId: '',
          majorId: '',
          classId: '',
          gender: '',
          qq: '',
          email:'',
      },
      //部门问题数组（填空）
      departmentQuestion1:[],
      // 部门问题数组（选择）
      departmentQuestion2:[],
      //综合问题数组（填空）
      bigQuestion1:[],
      //综合问题数组（选择）
      bigQuestion2:[],
      //表单验证规则
       rules: {
          studentName: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          studentId: [
            { required: true, message: '请输入学号', trigger: 'blur' },
          ],
          phone: [
            { required: true, message: '请输入电话号', trigger: 'blur' },
          ],
          academyId:[
            { required: true, message: '请选择学院', trigger: 'blur' }
          ],
          majorId:[
            { required: true, message: '请选择专业', trigger: 'blur' }
          ],
          classId:[
            { required: true, message: '请选择班级', trigger: 'blur' }
          ],
          qq:[
            { required: true, message: '请输入QQ', trigger: 'blur' }
          ],
          gender:[
            { required: true, message: '请输入性别', trigger: 'blur' }
          ],
          email:[
            { required: true, message: '请输入邮箱', trigger: 'blur' }
          ]
       },
       sexs:[{
          id:1,
          name:'男'
       },{
          id:2,
          name:'女'
       }],
       //学院选择项
      academyIds: [{
          "id": 0,
          "name": "暂无数据"
        }],
      //专业选择项
      majorIds: [{
          "id": 0,
          "name": "暂无数据"
        }, ],
      // 班级选择项
      classIds: [{
          "id": 0,
          "name": "暂无数据"
      }],
    }
  },
  watch:{
    //监视学院改变
    "ruleForm.academyId":{
      handler(){
        this.ruleForm.majorId=''
        this.ruleForm.classId=''
        this.getMajor()
      }
    },
    //监视专业改变
    "ruleForm.majorId":{
      handler(){
        if(this.ruleForm.majorId!=''){
          this.getClass()
        }
      }
    }
  },
  methods:{
    //类mounted函数
    Mymounted(){
      this.getAcdademy()
      this.getDetail()
    },
    // 获取学院列表
    getAcdademy(){
      let url = `api/major-info/academy`
      let get = this.$http.get(url)
      get
        .then((res) => {
          this.academyIds=res.data.data.academy;
        })
        .catch(() => {
          this.$message({
            showClose: true,
            message: '获取学院列表失败',
            type: 'error',
            center: true,
            duration: 2000
          })
        })
    },
    // 获取专业列表
    getMajor(){
      //没有选择学院专业列表为空
      if(this.ruleForm.academyId==''){
        this.majorIds=[]
      }else{
        let academyId = this.ruleForm.academyId
        let url = `api/major-info/major/${academyId}`
        let get = this.$http.get(url)
        get
          .then((res) => {
            this.majorIds=res.data.data.major
          })
          .catch(() => {
            this.$message({
              showClose: true,
              message: '获取专业列表失败',
              type: 'error',
              center: true,
              duration: 2000
            })
          })
        }
    },
    // 获取班级列表
    getClass(){
      let academyId = this.ruleForm.academyId
      let majorId = this.ruleForm.majorId
      let url = `api/major-info/class-num/${academyId}/${majorId}`
      let get = this.$http.get(url)
      get
        .then((res) => {
          this.classIds=res.data.data.classNum
        })
        .catch(() => {
          this.$message({
            showClose: true,
            message: '获取班级列表失败',
            type: 'error',
            center: true,
            duration: 2000
          })
        })
    },
    // 获取个人信息(后端数据库为空，目前不能请求)
    getDetail(){
      // 清空
      // 部门问题数组（填空）
      this.departmentQuestion1=[]
      // 部门问题数组（选择）
      this.departmentQuestion2=[]
      //综合问题数组（填空）
      this.bigQuestion1=[]
      //综合问题数组（选择）
      this.bigQuestion2=[]
      // let studentId = this.studentId
      // let admissionId = this.admissionId
      // let url = `api/student/info/show?studentId=${studentId}&admissionId=${admissionId}`
      // let get = this.$http.get(url)
      // get
      //   .then((res) => {
      //     console.log(res,'简历数据')
          //模拟数据
          let data={
              "studentId": 20222445,
              "studentName": "张张张",
              "phone": "13000000000",
              "academy":'计算机学院',
              "major": '信息安全',
              "classNum": '一班',
              "gender": 2,
              "qq": '15515',
              "email":'156856',
              "questions": [
                {
                      "department": "部门问题",
                      "multipleChoice": 0,
                      "question": "部门问题1",
                      "answer": "喵喵大V"
                  },
                  {
                      "department": "部门问题",
                      "multipleChoice": 0,
                      "question": "按时吃",
                      "answer": "喵差"
                  },
                  {
                      "department": "部门问题",
                      "multipleChoice": 1,
                      "choices": [
                          "选项A24",
                          "选项B58",
                          "xsa5xa",
                          "xsaxaxs"
                      ],
                      "question": "部门问题2",
                      "answer": "xsaxaxs"
                  },
                  {
                      "department": "部门问题",
                      "multipleChoice": 1,
                      "choices": [
                          "选项A24",
                          "选项B58",
                          "dhfgbhfd",

                      ],
                      "question": "部门问题2",
                      "answer": "dhfgbhfd"
                  },
                  {
                      "department": "综合问题",
                      "multipleChoice": 0,
                      "question": "综合问题1",
                      "answer": "喵喵sd分时段"
                  },
                  {
                      "department": "综合问题",
                      "multipleChoice": 1,
                      "choices": [
                          "选项A8574",
                          "选项B785"
                      ],
                      "question": "综合问题2",
                      "answer": "选项A8574"
                  }
              ]
          }
          //真实数据
          // let data=res.data.data
          //赋值
          this.ruleForm.studentId=data.studentId
          this.ruleForm.studentName=data.studentName
          this.ruleForm.phone=data.phone
          if(data.academy==null){
            this.ruleForm.academyId=data.academy
          }
          if(data.major==null){
             this.ruleForm.majorId=data.major
          }
          if(data.classNum==null){
            this.ruleForm.classId=data.classNum
          }
          this.ruleForm.gender=data.gender
          this.ruleForm.qq=data.qq
          this.ruleForm.email=data.email
          //数据分类
          data.questions.forEach((item)=>{
            if(item.department=='部门问题'){
              if(item.multipleChoice==0){
                this.departmentQuestion1.push(item)
              }
              if(item.multipleChoice==1){
                this.departmentQuestion2.push(item)
              }
            }
            if(item.department=='综合问题'){
              if(item.multipleChoice==0){
                this.bigQuestion1.push(item)
              }
              if(item.multipleChoice==1){
                this.bigQuestion2.push(item)
              }
            }
          })
        // })
        // .catch(() => {
        //   this.$message({
        //     showClose: true,
        //     message: '获取简历失败',
        //     type: 'error',
        //     center: true,
        //     duration: 2000
        //   })
        // })
    },
    //点击提交按钮
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submitNumData()
            this.submitData()
          } else {
            return false;
          }
        });
    },
    //提交修改学号数据(后端数据库为空，目前不能请求)
    submitNumData(){
      // let sendData={
      //   "studentId": this.studentId,
      //   "newStudentId": this.ruleForm.studentId
      // }
      // let url = `api/student/info/change-student-id`
      // let post = this.$http.post(url,sendData)
      // post
      //   .then(() => {
          // alert('6+')
        // })
        // .catch(() => {
        //   this.$message({
        //     showClose: true,
        //     message: '修改学号失败',
        //     type: 'error',
        //     center: true,
        //     duration: 2000
        //   })
        // })
    },
    //修改个人信息(后端数据库为空，目前不能请求)
    submitData(){
      // let sendData={
      //   "studentId":this.ruleForm.studentId,
      //   "studentName":this.ruleForm.studentName,
      //   "phone": this.ruleForm.phone,
      //   "qq": this.ruleForm.qq,
      //   "academyId": this.ruleForm.academyId,
      //   "majorId": this.ruleForm.majorId,
      //   "classId" : this.ruleForm.classId,
      //   "email":this.ruleForm.email,
      //   "gender":this.ruleForm.gender
      // }
      // let url = `api/student/info/change-student-info`
      // let post = this.$http.post(url,sendData)
      // post
      //   .then(() => {
        this.changeDialogVisible=false
          this.$message({
            showClose: true,
            message: '修改成功',
            type: 'success',
            center: true,
            duration: 2000
          })
        // })
        // .catch(() => {
        //   this.$message({
        //     showClose: true,
        //     message: '修改失败',
        //     type: 'error',
        //     center: true,
        //     duration: 2000
        //   })
        // })
    }
  },
  // mounted(){
  //   this.Mymounted()
  // }
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
