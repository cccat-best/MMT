<template>
  <div class="synth-content">
    <div class="synth-title">综合问题</div>
    <div class="synth-main-content">
      <!-- 选择的问题展示 -->
      <div class="show-qus">
        <div class="freeView-content">
          <div
            class="freeView-item"
            v-for="(item1, i1) in comprehensiveQuestionsList"
            :key="'a' + i1"
          >
            <i
              class="el-icon-remove"
              style="color: #1597db"
              @click="removeItem(item1)"
            ></i>
            <div class="freeView-name-content">
              <span class="freeView-name">{{ item1.description }}</span>
            </div>
            <!-- 展示选项 -->
            <select style="width: 166.4px" v-show="item1.selection">
              <option
                selected="selected"
                disabled="disabled"
                style="display: none"
                value=""
              ></option>
              <option
                v-for="(item2, index2) in item1.option"
                :key="'op' + index2"
                v-show="item2 != null"
              >
                {{ item2 }}
              </option>
            </select>
            <!--  展示input框-->
            <input type="text" v-show="!item1.selection" />
          </div>
        </div>
      </div>
      <!-- 问题选择面板 -->
      <div class="add-qus">
        <el-popover
          placement="top"
          width="300"
          v-model="addShow"
          ref="synthPopover"
          :popper-options="{
            boundariesElement: 'viewport',
            removeOnDestroy: true
          }"
        >
          <div
            class="synth-add-chose"
            style="display: flex; justify-content: center"
          >
            <!-- 控制用户输入选择还是文字题 -->
            <el-button size="small" @click="chooseAdd = 1">填空</el-button>
            <el-button size="small" @click="chooseAdd = 2">选择</el-button>
          </div>
          <!-- 填空题收集  v-show判断-->
          <div v-show="chooseAdd === 1">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入问题上限50个字"
              v-model="text1"
              maxlength="50"
              show-word-limit
              style="margin: 10px 0"
            >
            </el-input>
          </div>
          <!-- 选择题收集 -->
          <div v-show="chooseAdd === 2">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入问题上限50个字"
              v-model="text2"
              maxlength="50"
              show-word-limit
              style="margin: 10px 0"
            >
            </el-input>
            <el-form
              :model="form"
              ref="form"
              label-width="50px"
              class="demo-dynamic"
            >
              <el-form-item
                v-for="(domain, index) in form.domains"
                :label="'选项' + (index + 1)"
                :key="domain.key"
                :prop="'domains.' + index + '.value'"
              >
                <div style="display: flex">
                  <el-input
                    v-model="domain.value"
                    style="margin-right: 5px"
                    maxlength="50"
                  ></el-input
                  ><el-button @click.prevent="removeDomain(domain)"
                    >删除</el-button
                  >
                </div>
              </el-form-item>
              <el-button @click="addDomain">添加选项</el-button>
            </el-form>
          </div>

          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="addShow = false"
              >取消</el-button
            >
            <el-button type="primary" size="mini" @click="pushQue"
              >确定</el-button
            >
          </div>
          <el-button slot="reference" class="add-botton"
            >+添加综合问题</el-button
          >
        </el-popover>
      </div>

      <!-- 取消 提交 -->
      <div class="bottom-button">
        <el-button
          type="info"
          plain
          class="bottom-button-item"
          @click="cancel()"
          >取消</el-button
        >
        <el-button
          type="primary"
          plain
          class="bottom-button-item"
          @click="isSend()"
          >提交</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
