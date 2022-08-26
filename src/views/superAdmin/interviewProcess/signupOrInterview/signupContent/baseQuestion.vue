<template>
  <div class="baseContent">
    <!-- 标题 -->
    <div class="baseTitle">
      <div class="mainTitle">
        <div class="mainTitle-left">报名表问题</div>
      </div>
      <div :class="['inTitle', !isEdit ? 'inTitle-noEdit' : '']" ref="basePage">
        基本问题
      </div>
    </div>
    <div class="base-main">
      <!-- 预设问题面板 -->
      <div class="yushe-content" v-show="isEdit">
        <!-- 标题 -->
        <div class="yushe-title">预设问题</div>
        <!-- 预设问题内容 -->
        <div class="yushe-item-content">
          <div v-for="(item, i) in preList" :key="i">
            <div
              v-if="i < 7"
              :class="['yushe-item', item.isShow ? 'yushe-active' : '']"
              @click="yusheIsshow(item)"
            >
              {{ item.description }}
            </div>
          </div>
        </div>
      </div>
      <!-- 必选问题 -->
      <div class="must">
        <div class="must-item" v-for="(must, index) in mustList" :key="index">
          <div class="must-star">*</div>
          <div class="must-name">{{ must.description }}</div>
          <div><input type="text" class="must-input" /></div>
        </div>
      </div>
      <!-- 可选问题 -->
      <div class="choose-item-content">
        <!-- 预设问题 -->
        <div
          class="choose-item"
          v-for="(item, i) in preList"
          :key="i"
          v-show="item.isShow"
        >
          <i
            :class="['el-icon-remove', !isEdit ? 'remove-opacity' : '']"
            style="color: #1597db"
            @click="removeYushe(item)"
          ></i>
          <span class="choose-name">{{ item.description }}</span>
          <input type="text" class="choose-input" />
        </div>
      </div>
      <!-- 自定义问题展示 -->
      <div class="freeView-content">
        <!-- 自定义问题面板 -->
        <div
          :class="[!isEdit ? 'zidingyi-content-noEdit' : 'zidingyi-content']"
        >
          <div class="zidingyi-tilte" style="font-size: 20px">自定义问题</div>
          <!-- 自定义文本 -->
          <el-popover
            placement="top"
            width="260"
            v-model="visible"
            ref="baseTestPopover"
            v-show="isEdit"
          >
            <p>添加自定义问题描述</p>
            <div class="my-input" style="margin: 10px 0">
              <el-input
                type="text"
                placeholder="请输入内容"
                v-model="text"
                maxlength="10"
                show-word-limit
              >
              </el-input>
            </div>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="visible = false"
                >取消</el-button
              >
              <el-button type="primary" size="mini" @click="addTextQues()"
                >确定</el-button
              >
            </div>
            <el-button
              slot="reference"
              class="base-add-botton"
              style="line-height: 5px"
              >自定义填空</el-button
            >
          </el-popover>
          <!-- 自定义选择 -->
          <el-popover
            ref="baseChoosePopover"
            placement="top-start"
            width="300"
            v-model="visible1"
            style="margin-left: 30px"
            :popper-options="{
              boundariesElement: 'viewport',
              removeOnDestroy: true
            }"
            v-show="isEdit"
          >
            <p>添加自定义问题描述</p>
            <el-input
              type="text"
              placeholder="请输入问题上限10个字"
              v-model="text1"
              maxlength="10"
              show-word-limit
              style="margin: 10px 0"
            >
            </el-input>
            <!-- 选项收集 -->
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
                    maxlength="10"
                  ></el-input
                  ><el-button @click.prevent="removeDomain(domain)"
                    >删除</el-button
                  >
                </div>
              </el-form-item>
              <el-button @click="addDomain">添加选项</el-button>
            </el-form>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="visible1 = false"
                >取消</el-button
              >
              <el-button type="primary" size="mini" @click="addChoseList()"
                >确定</el-button
              >
            </div>
            <el-button
              slot="reference"
              class="base-add-botton"
              style="line-height: 5px"
              >自定义选择</el-button
            >
          </el-popover>
        </div>
        <div
          class="freeView-item"
          v-for="(item1, i1) in BaseList"
          :key="'t' + i1"
        >
          <i
            :class="['el-icon-remove', !isEdit ? 'remove-opacity' : '']"
            style="color: #1597db"
            @click="removeChoose(item1)"
          ></i>
          <span class="freeView-name">{{ item1.description }}</span>
          <!-- 选择or文字 -->
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
          <input type="text" v-if="!item1.selection" class="freeView-input" />
        </div>
      </div>
    </div>
  </div>
