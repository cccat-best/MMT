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
              :class="['el-icon-remove', !isEdit ? 'remove-opacity' : '']"
              style="color: #1597db"
              @click="removeItem(item1)"
            ></i>
            <div class="freeView-name-content">
              <!-- 大于15个字溢出隐藏 tip显示完整 -->
              <el-tooltip
                :content="item1.description"
                placement="bottom"
                effect="light"
                v-if="item1.description.length > 15"
              >
                <span class="freeView-name">{{ item1.description }}</span>
              </el-tooltip>
              <span
                class="freeView-name"
                v-if="item1.description.length <= 15"
                >{{ item1.description }}</span
              >
            </div>
            <div class="freeView-name-choose">
              <!-- 展示选项 -->
              <select class="freeView-select" v-if="item1.selection">
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
                  :disabled="true"
                >
                  {{ item2 }}
                </option>
              </select>
              <!--  展示input框-->
              <input
                type="text"
                v-if="!item1.selection"
                class="freeView-input"
              />
            </div>
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
            <!-- <el-button size="small" @click="chooseAdd = 1" ref="synthAddTextChose">填空</el-button>
          <el-button size="small" @click="chooseAdd = 2">选择</el-button> -->
            <div
              @click="chooseAdd = 1"
              :class="[
                'add-chose-button',
                chooseAdd == 1 ? 'add-chose-button-active' : ''
              ]"
            >
              填空
            </div>
            <div
              @click="chooseAdd = 2"
              :class="[
                'add-chose-button',
                chooseAdd == 2 ? 'add-chose-button-active' : ''
              ]"
              style="margin-left: 10px"
            >
              选择
            </div>
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
              resize="none"
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
import { mapState, mapMutations } from 'vuex'
export default {
  props: ['allQues'],
  data() {
    return {
      // isAdd: 1,
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
    addShow(newV) {
      if (newV && !this.isEdit) {
        this.addShow = false
        this.$refs.synthPopover.doClose()
        return this.$message.error('非编辑模式')
      }
    },
    //弹出框位置修正
    chooseAdd() {
      this.$nextTick(() => {
        this.$refs.synthPopover.updatePopper()
      })
    },
    allQues(newV) {
      //查看用户是否设置过问题
      if (newV.comprehensiveQuestionsList.length != 0) {
        this.comprehensiveQuestionsList = newV.comprehensiveQuestionsList
      }
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
      'allocated',
      'isEdit'
    ])
  },
  methods: {
    ...mapMutations('problem', ['escEdit']),
    // showIsEdit() {
    //   if(!this.isEdit) return this.$message.error('非编辑模式')
    // },
    //动态增减选项
    removeDomain(item) {
      if (this.form.domains.length === 2) {
        return this.$message.error('最少两个选项')
      }
      var index = this.form.domains.indexOf(item)
      if (index !== -1) {
        this.form.domains.splice(index, 1)
      }
      this.$refs.synthPopover.updatePopper()
    },
    addDomain() {
      if (this.form.domains.length === 4) {
        return this.$message.error('最多四个选项')
      }
      this.form.domains.push({
        value: ''
      })
      this.$refs.synthPopover.updatePopper()
    },
    //添加自定义选择
    addChoseList() {
      // if (!this.isEdit) return this.$message.error('非编辑模式')
      if (this.comprehensiveQuestionsList.length >= 5)
        return this.$message.error('最多自定义五个问题')
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
          //是单选
          selection: true,
          description: this.text2
        }
        let option = {
          a: null,
          b: null,
          c: null,
          d: null
        }
        //选项赋值 后端需要ABCD形式方便发送请求 后面有时间会改成三元运算
        if (this.form.domains[0]) {
          option.a = this.form.domains[0].value
        } else {
          option.a = null
        }
        if (this.form.domains[1]) {
          option.b = this.form.domains[1].value
        } else {
          option.b = null
        }
        if (this.form.domains[2]) {
          option.c = this.form.domains[2].value
        } else {
          option.c = null
        }
        if (this.form.domains[3]) {
          option.d = this.form.domains[3].value
        } else {
          option.d = null
        }
        que.option = option
        this.comprehensiveQuestionsList.push(que)
        // this.isAdd++
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
      // if (!this.isEdit) return this.$message.error('非编辑模式')
      //判断自定义问题是否超过三个
      if (this.comprehensiveQuestionsList.length >= 5)
        return this.$message.error('最多自定义五个问题')
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
        // this.isAdd++
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
      if (!this.isEdit) return
      this.comprehensiveQuestionsList = this.comprehensiveQuestionsList.filter(
        (p) => p.description != item1.description
      )
      // this.isAdd--
    },
    //如果点击取消回到时间选择页
    cancel() {
      this.$parent.cancel()
      this.escEdit()
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
          // 解决综合问题的顺序
          let i = 1
          this.comprehensiveQuestionsList.forEach((p) => {
            p.questionOrder = i
            i++
          })
          //解决部门问题的顺序
          //得到所有部门id
          let sectionId = this.departmentQuestionsList.map(
            (p) => p.departmentId
          )
          let departmentList = []
          //id去重
          sectionId = [...new Set(sectionId)]
          //把相同部门问题 放入temp 给问题排序
          for (let a = 0; a < sectionId.length; a++) {
            let i = 1
            let temp = []
            temp = this.departmentQuestionsList.filter(
              (p) => p.departmentId === sectionId[a]
            )
            temp.forEach((item) => {
              item.questionOrder = i
              i++
              departmentList.push(item)
            })
          }
          // 数据打包
          const qustionList = {
            organizationId: sessionStorage.getItem('loginOrganizationId'),
            startTime: this.time[0],
            endTime: this.time[1],
            generalQuestions: this.generalQuestions,
            questionsList: this.questionsList,
            maxDepartment: this.maxDepartment,
            departmentQuestionsList: departmentList,
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
    sendTo(qustionList) {
      this.$http
        .post('api/organization/interview/sign', qustionList)
        .then((res) => {
          if (res.data.code !== '00000')
            return this.$message.error('提交失败' + res.data.message)
          //成功提交退出编辑模式
          this.escEdit()
          this.$parent.exitEdit()
          return this.$message.success('提交成功')
        })
        .catch((err) => err)
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
        // margin: 20px 0;
        // display: flex;
        // flex-direction: column;
        .freeView-item {
          display: flex;
          align-items: center;
          .freeView-name-content {
            display: flex;
            margin: 10px 10px;
            width: 240px;
            margin-right: 20px;
            text-align: left;
            // overflow: hidden;
            // white-space: nowrap;
            // text-overflow: ellipsis;
            .freeView-name {
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              // white-space: pre-wrap;
            }
          }
          .freeView-input {
            border-radius: 5px;
            border: 1px solid #cecece;
            height: 18px;
            width: 166px;
          }
          .freeView-select {
            width: 167px;
            border-radius: 5px;
            border: 1px solid #cecece;
            height: 25px;
          }
          .remove-opacity {
            opacity: 0;
            cursor: auto;
          }
          i {
            cursor: pointer;
            align-self: start;
            margin-top: 14px;
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
input:focus {
  border: 1px solid #535858 !important;
  outline: none;
}
input {
  width: 166px !important;
  padding-left: 10px;
  box-sizing: border-box;
  height: 25px !important;
}
select:focus {
  outline: none;
  border: 1px solid #535858 !important;
}
.add-chose-button {
  width: 56px;
  height: 32px;
  font-size: 12px;
  border: 1px solid #dcdfe6;
  cursor: pointer;
  background: #fff;
  color: #606266;
  border-radius: 3px;
  text-align: center;
  line-height: 32px;
  &:hover {
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }
  // &:active {
  //   color: #3a8ee6;
  //   border-color: #3a8ee6;
  //   outline: 0;
  // }
}
.add-chose-button-active {
  color: #409eff !important;
  border-color: #c6e2ff !important;
  background-color: #ecf5ff !important;
}
// .show-propover-choose-item {
//     display: flex;
//     align-items: center;
//     margin: 10px 0;
//   }
// .show-propover-choose-item-title {
//   width: 50px;
// }
</style>
