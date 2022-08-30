<template>
  <div class="information">
    <div class="title">
      <i class="el-icon-folder-opened"></i>
      <span> 宣传管理 </span>
    </div>
    <div class="content">
      <div class="left">
        <div class="leftTop">
          <div class="title"><h3>信息编辑</h3></div>
          <div class="baseInfoSubmit">
            <el-button type="primary" @click="submitSignData"> 保存 </el-button>
          </div>
        </div>
        <div class="leftEdit">
          <el-tabs v-model="activeTab" @tab-click="handleClick">
            <el-tab-pane label="基本信息" name="0">
              <div class="baseInfo">
                <have-title-vue title="组织头像"
                  ><div class="leftOrganizeImg">
                    <img :src="organizeInfo.avatarUrl" alt="" />
                    <div class="upload">
                      <el-button type="primary" @click="uploadPictrues">
                        上传组织头像
                      </el-button>
                      <input
                        style="display: none"
                        type="file"
                        id="file"
                        ref="file"
                        @click="
                          (e) => {
                            e.target.value = ''
                          }
                        "
                        @change="uploadFile"
                      />
                    </div></div
                ></have-title-vue>
                <have-title-vue title="组织名称">
                  <el-row class="organizeName">
                    <input
                      type="text"
                      v-model="organizeInfo.name"
                      class="nameInput"
                    />
                  </el-row>
                </have-title-vue>
                <have-title-vue title="组织属性">
                  <div class="organizeAttr">
                    <div class="required">
                      <div class="tagTitle">必选基本属性</div>
                      <el-select
                        v-model="organizeInfo.tag.tagA"
                        placeholder="请选择"
                        class="tag"
                      >
                        <el-option
                          label="校级组织"
                          value="校级组织"
                        ></el-option>
                        <el-option
                          label="院级组织"
                          value="院级组织"
                        ></el-option>
                        <el-option label="社团" value="社团"></el-option>
                      </el-select>
                      <el-select
                        v-model="organizeInfo.tag.tagB"
                        placeholder="请选择"
                        class="tag"
                      >
                        <el-option
                          label="思想政治"
                          value="思想政治"
                        ></el-option>
                        <el-option
                          label="学术科技"
                          value="学术科技"
                        ></el-option>
                        <el-option
                          label="文化体育"
                          value="文化体育"
                        ></el-option>
                        <el-option
                          label="创新创业"
                          value="创新创业"
                        ></el-option>
                        <el-option
                          label="志愿公益"
                          value="志愿公益"
                        ></el-option>
                        <el-option
                          label="自律互助"
                          value="自律互助"
                        ></el-option>
                      </el-select>
                    </div>
                    <div class="custom">
                      <div class="tagTitle">自定义属性</div>
                      <el-input
                        v-model="organizeInfo.tag.tagC"
                        placeholder="请输入自定义属性"
                        maxlength="4"
                        show-word-limit
                      ></el-input>
                      <el-input
                        v-model="organizeInfo.tag.tagD"
                        placeholder="请输入自定义属性"
                        maxlength="4"
                        class="two"
                        show-word-limit
                      ></el-input>
                    </div>
                  </div>
                </have-title-vue>
                <have-title-vue title="社团简介">
                  <div class="organizeDes">
                    <el-input
                      type="textarea"
                      placeholder="请输入社团简介"
                      v-model="organizeInfo.briefIntroduction"
                      maxlength="20"
                      show-word-limit
                      resize="none"
                    ></el-input>
                  </div>
                </have-title-vue>
                <!-- 留白 -->
                <div style="height: 40px"></div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="社团宣传" name="1">
              <have-title-vue title="社团介绍">
                <div class="text">
                  <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="填写你的社团介绍吧"
                    v-model="organizeInfo.introduction"
                    resize="none"
                  >
                  </el-input>
                  <img
                    src="../../../assets/img/img.png"
                    alt=""
                    class="img"
                    title="添加图片"
                    @click="uploadPictrues(1, 'introduction')"
                  />
                </div>
              </have-title-vue>
              <have-title-vue title="社团特色">
                <div class="text">
                  <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="填写你的社团特色吧"
                    v-model="organizeInfo.feature"
                    resize="none"
                  >
                  </el-input>
                  <img
                    src="../../../assets/img/img.png"
                    alt=""
                    class="img"
                    title="添加图片"
                    @click="uploadPictrues(1, 'feature')"
                  />
                </div>
              </have-title-vue>
              <have-title-vue title="社团日常">
                <div class="text">
                  <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="填写你的社团日常吧"
                    v-model="organizeInfo.daily"
                    resize="none"
                  >
                  </el-input>
                  <img
                    src="../../../assets/img/img.png"
                    alt=""
                    class="img"
                    title="添加图片"
                    @click="uploadPictrues(1, 'daily')"
                  />
                </div>
              </have-title-vue>
              <have-title-vue title="纳新宣言">
                <div class="text">
                  <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="填写你的纳新宣言吧"
                    v-model="organizeInfo.slogan"
                    resize="none"
                  >
                  </el-input>
                  <img
                    src="../../../assets/img/img.png"
                    alt=""
                    class="img"
                    title="添加图片"
                    @click="uploadPictrues(1, 'slogan')"
                  />
                </div>
              </have-title-vue>
              <have-title-vue title="联系方式">
                <div class="text">
                  <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="快填写社团的联系方式吧"
                    v-model="organizeInfo.contactInfo"
                    resize="none"
                    maxlength="200"
                    show-word-limit
                  >
                  </el-input>
                  <img
                    src="../../../assets/img/img.png"
                    alt=""
                    class="img"
                    title="添加图片"
                    @click="uploadPictrues(1, 'contactInfo')"
                  />
                </div>
              </have-title-vue>
              <have-title-vue title="更多" class="bottom">
                <div class="text">
                  <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="写下更多的寄语"
                    v-model="organizeInfo.more"
                    resize="none"
                  >
                  </el-input>
                  <img
                    src="../../../assets/img/img.png"
                    alt=""
                    class="img"
                    title="添加图片"
                    @click="uploadPictrues(1, 'more')"
                  />
                </div>
              </have-title-vue>
            </el-tab-pane>
            <el-tab-pane label="纳新部门" name="2">
              <div class="addDepartment">
                <el-button type="primary" @click="add = true"
                  >添加部门</el-button
                >
              </div>
              <div class="empty" v-if="isHaveDepart">
                <img src="../../../assets/img/empty.png" alt="" />
                <div class="text">暂无部门,请添加部门</div>
              </div>
              <div class="departmentList" v-else>
                <el-tabs
                  tab-position="left"
                  v-model="editableTabsValue"
                  closable
                  @tab-remove="deleteDepFun"
                >
                  <el-tab-pane
                    v-for="(item, index) in editableTabs"
                    :key="index"
                    :label="item.title"
                    :name="item.name"
                  >
                    <div class="departmentInfo">
                      <el-form
                        label-position="left"
                        label-width="80px"
                        :model="organizeInfo.departmentList[index]"
                      >
                        <el-form-item label="部门简介">
                          <el-input
                            v-model="
                              organizeInfo.departmentList[index]
                                .briefIntroduction
                            "
                            maxlength="25"
                            show-word-limit
                            style="width: 450px"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="部门介绍">
                          <div class="text" style="width: 600px">
                            <el-input
                              type="textarea"
                              :rows="4"
                              placeholder="填写你的社团介绍吧"
                              v-model="
                                organizeInfo.departmentList[index].introduction
                              "
                              resize="none"
                            >
                            </el-input>
                            <img
                              src="../../../assets/img/img.png"
                              alt=""
                              class="img"
                              title="添加图片"
                              @click="uploadPictrues(2, 'introduction')"
                            />
                          </div>
                        </el-form-item>
                        <el-form-item label="纳新标准">
                          <el-input
                            v-model="
                              organizeInfo.departmentList[index].standard
                            "
                            :rows="3"
                            type="textarea"
                            style="width: 600px"
                            placeholder="针对部门的纳新要求,如对技能点,对综合素质的要求说明"
                            maxlength="100"
                            show-word-limit
                            resize="none"
                          ></el-input>
                        </el-form-item>
                      </el-form>
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div class="right">
        <div class="rightPreview">
          <div class="baseInfo" v-if="activeTab === '0'">
            <div class="card">
              <div class="organize">
                <div class="organizeImg">
                  <img :src="organizeInfo.avatarUrl" alt="" />
                </div>
                <div class="organizeAttr">
                  <div class="organizeName">
                    {{ organizeInfo.name }}
                  </div>
                  <div class="organizeTags">
                    <div class="tag">{{ organizeInfo.tag.tagA }}</div>
                    <div class="tag">{{ organizeInfo.tag.tagB }}</div>
                    <div class="tag" v-if="tagC">
                      {{ organizeInfo.tag.tagC }}
                    </div>
                    <div class="tag" v-if="tagD">
                      {{ organizeInfo.tag.tagD }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="describe">
                {{ organizeInfo.briefIntroduction }}
              </div>
            </div>
          </div>
          <div class="organizeDrumbeating" v-if="activeTab === '1'">
            <div class="nav">
              <span class="active">社团介绍</span><span>社团部门</span>
            </div>
            <div class="sign_message">
              <sign-card-vue
                title="社团介绍"
                :content="organizeInfo.introduction"
                v-if="organizeInfo.introduction !== ''"
              ></sign-card-vue>
              <sign-card-vue
                title="社团特色"
                :content="organizeInfo.feature"
                v-if="organizeInfo.feature !== ''"
              ></sign-card-vue>
              <sign-card-vue
                title="社团日常"
                :content="organizeInfo.daily"
                v-if="organizeInfo.daily !== ''"
              ></sign-card-vue>
              <sign-card-vue
                title="社团宣言"
                :content="organizeInfo.slogan"
                v-if="organizeInfo.slogan !== ''"
              ></sign-card-vue>
              <sign-card-vue
                title="联系方式"
                :content="organizeInfo.contactInfo"
                v-if="organizeInfo.contactInfo !== ''"
              ></sign-card-vue>
              <sign-card-vue
                title="更多"
                :content="organizeInfo.more"
                v-if="organizeInfo.more !== ''"
              ></sign-card-vue>
              <div style="height: 30px"></div>
            </div>
          </div>
          <div class="department" v-if="activeTab === '2'">
            <div class="list" v-if="isList">
              <div class="nav">
                <span>社团介绍</span><span class="active">社团部门</span>
              </div>
              <div
                class="depList"
                v-for="(item, index) in organizeInfo.departmentList"
                :key="index"
              >
                <div class="departmentCard" @click="toDepDetail(index)">
                  <div class="info">
                    <div class="title">{{ item.name }}</div>
                    <div class="describe van-ellipsis">
                      {{ item.briefIntroduction }}
                    </div>
                  </div>
                  <div class="icon">
                    <i class="el-icon-arrow-right"></i>
                  </div>
                </div>
              </div>
            </div>

            <div class="departmentDetail" v-else>
              <div class="headNav" @click="isList = true">
                <i class="el-icon-arrow-left"></i>
                <span>返回</span>
              </div>
              <sign-card-vue
                title="部门介绍"
                :content="activeDep.introduction || ''"
              ></sign-card-vue>
              <sign-card-vue
                title="纳新标准"
                :content="activeDep.standard || ''"
              ></sign-card-vue>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="添加部门" :visible.sync="add" width="30%">
      <el-input v-model="addDepName" placeholder="请输入部门名称"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog">取 消</el-button>
        <el-button type="primary" @click="confirmDialog">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 删除部门的弹窗 -->
    <el-dialog :visible.sync="deleteDep" width="30%" class="deleteDep">
      <div class="error">
        <img src="../../../assets/img/error.png" alt="" />
      </div>
      <span>部门删除后，相应信息也会删除，是否确认删除</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDep = false">取 消</el-button>
        <el-button type="primary" @click="confirmDeleDep">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import haveTitleVue from './haveTitle.vue'
import * as qiniu from 'qiniu-js'

import signCardVue from './signCard.vue'
export default {
  data() {
    return {
      activeTab: '0',
      organizeInfo: {
        userId: sessionStorage.getItem('studentId'),
        organizationId: sessionStorage.getItem('loginOrganizationId'),
        avatarUrl: '',
        name: '',
        tag: {
          tagA: '',
          tagB: '',
          tagC: '',
          tagD: ''
        },
        briefIntroduction: '',
        introduction: '',
        feature: '',
        daily: '',
        slogan: '',
        contactInfo: '',
        more: '',
        departmentList: []
      },
      // 七牛云上传所需
      token: '',
      QINIU_BASE_PATH: 'https://file.sipc.yuleng.top',
      // 测试数据
      editableTabsValue: '1',
      editableTabs: [],
      add: false,
      addDepName: '',
      isList: true,
      activeDep: {},
      active: '',
      num: 1,
      deleteDep: false,
      targetName: 0
    }
  },
  components: {
    haveTitleVue,
    signCardVue
  },
  methods: {
    handleClick(e) {
      this.activeTab = e.index
    },
    async getOrganizeDate() {
      const { data: res } = await this.$http.get(
        '/api/organization/information',
        {
          organizationId: sessionStorage.getItem('loginOrganizationId'),
          userId: sessionStorage.getItem('studentId')
        }
      )
      if (res.code !== '00000') {
        return this.$message(res.message)
      }
      this.organizeInfo.avatarUrl = res.data.avatarUrl || ''
      this.organizeInfo.name = res.data.name
      this.organizeInfo.tag = res.data.tag || {
        tagA: '校级组织',
        tagB: '创新创业',
        tagC: '',
        tagD: ''
      }
      this.organizeInfo.briefIntroduction = res.data.briefIntroduction || ''
      this.organizeInfo.introduction = res.data.introduction || ''
      this.organizeInfo.feature = res.data.feature || ''
      this.organizeInfo.daily = res.data.daily || ''
      this.organizeInfo.slogan = res.data.slogan || ''
      this.organizeInfo.contactInfo = res.data.contactInfo || ''
      this.organizeInfo.more = res.data.more || ''
      this.organizeInfo.departmentList = res.data.departmentList || []
      res.data.departmentList.forEach((item, index) => {
        console.log(index)
        this.editableTabs.push({
          title: item.name,
          name: index + 1 + ''
        })
      })
    },
    async getQiniuToken() {
      const { data: res } = await this.$http.get('/myApi/getConfig')
      if (res.code !== '00000') {
        return this.$message(res.data.msg)
      }
      this.token = res.data.token
      sessionStorage.setItem('qiniuToken', this.token)
    },
    uploadPictrues(num, active) {
      this.active = active
      this.num = num
      this.$refs.file.dispatchEvent(new MouseEvent('click'))
    },
    // 上传到七牛云 - 具体实例
    async uploadFile() {
      const file = this.$refs.file.files[0]
      console.log(file)
      this.uploadToQiniu(file).then((res) => {
        const { key } = res // key是从七牛云服务返回的文件名字
        this.url = this.QINIU_BASE_PATH + '/' + key
        console.log(this.url)
        // 判断是否是头像上传
        if (this.active !== '' && this.active !== undefined) {
          console.log('active', this.active)
          // 判断是社团宣传图片上传还是纳新部门图片上传
          if (this.num === 1) {
            if (this.organizeInfo[this.active] === '') {
              this.organizeInfo[this.active] += `![](${this.url})\n`
            } else {
              this.organizeInfo[this.active] += `\n![](${this.url})\n`
            }
          } else {
            if (
              this.organizeInfo.departmentList[this.editableTabsValue]
                .introduction === ''
            ) {
              this.organizeInfo.departmentList[
                this.editableTabsValue - 1
              ].introduction += `![](${this.url})\n`
            } else {
              this.organizeInfo.departmentList[
                this.editableTabsValue - 1
              ].introduction += `\n![](${this.url})\n`
            }
          }
        } else {
          this.organizeInfo.avatarUrl = this.url
        }
        this.active = ''
        this.num = 0
      })
    },
    uploadToQiniu(file, putExtra = {}, key = undefined) {
      const token = this.token
      // 七牛云的一些配置，region需要根据你的空间地区来选择，像我这里z1表示华北地区
      const config = {
        useCdnDomain: true,
        region: qiniu.region.z1
      }
      const observable = qiniu.upload(file, key, token, putExtra, config)
      return new Promise((resolve, reject) => {
        observable.subscribe(this.handleCallback(resolve, reject))
      })
    },
    handleCallback(resolve, reject) {
      return {
        next(res) {
          console.log(res)
        },
        error(error) {
          reject(error)
        },
        complete(res) {
          resolve(res)
        }
      }
    },
    // tab页面
    addTab(titleName) {
      let length = this.editableTabs.length
      let newTabName = ++length + ''
      console.log(titleName)
      this.editableTabs.push({
        title: titleName + '',
        name: newTabName
      })
      this.organizeInfo.departmentList.push({
        name: titleName,
        briefIntroduction: '这是一个很好的部门',
        introduction: '',
        standard: ''
      })
      this.editableTabsValue = newTabName
    },
    deleteDepFun(targetName) {
      this.deleteDep = true
      this.targetName = targetName
      console.log(targetName)
    },
    removeTab(targetName) {
      let tabs = this.editableTabs
      let activeName = this.editableTabsValue
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }
      this.organizeInfo.departmentList.splice(targetName - 1, 1)
      console.log(this.organizeInfo.departmentList)
      this.editableTabsValue = activeName
      this.editableTabs = tabs.filter((tab) => tab.name !== targetName)
    },
    cancelDialog() {
      this.addDepName = ''
      this.add = false
    },
    confirmDialog() {
      if (this.addDepName === '') {
        return
      }
      this.addTab(this.addDepName)
      this.addDepName = ''
      this.add = false
      console.log(1)
    },
    confirmDeleDep() {
      this.removeTab(this.targetName)
      console.log(2, this.targetName)
      this.deleteDep = false
    },
    toDepDetail(index) {
      this.isList = false
      this.activeDep = this.organizeInfo.departmentList[index]
      console.log(this.organizeInfo.departmentList[index])
    },
    async submitSignData() {
      const { data: res } = await this.$http.post(
        '/api/organization/information',
        this.organizeInfo
      )
      if (res.code !== '00000') {
        return this.$message.error(res.message)
      }
      this.$message.success('保存成功')
    }
  },
  created() {
    this.getQiniuToken()
    this.getOrganizeDate()
  },
  computed: {
    tagC() {
      if (
        this.organizeInfo.tag.tagC === null ||
        this.organizeInfo.tag.tagC === ''
      ) {
        return false
      } else {
        return true
      }
    },
    tagD() {
      if (
        this.organizeInfo.tag.tagD === null ||
        this.organizeInfo.tag.tagD === ''
      ) {
        return false
      } else {
        return true
      }
    },
    isHaveDepart() {
      if (this.organizeInfo.departmentList.length == 0) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  text-align: left;
}
.information {
  height: 100%;
}
.content {
  height: 91%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.bottom {
  padding-bottom: 20px;
}
.el-tabs {
  overflow: hidden;
}
.left {
  height: 100%;
  flex: 1;
  text-align: left;
  .leftEdit {
    margin-top: 10px;
    height: 100%;
    background-color: #fff;
    border-radius: 10px;
    ::v-deep .el-tabs__content {
      height: calc(100% - 40px);
      overflow: scroll;
      // 隐藏滚动条
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none; /* Chrome Safari */
      }
    }
    .baseInfo {
      .leftOrganizeImg {
        display: flex;
        align-items: flex-end;
        margin-left: 30px;
        margin-top: 20px;
        img {
          height: 100px;
          width: 100px;
          border: 1px dashed #1890ff;
          padding: 15px;
        }
        .upload {
          margin-left: 20px;
        }
      }
    }
    .addDepartment {
      margin-left: 40px;
    }
  }
  #pane-2 {
    height: 90%;
    .empty {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      height: 100%;
      img {
        height: 100px;
      }
      .text {
        margin-top: 10px;
        font-size: 16px;
        font-weight: 500;
      }
    }
  }
  .departmentList {
    height: 100% !important;
    ::v-deep .el-tabs {
      height: 80%;
      margin-top: 30px;
      .el-tabs__nav-scroll {
        padding-left: 0px;
      }
    }
  }
  .title {
    margin-left: 20px;
    margin-top: 10px;
  }
}
.haveTitleCard {
  margin-top: 10px;
  .organizeName {
    margin-top: 20px;
    display: flex;
    .el-button--primary {
      margin-left: 40px;
    }
  }
  .organizeAttr {
    margin-top: 20px;
    .required {
      display: flex;
      justify-content: start;
      align-items: center;
    }
    .custom {
      display: flex;
      justify-content: start;
      align-items: center;
      margin-top: 20px;
      ::v-deep .el-input {
        width: 200px;
        margin-left: 56px;
      }
      .two {
        margin-left: 40px;
      }
    }
    .tag {
      width: 200px;
      margin-left: 40px;
    }
    .tagTitle {
      margin-left: 40px;
      font-weight: 600;
    }
  }
  .organizeDes {
    width: 80%;
    margin: 10px 0 0px 40px;
  }
  .text {
    width: 80%;
    margin-left: 40px;
    margin-top: 10px;
    margin-bottom: 20px;
  }
}
.leftOrganizeName {
  height: 100px;
}
.right {
  height: 94vh;
  margin-left: 40px;
  margin-top: 24px;
  transform: translateY(-20px);
  display: flex;
  align-items: center;
  .rightPreview {
    height: 713px;
    margin-top: 10px;
    background: url(../../../assets/img/iPhone13.png);
    background-repeat: no-repeat;
    background-size: cover;
    width: 354px;
    margin-right: 1vw;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    .baseInfo {
      width: 91%;
      height: 84%;
      .card {
        height: 90px;
        width: 96%;
        margin: 0 auto;
        background-color: #f8f8f8;
        border-radius: 20px;
        margin-top: 48px;
        border: 2px solid #e8e8e8;
        box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        .organize {
          margin: 15px 0 0 10px;
          display: flex;
          .organizeAttr {
            margin-left: 5px;
          }
          .organizeName {
            font-weight: 600;
            text-align: left;
          }
          .organizeTags {
            display: flex;
            margin-top: 6px;
            .tag {
              font-size: 11px;
              border: 1px solid #1890ff;
              color: #1890ff;
              border-radius: 14px;
              padding: 2px;
              margin-right: 5px;
            }
          }
        }
        .describe {
          font-size: 11px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          width: 90%;
          margin: 3px auto 0;
          text-align: left;
        }
        img {
          height: 50px;
          min-height: 35px;
          min-width: 35px;
          border-radius: 10px;
        }
      }
    }
    .organizeDrumbeating {
      width: 91%;
      height: 84%;
      background-color: #f8f8f8;
      text-align: left;

      .sign_message {
        width: 90%;
        height: calc(100% - 52px);
        margin: 0 auto;
        padding-bottom: 30px;
        overflow: scroll;
        // 隐藏滚动条
        scrollbar-width: none;
        &::-webkit-scrollbar {
          display: none; /* Chrome Safari */
        }
        .sign_details {
          margin-top: 10px;
        }
      }
    }
    .nav {
      height: 44px;
      width: 90%;
      margin: 0 auto;
      margin-top: 10px;
      background-color: #fff;
      display: flex;
      align-items: flex-end;
      justify-content: space-around;
      span {
        border-bottom: 3px solid transparent;
        padding-bottom: 5px;
      }
      .active {
        border-bottom: 3px solid #096dd9;
      }
    }
    .department {
      width: 91%;
      height: 84%;
      background-color: #f8f8f8;
      text-align: left;
    }
  }
  .depList {
    width: 90%;
    margin: 20px auto 0;
    .departmentCard {
      width: 100%;
      height: 70px;
      margin-top: 10px;
      margin-bottom: 10px;
      background-color: #fff;
      border-radius: 8px;
      display: flex;
      align-items: center;
      cursor: pointer;
      .info {
        width: 90%;
        margin-left: 10px;
        .title {
          color: #2c405a;
          font-weight: 600;
          margin-bottom: 5px;
        }
        .describe {
          color: #3f536e;
          font-size: 12px;
          letter-spacing: 2px;
        }
      }
    }
  }
  .departmentDetail {
    .headNav {
      margin-top: 10px;
      margin-left: 10px;
      cursor: pointer;
      span {
        margin-left: 10px;
      }
    }
    .sign_details {
      width: 90%;
      margin: 0 auto;
      margin-top: 20px;
    }
  }
}
.van-ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
::v-deep .el-tabs__nav-scroll {
  padding-left: 36px;
}
::v-deep .el-tabs {
  height: 100%;
}
.upload {
  border: 1px;
}
::v-deep .el-main {
  text-align: left;
}

.nameInput {
  border: 1px solid #1890ff;
  font-size: 18px;
  font-weight: 600;
  width: 300px;
  text-align: center;
  height: 38px;
  border-radius: 5px;
  margin-left: 30px;
}
.leftTop {
  display: flex;
  justify-content: space-between;
}
.baseInfoSubmit {
  .el-button {
    width: 100px;
  }
}
.text {
  position: relative;
  .img {
    position: absolute;
    right: 22px;
    bottom: 20px;
    height: 20px;
    width: 20px;
    cursor: pointer;
  }
}
.el-dialog {
  display: flex;
}
.deleteDep {
  ::v-deep .el-dialog__body {
    display: flex;
    align-items: center;
    .error {
      margin-right: 20px;
    }
  }
}
</style>