export default {
  data() {
    return {
      // 上限五个问题
      isAdd: 1,
      addShow: false,
      comprehensiveQuestionsList: [],
      // 控制添加选择还是填空
      chooseAdd: 1,
      // 收集文本问题
      text1: '',
      //收集选择题目
      text2: '',
      //收集选项内容
      form: {
        //最少两个选项
        domains: [
          {
            value: ''
          },
          {
            value: ''
          }
        ]
      }
    }
  },
  watch: {
    //弹出框位置修正
    chooseAdd() {
      this.$nextTick(() => {
        this.$refs.synthPopover.updatePopper()
      })
    }
  },
  computed: {
    //拿到前面页面的问题
    ...mapState('problem', [
      'time',
      'generalQuestions',
      'questionsList',
      'departmentQuestionsList',
      'maxDepartment',
      'allocated'
    ])
  },
  methods: {
    //动态增减选项
    removeDomain(item) {
      if (this.form.domains.length === 2) {
        return this.$message.error('最少两个选项')
      }
      var index = this.form.domains.indexOf(item)
      if (index !== -1) {
        this.form.domains.splice(index, 1)
      }
    },
    addDomain() {
      if (this.form.domains.length === 4) {
        return this.$message.error('最多四个选项')
      }
      this.form.domains.push({
        value: ''
      })
    },
    //添加自定义选择
    addChoseList() {
      if (this.isAdd > 5) return this.$message.error('最多自定义五个问题')
      if (this.text2 == '') {
        return this.$message.error('问题不能为空')
      }
      for (let i = 0; i < this.form.domains.length; i++) {
        if (this.form.domains[i].value == '')
          return this.$message.error('选项不能为空')
      }
      //如果找不到这个问题 避免重复问题
      if (
        !this.comprehensiveQuestionsList.find(
          (p) => p.description === this.text2
        )
      ) {
        let que = {
          //不是单选
          selection: true,
          description: this.text2
        }
        let option = {
          A: null,
          B: null,
          C: null,
          D: null
        }
        //选项赋值 后端需要ABCD形式方便发送请求 后面有时间会改成三元运算
        if (this.form.domains[0]) {
          option.A = this.form.domains[0].value
        } else {
          option.A = null
        }
        if (this.form.domains[1]) {
          option.B = this.form.domains[1].value
        } else {
          option.B = null
        }
        if (this.form.domains[2]) {
          option.C = this.form.domains[2].value
        } else {
          option.C = null
        }
        if (this.form.domains[3]) {
          option.D = this.form.domains[3].value
        } else {
          option.D = null
        }
        que.option = option
        this.comprehensiveQuestionsList.push(que)
        this.isAdd++
        this.addShow = false
        //重新定向到文本问题展示
        this.chooseAdd = 1
      } else {
        return this.$message.error('问题已存在')
      }
      //清空问题
      this.text2 = ''
      this.form.domains = [
        {
          value: ''
        },
        {
          value: ''
        }
      ]
    },
    //添加自定义文本问题
    addTextQues() {
      //判断自定义问题是否超过三个
      if (this.isAdd > 5) return this.$message.error('最多自定义五个问题')
      if (this.text1 == '') {
        return this.$message.error('问题不能为空')
      }
      //如果找不到这个问题
      if (
        !this.comprehensiveQuestionsList.find(
          (p) => p.description === this.text1
        )
      ) {
        let que = {
          //不是选择
          selection: false,
          description: this.text1,
          option: {
            a: null,
            b: null,
            c: null,
            d: null
          }
        }
        this.comprehensiveQuestionsList.push(que)
        this.isAdd++
        this.text1 = ''
        //只有成功提交才会关闭这个添加框
        this.addShow = false
      } else {
        return this.$message.error('问题已存在')
      }
      //添加成功清空问题
      this.text = ''
    },
    //判断用户要添加什么问题 通过不同的值执行不同添加方法
    pushQue() {
      if (this.chooseAdd === 1) {
        this.addTextQues()
      } else {
        this.addChoseList()
      }
    },
    // 删除问题
    removeItem(item1) {
      this.comprehensiveQuestionsList = this.comprehensiveQuestionsList.filter(
        (p) => p.description != item1.description
      )
      this.isAdd--
    },
    //如果点击取消回到时间选择页
    cancel() {
      this.$parent.cancel()
    },
    //是否发送请求给后端
    isSend() {
      this.$confirm('是否确认提交？', '提交', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          //开始结束时间必填
          if (this.time.length == 0)
            return this.$message.error('请确认填写是否填写了开始截至时间')
          const qustionList = {
            userId: 2,
            organizationId: 2,
            startTime: this.time[0],
            endTime: this.time[1],
            generalQuestions: this.generalQuestions,
            questionsList: this.questionsList,
            maxDepartment: this.maxDepartment,
            departmentQuestionsList: this.departmentQuestionsList,
            allocated: this.allocated,
            comprehensiveQuestionsList: this.comprehensiveQuestionsList
          }
          console.log(qustionList)
          //调用函数发送请求
          this.sendTo(qustionList)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消提交'
          })
        })
    },
    async sendTo(qustionList) {
      // const res = await axios.post(
      //   'http://119.29.27.252:38080/organization/interview/sign',
      //   {
      //     data: JSON.stringify(qustionList)
      //   },
      //   {
      //     headers: {
      //       'Access-Control-Allow-Origin': '*', //解决cors头问题
      //       'Access-Control-Allow-Credentials': 'true' //解决session问题
      //     },
      //     withCredentials: true
      //   }
      // )
      axios.post('http://119.29.27.252:38080/organization/interview/sign', qustionList).then((res) => {
        console.log('res=>', res)
      })
      //   axios.post('http://119.29.27.252:38080/organization/interview/sign',JSON.stringify(qustionList))
      //   .then(res => {
      //     console.log(res)
      //   })
      //   .catch(err => {
      //     console.error(err);
      //   })
      // console.log('这是结果', res)
    }
  }
}
</script>

<style lang="less" scoped>
.synth-content {
  display: flex;
  height: auto;
  flex-direction: column;
  .synth-title {
    display: flex;
    font-size: 30px;
    color: #9e9e9e;
    margin: 10px 0;
  }
  .synth-main-content {
    .show-qus {
      .freeView-content {
        .freeView-title {
          display: flex;
          font-size: 18px;
          color: #989898;
          margin-left: 65px;
          margin-bottom: 10px;
          margin-top: 20px;
        }
        margin: 20px 0;
        display: flex;
        flex-direction: column;
        .freeView-item {
          display: flex;
          align-items: center;
        }
        .freeView-name-content {
          display: flex;
          margin: 10px 10px;
          width: 200px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          .freeView-name {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }
    .add-qus {
      display: flex;
      margin-top: 20px;
      padding-left: 25px;
      .add-botton {
        color: white;
        background-color: #02a8ef;
        margin-bottom: 40px;
      }
      .synth-add-chose {
        display: flex;
        justify-content: center;
      }
    }
    .bottom-button {
      display: flex;
      justify-content: space-around;
      .bottom-button-item {
        width: 120px;
        height: 20px;
        font-size: 14px;
        line-height: 3px;
      }
    }
  }
}
</style>
