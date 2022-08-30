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
            <el-button type="primary"> 保存 </el-button>
          </div>
        </div>
        <div class="leftEdit">
          <el-tabs v-model="activeTab" @tab-click="handleClick">
            <el-tab-pane label="基本信息" name="0">
              <div class="baseInfo">
                <have-title-vue title="组织头像"
                  ><div class="leftOrganizeImg">
                    <img :src="organizeInfo.organizeImg" alt="" />
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
                      v-model="organizeInfo.organizeName"
                      class="nameInput"
                    />
                    <el-button type="primary">修改</el-button>
                  </el-row>
                </have-title-vue>
                <have-title-vue title="组织属性">
                  <div class="organizeAttr">
                    <div class="required">
                      <div class="tagTitle">必选基本属性</div>
                      <el-select
                        v-model="organizeInfo.tags.tagA"
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
                        v-model="organizeInfo.tags.tagB"
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
                        v-model="organizeInfo.tags.tagC"
                        placeholder="请输入自定义属性"
                        maxlength="4"
                        show-word-limit
                      ></el-input>
                      <el-input
                        v-model="organizeInfo.tags.tagD"
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
                      v-model="organizeInfo.describe"
                      maxlength="20"
                      show-word-limit
                    ></el-input>
                  </div>
                </have-title-vue>
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
                    @click="uploadPictrues('introduction')"
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
                    @click="uploadPictrues('feature')"
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
                    @click="uploadPictrues('daily')"
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
                    @click="uploadPictrues('slogan')"
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
                    @click="uploadPictrues('contactInfo')"
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
                    @click="uploadPictrues('more')"
                  />
                </div>
              </have-title-vue>
            </el-tab-pane>
            <el-tab-pane label="纳新部门" name="2">纳新部门</el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div class="right">
        <div class="rightPreview">
          <div class="baseInfo" v-if="activeTab === '0'">
            <div class="card">
              <div class="organize">
                <div class="organizeImg">
                  <img :src="organizeInfo.organizeImg" alt="" />
                </div>
                <div class="organizeAttr">
                  <div class="organizeName">
                    {{ organizeInfo.organizeName }}
                  </div>
                  <div class="organizeTags">
                    <div class="tag">{{ organizeInfo.tags.tagA }}</div>
                    <div class="tag">{{ organizeInfo.tags.tagB }}</div>
                    <div class="tag" v-if="tagC">
                      {{ organizeInfo.tags.tagC }}
                    </div>
                    <div class="tag" v-if="tagD">
                      {{ organizeInfo.tags.tagD }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="describe">
                {{ organizeInfo.describe }}
              </div>
            </div>
          </div>
          <div class="organizeDrumbeating" v-if="activeTab === '1'">
            <div class="nav">
              <span class="active">社团介绍</span><span>社团部门</span>
            </div>
            <div class="sign_message"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import haveTitleVue from './haveTitle.vue'
import * as qiniu from 'qiniu-js'
import marked from 'marked'
export default {
  data() {
    return {
      activeTab: '1',
      organizeInfo: {
        organizeImg:
          'https://hanzoy-picture.oss-cn-chengdu.aliyuncs.com/mmt/7942b9e2a80a4945b269a597de7af7a2-file',
        organizeName: '团委',
        tags: {
          tagA: '',
          tagB: '',
          tagC: '',
          tagD: ''
        },
        describe: '',
        introduction: '',
        feature: '',
        daily: '',
        slogan: '',
        contactInfo: '',
        more: ''
      },
      // markdown渲染所用数据
      // markedData: {
      //   introduction: '',
      //   feature: '',
      //   daily: '',
      //   slogan: '',
      //   contactInfo: '',
      //   more: ''
      // },
      // 七牛云上传所需
      token: '',
      QINIU_BASE_PATH: 'https://file.sipc.yuleng.top'
    }
  },
  components: {
    haveTitleVue
  },
  methods: {
    handleClick(e) {
      this.activeTab = e.index
      console.log(1, e.index)
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
      this.organizeInfo.organizeImg = res.data.avatarUrl
      this.organizeInfo.organizeName = res.data.name
      this.organizeInfo.tags = res.data.tag
      this.organizeInfo.describe = res.data.briefIntroduction
    },
    async getQiniuToken() {
      const { data: res } = await this.$http.get('/myApi/getConfig')
      if (res.code !== '00000') {
        return this.$message(res.data.msg)
      }
      this.token = res.data.token
      sessionStorage.setItem('qiniuToken', this.token)
    },
    uploadPictrues(active) {
      this.active = active
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
        if (this.active !== '') {
          if (this.organizeInfo[this.active] === '') {
            this.organizeInfo[this.active] += `![](${this.url})`
          } else {
            this.organizeInfo[this.active] += `\n![](${this.url})`
          }
        } else {
          this.organizeImg = this.url
        }
        this.active = ''
      })
    },
    uploadToQiniu(file, putExtra = {}, key = undefined) {
      const token = this.token
      // 七牛云的一些配置，region需要根据你的空间地区来选择，像我这里z2表示华南地区
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
    async DataSubmit() {
      const { data: res } = await this.$http.post(
        '/api/organization/information',
        this.organizeInfo
      )
      console.log(res)
    }
  },
  created() {
    this.getQiniuToken()
    this.getOrganizeDate()
  },
  computed: {
    tagC() {
      if (
        this.organizeInfo.tags.tagC === null ||
        this.organizeInfo.tags.tagC === ''
      ) {
        return false
      } else {
        return true
      }
    },
    tagD() {
      if (
        this.organizeInfo.tags.tagD === null ||
        this.organizeInfo.tags.tagD === ''
      ) {
        return false
      } else {
        return true
      }
    },
    markedData() {
      return {
        introduction: marked(this.organizeInfo.introduction),
        feature: marked(this.organizeInfo.feature),
        daily: marked(this.organizeInfo.daily),
        slogan: marked(this.organizeInfo.slogan),
        contactInfo: marked(this.organizeInfo.contactInfo),
        more: marked(this.organizeInfo.more)
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
      .nav {
        height: 44px;
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
    }
  }
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
</style>
