<template>
  <div class="baseContent">
    <!-- 标题 -->
    <div class="baseTitle">
      <div class="mainTitle">报名表问题</div>
      <div class="inTitle">基本问题</div>
    </div>
    <div class="base-main">
      <!-- 必选问题 -->
      <div class="must">
        <div class="must-item" v-for="(must, index) in mustList" :key="index">
          <div class="must-star">*</div>
          <div class="must-name">{{ must.description }}</div>
          <div ><input type="text" class="must-input" /></div>
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
            class="el-icon-remove"
            style="color: #1597db"
            @click="item.isShow = !item.isShow"
          ></i>
          <span class="choose-name">{{ item.description }}</span>
          <input type="text" class="choose-input"/>
        </div>
      </div>
      <!-- 自定义问题展示 -->
      <div class="freeView-content">
        <!-- 自定义文本问题 -->
        <div class="freeView-title">自定义问题</div>
        <div
          class="freeView-item"
          v-for="(item1, i1) in textList"
          :key="'t' + i1"
        >
          <i
            class="el-icon-remove"
            style="color: #1597db"
            @click="removeTextChoose(item1)"
          ></i>
          <span class="freeView-name">{{ item1.description }}</span>
          <input type="text" class="freeView-input"/>
        </div>
        <!-- 自定义选择问题展示 -->
        <div
          class="freeView-item"
          v-for="(item2, i2) in chooseList"
          :key="'c' + i2"
        >
          <i
            class="el-icon-remove"
            style="color: #1597db"
            @click="removeChose(item2)"
          ></i>
          <span class="freeView-name">{{ item2.description }}</span>
          <select class="freeView-select">
            <option
              selected="selected"
              disabled="disabled"
              style="display: none"
              value=""
            ></option>
            <option
              v-for="(item3, index3) in item2.option"
              :key="'op' + index3"
              v-show="item3 != null"
            >
              {{ item3 }}
            </option>
          </select>
        </div>
      </div>
      <!-- 预设问题面板 -->
      <div class="yushe-content">
        <!-- 标题 -->
        <div class="yushe-title">预设问题</div>
        <!-- 预设问题内容 -->
        <div class="yushe-item-content">
          <div v-for="(item, i) in preList" :key="i">
            <div
              v-if="i < 7"
              :class="['yushe-item', item.isShow ? 'yushe-active' : '']"
              @click="item.isShow = !item.isShow"
            >
              {{ item.description }}
            </div>
          </div>
        </div>
        <!-- 自定义问题面板 -->
        <div class="zidingyi-content">
          <div class="zidingyi-tilte">自定义问题</div>
          <!-- 自定义文本 -->
          <el-popover placement="top" width="260" v-model="visible">
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
            ref="baseAddPopover"
            placement="top-start"
            width="300"
            v-model="visible1"
            style="margin-left: 30px"
            :popper-options="{
              boundariesElement: 'viewport',
              removeOnDestroy: true
            }"
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
      </div>
    </div>
  </div>
</template>