</template>

<script scoped>
import { mapMutations, mapState } from 'vuex'
export default {
  mounted() {
    window.addEventListener('scroll', this.basePage, true)
  },
  props: ['allQues'],
  data() {
    return {
      //isAdd: 1,
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
      },
      //文本问题
      text: '',
      //选择问题描述
      text1: '',
      //自定义文本是否显示
      visible: false,
      //自定义选择是否显示
      visible1: false,
      //必填项
      mustList: [
        {
          isShow: true,
          description: '姓名'
        },
        {
          isShow: true,
          description: '学号'
        },
        {
          isShow: true,
          description: '电话'
        }
      ],
      //预设问题
      preList: [
        {
          isShow: false,
          description: '班级'
        },
        {
          isShow: false,
          description: '学院'
        },
        {
          isShow: false,
          description: '专业'
        },
        {
          isShow: false,
          description: '性别'
        },
        {
          isShow: false,
          description: 'QQ'
        },
        {
          isShow: false,
          description: '生日'
        },
        {
          isShow: false,
          description: '身高'
        }
      ],
      //自定义问题
      BaseList: []
    }
  },
  methods: {
    ...mapMutations('problem', [
      'updateGeneralQuestions',
      'updateQuestionsList',
      'updateIsEdit',
      'removeQuestionsListItem'
    ]),
    basePage() {
      // console.log('基本问题', this.$refs.basePage.getBoundingClientRect().top)
      if (
        this.$refs.basePage.getBoundingClientRect().top >= 84 &&
        this.$refs.basePage.getBoundingClientRect().top <= 315
      ) {
        this.$parent.showBase()
      }
      if (
        this.$refs.basePage.getBoundingClientRect().top > 315 &&
        this.$refs.basePage.getBoundingClientRect().top <= 514
      ) {
        this.$parent.showTime()
      }
    },
    // 预设问题展示
    yusheIsshow(item) {
      if (!this.isEdit) return this.$message.error('非编辑模式')
      item.isShow = !item.isShow
      let generalQuestions = []
      this.preList
        .filter((p) => p.isShow)
        .forEach((p) => {
          generalQuestions.push(p.description)
        })
      this.updateGeneralQuestions(generalQuestions)
    },
    // 删除预设问题
    removeYushe(item) {
      if (!this.isEdit) return
      item.isShow = !item.isShow
      let generalQuestions = []
      this.preList
        .filter((p) => p.isShow)
        .forEach((p) => {
          generalQuestions.push(p.description)
        })
      this.updateGeneralQuestions(generalQuestions)
    },
    //删除自定义问题
    removeChoose(item) {
      if (!this.isEdit) return
      this.BaseList = this.BaseList.filter(
        (p) => p.description != item.description
      )
      this.removeQuestionsListItem(item)
      // this.isAdd--
    },
    //添加自定义文本问题
    addTextQues() {
      // if (!this.isEdit) return this.$message.error('非编辑模式')
      //判断自定义问题是否超过三个
      if (this.BaseList.length >= 3)
        return this.$message.error('最多自定义三个问题')
      if (this.text == '') {
        return this.$message.error('问题不能为空')
      }
      //如果找不到这个问题
      if (!this.BaseList.find((p) => p.description === this.text)) {
        let que = {
          //不是单选
          selection: false,
          description: this.text,
          option: {
            a: null,
            b: null,
            c: null,
            d: null
          }
        }
        this.BaseList.push(que)
        this.updateQuestionsList(this.BaseList)
        // this.isAdd++
        this.text = ''
        //只有成功提交才会关闭这个添加框
        this.visible = false
      } else {
        return this.$message.error('问题已存在')
      }
      //清空问题
      this.text = ''
    },
    //动态增减选项
    removeDomain(item) {
      if (this.form.domains.length === 2) {
        return this.$message.error('最少两个选项')
      }
      var index = this.form.domains.indexOf(item)
      if (index !== -1) {
        this.form.domains.splice(index, 1)
      }
      this.$refs.baseChoosePopover.updatePopper()
    },
    addDomain() {
      if (this.form.domains.length === 4) {
        return this.$message.error('最多四个选项')
      }
      this.form.domains.push({
        value: ''
      })
      this.$refs.baseChoosePopover.updatePopper()
    },
    //添加自定义选择
    addChoseList() {
      // if (!this.isEdit) return this.$message.error('非编辑模式')
      if (this.isEdit == false) return this.$message.error('非编辑模式')
      if (this.BaseList.length >= 3)
        return this.$message.error('最多自定义三个问题')
      if (this.text1 == '') {
        return this.$message.error('问题不能为空')
      }
      for (let i = 0; i < this.form.domains.length; i++) {
        if (this.form.domains[i].value == '')
          return this.$message.error('选项不能为空')
      }
      //如果找不到这个问题 避免重复问题
      if (!this.BaseList.find((p) => p.description === this.text1)) {
        let que = {
          //是单选
          selection: true,
          description: this.text1
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
        this.BaseList.push(que)
        this.updateQuestionsList(this.BaseList)
        // this.isAdd++
        this.visible1 = false
      } else {
        return this.$message.error('问题已存在')
      }
      //添加清空问题
      this.text1 = ''
      this.form.domains = [
        {
          value: ''
        },
        {
          value: ''
        }
      ]
    },
    // packgeBaseQue() {
    //   let generalQuestions = [] //预设问题选择情况
    //   //过滤是否选中此预设问题
    //   this.preList
    //     .filter((p) => p.isShow)
    //     .forEach((p) => {
    //       generalQuestions.push(p.description)
    //     })
    //   let questionsList = this.BaseList
    //   // 给问题排序
    //   let i = 1
    //   questionsList.forEach((p) => {
    //     p.questionOrder = i
    //     i++
    //   })
    //   // vuex存储
    //   this.updateGeneralQuestions(generalQuestions)
    //   this.updateQuestionsList(questionsList)
    // },
    escEdit() {
      this.isEdit = false
    }
  },
  watch: {
    visible(newV) {
      if (newV && !this.isEdit) {
        this.visible = false
        this.$refs.baseTestPopover.doClose()
        return this.$message.error('非编辑模式')
      }
    },
    visible1(newV) {
      if (newV && !this.isEdit) {
        this.visible1 = false
        this.$refs.baseChoosePopover.doClose()
        return this.$message.error('非编辑模式')
      }
    },
    //检测用户是否设置过问题
    allQues(newV) {
      if (newV.questionsList.length != 0) {
        this.BaseList = newV.questionsList
        this.updateQuestionsList(newV.questionsList)
      }
      if (newV.generalQuestions.length != 0) {
        this.updateGeneralQuestions(newV.generalQuestions)
        // this.preList.forEach((p) => {
        //   p.isShow = false
        // })
        for (let i = 0; i < newV.generalQuestions.length; i++) {
          this.preList.forEach((p) => {
            if (p.description == newV.generalQuestions[i]) {
              p.isShow = true
            }
          })
        }
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.basePage, true)
  },
  computed: {
    ...mapState('problem', ['isEdit'])
  }
}
</script>

<style lang="less" scoped>
.baseContent {
  min-width: 900px;
  .baseTitle {
    margin-top: 10px;
    color: #9e9e9e;
    display: flex;
    flex-direction: column;
    .inTitle-noEdit {
      margin-bottom: 20px;
    }
    .mainTitle {
      display: flex;
      font-size: 30px;
      justify-content: space-between;
      color: #989898;
      .mainTitle-right {
        cursor: pointer;
        color: #67b5fe;
        font-size: 20px;
        margin-right: 40px;
        margin-top: 10px;
      }
    }
    .inTitle {
      margin-top: 20px;
      // margin-left: 29px;
      display: flex;
      font-size: 26px;
    }
  }
  .base-main {
    // margin-top: 30px;
    .must {
      display: flex;
      justify-content: space-between;
      margin: 0 40px;
      .must-item {
        display: flex;
        width: 33.33%;
        align-items: center;
        .must-star {
          color: red;
          font-size: 18px;
          margin-right: 5px;
          margin-left: 5px;
        }
        .must-name {
          width: 30px;
          margin-left: 3px;
          margin-right: 6px;
          font-size: 17px;
        }
        .must-input {
          width: 182px;
          border-radius: 5px;
          border: 1px solid #cecece;
          margin-left: 5px;
        }
      }
    }
    .choose-item-content {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      margin: 0 40px;
      .choose-item {
        margin-top: 30px;
        width: 33.33%;
        display: flex;
        align-items: center;
        i {
          cursor: pointer;
        }
        .choose-name {
          margin-left: 3px;
          margin-right: 5px;
          width: 30px;
          font-size: 17px;
        }
        .choose-input {
          margin-left: 6px;
          width: 182px;
          border-radius: 5px;
          border: 1px solid #cecece;
        }
        .remove-opacity {
          opacity: 0;
          cursor: auto;
        }
      }
    }
    .yushe-content {
      display: flex;
      flex-direction: column;
      margin-top: 26px;
      margin-left: -9px;
      width: 640px;
      height: 110px;
      margin-bottom: 30px;
      // box-shadow: 4px 4px 8px 4px rgba(0, 0, 0, 0.2);
      padding: 5px 20px;
      border-radius: 6px;
      .yushe-title {
        display: flex;
        align-items: center;
        font-size: 20px;
        margin-bottom: 15px;
        margin-left: 35px;
        // margin-top: 14px;
      }
    }
    .yushe-item-content {
      display: flex;
      align-items: center;
      margin-top: 10px;
      margin-left: 50px;
      width: 560px;
      .yushe-item {
        width: 60px;
        height: 30px;
        border: 1px solid #9e9e9e;
        border-radius: 5px;
        line-height: 30px;
        margin-right: 15px;
        cursor: pointer;
        font-size: 17px;
      }
      padding-bottom: 20px;
      border-bottom: 1px solid #666262;
      .yushe-active {
        color: #67b5fe !important;
        border: 1px solid #67b5fe !important;
      }
    }
    .zidingyi-content {
      margin-left: 31px;
      margin-bottom: 20px;
      border-bottom: 1px solid #666262;
      padding-bottom: 20px;
      width: 560px;
      .form-chose {
        display: flex;
      }
      .my-input {
        margin: 10px 0;
        width: 182px;
      }
      display: flex;
      align-items: center;
      margin-top: 15px;
      .zidingyi-tilte {
        margin-right: 20px;
        font-size: 18px;
      }
      .base-add-botton {
        background: #1991ff;
        color: white;
        margin-left: 16px;
      }
    }
    .zidingyi-content-noEdit {
      margin-left: 31px;
      margin-bottom: 20px;
      // padding-bottom: 20px;
      width: 560px;
      display: flex;
      align-items: center;
      margin-top: 15px;
    }
  }
  .freeView-content {
    .freeView-title {
      display: flex;
      font-size: 26px;
      color: #989898;
      margin-left: 29px;
      margin-bottom: 16px;
      margin-top: 20px;
    }
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    .freeView-item {
      display: flex;
      align-items: center;
      margin-left: 34px;
      i {
        cursor: pointer;
      }
      .remove-opacity {
        opacity: 0;
        cursor: auto;
      }
    }
    .freeView-name {
      display: flex;
      margin: 10px 10px;
      width: 185px;
      font-size: 17px;
      margin-left: 3px;
    }
    .freeView-input {
      width: 166px;
      border-radius: 5px;
      border: 1px solid #cecece;
      height: 25px !important;
    }
    .freeView-select {
      width: 166px;
      height: 25px;
      border-radius: 5px;
      border: 1px solid #cecece;
    }
  }
}
input:focus {
  border: 1px solid #535858 !important;
  outline: none;
}
input {
  width: 166px;
  padding-left: 10px;
  box-sizing: border-box;
  height: 25px !important;
}
select:focus {
  outline: none;
  border: 1px solid #535858 !important;
}
</style>