<script scoped>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      //最多三个自定义问题
      isAdd: 1,
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
          isShow: true,
          description: '班级'
        },
        {
          isShow: true,
          description: '学院'
        },
        {
          isShow: true,
          description: '专业'
        },
        {
          isShow: true,
          description: '性别'
        },
        {
          isShow: true,
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
      //自定义文本问题
      textList: [],
      //自定义选择题
      chooseList: []
    }
  },
  methods: {
    ...mapMutations('problem', [
      'updateGeneralQuestions',
      'updateQuestionsList'
    ]),
    //删除自定义文本问题
    removeTextChoose(item) {
      this.textList = this.textList.filter(
        (p) => p.description != item.description
      )
      this.isAdd--
    },
    //添加自定义文本问题
    addTextQues() {
      //判断自定义问题是否超过三个
      if (this.isAdd > 3) return this.$message.error('最多自定义三个问题')
      if (this.text == '') {
        return this.$message.error('问题不能为空')
      }
      //如果找不到这个问题
      if (!this.textList.find((p) => p.description === this.text)) {
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
        this.textList.push(que)
        this.isAdd++
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
      this.$refs.baseAddPopover.updatePopper()
    },
    addDomain() {
      if (this.form.domains.length === 4) {
        return this.$message.error('最多四个选项')
      }
      this.form.domains.push({
        value: ''
      })
      this.$refs.baseAddPopover.updatePopper()
    },
    //添加自定义选择
    addChoseList() {
      if (this.isAdd > 3) return this.$message.error('最多自定义三个问题')
      if (this.text1 == '') {
        return this.$message.error('问题不能为空')
      }
      for (let i = 0; i < this.form.domains.length; i++) {
        if (this.form.domains[i].value == '')
          return this.$message.error('选项不能为空')
      }
      //如果找不到这个问题 避免重复问题
      if (!this.chooseList.find((p) => p.description === this.text1)) {
        let que = {
          //不是单选
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
        this.chooseList.push(que)
        this.isAdd++
        this.visible1 = false
      } else {
        return this.$message.error('问题已存在')
      }
      //清空问题
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
    removeChose(item2) {
      this.chooseList = this.chooseList.filter(
        (p) => p.description != item2.description
      )
      this.isAdd--
    },
    packgeBaseQue() {
      let generalQuestions = [] //预设问题选择情况
      //过滤是否选中此预设问题
      this.preList
        .filter((p) => p.isShow)
        .forEach((p) => {
          generalQuestions.push(p.description)
        })
      let questionsList = [...this.textList, ...this.chooseList]
      this.updateGeneralQuestions(generalQuestions)
      this.updateQuestionsList(questionsList)
    }
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
    .mainTitle {
      display: flex;
      font-size: 30px;
      color: #989898;
    }
    .inTitle {
      margin-top: 30px;
      margin-left: 65px;
      display: flex;
      font-size: 20px;
    }
  }
  .base-main {
    margin-top: 30px;
    .must {
      display: flex;
      justify-content: space-between;

      .must-item {
        display: flex;
        width: 33%;
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
          margin-right: 5px;
        }
        .must-input {
           border-radius: 5px;
           border: 1px solid #0f2d2d;
        }
      }
    }
    .choose-item-content {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .choose-item {
        margin-top: 30px;
        width: 33.33%;
        display: flex;
        align-items: center;
        .choose-name {
          margin-left: 3px;
          margin-right: 5px;
          width: 30px;
        }
        .choose-input {
          margin-left: 2px;
          border-radius: 5px;
          border: 1px solid #0f2d2d;
        }
      }
    }
    .yushe-content {
      display: flex;
      flex-direction: column;
      margin-top: 26px;
      margin-left: 5px;
      width: 660px;
      height: 168px;
      margin-bottom: 30px;
      box-shadow: 4px 4px 8px 4px rgba(0, 0, 0, 0.2);
      padding: 5px 20px;
      .yushe-title {
        display: flex;
        align-items: center;
        font-size: 20px;
        margin-bottom: 30px;
      }
      .yushe-item-content {
        display: flex;
        align-items: center;
        .yushe-item {
          width: 50px;
          height: 25px;
          border: 1px solid #9e9e9e;
          border-radius: 5px;
          line-height: 25px;
          margin-right: 10px;
          cursor: pointer;
        }
        padding-bottom: 20px;
        border-bottom: 1px solid #efefef;
        .yushe-active {
          color: #9ed1ff !important;
          border: 2px solid #9ed1ff !important;
        }
      }
      .zidingyi-content {
        .form-chose {
          display: flex;
        }
        .my-input {
          margin: 10px 0;
        }
        display: flex;
        align-items: center;
        margin-top: 30px;
        .zidingyi-tilte {
          margin-right: 20px;
        }
        .base-add-botton {
          background: #1991ff;
          color: white;
        }
      }
    }
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
      .freeView-name {
        display: flex;
        margin: 10px 10px;
        width: 200px;
      }
      .freeView-input {
        border-radius: 5px;
        border: 1px solid #0f2d2d;
      }
      .freeView-select {
        width: 165.4px;
        border-radius: 5px;
        border: 1px solid #0f2d2d;
      }
    }
  }
}
</style>
